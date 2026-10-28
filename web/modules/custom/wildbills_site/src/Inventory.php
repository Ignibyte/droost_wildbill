<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryInterface;
use Drupal\node\NodeInterface;
use Drupal\taxonomy\TermInterface;

/**
 * The cars on the lot.
 *
 * A vehicle is listed while it is published and not sold: an available car
 * and a sale-pending one are listed (Q10), a sold one is not (Q11). The
 * inventory, the home page's featured cars, the body-style tiles and the
 * hero's count all mean this.
 *
 * @phpstan-import-type Facts from InventoryFacets
 */
final class Inventory {

  /**
   * The vehicle bundle.
   */
  public const BUNDLE = 'vehicle';

  /**
   * The sale status that takes a car off the lot.
   */
  public const SOLD = 'sold';

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  /**
   * How many vehicles are listed.
   */
  public function listedCount(): int {
    return (int) $this->listedQuery()->count()->execute();
  }

  /**
   * The listed vehicle with this stock number.
   *
   * The contact form asks about a car only while it is listed, so a link to a
   * car that has since sold opens the form without it (Q11).
   *
   * @param int $stock
   *   The stock number.
   *
   * @return \Drupal\node\NodeInterface|null
   *   The vehicle, or NULL when no listed vehicle has that number.
   */
  public function listedByStock(int $stock): ?NodeInterface {
    $ids = $this->listedQuery()->condition('field_stock_number', $stock)->range(0, 1)->execute();
    $vehicle = $ids ? $this->entityTypeManager->getStorage('node')->load(reset($ids)) : NULL;
    return $vehicle instanceof NodeInterface ? $vehicle : NULL;
  }

  /**
   * The cacheability of anything that shows the listed vehicles.
   *
   * Any vehicle saved, and any body style or make renamed or reordered,
   * changes what is listed and how.
   */
  public function cacheability(): CacheableMetadata {
    return (new CacheableMetadata())->setCacheTags(['node_list', 'taxonomy_term_list']);
  }

  /**
   * A vehicle's facts, as the inventory filter reads them.
   *
   * @param \Drupal\node\NodeInterface $vehicle
   *   The vehicle.
   *
   * @return Facts
   *   Its price, year, miles, make and body style.
   */
  public function facts(NodeInterface $vehicle): array {
    $make = $vehicle->get('field_make')->entity;
    $type = $vehicle->get('field_body_style')->entity;
    return [
      'price' => (int) $vehicle->get('field_price')->value,
      'year' => (int) $vehicle->get('field_year')->value,
      'miles' => (int) $vehicle->get('field_mileage')->value,
      'make' => $make instanceof TermInterface ? (string) $make->label() : '',
      'type' => $type instanceof TermInterface ? (string) $type->label() : '',
      'type_plural' => $type instanceof TermInterface ? (string) $type->get('field_plural_name')->value : '',
      'type_weight' => $type instanceof TermInterface ? (int) $type->getWeight() : 0,
    ];
  }

  /**
   * The query for the listed vehicles.
   *
   * Access is not checked: the conditions themselves are the published rule,
   * so every visitor counts the same cars.
   */
  private function listedQuery(): QueryInterface {
    return $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', self::BUNDLE)
      ->condition('status', NodeInterface::PUBLISHED)
      ->condition('field_sale_status', self::SOLD, '<>');
  }

}
