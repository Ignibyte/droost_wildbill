<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\Dealership;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the dealership details service.
 */
#[CoversClass(Dealership::class)]
#[Group('wildbills_site')]
final class DealershipTest extends UnitTestCase {

  /**
   * Builds the service over a config of these values.
   *
   * @param array<string, mixed> $values
   *   The `wildbills_site.dealership` values.
   */
  private function dealership(array $values): Dealership {
    return new Dealership($this->getConfigFactoryStub([Dealership::CONFIG => $values]));
  }

  /**
   * The call link is made from the shown number's digits.
   */
  #[DataProvider('providerPhones')]
  public function testPhoneHref(string $phone, string $expected): void {
    $this->assertSame($expected, $this->dealership(['phone' => $phone])->phoneHref());
  }

  /**
   * Shown numbers and their call links.
   *
   * @return array<string, array{string, string}>
   *   The number as shown and its tel: link.
   */
  public static function providerPhones(): array {
    return [
      'the sample number' => ['(555) 123-4567', 'tel:+15551234567'],
      'dotted' => ['555.987.6543', 'tel:+15559876543'],
      'own country code' => ['+44 20 7946 0958', 'tel:+442079460958'],
      'short' => ['911', 'tel:911'],
    ];
  }

  /**
   * The details read from config, and the footer summary from the hours.
   */
  public function testDetails(): void {
    $dealership = $this->dealership([
      'name' => "Wild Bill's Used Cars",
      'email' => 'wildbill@wildbillscars.com',
      'street' => '123 Dusty Creek Rd',
      'city' => 'Dusty Creek, TX 78701',
      'timezone' => 'America/Denver',
      'demo_notices' => TRUE,
      'hours' => [
        'monday' => ['open' => '08:00', 'close' => '19:00'],
      ],
    ]);
    $this->assertSame("Wild Bill's Used Cars", $dealership->name());
    $this->assertSame('wildbill@wildbillscars.com', $dealership->email());
    $this->assertSame('123 Dusty Creek Rd', $dealership->street());
    $this->assertSame('Dusty Creek, TX 78701', $dealership->city());
    $this->assertSame('America/Denver', $dealership->timezone());
    $this->assertTrue($dealership->demoNotices());
    $this->assertSame(['Monday 8am–7pm', 'Tue–Sun closed'], $dealership->hoursSummary());
  }

  /**
   * Unset details fall back safely: notices off, the site's own time zone.
   */
  public function testDefaults(): void {
    $dealership = $this->dealership([]);
    $this->assertFalse($dealership->demoNotices());
    $this->assertSame('America/Chicago', $dealership->timezone());
    $this->assertSame([], $dealership->hours());
  }

  /**
   * The map links search the address, encoded as the source encodes it.
   */
  public function testMapsUrls(): void {
    $dealership = $this->dealership(['street' => '123 Dusty Creek Rd', 'city' => 'Dusty Creek, TX 78701']);
    $this->assertSame('123 Dusty Creek Rd, Dusty Creek, TX 78701', $dealership->mapsQuery());
    $this->assertSame('https://www.google.com/maps/search/?api=1&query=123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701', $dealership->googleMapsUrl());
    $this->assertSame('https://maps.apple.com/?q=123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701', $dealership->appleMapsUrl());

    $street_only = $this->dealership(['street' => 'Rock & Roll Way']);
    $this->assertSame('Rock & Roll Way', $street_only->mapsQuery());
    $this->assertSame('https://maps.apple.com/?q=Rock%20%26%20Roll%20Way', $street_only->appleMapsUrl());

    $nowhere = $this->dealership([]);
    $this->assertSame('', $nowhere->googleMapsUrl());
    $this->assertSame('', $nowhere->appleMapsUrl());
  }

  /**
   * Anything rendered from the details carries the config's cache tag.
   */
  public function testCacheability(): void {
    $this->assertContains('config:' . Dealership::CONFIG, $this->dealership([])->cacheability()->getCacheTags());
  }

}
