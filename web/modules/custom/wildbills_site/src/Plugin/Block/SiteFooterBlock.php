<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\wildbills_site\Hook\WildbillsSiteHooks;

/**
 * The site footer: the brand, the footer menu, the hours and the contact lines.
 */
#[Block(
  id: 'wildbills_site_footer',
  admin_label: new TranslatableMarkup('Site footer'),
  category: new TranslatableMarkup("Wild Bill's"),
)]
final class SiteFooterBlock extends SiteFrameBlockBase {

  /**
   * {@inheritdoc}
   *
   * @return array<string, string>
   *   The brand lines and the line under the brand.
   */
  public function defaultConfiguration(): array {
    return parent::defaultConfiguration() + [
      'about' => 'An independent used-car lot. Look at the car, ask your questions, decide in your own time.',
    ];
  }

  /**
   * {@inheritdoc}
   *
   * @param array<string, mixed> $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   *
   * @return array<string, mixed>
   *   The form.
   */
  public function blockForm($form, FormStateInterface $form_state): array {
    $form = parent::blockForm($form, $form_state);
    $form['about'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Line under the brand'),
      '#default_value' => $this->configuration['about'],
      '#rows' => 2,
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   *
   * @return array<string, mixed>
   *   The render array.
   */
  public function build(): array {
    $cacheability = $this->dealership->cacheability();
    $build = [
      '#type' => 'component',
      '#component' => 'wildbills:site_footer',
      '#props' => $this->brandProps() + [
        'about' => (string) $this->configuration['about'],
        'hours' => $this->dealership->hoursSummary(),
        'phone' => $this->dealership->phone(),
        'phone_href' => $this->dealership->phoneHref(),
        'email' => $this->dealership->email(),
        'street' => $this->dealership->street(),
        'city' => $this->dealership->city(),
        'name' => $this->dealership->name(),
        'year' => (int) date('Y', $this->now()),
        'demo_notices' => $this->dealership->demoNotices(),
      ],
      '#slots' => [
        'links' => $this->linkSlot($this->menuLinks('footer', $cacheability), 'footer'),
      ],
    ];
    // The max-age turns the year over in the render caches; the page cache
    // ignores max-age, so cron invalidates the tag (WildbillsSiteHooks::cron).
    $cacheability->mergeCacheMaxAge($this->secondsToNewYear());
    $cacheability->addCacheTags([WildbillsSiteHooks::YEAR_TAG]);
    $cacheability->applyTo($build);
    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags(): array {
    return Cache::mergeTags(parent::getCacheTags(), [WildbillsSiteHooks::YEAR_TAG]);
  }

  /**
   * {@inheritdoc}
   *
   * The copyright year turns over at the new year.
   */
  public function getCacheMaxAge(): int {
    return Cache::mergeMaxAges(parent::getCacheMaxAge(), $this->secondsToNewYear());
  }

  /**
   * Seconds until the copyright year changes, in the site's time zone.
   */
  private function secondsToNewYear(): int {
    $now = $this->now();
    $next = mktime(0, 0, 0, 1, 1, (int) date('Y', $now) + 1);
    return max(1, $next - $now);
  }

  /**
   * The request time.
   */
  private function now(): int {
    return (int) ($this->requestStack->getCurrentRequest()?->server->get('REQUEST_TIME') ?? time());
  }

}
