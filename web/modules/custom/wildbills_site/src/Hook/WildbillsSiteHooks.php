<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\Hook;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\FieldConfigInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\State\StateInterface;
use Drupal\node\NodeInterface;
use Drupal\pathauto\PathautoState;
use Drupal\taxonomy\TermInterface;
use Drupal\wildbills_site\DemoNotices;
use Drupal\wildbills_site\InquiryDetails;
use Drupal\wildbills_site\Inventory;
use Drupal\wildbills_site\LocationDetails;
use Drupal\wildbills_site\VehicleCount;
use Drupal\wildbills_site\VehicleTitle;

/**
 * Hook implementations for the Wild Bill's site module.
 */
final class WildbillsSiteHooks {

  /**
   * The cache tag on everything that prints the copyright year.
   */
  public const YEAR_TAG = 'wildbills_site:copyright_year';

  /**
   * The state key holding the year last printed.
   */
  private const YEAR_STATE = 'wildbills_site.copyright_year';

  public function __construct(
    private readonly StateInterface $state,
    private readonly CacheTagsInvalidatorInterface $cacheTagsInvalidator,
    private readonly TimeInterface $time,
  ) {}

  /**
   * Implements hook_element_info_alter().
   *
   * Runs DemoNotices::preRender(), VehicleCount::preRender(),
   * LocationDetails::preRender() and InquiryDetails::preRender() ahead of the
   * component element's own pre-render, which turns the props into the
   * template's context.
   *
   * @param array<string, array<string, mixed>> $info
   *   The element info, keyed by element type.
   */
  #[Hook('element_info_alter')]
  public function elementInfoAlter(array &$info): void {
    if (isset($info['component'])) {
      $pre_render = $info['component']['#pre_render'] ?? [];
      array_unshift(
        $pre_render,
        [DemoNotices::class, 'preRender'],
        [VehicleCount::class, 'preRender'],
        [LocationDetails::class, 'preRender'],
        [InquiryDetails::class, 'preRender'],
      );
      $info['component']['#pre_render'] = $pre_render;
    }
  }

  /**
   * Implements hook_cron().
   *
   * The page cache keeps a page until one of its tags is invalidated and
   * ignores max-age, so the footer's copyright year turns over here: the first
   * cron run of a new year clears every page that prints it.
   */
  #[Hook('cron')]
  public function cron(): void {
    $year = (int) date('Y', $this->time->getRequestTime());
    if ($this->state->get(self::YEAR_STATE) !== $year) {
      $this->cacheTagsInvalidator->invalidateTags([self::YEAR_TAG]);
      $this->state->set(self::YEAR_STATE, $year);
    }
  }

  /**
   * Implements hook_ENTITY_TYPE_presave() for node.
   *
   * A vehicle's title is "<year> <make> <model>", written on every save, so
   * editors never type it. A vehicle has no page of its own (Q5: its address
   * redirects to the inventory), so Pathauto gives it no alias.
   */
  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {
    if ($node->bundle() !== Inventory::BUNDLE) {
      return;
    }
    if ($node->hasField('path')) {
      $node->get('path')->pathauto = PathautoState::SKIP;
    }
    $make = $node->get('field_make')->entity;
    $year = $node->get('field_year')->value;
    $node->setTitle(VehicleTitle::build(
      $year === NULL || $year === '' ? NULL : (int) $year,
      $make instanceof TermInterface ? (string) $make->label() : '',
      (string) $node->get('field_model')->value,
    ));
  }

  /**
   * Implements hook_entity_bundle_field_info_alter().
   *
   * Each car on the lot has its own stock number: the inventory's links and
   * the inquiry carry it.
   *
   * @param array<string, \Drupal\Core\Field\FieldDefinitionInterface> $fields
   *   The bundle's field definitions.
   * @param \Drupal\Core\Entity\EntityTypeInterface $entity_type
   *   The entity type.
   * @param string $bundle
   *   The bundle.
   */
  #[Hook('entity_bundle_field_info_alter')]
  public function entityBundleFieldInfoAlter(array &$fields, EntityTypeInterface $entity_type, string $bundle): void {
    if ($entity_type->id() === 'node' && $bundle === Inventory::BUNDLE && isset($fields['field_stock_number'])) {
      $field = $fields['field_stock_number'];
      if ($field instanceof FieldConfigInterface) {
        $field->addConstraint('UniqueField');
      }
    }
  }

}
