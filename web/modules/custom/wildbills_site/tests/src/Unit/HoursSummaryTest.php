<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\HoursSummary;
use Drupal\wildbills_site\HoursTable;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the footer's summary of the week's hours.
 */
#[CoversClass(HoursSummary::class)]
#[Group('wildbills_site')]
final class HoursSummaryTest extends UnitTestCase {

  /**
   * The source's sample week (shared.ts HOURS).
   *
   * @return array<string, array{open: string, close: string}>
   *   The week.
   */
  private static function sourceWeek(): array {
    $weekday = ['open' => '08:00', 'close' => '19:00'];
    return [
      'sunday' => ['open' => '', 'close' => ''],
      'monday' => $weekday,
      'tuesday' => $weekday,
      'wednesday' => $weekday,
      'thursday' => $weekday,
      'friday' => $weekday,
      'saturday' => ['open' => '09:00', 'close' => '18:00'],
    ];
  }

  /**
   * The source's week reads exactly as the source's footer does.
   */
  public function testSourceWeek(): void {
    $this->assertSame(
      ['Mon–Fri 8am–7pm', 'Saturday 9am–6pm', 'Sunday closed'],
      HoursSummary::lines(self::sourceWeek()),
    );
  }

  /**
   * With the location page's format, the week reads as the contact page's card.
   */
  public function testLongFormat(): void {
    $week = self::sourceWeek();
    $this->assertSame(
      ['Mon–Fri 8:00am–7:00pm', 'Saturday 9:00am–6:00pm', 'Sunday closed'],
      HoursSummary::lines($week, HoursTable::formatTime(...)),
    );
    $week['saturday'] = ['open' => '09:30', 'close' => '12:00'];
    $this->assertSame(
      ['Mon–Fri 8:00am–7:00pm', 'Saturday 9:30am–12:00pm', 'Sunday closed'],
      HoursSummary::lines($week, HoursTable::formatTime(...)),
    );
  }

  /**
   * Changing one weekday splits the run it belonged to.
   */
  public function testOneDayChangedSplitsTheRun(): void {
    $week = self::sourceWeek();
    $week['wednesday'] = ['open' => '10:00', 'close' => '16:30'];
    $this->assertSame(
      ['Mon–Tue 8am–7pm', 'Wednesday 10am–4:30pm', 'Thu–Fri 8am–7pm', 'Saturday 9am–6pm', 'Sunday closed'],
      HoursSummary::lines($week),
    );
  }

  /**
   * Consecutive closed days group like any others, and missing days are closed.
   */
  public function testClosedDaysGroup(): void {
    $week = self::sourceWeek();
    unset($week['saturday']);
    $this->assertSame(['Mon–Fri 8am–7pm', 'Sat–Sun closed'], HoursSummary::lines($week));
  }

  /**
   * A day with only one time set, or a malformed one, counts as closed.
   */
  public function testIncompleteDayIsClosed(): void {
    $week = self::sourceWeek();
    $week['saturday'] = ['open' => '09:00', 'close' => ''];
    $week['sunday'] = ['open' => 'noon', 'close' => '17:00'];
    $this->assertSame(['Mon–Fri 8am–7pm', 'Sat–Sun closed'], HoursSummary::lines($week));
  }

  /**
   * The same hours every day is one line.
   */
  public function testEveryDayTheSame(): void {
    $week = array_fill_keys(
      ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      ['open' => '07:00', 'close' => '21:00'],
    );
    $this->assertSame(['Mon–Sun 7am–9pm'], HoursSummary::lines($week));
  }

  /**
   * Times print as the footer writes them.
   */
  #[DataProvider('providerTimes')]
  public function testFormatTime(string $time, string $expected): void {
    $this->assertSame($expected, HoursSummary::formatTime($time));
  }

  /**
   * Times and how they print.
   *
   * @return array<string, array{string, string}>
   *   The time and what it prints as.
   */
  public static function providerTimes(): array {
    return [
      'morning' => ['08:00', '8am'],
      'evening' => ['19:00', '7pm'],
      'off the hour' => ['08:30', '8:30am'],
      'noon' => ['12:00', '12pm'],
      'midnight' => ['00:00', '12am'],
      'half past noon' => ['12:30', '12:30pm'],
    ];
  }

  /**
   * Only 24-hour HH:MM values are times.
   */
  public function testIsTime(): void {
    $this->assertTrue(HoursSummary::isTime('08:00'));
    $this->assertTrue(HoursSummary::isTime('23:59'));
    $this->assertFalse(HoursSummary::isTime('24:00'));
    $this->assertFalse(HoursSummary::isTime('8:00'));
    $this->assertFalse(HoursSummary::isTime(''));
    $this->assertFalse(HoursSummary::isTime('08:60'));
  }

}
