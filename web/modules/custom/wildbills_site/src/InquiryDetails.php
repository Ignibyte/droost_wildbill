<?php

declare(strict_types=1);

namespace Drupal\wildbills_site;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Security\TrustedCallbackInterface;
use Drupal\Core\Url;
use Drupal\file\FileInterface;
use Drupal\image\Entity\ImageStyle;
use Drupal\media\MediaInterface;
use Drupal\node\NodeInterface;

/**
 * Hands the contact page's inquiry form what the visitor's link asks about.
 *
 * `/contact?vehicle=<stock>` asks about one listed car and `?topic=<topic>`
 * picks a topic. Both are decided here, on the server, because the server
 * knows which cars are listed: a sold, unpublished or unknown car is ignored
 * (Q11), a sale-pending one is not (Q10). The page cache keys on the whole
 * URL, and the element varies by both query arguments and carries the
 * inventory's tags, so a cached form never shows another link's car, nor a
 * car that has since sold. This gives `wildbills:inquiry_form`:
 * - `email`: the dealership's address, which the draft is sent to;
 * - `vehicle`: the car's facts, or NULL;
 * - `topic`: the topic chosen when the page opens.
 * Nothing about the visitor's message ever reaches the server (Q4).
 */
final class InquiryDetails implements TrustedCallbackInterface {

  /**
   * The topics, in the form's order.
   *
   * They are values, not wording: other pages link to them
   * (`?topic=Test%20drive`) and the draft's subject carries them. The template
   * translates what the visitor reads.
   */
  public const TOPICS = [
    'General question',
    'Specific vehicle',
    'Test drive',
    'Trade-in',
    'Payment options',
    'Vehicle search',
  ];

  /**
   * The topic when nothing else is asked for.
   */
  public const GENERAL = 'General question';

  /**
   * The topic of a form asking about a car.
   */
  public const VEHICLE = 'Specific vehicle';

  /**
   * The image style of the asked-about car's photo (84 × 62 on the page).
   */
  private const PHOTO_STYLE = '4_3_300x225_focal_point_webp';

  /**
   * Pre-render callback for the component element.
   *
   * @param array<string, mixed> $element
   *   The component element.
   *
   * @return array<string, mixed>
   *   The element, with the email, the car and the topic in its props.
   */
  public static function preRender(array $element): array {
    $props = $element['#props'] ?? [];
    if (($element['#component'] ?? '') !== 'wildbills:inquiry_form' || !is_array($props)) {
      return $element;
    }
    /** @var \Drupal\wildbills_site\Dealership $dealership */
    $dealership = \Drupal::service(Dealership::class);
    /** @var \Drupal\wildbills_site\Inventory $inventory */
    $inventory = \Drupal::service(Inventory::class);
    $query = \Drupal::request()->query;

    $stock = self::stock($query->get('vehicle'));
    $car = $stock === NULL ? NULL : $inventory->listedByStock($stock);
    $vehicle = NULL;
    if ($car !== NULL) {
      $facts = $inventory->facts($car);
      $vehicle = self::vehicle(
        $stock,
        (string) $car->label(),
        $facts['price'],
        $facts['miles'],
        (string) $car->get('field_color')->value,
        self::photoUrl($car),
        Url::fromUserInput('/vehicles', ['query' => ['vehicle' => (string) $stock]])->toString(),
      );
    }

    $element['#props'] = self::props($dealership->email(), $vehicle, $query->get('topic')) + $props;
    CacheableMetadata::createFromRenderArray($element)
      ->merge($dealership->cacheability())
      ->merge($inventory->cacheability())
      ->merge((new CacheableMetadata())->setCacheContexts(['url.query_args:vehicle', 'url.query_args:topic']))
      ->applyTo($element);
    return $element;
  }

  /**
   * The form's values for a link.
   *
   * @param string $email
   *   The dealership's email.
   * @param array<string, mixed>|null $vehicle
   *   The listed car the link asks about, as vehicle() gives it, or NULL.
   * @param mixed $topic
   *   The link's `topic` argument, as the request carries it.
   *
   * @return array{email: string, vehicle: array<string, mixed>|null, topic: string}
   *   The props the inquiry form's template reads.
   */
  public static function props(string $email, ?array $vehicle, mixed $topic): array {
    return [
      'email' => $email,
      'vehicle' => $vehicle,
      // A car decides the topic; otherwise only one of the six is taken.
      'topic' => match (TRUE) {
        $vehicle !== NULL => self::VEHICLE,
        is_string($topic) && in_array($topic, self::TOPICS, TRUE) => $topic,
        default => self::GENERAL,
      },
    ];
  }

  /**
   * A stock number from the link, or NULL when it is not one.
   *
   * @param mixed $value
   *   The link's `vehicle` argument.
   */
  public static function stock(mixed $value): ?int {
    return is_string($value) && preg_match('/^\d{1,9}$/', $value) ? (int) $value : NULL;
  }

  /**
   * The facts of the car being asked about, as the form shows and mails them.
   *
   * @param int $stock
   *   Its stock number.
   * @param string $name
   *   Its title, "<year> <make> <model>".
   * @param int $price
   *   Its price, in whole dollars.
   * @param int $miles
   *   Its mileage.
   * @param string $color
   *   Its colour.
   * @param string $photo
   *   Its photo's URL, or '' when it has none.
   * @param string $listing
   *   The address of its pop-up on the inventory.
   *
   * @return array<string, mixed>
   *   The facts, with the stock number padded to three digits as the source
   *   mails it ("Stock #001"); the listing already carries the number itself.
   */
  public static function vehicle(int $stock, string $name, int $price, int $miles, string $color, string $photo, string $listing): array {
    return [
      'stock_label' => sprintf('%03d', $stock),
      'name' => $name,
      'price' => $price,
      'miles' => $miles,
      'color' => $color,
      'photo' => $photo,
      'listing' => $listing,
    ];
  }

  /**
   * The car's photo, in the small image style, or '' when it has none.
   */
  private static function photoUrl(NodeInterface $car): string {
    $media = $car->get('field_photo')->entity;
    $file = $media instanceof MediaInterface ? $media->get('field_media_image')->entity : NULL;
    $style = ImageStyle::load(self::PHOTO_STYLE);
    if (!$file instanceof FileInterface || $style === NULL) {
      return '';
    }
    return \Drupal::service('file_url_generator')->transformRelative($style->buildUrl((string) $file->getFileUri()));
  }

  /**
   * {@inheritdoc}
   */
  public static function trustedCallbacks(): array {
    return ['preRender'];
  }

}
