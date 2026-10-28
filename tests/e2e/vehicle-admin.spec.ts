import { test, expect, Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';

/**
 * R02: what staff do with the inventory, and what visitors then see. An
 * editor adds a vehicle through the form; sale status, a new body style and
 * its order are set as staff would set them. Runs as a throwaway content
 * editor, and puts the sample inventory back afterwards whatever happens.
 */

const EDITOR = 'e2e-vehicle-editor';
const SITE = 'https://wildbills-a.ddev.site';

function drush(...args: string[]): string {
  return execFileSync('ddev', ['drush', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

/** Runs PHP on the site; the code is passed base64-encoded, so quoting is safe. */
function php(code: string): string {
  const encoded = Buffer.from(code).toString('base64');
  return drush('php:eval', `eval(base64_decode('${encoded}'));`);
}

/** Sets a sample vehicle's sale status, by stock number. */
function setStatus(stock: number, status: 'available' | 'pending' | 'sold') {
  php(`
    $ids = \\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('type', 'vehicle')->condition('field_stock_number', ${stock})->execute();
    $node = \\Drupal\\node\\Entity\\Node::load(reset($ids));
    $node->set('field_sale_status', '${status}')->save();
  `);
}

/**
 * Removes everything the suite adds: test vehicles (stock 90+) and the Van
 * body style. The Trash module keeps deleted content, and a trashed car's
 * stock number is still taken, so they are purged outside its context.
 */
function cleanUp() {
  php(`
    \\Drupal::service('trash.manager')->executeInTrashContext('ignore', function () {
      $storage = \\Drupal::entityTypeManager()->getStorage('node');
      $ids = \\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('type', 'vehicle')->condition('field_stock_number', 90, '>=')->execute();
      $storage->delete($storage->loadMultiple($ids));
      $terms = \\Drupal::entityTypeManager()->getStorage('taxonomy_term');
      $terms->delete($terms->loadByProperties(['vid' => 'body_style', 'name' => 'Van']));
    });
  `);
  for (const stock of [1, 2, 10, 11]) {
    setStatus(stock, 'available');
  }
}

const stocks = (page: Page) => page.locator('[data-wb-vehicle]:visible').evaluateAll(
  (els) => els.map((el) => Number((el as HTMLElement).dataset.stock)),
);

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { width: 1280, height: 900 }, screenshot: 'only-on-failure' });

test.beforeAll(() => {
  cleanUp();
  try {
    drush('user:cancel', '--yes', '--delete-content', EDITOR);
  }
  catch {
    // No leftover editor from an earlier run.
  }
  drush('user:create', EDITOR, `--mail=${EDITOR}@example.com`);
  drush('user:role:add', 'content_editor', EDITOR);
});

test.afterAll(() => {
  cleanUp();
  drush('user:cancel', '--yes', '--delete-content', EDITOR);
});

async function logIn(page: Page, destination: string) {
  const link = drush('user:login', `--name=${EDITOR}`, '--no-browser', `--uri=${SITE}`, destination);
  await page.goto(link);
  await expect(page).toHaveURL(new RegExp(`${destination}(\\?check_logged_in=1)?$`));
}

/**
 * Saves the node form. Gin's sticky toolbar covers the form's own button, so
 * it is clicked from the page, and the save waits for the page that follows.
 */
async function save(page: Page) {
  await page.waitForLoadState('networkidle');
  await Promise.all([
    page.waitForEvent('framenavigated'),
    page.locator('#edit-submit').evaluate((button: HTMLInputElement) => button.click()),
  ]);
  await page.waitForLoadState('load');
}

/** Fills the vehicle form as an editor would, choosing the photo from the media library. */
async function fillVehicle(page: Page, stock: number) {
  await expect(page.getByLabel('Title', { exact: true })).toHaveCount(0);
  await page.getByLabel('Stock number').fill(String(stock));
  await page.getByLabel('Make').selectOption({ label: 'Ford' });
  await page.getByLabel('Model').fill('Ranger');
  await page.getByLabel('Year').fill('2023');
  await page.getByLabel('Price').fill('61250');
  await page.getByLabel('Body style').selectOption({ label: 'Truck' });
  await page.getByLabel('Mileage').fill('5000');
  await page.getByLabel('Color').fill('Velocity Blue');
  await page.getByLabel('Condition').selectOption({ label: 'Excellent' });
  await page.getByRole('button', { name: 'Add media' }).click();
  const library = page.getByRole('dialog');
  await library.getByRole('checkbox', { name: 'Select 2021 Ford F-150, Magnetic Gray' }).check();
  await library.getByRole('button', { name: 'Insert selected' }).click();
  await expect(library).toBeHidden();
  await expect(page.locator('.js-media-library-item')).toHaveCount(1);
}

test('AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page', async ({ page, browser }) => {
  await logIn(page, '/node/add/vehicle');
  await fillVehicle(page, 90);
  await page.getByLabel('Featured', { exact: true }).check();
  // Vehicles are on the site's editorial workflow: a new one starts as a draft.
  await page.getByLabel(/^(Save as|Change to)$/).selectOption('published');
  await save(page);
  // A vehicle has no page: saving lands on its pop-up.
  await expect(page).toHaveURL(/\/vehicles\?vehicle=90$/);
  expect(php("$ids = \\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('field_stock_number', 90)->execute(); print \\Drupal\\node\\Entity\\Node::load(reset($ids))->label();")).toBe('2023 Ford Ranger');

  const visitor = await browser.newPage();
  await visitor.goto('/');
  await expect(visitor.locator('main section').nth(2).locator('[data-wb-vehicle] h3')).toContainText(['Ford Ranger']);
  await expect(visitor.locator('.wb-hero-tag b')).toHaveText('16 sample vehicles');

  // AC-9: outside the source's ranges, so the ends widen and it is listed by default.
  await visitor.goto('/vehicles');
  await expect(visitor.locator('[data-wb-count]')).toHaveText('16 vehicles of 16');
  expect(await stocks(visitor)).toContain(90);
  await expect(visitor.locator('#wb-max-price')).toHaveAttribute('max', '61500');
  await expect(visitor.locator('#wb-min-year')).toHaveAttribute('max', '2023');
  await expect(visitor.locator('#wb-max-miles')).toHaveAttribute('min', '5000');
  await expect(visitor.locator('.wb-range-ends').nth(0)).toHaveText('$25k$61.5k');
  await visitor.close();
});

test('AC-20: a second vehicle with the same stock number is refused', async ({ page }) => {
  await logIn(page, '/node/add/vehicle');
  await fillVehicle(page, 90);
  await save(page);
  await expect(page.getByText(/already exists/)).toBeVisible();
  expect(php("print count(\\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('field_stock_number', 90)->execute());")).toBe('1');
});

test('AC-19: unpublishing a vehicle takes it off every page', async ({ page, browser }) => {
  const nid = php("$ids = \\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('field_stock_number', 90)->execute(); print reset($ids);");
  await logIn(page, `/node/${nid}/edit`);
  await page.getByLabel(/^(Save as|Change to)$/).selectOption('unpublished');
  await save(page);

  const visitor = await browser.newPage();
  await visitor.goto('/vehicles');
  await expect(visitor.locator('[data-wb-count]')).toHaveText('15 vehicles of 15');
  expect(await stocks(visitor)).not.toContain(90);
  await visitor.goto('/');
  await expect(visitor.locator('main section').nth(2).locator('[data-wb-vehicle]')).toHaveCount(4);
  await expect(visitor.locator('.wb-hero-tag b')).toHaveText('15 sample vehicles');
  const response = await visitor.request.get(`/node/${nid}`, { maxRedirects: 0 });
  // Refused, not redirected: this site answers 404 for unpublished content.
  expect([403, 404]).toContain(response.status());
  await visitor.close();
});

test('AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied', async ({ page }) => {
  // The only Dodge, and with the Mustang, both cars; the F-150 is featured.
  for (const stock of [1, 10, 11]) {
    setStatus(stock, 'sold');
  }
  await page.goto('/vehicles');
  await expect(page.locator('[data-wb-count]')).toHaveText('12 vehicles of 12');
  expect(await stocks(page)).not.toContain(1);
  await expect(page.locator('#wb-make option')).toHaveText(['All makes', 'Chevrolet', 'Ford', 'GMC', 'Jeep', 'RAM', 'Toyota']);
  await expect(page.getByRole('group', { name: 'Body style' }).getByRole('button')).toHaveText(['All', 'Trucks', 'SUVs']);

  await page.goto('/vehicles?vehicle=10');
  await expect(page.locator('[data-wb-vehicle]').first()).toBeVisible();
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.goto('/');
  await expect(page.locator('main section').nth(2).locator('[data-wb-vehicle] h3')).toHaveText(['Chevrolet Tahoe', 'RAM 1500', 'Jeep Wrangler']);
  await expect(page.locator('a.wb-cat h3')).toHaveText(['Trucks', 'SUVs']);
  await expect(page.locator('.wb-hero-tag b')).toHaveText('12 sample vehicles');

  for (const stock of [1, 10, 11]) {
    setStatus(stock, 'available');
  }
});

test('AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about', async ({ page }) => {
  setStatus(2, 'pending');
  await page.goto('/vehicles');
  await expect(page.locator('[data-wb-count]')).toHaveText('15 vehicles of 15');
  const tahoe = page.locator('[data-wb-vehicle][data-stock="2"]');
  await expect(tahoe.locator('.wb-chip')).toHaveText(['Sale pending']);
  await tahoe.getByRole('link', { name: 'Details' }).click();
  const dialog = page.getByRole('dialog', { name: '2020 Chevrolet Tahoe' });
  await expect(dialog.locator('[data-wb-d="pending"]')).toBeVisible();
  await expect(dialog.locator('[data-wb-d="pending"]')).toHaveText('Sale pending');
  await expect(dialog.getByRole('link', { name: 'Ask about this car' })).toHaveAttribute('href', '/contact?vehicle=2');
  // Another car's pop-up does not carry the chip.
  await page.keyboard.press('Escape');
  await page.locator('[data-wb-vehicle][data-stock="1"]').getByRole('link', { name: 'Details' }).click();
  await expect(page.getByRole('dialog', { name: '2021 Ford F-150' }).locator('[data-wb-d="pending"]')).toBeHidden();

  await page.goto('/');
  await expect(page.locator('main section').nth(2).locator('[data-wb-vehicle][data-stock="2"] .wb-chip')).toHaveText(['Sale pending']);
  await expect(page.locator('.wb-hero-tag b')).toHaveText('15 sample vehicles');
  setStatus(2, 'available');
});

/** Sets a body style's place on the vocabulary's overview page, as staff do. */
async function setOrder(page: Page, weights: Record<string, number>) {
  await page.goto('/admin/structure/taxonomy/manage/body_style/overview');
  const show = page.getByRole('button', { name: 'Show row weights' });
  if (await show.isVisible()) {
    await show.click();
  }
  for (const [name, weight] of Object.entries(weights)) {
    // Core labels every weight "Weight for added term"; each row is the term's.
    const row = page.getByRole('row').filter({ has: page.getByRole('link', { name, exact: true }) });
    await row.locator('select.term-weight').selectOption(String(weight));
  }
  await save(page);
  await expect(page.getByText('The configuration options have been saved.')).toBeVisible();
}

test('AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot', async ({ page, browser }) => {
  // An editor adds Van with its plural, tile line and photo.
  await logIn(page, '/admin/structure/taxonomy/manage/body_style/add');
  await page.getByLabel('Name', { exact: true }).fill('Van');
  await page.getByLabel('Plural name').fill('Vans');
  await page.getByLabel('Tile line').fill('Room for the crew');
  await page.getByRole('button', { name: 'Add media' }).click();
  const library = page.getByRole('dialog');
  await library.getByRole('checkbox', { name: 'Select 2020 Ford Explorer, Star White' }).check();
  await library.getByRole('button', { name: 'Insert selected' }).click();
  await expect(library).toBeHidden();
  await save(page);
  await expect(page.getByText(/Created new term/)).toBeVisible();
  // And puts it after Cars.
  await setOrder(page, { Truck: 0, SUV: 1, Car: 2, Van: 3 });

  // No van on the lot yet: no button, no tile.
  const before = await browser.newPage();
  await before.goto('/vehicles');
  await expect(before.getByRole('group', { name: 'Body style' }).getByRole('button')).toHaveText(['All', 'Trucks', 'SUVs', 'Cars']);
  await before.close();

  // A van arrives (adding a car through the form is AC-19's).
  php(`
    $term = fn ($vid, $name) => current(\\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties(['vid' => $vid, 'name' => $name]))->id();
    $photo = \\Drupal::entityTypeManager()->getStorage('media')->loadByProperties(['name' => '2020 Ford Explorer, Star White']);
    \\Drupal\\node\\Entity\\Node::create([
      'type' => 'vehicle', 'moderation_state' => 'published', 'field_stock_number' => 91,
      'field_make' => $term('make', 'Ford'), 'field_model' => 'Transit', 'field_year' => 2021,
      'field_price' => 35000, 'field_body_style' => $term('body_style', 'Van'), 'field_mileage' => 30000,
      'field_color' => 'Oxford White', 'field_condition' => 'good', 'field_sale_status' => 'available',
      'field_photo' => reset($photo)->id(),
    ])->save();
  `);
  const visitor = await browser.newPage();
  await visitor.goto('/vehicles?type=Van');
  await expect(visitor.getByRole('group', { name: 'Body style' }).getByRole('button')).toHaveText(['All', 'Trucks', 'SUVs', 'Cars', 'Vans']);
  await expect(visitor.getByRole('button', { name: 'Vans', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await stocks(visitor)).toEqual([91]);
  await expect(visitor.locator('[data-wb-vehicle][data-stock="91"] .wb-car-year')).toHaveText('2021 · VAN');

  await visitor.goto('/');
  const tiles = visitor.locator('a.wb-cat');
  await expect(tiles.locator('h3')).toHaveText(['Trucks', 'SUVs', 'Cars', 'Vans']);
  await expect(tiles.nth(3)).toHaveAttribute('href', '/vehicles?type=Van');
  await expect(tiles.nth(3).locator('.wb-cat-label span').first()).toHaveText('Room for the crew');
  const tops = await tiles.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
  expect(tops[0]).toBe(tops[2]);
  expect(tops[3]).toBeGreaterThan(tops[0]);
  await visitor.close();

  // Staff move vans first. A new visitor: a browser keeps what it fetched
  // (the site sends a public max-age).
  await setOrder(page, { Van: 0, Truck: 1, SUV: 2, Car: 3 });
  const later = await browser.newPage();
  await later.goto('/vehicles');
  await expect(later.getByRole('group', { name: 'Body style' }).getByRole('button')).toHaveText(['All', 'Vans', 'Trucks', 'SUVs', 'Cars']);
  await later.goto('/');
  await expect(later.locator('a.wb-cat h3')).toHaveText(['Vans', 'Trucks', 'SUVs', 'Cars']);
  await later.close();
  await setOrder(page, { Truck: 0, SUV: 1, Car: 2, Van: 3 });
});
