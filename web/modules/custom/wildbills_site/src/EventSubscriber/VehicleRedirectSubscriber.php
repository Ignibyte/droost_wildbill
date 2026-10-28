<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\EventSubscriber;

use Drupal\Core\Routing\LocalRedirectResponse;
use Drupal\Core\Url;
use Drupal\node\NodeInterface;
use Drupal\wildbills_site\Inventory;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Sends a vehicle's own address to its pop-up on the inventory (Q5).
 *
 * A vehicle has no page of its own: /node/<nid> answers 301 to
 * /vehicles?vehicle=<stock number>. It runs after routing, so access is
 * already checked and an unpublished car is refused to visitors, never
 * redirected. Only the canonical route redirects; editing and deleting are
 * untouched.
 */
final class VehicleRedirectSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    // The router listener, which also checks access, runs at 32.
    return [KernelEvents::REQUEST => ['onRequest', 28]];
  }

  /**
   * Redirects a vehicle's canonical page.
   */
  public function onRequest(RequestEvent $event): void {
    $request = $event->getRequest();
    if (!$event->isMainRequest() || $request->attributes->get('_route') !== 'entity.node.canonical') {
      return;
    }
    $node = $request->attributes->get('node');
    if (!$node instanceof NodeInterface || $node->bundle() !== Inventory::BUNDLE) {
      return;
    }
    $url = Url::fromUserInput('/vehicles', [
      'query' => ['vehicle' => (string) $node->get('field_stock_number')->value],
    ])->toString(TRUE);
    $response = new LocalRedirectResponse($url->getGeneratedUrl(), 301);
    $response->addCacheableDependency($url);
    $response->addCacheableDependency($node);
    $event->setResponse($response);
  }

}
