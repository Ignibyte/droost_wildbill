<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

/**
 * The inventory filter's choices, worked out from the cars on the lot.
 *
 * The source hard-codes three body styles and three slider ranges. Here the
 * body-style buttons and the makes are the ones the listed cars have, and the
 * sliders run the source's ranges unless a listed car lies outside one, in
 * which case that end widens (rounded out to the slider's step) so the car is
 * listed by default.
 *
 * Each vehicle is given as its facts: price, year, miles, make, type (the body
 * style's name), type_plural and type_weight (the order staff set).
 *
 * @phpstan-type Facts array{price: int, year: int, miles: int, make: string, type: string, type_plural: string, type_weight: int}
 * @phpstan-type Range array{min: int, max: int, step: int}
 */
final class InventoryFacets {

  /**
   * The source's price slider: $25,000 to $60,000 in steps of $500.
   */
  public const PRICE = ['min' => 25000, 'max' => 60000, 'step' => 500];

  /**
   * The source's year slider: 2019 to 2022.
   */
  public const YEAR = ['min' => 2019, 'max' => 2022, 'step' => 1];

  /**
   * The source's mileage slider: 10,000 to 80,000 in steps of 5,000.
   */
  public const MILES = ['min' => 10000, 'max' => 80000, 'step' => 5000];

  /**
   * Holds the listed vehicles' facts.
   *
   * @param list<Facts> $vehicles
   *   The listed vehicles' facts.
   */
  public function __construct(
    private readonly array $vehicles,
  ) {}

  /**
   * How many vehicles are listed.
   */
  public function total(): int {
    return count($this->vehicles);
  }

  /**
   * The body styles with a car on the lot, in the order staff set.
   *
   * @return list<array{name: string, plural: string}>
   *   Each body style once, by weight and then by name.
   */
  public function types(): array {
    $types = [];
    foreach ($this->vehicles as $vehicle) {
      $types[$vehicle['type']] ??= [
        'name' => $vehicle['type'],
        'plural' => $vehicle['type_plural'] !== '' ? $vehicle['type_plural'] : $vehicle['type'],
        'weight' => $vehicle['type_weight'],
      ];
    }
    usort($types, static fn (array $a, array $b): int => [$a['weight'], $a['name']] <=> [$b['weight'], $b['name']]);
    return array_map(static fn (array $type): array => ['name' => $type['name'], 'plural' => $type['plural']], $types);
  }

  /**
   * The makes of the listed cars, each once, by name.
   *
   * @return list<string>
   *   The makes.
   */
  public function makes(): array {
    $makes = array_values(array_unique(array_filter(array_column($this->vehicles, 'make'), static fn (string $make): bool => $make !== '')));
    sort($makes, SORT_NATURAL | SORT_FLAG_CASE);
    return $makes;
  }

  /**
   * The price slider's range.
   *
   * @return Range
   *   Its min, max and step.
   */
  public function price(): array {
    return $this->range('price', self::PRICE);
  }

  /**
   * The year slider's range.
   *
   * @return Range
   *   Its min, max and step.
   */
  public function year(): array {
    return $this->range('year', self::YEAR);
  }

  /**
   * The mileage slider's range.
   *
   * @return Range
   *   Its min, max and step.
   */
  public function miles(): array {
    return $this->range('miles', self::MILES);
  }

  /**
   * Widens a slider's range to hold every listed vehicle.
   *
   * @param 'price'|'year'|'miles' $key
   *   The fact the slider filters on.
   * @param Range $base
   *   The source's range.
   *
   * @return Range
   *   The range, each end rounded out to the step where it widened.
   */
  private function range(string $key, array $base): array {
    $values = array_column($this->vehicles, $key);
    if ($values === []) {
      return $base;
    }
    $step = $base['step'];
    return [
      'min' => min($base['min'], (int) (floor(min($values) / $step) * $step)),
      'max' => max($base['max'], (int) (ceil(max($values) / $step) * $step)),
      'step' => $step,
    ];
  }

}
