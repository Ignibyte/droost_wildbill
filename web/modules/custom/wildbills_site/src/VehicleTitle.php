<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

/**
 * A vehicle's title, worked out from its year, make and model.
 *
 * The source's `vehicleName()`: "2021 Ford F-150". Editors never type it; the
 * module writes it on every save, so it follows a corrected make or model.
 */
final class VehicleTitle {

  /**
   * Builds the title.
   *
   * @param int|null $year
   *   The model year.
   * @param string $make
   *   The make's name.
   * @param string $model
   *   The model.
   *
   * @return string
   *   "<year> <make> <model>", leaving out any part that is empty.
   */
  public static function build(?int $year, string $make, string $model): string {
    $parts = [$year === NULL ? '' : (string) $year, trim($make), trim($model)];
    return implode(' ', array_filter($parts, static fn (string $part): bool => $part !== ''));
  }

}
