<?php

/**
 * @file
 * Deploy hooks for the Wild Bill's site module.
 *
 * `drush deploy` runs these after the configuration is imported, so the
 * vehicle type, its fields and the two vocabularies already exist.
 */

declare(strict_types=1);

use Drupal\Component\Serialization\Json;
use Drupal\Component\Serialization\Yaml;
use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\media\MediaInterface;
use Drupal\node\Entity\Node;
use Drupal\pathauto\PathautoState;
use Drupal\redirect\Entity\Redirect;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\TermInterface;

/**
 * Writes the sample inventory: makes, body styles, photos and 15 vehicles.
 *
 * From content/vehicles.yml, the source's VEHICLES (Q2: the first content,
 * all Available). Safe to run again: terms are matched by name, photos by
 * media name, vehicles by stock number, and nothing that exists is changed.
 * Also adds the redirect that keeps the static source's /vehicles.html
 * answering, its query carried along (redirect's passthrough_querystring).
 */
function wildbills_site_deploy_r02_vehicles(): string {
  $module_path = \Drupal::service('extension.list.module')->getPath('wildbills_site');
  $content = Yaml::decode((string) file_get_contents("$module_path/content/vehicles.yml"));

  $makes = [];
  foreach ($content['makes'] as $weight => $name) {
    $makes[$name] = _wildbills_site_term('make', $name, ['weight' => $weight]);
  }

  $photo_alts = [];
  foreach ($content['vehicles'] as $vehicle) {
    $photo_alts[$vehicle['photo']] = sprintf('%d %s %s, %s', $vehicle['year'], $vehicle['make'], $vehicle['model'], $vehicle['color']);
  }
  $photos = [];
  foreach ($photo_alts as $file => $alt) {
    $photos[$file] = _wildbills_site_photo("$module_path/content/images/$file", $alt);
  }

  $body_styles = [];
  foreach ($content['body_styles'] as $weight => $style) {
    $body_styles[$style['name']] = _wildbills_site_term('body_style', $style['name'], [
      'weight' => $weight,
      'field_plural_name' => $style['plural'],
      'field_tile_line' => $style['line'],
      'field_tile_photo' => $photos[$style['photo']]->id(),
    ]);
  }

  $node_storage = \Drupal::entityTypeManager()->getStorage('node');
  $created = 0;
  foreach ($content['vehicles'] as $vehicle) {
    if ($node_storage->loadByProperties(['type' => 'vehicle', 'field_stock_number' => $vehicle['stock']])) {
      continue;
    }
    $node = Node::create([
      'type' => 'vehicle',
      'status' => 1,
      'field_stock_number' => $vehicle['stock'],
      'field_make' => $makes[$vehicle['make']]->id(),
      'field_model' => (string) $vehicle['model'],
      'field_year' => $vehicle['year'],
      'field_price' => $vehicle['price'],
      'field_body_style' => $body_styles[$vehicle['body_style']]->id(),
      'field_mileage' => $vehicle['miles'],
      'field_color' => $vehicle['color'],
      'field_condition' => $vehicle['condition'],
      'field_featured' => $vehicle['featured'],
      'field_sale_status' => 'available',
      'field_photo' => $photos[$vehicle['photo']]->id(),
    ]);
    // Vehicles are on the editorial workflow: the samples start published.
    if ($node->hasField('moderation_state')) {
      $node->set('moderation_state', 'published');
    }
    $node->save();
    $created++;
  }

  $redirects = \Drupal::entityTypeManager()->getStorage('redirect');
  if (!$redirects->loadByProperties(['redirect_source__path' => 'vehicles.html'])) {
    Redirect::create([
      'redirect_source' => ['path' => 'vehicles.html'],
      'redirect_redirect' => ['uri' => 'internal:/vehicles'],
      'status_code' => 301,
      'language' => 'und',
    ])->save();
  }

  return sprintf('Sample inventory: %d vehicle(s) created.', $created);
}

/**
 * Makes the Location & Hours page at /location, and its .html redirect.
 *
 * Only the page itself, its title, description and address: its components
 * are written by droost/canvas/apply-location.sh with `canvas tree:set`
 * (HR2). Safe to run again: a page already at /location, or a redirect
 * already from location.html, is left as it is.
 */
