<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\Dealership;
use Drupal\wildbills_site\LocationDetails;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the values the location and contact pages' components get.
 */
#[CoversClass(LocationDetails::class)]
#[Group('wildbills_site')]
final class LocationDetailsTest extends UnitTestCase {

  /**
   * The dealership, with the source's sample address and a short week.
   */
  private Dealership $dealership;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->dealership = new Dealership($this->getConfigFactoryStub([
      Dealership::CONFIG => [
        'phone' => '(555) 123-4567',
        'email' => 'wildbill@wildbillscars.com',
        'street' => '123 Dusty Creek Rd',
        'city' => 'Dusty Creek, TX 78701',
        'timezone' => 'America/Chicago',
        'hours' => [
          'monday' => ['open' => '08:00', 'close' => '19:00'],
          'tuesday' => ['open' => '08:00', 'close' => '19:00'],
          'saturday' => ['open' => '09:30', 'close' => '18:00'],
          'sunday' => ['open' => '', 'close' => ''],
        ],
      ],
    ]));
    $container = new ContainerBuilder();
    $container->set('string_translation', $this->getStringTranslationStub());
    $container->set(Dealership::class, $this->dealership);
    \Drupal::setContainer($container);
  }

  /**
   * The map card gets both map links, built from the address.
   */
  public function testMapCard(): void {
    $this->assertSame([
      'google_url' => 'https://www.google.com/maps/search/?api=1&query=123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701',
      'apple_url' => 'https://maps.apple.com/?q=123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701',
    ], LocationDetails::props('wildbills:map_card', [], $this->dealership));
  }

  /**
   * Only an info card set to show the address gets it, in either form.
   */
  public function testInfoCard(): void {
    $this->assertSame(
      ['street' => '123 Dusty Creek Rd', 'city' => 'Dusty Creek, TX 78701'],
      LocationDetails::props('wildbills:info_card', ['detail' => 'address'], $this->dealership),
    );
    $this->assertSame(
      ['street' => '123 Dusty Creek Rd', 'city' => 'Dusty Creek, TX 78701'],
      LocationDetails::props('wildbills:info_card', ['detail' => 'address_text'], $this->dealership),
    );
    $this->assertSame([], LocationDetails::props('wildbills:info_card', ['detail' => 'none'], $this->dealership));
    $this->assertSame([], LocationDetails::props('wildbills:info_card', ['detail' => 'fax'], $this->dealership));
    $this->assertSame([], LocationDetails::props('wildbills:info_card', [], $this->dealership));
  }

  /**
   * The contact cards get the phone with its link, the email and the week.
   */
  public function testContactCards(): void {
    $this->assertSame(
      ['phone' => '(555) 123-4567', 'phone_href' => 'tel:+15551234567'],
      LocationDetails::props('wildbills:info_card', ['detail' => 'phone'], $this->dealership),
    );
    $this->assertSame(
      ['email' => 'wildbill@wildbillscars.com'],
      LocationDetails::props('wildbills:info_card', ['detail' => 'email'], $this->dealership),
    );
    $this->assertSame(
      ['hours' => ['Mon–Tue 8:00am–7:00pm', 'Wed–Fri closed', 'Saturday 9:30am–6:00pm', 'Sunday closed']],
      LocationDetails::props('wildbills:info_card', ['detail' => 'hours'], $this->dealership),
    );
  }

  /**
   * The hours table gets the week, with day names, and the time zone.
   */
  public function testHoursTable(): void {
    $values = LocationDetails::props('wildbills:hours_table', [], $this->dealership);
    $this->assertSame('America/Chicago', $values['timezone']);
    $this->assertSame(
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      array_column($values['rows'], 'label'),
    );
    $this->assertSame('8:00am – 7:00pm', $values['rows'][0]['text']);
    $this->assertSame('7:00pm', $values['rows'][0]['close_label']);
    $this->assertSame('Closed', $values['rows'][6]['text']);
    $this->assertSame(0, $values['rows'][6]['weekday']);
  }

  /**
   * Any other component is left alone.
   */
  public function testOtherComponents(): void {
    $this->assertSame([], LocationDetails::props('wildbills:button', [], $this->dealership));
    $element = ['#component' => 'wildbills:button', '#props' => ['label' => 'Go']];
    $this->assertSame($element, LocationDetails::preRender($element));
  }

  /**
   * The pre-render adds the values over the props, with the details' tag.
   */
  public function testPreRender(): void {
    $element = LocationDetails::preRender([
      '#component' => 'wildbills:info_card',
      '#props' => ['detail' => 'address', 'heading' => 'Address', 'street' => 'typed over'],
    ]);
    $this->assertSame('123 Dusty Creek Rd', $element['#props']['street']);
    $this->assertSame('Address', $element['#props']['heading']);
    $this->assertSame(['config:' . Dealership::CONFIG], $element['#cache']['tags']);
  }

}
