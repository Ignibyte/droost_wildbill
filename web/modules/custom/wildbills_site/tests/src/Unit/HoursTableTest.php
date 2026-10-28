<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\HoursTable;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the location page's hours table.
 */
#[CoversClass(HoursTable::class)]
#[Group('wildbills_site')]
final class HoursTableTest extends UnitTestCase {

  /**
   * The source's sample week, as the dealership details ship it.
   */
  private const SAMPLE = [
    'sunday' => ['open' => '', 'close' => ''],
    'monday' => ['open' => '08:00', 'close' => '19:00'],
    'tuesday' => ['open' => '08:00', 'close' => '19:00'],
    'wednesday' => ['open' => '08:00', 'close' => '19:00'],
    'thursday' => ['open' => '08:00', 'close' => '19:00'],
    'friday' => ['open' => '08:00', 'close' => '19:00'],
    'saturday' => ['open' => '09:00', 'close' => '18:00'],
  ];

  /**
   * The sample week reads Monday to Sunday, printed as the source prints it.
   */
  public function testSampleWeek(): void {
    $rows = HoursTable::rows(self::SAMPLE);
    $this->assertSame(
      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      array_column($rows, 'day'),
    );
    $this->assertSame([1, 2, 3, 4, 5, 6, 0], array_column($rows, 'weekday'));
    $this->assertSame([
      '8:00am – 7:00pm', '8:00am – 7:00pm', '8:00am – 7:00pm', '8:00am – 7:00pm', '8:00am – 7:00pm',
      '9:00am – 6:00pm', 'Closed',
    ], array_column($rows, 'text'));
  }

  /**
   * An open day carries its times for the browser; a closed day carries none.
   */
  public function testRowData(): void {
    $rows = HoursTable::rows(self::SAMPLE);
    $this->assertSame([
      'day' => 'saturday',
      'weekday' => 6,
      'open' => '09:00',
      'close' => '18:00',
      'open_label' => '9:00am',
      'close_label' => '6:00pm',
      'text' => '9:00am – 6:00pm',
    ], $rows[5]);
    $this->assertNull($rows[6]['open']);
    $this->assertNull($rows[6]['close']);
    $this->assertNull($rows[6]['open_label']);
    $this->assertNull($rows[6]['close_label']);
  }

  /**
   * A missing day, or a half-set or malformed one, is closed.
   */
  public function testIncompleteDaysAreClosed(): void {
    $rows = HoursTable::rows([
      'monday' => ['open' => '08:00'],
      'tuesday' => ['open' => '8am', 'close' => '19:00'],
    ]);
    $this->assertSame(array_fill(0, 7, 'Closed'), array_column($rows, 'text'));
  }

  /**
   * Times print with their minutes, as fmtHour() does.
   */
  #[DataProvider('providerTimes')]
  public function testFormatTime(string $time, string $expected): void {
    $this->assertSame($expected, HoursTable::formatTime($time));
  }

  /**
   * Times of day, 24-hour, and how the table prints them.
   *
   * @return array<string, array{string, string}>
   *   The time and its printed form.
   */
  public static function providerTimes(): array {
    return [
      'morning' => ['08:00', '8:00am'],
      'evening' => ['19:00', '7:00pm'],
      'half past' => ['08:30', '8:30am'],
      'noon' => ['12:00', '12:00pm'],
      'midnight' => ['00:00', '12:00am'],
      'quarter to midnight' => ['23:45', '11:45pm'],
    ];
  }

}
