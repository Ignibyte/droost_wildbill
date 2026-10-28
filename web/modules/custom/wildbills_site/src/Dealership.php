<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\ImmutableConfig;

/**
 * The dealership's details, as every page shows them.
 *
 * One place reads `wildbills_site.dealership`, so the header, the footer and
 * every later page agree on the phone, the address, the hours and whether the
 * demo notices show.
 */
final class Dealership {

  public const CONFIG = 'wildbills_site.dealership';

  public function __construct(
    private readonly ConfigFactoryInterface $configFactory,
  ) {}

  /**
   * The dealership's name: "Wild Bill's Used Cars".
   */
  public function name(): string {
    return (string) $this->config()->get('name');
  }

  /**
   * The phone number as it is shown: "(555) 123-4567".
   */
  public function phone(): string {
    return (string) $this->config()->get('phone');
  }

  /**
   * The phone number as a tel: link.
   *
   * Ten digits are read as a North American number and given +1; a number
   * written with a leading + keeps its own country code.
   */
  public function phoneHref(): string {
    $phone = trim($this->phone());
    $digits = preg_replace('/\D+/', '', $phone) ?? '';
    if (str_starts_with($phone, '+')) {
      return 'tel:+' . $digits;
    }
    if (strlen($digits) === 10) {
      return 'tel:+1' . $digits;
    }
    return 'tel:' . $digits;
  }

  /**
   * The email address.
   */
  public function email(): string {
    return (string) $this->config()->get('email');
  }

  /**
   * The street line of the address.
   */
  public function street(): string {
    return (string) $this->config()->get('street');
  }

  /**
   * The city, state and ZIP line of the address.
   */
  public function city(): string {
    return (string) $this->config()->get('city');
  }

  /**
   * The address as one search: "123 Dusty Creek Rd, Dusty Creek, TX 78701".
   */
  public function mapsQuery(): string {
    return implode(', ', array_filter([trim($this->street()), trim($this->city())], static fn (string $line): bool => $line !== ''));
  }

  /**
   * The address searched in Google Maps, or '' when there is no address.
   */
  public function googleMapsUrl(): string {
    $query = $this->mapsQuery();
    return $query === '' ? '' : 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode($query);
  }

  /**
   * The address searched in Apple Maps, or '' when there is no address.
   */
  public function appleMapsUrl(): string {
    $query = $this->mapsQuery();
    return $query === '' ? '' : 'https://maps.apple.com/?q=' . rawurlencode($query);
  }

  /**
   * The time zone the dealership keeps its hours in.
   */
  public function timezone(): string {
    return (string) ($this->config()->get('timezone') ?: 'America/Chicago');
  }

  /**
   * Whether the demo notices (the demo bar, the "sample" labels) show.
   */
  public function demoNotices(): bool {
    return (bool) $this->config()->get('demo_notices');
  }

  /**
   * The week's opening hours, keyed by lower-case day name.
   *
   * @return array<string, array{open?: string, close?: string}>
   *   Each day's opening and closing time (HH:MM); empty when closed.
   */
  public function hours(): array {
    $hours = $this->config()->get('hours');
    return is_array($hours) ? $hours : [];
  }

  /**
   * The week's hours, summarised for the footer.
   *
   * @return list<string>
   *   E.g. "Mon–Fri 8am–7pm", "Saturday 9am–6pm", "Sunday closed".
   */
  public function hoursSummary(): array {
    return HoursSummary::lines($this->hours());
  }

  /**
   * The cacheability of anything rendered from these details.
   */
  public function cacheability(): CacheableMetadata {
    return (new CacheableMetadata())->addCacheTags(['config:' . self::CONFIG]);
  }

  /**
   * The configuration object.
   */
  private function config(): ImmutableConfig {
    return $this->configFactory->get(self::CONFIG);
  }

}
