<?php

declare(strict_types=1);

namespace Drupal\Tests\wildbills_site\Unit;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\FieldConfigInterface;
use Drupal\Core\Render\Element\HtmlTag;
use Drupal\Core\State\StateInterface;
use Drupal\Tests\UnitTestCase;
use Drupal\wildbills_site\DemoNotices;
use Drupal\wildbills_site\Hook\WildbillsSiteHooks;
use Drupal\wildbills_site\InquiryDetails;
use Drupal\wildbills_site\LocationDetails;
use Drupal\wildbills_site\VehicleCount;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests the module's hooks: the pre-renders, the year turnover, stock numbers.
 */
#[CoversClass(WildbillsSiteHooks::class)]
#[Group('wildbills_site')]
final class WildbillsSiteHooksTest extends UnitTestCase {

  /**
   * Builds the hooks over a state holding the year last printed.
   */
  private function hooks(?int $printed_year, int $now, CacheTagsInvalidatorInterface $invalidator): WildbillsSiteHooks {
    $state = $this->createMock(StateInterface::class);
    $state->method('get')->willReturn($printed_year);
    $time = $this->createMock(TimeInterface::class);
    $time->method('getRequestTime')->willReturn($now);
    return new WildbillsSiteHooks($state, $invalidator, $time);
  }

  /**
   * The first cron run of a new year clears the pages that print the year.
   */
  public function testCronInvalidatesTheYearOnceItTurns(): void {
    $invalidator = $this->createMock(CacheTagsInvalidatorInterface::class);
    $invalidator->expects($this->once())->method('invalidateTags')->with([WildbillsSiteHooks::YEAR_TAG]);
    $this->hooks(2026, mktime(0, 30, 0, 1, 1, 2027), $invalidator)->cron();
  }

  /**
   * Within the same year cron leaves the cached pages alone.
   */
  public function testCronLeavesTheSameYearAlone(): void {
    $invalidator = $this->createMock(CacheTagsInvalidatorInterface::class);
    $invalidator->expects($this->never())->method('invalidateTags');
    $this->hooks(2026, mktime(12, 0, 0, 6, 1, 2026), $invalidator)->cron();
  }

  /**
   * The demo switch's, the count's and the location's pre-renders run first.
   */
  public function testDemoNoticesRunFirst(): void {
    // Any pre-render already declared stands in for the element's own.
    $info = ['component' => ['#pre_render' => [[HtmlTag::class, 'preRenderHtmlTag']]]];
    $this->hooks(NULL, 0, $this->createMock(CacheTagsInvalidatorInterface::class))->elementInfoAlter($info);
    $this->assertSame([
      [DemoNotices::class, 'preRender'],
      [VehicleCount::class, 'preRender'],
      [LocationDetails::class, 'preRender'],
      [InquiryDetails::class, 'preRender'],
      [HtmlTag::class, 'preRenderHtmlTag'],
    ], $info['component']['#pre_render']);
  }

  /**
   * A vehicle's stock number must be its own; other bundles are untouched.
   */
  public function testStockNumberIsUnique(): void {
    $hooks = $this->hooks(NULL, 0, $this->createMock(CacheTagsInvalidatorInterface::class));
    $node = $this->createMock(EntityTypeInterface::class);
    $node->method('id')->willReturn('node');

    $stock = $this->createMock(FieldConfigInterface::class);
    $stock->expects($this->once())->method('addConstraint')->with('UniqueField');
    $fields = ['field_stock_number' => $stock];
    $hooks->entityBundleFieldInfoAlter($fields, $node, 'vehicle');

    $other = $this->createMock(FieldConfigInterface::class);
    $other->expects($this->never())->method('addConstraint');
    $fields = ['field_stock_number' => $other];
    $hooks->entityBundleFieldInfoAlter($fields, $node, 'page');
  }

}
