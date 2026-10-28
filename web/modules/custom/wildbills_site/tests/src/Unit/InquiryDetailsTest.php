<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\InquiryDetails;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests what the contact page's inquiry form opens with.
 */
#[CoversClass(InquiryDetails::class)]
#[Group('wildbills_site')]
final class InquiryDetailsTest extends UnitTestCase {

  /**
   * The source's first sample car, the 2021 Ford F-150.
   *
   * @return array<string, mixed>
   *   Its facts, as InquiryDetails::vehicle() gives them.
   */
  private static function f150(): array {
    return InquiryDetails::vehicle(1, '2021 Ford F-150', 38900, 42000, 'Magnetic Gray', '/photo.webp', '/vehicles?vehicle=1');
  }

  /**
   * A car's facts carry the padded stock number the draft mails.
   */
  public function testVehicle(): void {
    $this->assertSame([
      'stock_label' => '001',
      'name' => '2021 Ford F-150',
      'price' => 38900,
      'miles' => 42000,
      'color' => 'Magnetic Gray',
      'photo' => '/photo.webp',
      'listing' => '/vehicles?vehicle=1',
    ], self::f150());
    $this->assertSame('1234', InquiryDetails::vehicle(1234, '', 0, 0, '', '', '')['stock_label']);
  }

  /**
   * Only whole numbers are stock numbers.
   *
   * @param mixed $value
   *   The link's `vehicle` argument.
   * @param int|null $expected
   *   The stock number, or NULL.
   */
  #[DataProvider('stockProvider')]
  public function testStock(mixed $value, ?int $expected): void {
    $this->assertSame($expected, InquiryDetails::stock($value));
  }

  /**
   * Links' `vehicle` arguments.
   *
   * @return array<string, array{mixed, int|null}>
   *   The argument and the stock number it names.
   */
  public static function stockProvider(): array {
    return [
      'a number' => ['3', 3],
      'leading zeros' => ['003', 3],
      'none' => [NULL, NULL],
      'empty' => ['', NULL],
      'negative' => ['-1', NULL],
      'decimal' => ['1.5', NULL],
      'words' => ['f150', NULL],
      'an array' => [['1'], NULL],
      'too long' => ['1234567890', NULL],
    ];
  }

  /**
   * A car sets the topic to Specific vehicle, whatever the link's topic says.
   */
  public function testVehicleDecidesTheTopic(): void {
    $props = InquiryDetails::props('wildbill@wildbillscars.com', self::f150(), 'Trade-in');
    $this->assertSame('Specific vehicle', $props['topic']);
    $this->assertSame('wildbill@wildbillscars.com', $props['email']);
    $this->assertSame('2021 Ford F-150', $props['vehicle']['name'] ?? NULL);
  }

  /**
   * Without a car, a known topic is chosen and anything else is ignored.
   *
   * @param mixed $topic
   *   The link's `topic` argument.
   * @param string $expected
   *   The topic the form opens with.
   */
  #[DataProvider('topicProvider')]
  public function testTopic(mixed $topic, string $expected): void {
    $props = InquiryDetails::props('a@example.com', NULL, $topic);
    $this->assertSame($expected, $props['topic']);
    $this->assertNull($props['vehicle']);
  }

  /**
   * Links' `topic` arguments.
   *
   * @return array<string, array{mixed, string}>
   *   The argument and the topic the form opens with.
   */
  public static function topicProvider(): array {
    return [
      'none' => [NULL, 'General question'],
      'test drive' => ['Test drive', 'Test drive'],
      'trade-in' => ['Trade-in', 'Trade-in'],
      'vehicle search' => ['Vehicle search', 'Vehicle search'],
      'specific vehicle, with no car' => ['Specific vehicle', 'Specific vehicle'],
      'wrong case' => ['test drive', 'General question'],
      'unknown' => ['Financing', 'General question'],
      'an array' => [['Test drive'], 'General question'],
    ];
  }

  /**
   * Any other component is left alone, before any service is asked for.
   */
  public function testOtherComponents(): void {
    $element = ['#component' => 'wildbills:info_card', '#props' => ['heading' => 'Phone']];
    $this->assertSame($element, InquiryDetails::preRender($element));
  }

}
