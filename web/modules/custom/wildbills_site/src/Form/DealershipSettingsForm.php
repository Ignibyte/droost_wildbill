<?php

declare(strict_types=1);

namespace Drupal\wildbills_site\Form;

use Drupal\Core\Datetime\TimeZoneFormHelper;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\wildbills_site\Dealership;
use Drupal\wildbills_site\HoursSummary;

/**
 * The dealership details: contact lines, weekly hours, time zone, notices.
 */
final class DealershipSettingsForm extends ConfigFormBase {

  /**
   * The days, in the order the form lists them.
   */
  private const DAYS = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'wildbills_site_dealership_settings';
  }

  /**
   * {@inheritdoc}
   *
   * @return list<string>
   *   The dealership details.
   */
  protected function getEditableConfigNames(): array {
    return [Dealership::CONFIG];
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
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config(Dealership::CONFIG);

    $form['contact'] = [
      '#type' => 'details',
      '#title' => $this->t('Contact'),
      '#open' => TRUE,
    ];
    $form['contact']['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Dealership name'),
      '#default_value' => $config->get('name'),
      '#required' => TRUE,
    ];
    $form['contact']['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone'),
      '#description' => $this->t('As visitors should see it, e.g. (555) 123-4567. The call link is made from its digits.'),
      '#default_value' => $config->get('phone'),
      '#required' => TRUE,
    ];
    $form['contact']['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Email'),
      '#default_value' => $config->get('email'),
      '#required' => TRUE,
    ];
    $form['contact']['street'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Street address'),
      '#default_value' => $config->get('street'),
      '#required' => TRUE,
    ];
    $form['contact']['city'] = [
      '#type' => 'textfield',
      '#title' => $this->t('City, state and ZIP'),
      '#default_value' => $config->get('city'),
      '#required' => TRUE,
    ];

    $form['hours'] = [
      '#type' => 'details',
      '#title' => $this->t('Weekly hours'),
      '#open' => TRUE,
      '#tree' => TRUE,
    ];
    $labels = [
      'monday' => $this->t('Monday'),
      'tuesday' => $this->t('Tuesday'),
      'wednesday' => $this->t('Wednesday'),
      'thursday' => $this->t('Thursday'),
      'friday' => $this->t('Friday'),
      'saturday' => $this->t('Saturday'),
      'sunday' => $this->t('Sunday'),
    ];
    foreach (self::DAYS as $day) {
      $open = (string) $config->get("hours.$day.open");
      $close = (string) $config->get("hours.$day.close");
      $form['hours'][$day] = [
        '#type' => 'fieldset',
        '#title' => $labels[$day],
        '#attributes' => ['class' => ['container-inline']],
      ];
      $form['hours'][$day]['closed'] = [
        '#type' => 'checkbox',
        '#title' => $this->t('Closed'),
        '#default_value' => $open === '' || $close === '',
      ];
      $state = ['visible' => [":input[name=\"hours[$day][closed]\"]" => ['checked' => FALSE]]];
      $form['hours'][$day]['open'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Opens'),
        '#default_value' => $open,
        '#size' => 6,
        '#attributes' => ['type' => 'time'],
        '#states' => $state,
      ];
      $form['hours'][$day]['close'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Closes'),
        '#default_value' => $close,
        '#size' => 6,
        '#attributes' => ['type' => 'time'],
        '#states' => $state,
      ];
    }

    $form['timezone'] = [
      '#type' => 'select',
      '#title' => $this->t('Time zone'),
      '#description' => $this->t('The clock the opening hours are kept in.'),
      '#options' => TimeZoneFormHelper::getOptionsListByRegion(),
      '#default_value' => $config->get('timezone') ?: 'America/Chicago',
      '#required' => TRUE,
    ];

    $form['demo_notices'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show the demo notices'),
      '#description' => $this->t('The demo bar, the "sample" labels and the footer\'s demonstration lines. Turn this off once the vehicles and these details are real.'),
      '#default_value' => (bool) $config->get('demo_notices'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * @param array<mixed> $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    parent::validateForm($form, $form_state);
    foreach (self::DAYS as $day) {
      $values = (array) $form_state->getValue(['hours', $day]);
      if (!empty($values['closed'])) {
        continue;
      }
      $open = trim((string) ($values['open'] ?? ''));
      $close = trim((string) ($values['close'] ?? ''));
      foreach (['open' => $open, 'close' => $close] as $key => $time) {
        if (!HoursSummary::isTime($time)) {
          $form_state->setErrorByName("hours][$day][$key", $this->t('Enter a time as HH:MM, or mark the day closed.'));
        }
      }
      if (HoursSummary::isTime($open) && HoursSummary::isTime($close) && $close <= $open) {
        $form_state->setErrorByName("hours][$day][close", $this->t('A day must close after it opens.'));
      }
    }
  }

  /**
   * {@inheritdoc}
   *
   * @param array<mixed> $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $hours = [];
    // Stored Sunday first, as the config ships.
    foreach (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as $day) {
      $values = (array) $form_state->getValue(['hours', $day]);
      $closed = !empty($values['closed']);
      $hours[$day] = [
        'open' => $closed ? '' : trim((string) $values['open']),
        'close' => $closed ? '' : trim((string) $values['close']),
      ];
    }

    $this->config(Dealership::CONFIG)
      ->set('name', trim((string) $form_state->getValue('name')))
      ->set('phone', trim((string) $form_state->getValue('phone')))
      ->set('email', trim((string) $form_state->getValue('email')))
      ->set('street', trim((string) $form_state->getValue('street')))
      ->set('city', trim((string) $form_state->getValue('city')))
      ->set('timezone', (string) $form_state->getValue('timezone'))
      ->set('demo_notices', (bool) $form_state->getValue('demo_notices'))
      ->set('hours', $hours)
      ->save();

    parent::submitForm($form, $form_state);
  }

}
