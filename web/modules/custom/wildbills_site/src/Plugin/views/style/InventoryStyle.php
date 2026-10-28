<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\Plugin\views\style;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\node\NodeInterface;
use Drupal\views\Attribute\ViewsStyle;
use Drupal\views\Plugin\views\style\StylePluginBase;
use Drupal\wildbills_site\Dealership;
use Drupal\wildbills_site\Inventory;
use Drupal\wildbills_site\InventoryFacets;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Renders the inventory page as the `wildbills:inventory` component.
 *
 * The rows are the vehicle cards. Around them: the page heading, the filters
 * (body-style buttons and makes for the cars on the lot, sliders whose ends
 * hold every listed car, see InventoryFacets), the toolbar, the empty state
 * and the details pop-up, whose Call button reads the dealership's phone.
 * The filtering itself happens in the browser, over the cards, as the
 * source's does.
 *
 * @ingroup views_style_plugins
 */
#[ViewsStyle(
  id: 'wildbills_inventory',
  title: new TranslatableMarkup("Wild Bill's inventory"),
  help: new TranslatableMarkup('The vehicle cards with their filters, sorts and details pop-up.'),
  theme: 'views_view_unformatted',
  display_types: ['normal'],
)]
final class InventoryStyle extends StylePluginBase {

  /**
   * {@inheritdoc}
   */
  protected $usesRowPlugin = TRUE;

  /**
   * {@inheritdoc}
   */
  protected $usesGrouping = FALSE;

  /**
   * The listed vehicles.
   */
  protected Inventory $inventory;

  /**
   * The dealership's details.
   */
  protected Dealership $dealership;

  /**
   * {@inheritdoc}
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   The container.
   * @param array<string, mixed> $configuration
   *   The plugin configuration.
   * @param string $plugin_id
   *   The plugin id.
   * @param mixed $plugin_definition
   *   The plugin definition.
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = new self($configuration, $plugin_id, $plugin_definition);
    $instance->inventory = $container->get(Inventory::class);
    $instance->dealership = $container->get(Dealership::class);
    return $instance;
  }

  /**
   * {@inheritdoc}
   *
   * @return array<string, array<string, mixed>>
   *   The options.
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['eyebrow'] = ['default' => 'Sample inventory · not live stock'];
    $options['heading'] = ['default' => 'The lot.'];
    $options['lede'] = ['default' => 'Every car with its price, mileage and color. Narrow it down, open one up, and send a question with the details already filled in.'];
    return $options;
  }

  /**
   * {@inheritdoc}
   *
   * @param array<string, mixed> $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state): void {
    parent::buildOptionsForm($form, $form_state);
    $form['eyebrow'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Eyebrow'),
      '#default_value' => $this->options['eyebrow'],
    ];
    $form['heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Heading'),
      '#default_value' => $this->options['heading'],
      '#required' => TRUE,
    ];
    $form['lede'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Lede'),
      '#default_value' => $this->options['lede'],
      '#rows' => 2,
    ];
  }

  /**
   * {@inheritdoc}
   *
   * @return array<string, mixed>
   *   The inventory component.
   */
  public function render() {
    $cards = [];
    $facts = [];
    foreach ($this->view->result as $row) {
      $cards[] = $this->view->rowPlugin->render($row);
      if ($row->_entity instanceof NodeInterface) {
        $facts[] = $this->inventory->facts($row->_entity);
      }
    }

    $facets = new InventoryFacets($facts);
    $price = $facets->price();
    $year = $facets->year();
    $miles = $facets->miles();
    $build = [
      '#type' => 'component',
      '#component' => 'wildbills:inventory',
      '#props' => [
        'total' => $facets->total(),
        'price_min' => $price['min'],
        'price_max' => $price['max'],
        'price_step' => $price['step'],
        'year_min' => $year['min'],
        'year_max' => $year['max'],
        'miles_min' => $miles['min'],
        'miles_max' => $miles['max'],
        'miles_step' => $miles['step'],
        'phone_href' => $this->dealership->phoneHref(),
      ],
      '#slots' => [
        'heading' => [
          '#type' => 'component',
          '#component' => 'wildbills:page_head',
          '#props' => [
            'eyebrow' => (string) $this->options['eyebrow'],
            'heading' => (string) $this->options['heading'],
            'lede' => (string) $this->options['lede'],
          ],
        ],
        'types' => array_map(static fn (array $type): array => [
          '#type' => 'component',
          '#component' => 'wildbills:filter_choice',
          '#props' => ['kind' => 'button', 'value' => $type['name'], 'label' => $type['plural']],
        ], $facets->types()),
        'makes' => array_map(static fn (string $make): array => [
          '#type' => 'component',
          '#component' => 'wildbills:filter_choice',
          '#props' => ['kind' => 'option', 'value' => $make, 'label' => $make],
        ], $facets->makes()),
        'cards' => $cards,
      ],
    ];
    CacheableMetadata::createFromRenderArray($build)
      ->merge($this->inventory->cacheability())
      ->merge($this->dealership->cacheability())
      ->applyTo($build);
    return $build;
  }

}
