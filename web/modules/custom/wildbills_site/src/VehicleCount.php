<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Security\TrustedCallbackInterface;

/**
 * Hands the home hero the number of cars on the lot.
 *
 * The source prints "15 sample vehicles". A number an editor typed would go
 * stale the day a car sold, so the hero counts the listed vehicles instead:
 * this runs before the component element renders, gives `wildbills:home_hero`
 * a `vehicle_count` variable, and adds the cache tags that change it.
 */
final class VehicleCount implements TrustedCallbackInterface {

  /**
   * Pre-render callback for the component element.
   *
   * @param array<string, mixed> $element
   *   The component element.
   *
   * @return array<string, mixed>
   *   The element, with `vehicle_count` in the hero's props.
   */
  public static function preRender(array $element): array {
    if (($element['#component'] ?? '') !== 'wildbills:home_hero') {
      return $element;
    }
    /** @var \Drupal\wildbills_site\Inventory $inventory */
    $inventory = \Drupal::service(Inventory::class);
    $element['#props']['vehicle_count'] = $inventory->listedCount();
    CacheableMetadata::createFromRenderArray($element)
      ->merge($inventory->cacheability())
      ->applyTo($element);
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public static function trustedCallbacks(): array {
    return ['preRender'];
  }

}
