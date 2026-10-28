<?php

/**
 * @file
 * Resolves home.tree.json for this site: its photos as image media ids.
 *
 * Run by apply-home.sh through `drush php:script`, after config is in place
 * (the image media type and its field come from config/sync). Makes, or finds
 * by media name, the two photos (their files ship with the wildbills theme's
 * components that show them), puts their ids where the tree says
 * "media:<file>", and writes the result to .home.resolved.json beside it.
 */

declare(strict_types=1);

use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;

$photos = [
  'hero.jpg' => [
    'home_hero',
    'Lot at golden hour',
    'Used cars and pickup trucks lined up on a dealership lot at golden hour',
  ],
  'lot.jpg' => [
    'questions_split',
    'Dealership office',
    'A small dealership office with cars parked out front in late-afternoon light',
  ],
];

$media_storage = \Drupal::entityTypeManager()->getStorage('media');
$file_system = \Drupal::service('file_system');
$theme_path = \Drupal::service('extension.list.theme')->getPath('wildbills');
$directory = 'public://wildbills';
$file_system->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY);

$ids = [];
foreach ($photos as $name => [$component, $label, $alt]) {
  $existing = $media_storage->loadByProperties(['bundle' => 'image', 'name' => $label]);
  if ($existing) {
    $ids[$name] = (int) reset($existing)->id();
    continue;
  }
  $uri = $file_system->copy("$theme_path/components/$component/$name", "$directory/$name", FileExists::Replace);
  $file = File::create(['uri' => $uri, 'status' => 1]);
  $file->save();
  $media = Media::create([
    'bundle' => 'image',
    'name' => $label,
    'field_media_image' => ['target_id' => $file->id(), 'alt' => $alt],
    'status' => 1,
  ]);
  $media->save();
  $ids[$name] = (int) $media->id();
}

$tree = json_decode((string) file_get_contents(__DIR__ . '/home.tree.json'), TRUE, 512, JSON_THROW_ON_ERROR);
foreach ($tree['items'] as &$item) {
  foreach ($item['inputs'] as &$value) {
    $target = is_array($value) ? ($value['target_id'] ?? NULL) : NULL;
    if (is_string($target) && str_starts_with($target, 'media:')) {
      $file = substr($target, strlen('media:'));
      if (!isset($ids[$file])) {
        throw new \RuntimeException("home.tree.json names media:$file, which this script does not make.");
      }
      $value['target_id'] = (string) $ids[$file];
    }
  }
  unset($value);
}
unset($item);
file_put_contents(__DIR__ . '/.home.resolved.json', json_encode($tree, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
print json_encode($ids) . "\n";