function wildbills_site_deploy_r03_location_page(): string {
  $made = [];
  if (\Drupal::service('path_alias.manager')->getPathByAlias('/location') === '/location') {
    \Drupal::entityTypeManager()->getStorage('canvas_page')->create([
      'title' => 'Location & Hours',
      'description' => 'Opening hours, address and map links for visiting Wild Bill\'s Used Cars. Sample location details for this demo website.',
      'path' => ['alias' => '/location', 'pathauto' => PathautoState::SKIP],
      // Canvas gives every new page its own title tag, "<title> | <site>";
      // the source writes "Location & Hours — Wild Bill's Used Cars".
      'metatags' => Json::encode([
        'title' => '[canvas_page:title] — [site:name]',
        'description' => '[canvas_page:description]',
        'canonical_url' => '[canvas_page:url]',
        'image_src' => '[canvas_page:image:entity:field_media_image:entity:url]',
      ]),
      'status' => TRUE,
      'owner' => 1,
    ])->save();
    $made[] = 'the page';
  }

  $redirects = \Drupal::entityTypeManager()->getStorage('redirect');
  if (!$redirects->loadByProperties(['redirect_source__path' => 'location.html'])) {
    Redirect::create([
      'redirect_source' => ['path' => 'location.html'],
      'redirect_redirect' => ['uri' => 'internal:/location'],
      'status_code' => 301,
      'language' => 'und',
    ])->save();
    $made[] = 'the location.html redirect';
  }

  return $made ? 'Location & Hours: made ' . implode(' and ', $made) . '.' : 'Location & Hours: already in place.';
}

/**
 * Makes the Contact page at /contact, and its .html redirect.
 *
 * Only the page itself, its title, description and address: its components
 * are written by droost/canvas/apply-contact.sh with `canvas tree:set` (HR2).
 * Safe to run again: a page already at /contact, or a redirect already from
 * contact.html, is left as it is. The redirect carries the query, so
 * /contact.html?vehicle=3 still asks about car 3.
 */
function wildbills_site_deploy_r04_contact_page(): string {
  $made = [];
  if (\Drupal::service('path_alias.manager')->getPathByAlias('/contact') === '/contact') {
    \Drupal::entityTypeManager()->getStorage('canvas_page')->create([
      'title' => 'Contact',
      'description' => 'Ask Wild Bill\'s Used Cars about a vehicle, a test drive, trade-ins or payment options. Prepares an email in your own mail app. Demo website.',
      'path' => ['alias' => '/contact', 'pathauto' => PathautoState::SKIP],
      // Canvas gives every new page its own title tag, "<title> | <site>";
      // the source writes "Contact — Wild Bill's Used Cars".
      'metatags' => Json::encode([
        'title' => '[canvas_page:title] — [site:name]',
        'description' => '[canvas_page:description]',
        'canonical_url' => '[canvas_page:url]',
        'image_src' => '[canvas_page:image:entity:field_media_image:entity:url]',
      ]),
      'status' => TRUE,
      'owner' => 1,
    ])->save();
    $made[] = 'the page';
  }

  $redirects = \Drupal::entityTypeManager()->getStorage('redirect');
  if (!$redirects->loadByProperties(['redirect_source__path' => 'contact.html'])) {
    Redirect::create([
      'redirect_source' => ['path' => 'contact.html'],
      'redirect_redirect' => ['uri' => 'internal:/contact'],
      'status_code' => 301,
      'language' => 'und',
    ])->save();
    $made[] = 'the contact.html redirect';
  }

  return $made ? 'Contact: made ' . implode(' and ', $made) . '.' : 'Contact: already in place.';
}

/**
 * Finds a term by vocabulary and name, or makes it with these values.
 *
 * @param string $vid
 *   The vocabulary.
 * @param string $name
 *   The term's name.
 * @param array<string, mixed> $values
 *   The values a new term starts with.
 */
function _wildbills_site_term(string $vid, string $name, array $values): TermInterface {
  $storage = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
  $existing = $storage->loadByProperties(['vid' => $vid, 'name' => $name]);
  $term = reset($existing);
  if ($term instanceof TermInterface) {
    return $term;
  }
  $term = Term::create(['vid' => $vid, 'name' => $name] + $values);
  $term->save();
  return $term;
}

/**
 * Finds an image media by name, or makes it from a file the module ships.
 *
 * @param string $path
 *   The photo's path, relative to the Drupal root.
 * @param string $alt
 *   Its alternative text, which is also the media's name.
 */
function _wildbills_site_photo(string $path, string $alt): MediaInterface {
  $storage = \Drupal::entityTypeManager()->getStorage('media');
  $existing = $storage->loadByProperties(['bundle' => 'image', 'name' => $alt]);
  $media = reset($existing);
  if ($media instanceof MediaInterface) {
    return $media;
  }
  $file_system = \Drupal::service('file_system');
  $directory = 'public://vehicles';
  $file_system->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY);
  $uri = $file_system->copy($path, $directory . '/' . basename($path), FileExists::Replace);
  $file = File::create(['uri' => $uri, 'status' => 1]);
  $file->save();
  $media = Media::create([
    'bundle' => 'image',
    'name' => $alt,
    'field_media_image' => ['target_id' => $file->id(), 'alt' => $alt],
    'status' => 1,
  ]);
  $media->save();
  return $media;
}
