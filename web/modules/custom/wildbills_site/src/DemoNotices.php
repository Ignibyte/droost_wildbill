<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Security\TrustedCallbackInterface;

/**
 * Hands the demo switch to every Wild Bill's component.
 *
 * Canvas renders the home page's sections as components with only the props
 * an editor set, so a section that shows a "sample" label (the hero's vehicle
 * count) could not otherwise know whether the notices are on. This runs before
 * the component element renders, gives each `wildbills:*` component a
 * `demo_notices` variable, and adds the details' cache tag, so a cached page
 * follows the switch.
 */
final class DemoNotices implements TrustedCallbackInterface {

  /**
   * Pre-render callback for the component element.
   *
   * @param array<string, mixed> $element
   *   The component element.
   *
   * @return array<string, mixed>
   *   The element, with `demo_notices` in its props for this site's components.
   */
  public static function preRender(array $element): array {
    $component = $element['#component'] ?? '';
    if (!is_string($component) || !str_starts_with($component, 'wildbills:')) {
      return $element;
    }
    /** @var \Drupal\wildbills_site\Dealership $dealership */
    $dealership = \Drupal::service(Dealership::class);
    // A prop the caller set (the header and footer blocks do) wins.
    $element['#props']['demo_notices'] ??= $dealership->demoNotices();
    CacheableMetadata::createFromRenderArray($element)
      ->merge($dealership->cacheability())
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
