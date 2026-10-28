<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

/**
 * Lays a week of opening hours out as the location page's table.
 *
 * Monday to Sunday, one row a day, printed the way the source's fmtHour()
 * prints them: "8:00am – 7:00pm", or "Closed". Each row also carries the
 * 24-hour times and the weekday number (Sunday 0, as JavaScript counts), so
 * the browser can work out today and the open status without formatting a
 * time itself.
 */
final class HoursTable {

  /**
   * The days of the week, Monday first, with JavaScript's weekday numbers.
   */
  private const DAYS = [
    'monday' => 1,
    'tuesday' => 2,
    'wednesday' => 3,
    'thursday' => 4,
    'friday' => 5,
    'saturday' => 6,
    'sunday' => 0,
  ];

  /**
   * The table's rows.
   *
   * @param array<string, array{open?: string, close?: string}> $hours
   *   Opening and closing times (HH:MM) keyed by lower-case day name. A day
   *   that is missing, or has an empty or malformed time, is closed.
   *
   * @return list<array{day: string, weekday: int, open: ?string, close: ?string, open_label: ?string, close_label: ?string, text: string}>
   *   Monday to Sunday. `open` and the labels are NULL on a closed day.
   */
  public static function rows(array $hours): array {
    $rows = [];
    foreach (self::DAYS as $day => $weekday) {
      $open = $hours[$day]['open'] ?? '';
      $close = $hours[$day]['close'] ?? '';
      $is_open = HoursSummary::isTime($open) && HoursSummary::isTime($close);
      $rows[] = [
        'day' => $day,
        'weekday' => $weekday,
        'open' => $is_open ? $open : NULL,
        'close' => $is_open ? $close : NULL,
        'open_label' => $is_open ? self::formatTime($open) : NULL,
        'close_label' => $is_open ? self::formatTime($close) : NULL,
        'text' => $is_open ? self::formatTime($open) . ' – ' . self::formatTime($close) : 'Closed',
      ];
    }
    return $rows;
  }

  /**
   * Formats a time of day the way the location page prints it.
   *
   * @param string $time
   *   A 24-hour time, HH:MM.
   *
   * @return string
   *   "8:00am", "7:00pm", "8:30am", "12:00pm", "12:00am".
   */
  public static function formatTime(string $time): string {
    [$hour, $minute] = array_map('intval', explode(':', $time) + [1 => '0']);
    $hour12 = $hour % 12 === 0 ? 12 : $hour % 12;
    return sprintf('%d:%02d%s', $hour12, $minute, $hour >= 12 ? 'pm' : 'am');
  }

}
