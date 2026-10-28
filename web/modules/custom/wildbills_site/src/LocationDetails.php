<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Security\TrustedCallbackInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Hands the location and contact pages' components the dealership's details.
 *
 * The address, phone, email and hours are the dealership's, set once on its
 * details form, so they are never Canvas props an editor could type over. This
 * runs before the component element renders and gives:
 * - `wildbills:map_card` the Google Maps and Apple Maps links;
 * - `wildbills:info_card` the detail it is set to show: the street and city
 *   (`address`, `address_text`), the number and its tel: link (`phone`), the
 *   email (`email`) or the week summarised (`hours`);
 * - `wildbills:hours_table` the week's rows and the time zone;
 * each with the details' cache tag, so a cached page follows the form.
 */
final class LocationDetails implements TrustedCallbackInterface {

  /**
   * The components this hands values to.
   */
  private const COMPONENTS = ['wildbills:map_card', 'wildbills:info_card', 'wildbills:hours_table'];

  /**
   * Pre-render callback for the component element.
   *
   * @param array<string, mixed> $element
   *   The component element.
   *
   * @return array<string, mixed>
   *   The element, with the dealership's values in its props.
   */
  public static function preRender(array $element): array {
    $component = $element['#component'] ?? '';
    $props = $element['#props'] ?? [];
    // Every component element passes through here: leave the others before
    // asking for the dealership's details.
    if (!in_array($component, self::COMPONENTS, TRUE) || !is_array($props)) {
      return $element;
    }
    /** @var \Drupal\wildbills_site\Dealership $dealership */
    $dealership = \Drupal::service(Dealership::class);
    $values = self::props($component, $props, $dealership);
    if ($values === []) {
      return $element;
    }
    $element['#props'] = $values + $props;
    CacheableMetadata::createFromRenderArray($element)
      ->merge($dealership->cacheability())
      ->applyTo($element);
    return $element;
  }

  /**
   * The dealership's values for one component.
   *
   * @param string $component
   *   The component's id, e.g. "wildbills:map_card".
   * @param array<string, mixed> $props
   *   The props it was placed with.
   * @param \Drupal\wildbills_site\Dealership $dealership
   *   The dealership's details.
   *
   * @return array<string, mixed>
   *   The values to add to its props; empty for any other component.
   */
  public static function props(string $component, array $props, Dealership $dealership): array {
    return match (TRUE) {
      $component === 'wildbills:map_card' => [
        'google_url' => $dealership->googleMapsUrl(),
        'apple_url' => $dealership->appleMapsUrl(),
      ],
      $component === 'wildbills:info_card' => self::infoCard((string) ($props['detail'] ?? ''), $dealership),
      $component === 'wildbills:hours_table' => [
        'rows' => array_map(static fn (array $row): array => [
          'label' => (string) self::dayLabel($row['day']),
          'text' => $row['open'] === NULL ? (string) new TranslatableMarkup('Closed') : $row['text'],
        ] + $row, HoursTable::rows($dealership->hours())),
        'timezone' => $dealership->timezone(),
      ],
      default => [],
    };
  }

  /**
   * The dealership's values for an info card showing one detail.
   *
   * @param string $detail
   *   The card's `detail` prop.
   * @param \Drupal\wildbills_site\Dealership $dealership
   *   The dealership's details.
   *
   * @return array<string, mixed>
   *   The values the card's template prints; empty for no detail.
   */
  private static function infoCard(string $detail, Dealership $dealership): array {
    return match ($detail) {
      'address', 'address_text' => [
        'street' => $dealership->street(),
        'city' => $dealership->city(),
      ],
      'phone' => [
        'phone' => $dealership->phone(),
        'phone_href' => $dealership->phoneHref(),
      ],
      'email' => ['email' => $dealership->email()],
      'hours' => ['hours' => HoursSummary::lines($dealership->hours(), HoursTable::formatTime(...))],
      default => [],
    };
  }

  /**
   * A day's name, translated.
   */
  private static function dayLabel(string $day): TranslatableMarkup {
    return match ($day) {
      'monday' => new TranslatableMarkup('Monday'),
      'tuesday' => new TranslatableMarkup('Tuesday'),
      'wednesday' => new TranslatableMarkup('Wednesday'),
      'thursday' => new TranslatableMarkup('Thursday'),
      'friday' => new TranslatableMarkup('Friday'),
      'saturday' => new TranslatableMarkup('Saturday'),
      default => new TranslatableMarkup('Sunday'),
    };
  }

  /**
   * {@inheritdoc}
   */
  public static function trustedCallbacks(): array {
    return ['preRender'];
  }

}
