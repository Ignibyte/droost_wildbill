<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\InventoryFacets;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the inventory filter's choices and slider ranges.
 *
 * @phpstan-import-type Facts from \Drupal\wildbills_site\InventoryFacets
 */
#[CoversClass(InventoryFacets::class)]
#[Group('wildbills_site')]
final class InventoryFacetsTest extends UnitTestCase {

  /**
   * The source's 15 sample vehicles (shared.ts VEHICLES), as facts.
   *
   * @return list<Facts>
   *   The facts.
   */
  private static function samples(): array {
    $rows = [
      [38900, 2021, 42000, 'Ford', 'Truck'],
      [42500, 2020, 55000, 'Chevrolet', 'SUV'],
      [47200, 2022, 18500, 'RAM', 'Truck'],
      [44800, 2021, 31000, 'Jeep', 'SUV'],
      [39500, 2020, 48000, 'Toyota', 'Truck'],
      [41000, 2021, 35000, 'GMC', 'Truck'],
      [32900, 2020, 61000, 'Ford', 'SUV'],
      [28500, 2019, 72000, 'Chevrolet', 'Truck'],
      [43900, 2021, 29000, 'Toyota', 'SUV'],
      [36800, 2020, 22000, 'Dodge', 'Car'],
      [34500, 2021, 18000, 'Ford', 'Car'],
      [38200, 2020, 44000, 'Jeep', 'SUV'],
      [58000, 2022, 12000, 'GMC', 'SUV'],
      [31000, 2021, 39000, 'Chevrolet', 'Truck'],
      [53400, 2020, 47000, 'RAM', 'Truck'],
    ];
    $styles = ['Truck' => ['Trucks', 0], 'SUV' => ['SUVs', 1], 'Car' => ['Cars', 2]];
    return array_map(static fn (array $row): array => self::vehicle($row[0], $row[1], $row[2], $row[3], $row[4], ...$styles[$row[4]]), $rows);
  }

  /**
   * One vehicle's facts.
   *
   * @return Facts
   *   The facts.
   */
  private static function vehicle(int $price, int $year, int $miles, string $make, string $type, string $plural, int $weight): array {
    return [
      'price' => $price,
      'year' => $year,
      'miles' => $miles,
      'make' => $make,
      'type' => $type,
      'type_plural' => $plural,
      'type_weight' => $weight,
    ];
  }

  /**
   * The 15 samples give the source's buttons, makes and slider ranges.
   */
  public function testSamplesGiveTheSourcesFilter(): void {
    $facets = new InventoryFacets(self::samples());
    $this->assertSame(15, $facets->total());
    $this->assertSame([
      ['name' => 'Truck', 'plural' => 'Trucks'],
      ['name' => 'SUV', 'plural' => 'SUVs'],
      ['name' => 'Car', 'plural' => 'Cars'],
    ], $facets->types());
    $this->assertSame(['Chevrolet', 'Dodge', 'Ford', 'GMC', 'Jeep', 'RAM', 'Toyota'], $facets->makes());
    $this->assertSame(InventoryFacets::PRICE, $facets->price());
    $this->assertSame(InventoryFacets::YEAR, $facets->year());
    $this->assertSame(InventoryFacets::MILES, $facets->miles());
  }

  /**
   * Body styles come in the order staff set, then by name; each once.
   */
  public function testTypesFollowStaffOrder(): void {
    $facets = new InventoryFacets([
      self::vehicle(30000, 2020, 20000, 'Ford', 'Van', 'Vans', 3),
      self::vehicle(30000, 2020, 20000, 'Ford', 'Car', 'Cars', 2),
      self::vehicle(30000, 2020, 20000, 'Ford', 'Coupe', 'Coupes', 2),
      self::vehicle(30000, 2020, 20000, 'Ford', 'Truck', 'Trucks', 0),
      self::vehicle(30000, 2020, 20000, 'Ford', 'Car', 'Cars', 2),
    ]);
    $this->assertSame(['Truck', 'Car', 'Coupe', 'Van'], array_column($facets->types(), 'name'));
  }

  /**
   * A body style with no plural name falls back to its name.
   */
  public function testTypeWithoutPluralUsesItsName(): void {
    $facets = new InventoryFacets([self::vehicle(30000, 2020, 20000, 'Ford', 'Van', '', 3)]);
    $this->assertSame([['name' => 'Van', 'plural' => 'Van']], $facets->types());
  }

  /**
   * Only the makes of the listed cars are offered, each once.
   */
  public function testMakesAreTheListedCarsOnly(): void {
    $facets = new InventoryFacets([
      self::vehicle(30000, 2020, 20000, 'Toyota', 'Car', 'Cars', 2),
      self::vehicle(30000, 2020, 20000, 'chevrolet', 'Car', 'Cars', 2),
      self::vehicle(30000, 2020, 20000, 'Toyota', 'Car', 'Cars', 2),
      self::vehicle(30000, 2020, 20000, '', 'Car', 'Cars', 2),
    ]);
    $this->assertSame(['chevrolet', 'Toyota'], $facets->makes());
  }

  /**
   * A car outside the source's ranges widens them, rounded out to the step.
   */
  public function testOutlierWidensTheRanges(): void {
    $facets = new InventoryFacets([
      ...self::samples(),
      self::vehicle(61250, 2017, 92001, 'Ford', 'Truck', 'Trucks', 0),
      self::vehicle(24900, 2024, 8000, 'Ford', 'Truck', 'Trucks', 0),
    ]);
    $this->assertSame(['min' => 24500, 'max' => 61500, 'step' => 500], $facets->price());
    $this->assertSame(['min' => 2017, 'max' => 2024, 'step' => 1], $facets->year());
    $this->assertSame(['min' => 5000, 'max' => 95000, 'step' => 5000], $facets->miles());
  }

  /**
   * Cars inside the source's ranges never narrow them.
   */
  public function testRangesNeverNarrow(): void {
    $facets = new InventoryFacets([self::vehicle(40000, 2021, 30000, 'Ford', 'Truck', 'Trucks', 0)]);
    $this->assertSame(InventoryFacets::PRICE, $facets->price());
    $this->assertSame(InventoryFacets::YEAR, $facets->year());
    $this->assertSame(InventoryFacets::MILES, $facets->miles());
  }

  /**
   * An empty lot keeps the source's ranges and offers no choices.
   */
  public function testEmptyLot(): void {
    $facets = new InventoryFacets([]);
    $this->assertSame(0, $facets->total());
    $this->assertSame([], $facets->types());
    $this->assertSame([], $facets->makes());
    $this->assertSame(InventoryFacets::PRICE, $facets->price());
  }

}
