<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\VehicleTitle;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the title a vehicle is given from its year, make and model.
 */
#[CoversClass(VehicleTitle::class)]
#[Group('wildbills_site')]
final class VehicleTitleTest extends UnitTestCase {

  /**
   * The title reads as the source's vehicleName() does.
   */
  #[DataProvider('titles')]
  public function testBuild(?int $year, string $make, string $model, string $expected): void {
    $this->assertSame($expected, VehicleTitle::build($year, $make, $model));
  }

  /**
   * Years, makes and models, and the titles they give.
   *
   * @return array<string, array{0: int|null, 1: string, 2: string, 3: string}>
   *   The cases.
   */
  public static function titles(): array {
    return [
      'the source\'s first car' => [2021, 'Ford', 'F-150', '2021 Ford F-150'],
      'a model of two words' => [2020, 'RAM', '2500 Laramie', '2020 RAM 2500 Laramie'],
      'stray spaces are trimmed' => [2022, ' GMC ', ' Yukon XL ', '2022 GMC Yukon XL'],
      'no make yet' => [2021, '', 'F-150', '2021 F-150'],
      'no year yet' => [NULL, 'Jeep', 'Wrangler', 'Jeep Wrangler'],
    ];
  }

}
