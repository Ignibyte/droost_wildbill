<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Path\PathMatcherInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Drupal\wildbills_site\Dealership;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * What the site header and footer share: the brand and a menu's links.
 */
abstract class SiteFrameBlockBase extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Constructs the block.
   *
   * @param array<string, mixed> $configuration
   *   The block configuration.
   * @param string $plugin_id
   *   The plugin id.
   * @param mixed $plugin_definition
   *   The plugin definition.
   * @param \Drupal\wildbills_site\Dealership $dealership
   *   The dealership details.
   * @param \Drupal\Core\Menu\MenuLinkTreeInterface $menuTree
   *   The menu link tree.
   * @param \Drupal\Core\Path\PathMatcherInterface $pathMatcher
   *   The path matcher.
   * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
   *   The request stack.
   */
  final public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    protected readonly Dealership $dealership,
    protected readonly MenuLinkTreeInterface $menuTree,
    protected readonly PathMatcherInterface $pathMatcher,
    protected readonly RequestStack $requestStack,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   The service container.
   * @param array<string, mixed> $configuration
   *   The block configuration.
   * @param string $plugin_id
   *   The plugin id.
   * @param mixed $plugin_definition
   *   The plugin definition.
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(Dealership::class),
      $container->get('menu.link_tree'),
      $container->get('path.matcher'),
      $container->get('request_stack'),
    );
  }

  /**
   * {@inheritdoc}
   *
   * @return array<string, string>
   *   The brand lock-up's three lines.
   */
  public function defaultConfiguration(): array {
    return [
      'brand_mark' => 'WB',
      'brand_name' => "Wild Bill's",
      'brand_tagline' => 'Used Cars',
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
    $form['brand_mark'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Brand mark'),
      '#description' => $this->t('The letters in the square badge.'),
      '#default_value' => $this->configuration['brand_mark'],
      '#maxlength' => 4,
      '#required' => TRUE,
    ];
    $form['brand_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Brand name'),
      '#default_value' => $this->configuration['brand_name'],
      '#required' => TRUE,
    ];
    $form['brand_tagline'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Brand tagline'),
      '#default_value' => $this->configuration['brand_tagline'],
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   *
   * @param array<string, mixed> $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function blockSubmit($form, FormStateInterface $form_state): void {
    foreach (array_keys($this->defaultConfiguration()) as $key) {
      $this->configuration[$key] = trim((string) $form_state->getValue($key));
    }
  }

  /**
   * The brand lock-up's props, as the header and footer components take them.
   *
   * @return array<string, string>
   *   The brand_* and home_url props.
   */
  protected function brandProps(): array {
    return [
      'brand_mark' => (string) $this->configuration['brand_mark'],
      'brand_name' => (string) $this->configuration['brand_name'],
      'brand_tagline' => (string) $this->configuration['brand_tagline'],
      'brand_label' => (string) $this->t('@name, home', ['@name' => $this->dealership->name()]),
      'home_url' => $this->homeUrl(),
    ];
  }

  /**
   * A slot of Navigation link components, one per menu link.
   *
   * @param list<array{title: string, url: string, current: bool}> $links
   *   The links, from menuLinks().
   * @param string $placement
   *   Where they sit: bar, mobile or footer.
   *
   * @return array<int, array<string, mixed>>
   *   The slot's render array.
   */
  protected function linkSlot(array $links, string $placement): array {
    return array_map(fn (array $link): array => [
      '#type' => 'component',
      '#component' => 'wildbills:nav_link',
      '#props' => $link + ['placement' => $placement],
    ], $links);
  }

  /**
   * The front page's address.
   */
  protected function homeUrl(): string {
    return Url::fromRoute('<front>')->toString();
  }

  /**
   * The top-level enabled links of a menu, in menu order.
   *
   * @param string $menu_name
   *   The menu.
   * @param \Drupal\Core\Cache\CacheableMetadata $cacheability
   *   Collects the cacheability of the links and their URLs.
   *
   * @return list<array{title: string, url: string, current: bool}>
   *   Each link's title, address and whether it is the page being viewed.
   */
  protected function menuLinks(string $menu_name, CacheableMetadata $cacheability): array {
    $parameters = (new MenuTreeParameters())->setMaxDepth(1)->onlyEnabledLinks();
    $tree = $this->menuTree->load($menu_name, $parameters);
    $tree = $this->menuTree->transform($tree, [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ]);
    $cacheability->addCacheTags(['config:system.menu.' . $menu_name]);
    $cacheability->addCacheContexts(['url.path', 'url.path.is_front']);

    $current_path = $this->requestStack->getCurrentRequest()?->getPathInfo() ?? '';
    $is_front = $this->pathMatcher->isFrontPage();
    $links = [];
    foreach ($tree as $element) {
      if ($element->access !== NULL) {
        $cacheability->addCacheableDependency($element->access);
        if (!$element->access->isAllowed()) {
          continue;
        }
      }
      $url = $element->link->getUrlObject();
      $generated = $url->toString(TRUE);
      $cacheability->addCacheableDependency($generated);
      $href = $generated->getGeneratedUrl();
      $current = $url->isRouted() && $url->getRouteName() === '<front>'
        ? $is_front
        : $href === $current_path;
      $links[] = [
        'title' => (string) $element->link->getTitle(),
        'url' => $href,
        'current' => $current,
      ];
    }
    return $links;
  }

}
