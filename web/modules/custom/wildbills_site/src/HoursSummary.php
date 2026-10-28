<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

/**
 * Summarises a week of opening hours into short lines.
 *
 * Walks Monday to Sunday and groups consecutive days with the same hours. A
 * run of days is named by its first and last day, abbreviated ("Mon–Fri");
 * a single day keeps its full name ("Saturday"). For the footer, times print
 * as "8am", or "8:30am" off the hour; the contact page's Hours card passes
 * HoursTable::formatTime() and prints "8:00am". A closed day reads "closed".
 */
final class HoursSummary {

  /**
   * The days of the week, Monday first, with their short names.
   */
  private const DAYS = [
    'monday' => 'Mon',
    'tuesday' => 'Tue',
    'wednesday' => 'Wed',
    'thursday' => 'Thu',
    'friday' => 'Fri',
    'saturday' => 'Sat',
    'sunday' => 'Sun',
  ];

  /**
   * Summarises the week.
   *
   * @param array<string, array{open?: string, close?: string}> $hours
   *   Opening and closing times (HH:MM) keyed by lower-case day name. A day
   *   that is missing, or has an empty time, is closed.
   * @param (callable(string): string)|null $formatTime
   *   Prints one HH:MM time; the footer's formatTime() when not given.
   *
   * @return list<string>
   *   One line per run of days, e.g. "Mon–Fri 8am–7pm", "Sunday closed".
   */
  public static function lines(array $hours, ?callable $formatTime = NULL): array {
    $formatTime ??= self::formatTime(...);
    $runs = [];
    foreach (array_keys(self::DAYS) as $day) {
      $value = self::dayValue($hours[$day] ?? [], $formatTime);
      $last = array_key_last($runs);
      if ($last !== NULL && $runs[$last]['value'] === $value) {
        $runs[$last]['days'][] = $day;
      }
      else {
        $runs[] = ['days' => [$day], 'value' => $value];
      }
    }

    $lines = [];
    foreach ($runs as $run) {
      $first = $run['days'][0];
      $label = count($run['days']) === 1
        ? ucfirst($first)
        : self::DAYS[$first] . '–' . self::DAYS[end($run['days'])];
      $lines[] = $label . ' ' . $run['value'];
    }
    return $lines;
  }

  /**
   * Formats a time of day the way the footer prints it.
   *
   * @param string $time
   *   A 24-hour time, HH:MM.
   *
   * @return string
   *   "8am", "7pm", "8:30am", "12pm".
   */
  public static function formatTime(string $time): string {
    [$hour, $minute] = array_map('intval', explode(':', $time) + [1 => '0']);
    $suffix = $hour >= 12 ? 'pm' : 'am';
    $hour12 = $hour % 12 === 0 ? 12 : $hour % 12;
    return $hour12 . ($minute ? sprintf(':%02d', $minute) : '') . $suffix;
  }

  /**
   * Whether a value is a 24-hour HH:MM time.
   */
  public static function isTime(string $value): bool {
    return (bool) preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $value);
  }

  /**
   * The printed hours for one day: "8am–7pm" or "closed".
   *
   * @param array{open?: string, close?: string} $day
   *   The day's opening and closing times.
   * @param callable(string): string $formatTime
   *   Prints one time.
   */
  private static function dayValue(array $day, callable $formatTime): string {
    $open = $day['open'] ?? '';
    $close = $day['close'] ?? '';
    if (!self::isTime($open) || !self::isTime($close)) {
      return 'closed';
    }
    return $formatTime($open) . '–' . $formatTime($close);
  }

}
