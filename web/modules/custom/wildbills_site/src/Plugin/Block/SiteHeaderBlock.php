<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * The site header: demo bar, brand, the main menu and the call button.
 */
#[Block(
  id: 'wildbills_site_header',
  admin_label: new TranslatableMarkup('Site header'),
  category: new TranslatableMarkup("Wild Bill's"),
)]
final class SiteHeaderBlock extends SiteFrameBlockBase {

  /**
   * {@inheritdoc}
   *
   * @return array<string, string>
   *   The brand lines and the header's button.
   */
  public function defaultConfiguration(): array {
    return parent::defaultConfiguration() + [
      'cta_label' => 'Browse cars',
      'cta_url' => '/vehicles',
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
    $form['cta_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Button label'),
      '#default_value' => $this->configuration['cta_label'],
      '#required' => TRUE,
    ];
    $form['cta_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Button link'),
      '#description' => $this->t('A path on this site, e.g. /vehicles.'),
      '#default_value' => $this->configuration['cta_url'],
      '#required' => TRUE,
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
    $links = $this->menuLinks('main', $cacheability);
    $build = [
      '#type' => 'component',
      '#component' => 'wildbills:site_header',
      '#props' => $this->brandProps() + [
        'cta_label' => (string) $this->configuration['cta_label'],
        'cta_url' => (string) $this->configuration['cta_url'],
        'phone' => $this->dealership->phone(),
        'phone_href' => $this->dealership->phoneHref(),
        'demo_notices' => $this->dealership->demoNotices(),
      ],
      '#slots' => [
        'links' => $this->linkSlot($links, 'bar'),
        'mobile_links' => $this->linkSlot($links, 'mobile'),
      ],
    ];
    $cacheability->applyTo($build);
    return $build;
  }

  /**
   * {@inheritdoc}
   *
   * The current page's link is marked, so the header varies by path.
   */
  public function getCacheContexts(): array {
    return Cache::mergeContexts(parent::getCacheContexts(), ['url.path', 'url.path.is_front']);
  }

}
