import { test, expect, Page, Locator } from '@playwright/test';
import { execFileSync } from 'node:child_process';

/**
 * R02: the inventory at /vehicles, its filters, sorts, chips, empty state and
 * details pop-up, and the redirects into it. The source is
 * design/src/Wild-Bills-Cars/artifacts/wildbills/vehicles.html with
 * src/site/vehicles.ts. Reads the 15 sample vehicles as shipped.
 */

function drush(...args: string[]): string {
  return execFileSync('ddev', ['drush', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

test.use({ viewport: { width: 1280, height: 900 } });

/** The source's default order: featured first, then by stock number. */
const DEFAULT_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const cards = (page: Page): Locator => page.locator('[data-wb-vehicle]:visible');

async function stocks(page: Page): Promise<number[]> {
  return (await cards(page).evaluateAll((els) => els.map((el) => Number((el as HTMLElement).dataset.stock))));
}

async function slide(range: Locator, value: number) {
  await range.evaluate((el: HTMLInputElement, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
}

test('AC-1: the heading, then all 15 vehicles featured first, "15 vehicles of 15"', async ({ page }) => {
  await page.goto('/vehicles');
  const main = page.locator('main#main');
  await expect(main.locator('.wb-page-head .wb-eyebrow')).toHaveText('Sample inventory · not live stock');
  await expect(main.locator('h1')).toHaveText('The lot.');
  await expect(main.locator('.wb-page-head .wb-lede')).toHaveText(
    'Every car with its price, mileage and color. Narrow it down, open one up, and send a question with the details already filled in.',
  );
  await expect(cards(page)).toHaveCount(15);
  expect(await stocks(page)).toEqual(DEFAULT_ORDER);
  await expect(page.locator('[data-wb-count]')).toHaveText('15 vehicles of 15');
});

test('AC-24: /vehicles is titled "Inventory — Wild Bill\'s Used Cars"', async ({ page }) => {
  await page.goto('/vehicles');
  await expect(page).toHaveTitle("Inventory — Wild Bill's Used Cars");
});

test('AC-2: a card shows its photo, one chip, year and type, name, miles, colour, price and Details', async ({ page }) => {
  await page.goto('/vehicles');
  const f150 = page.locator('[data-wb-vehicle][data-stock="1"]');
  const photo = f150.locator('img');
  await expect(photo).toHaveAttribute('alt', '2021 Ford F-150, Magnetic Gray');
  await photo.scrollIntoViewIfNeeded();
  await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(f150.locator('.wb-chip')).toHaveText(['Featured']);
  await expect(f150.locator('.wb-car-year')).toHaveText('2021 · TRUCK');
  await expect(f150.locator('h3')).toHaveText('Ford F-150');
  await expect(f150.locator('.wb-specs li')).toHaveText(['42,000 mi', 'Magnetic Gray']);
  await expect(f150.locator('.wb-price')).toHaveText('$38,900Sample price');
  await expect(f150.getByRole('link', { name: 'View details for 2021 Ford F-150' })).toHaveText('Details');
  // A card that is not featured shows its body style.
  await expect(page.locator('[data-wb-vehicle][data-stock="10"] .wb-chip')).toHaveText(['Car']);
});

test('AC-21: the make filter lists each make once, after All makes', async ({ page }) => {
  await page.goto('/vehicles');
  await expect(page.locator('#wb-make option')).toHaveText(['All makes', 'Chevrolet', 'Dodge', 'Ford', 'GMC', 'Jeep', 'RAM', 'Toyota']);
});

test('AC-3: search, body style, make and the three sliders narrow the list together', async ({ page }) => {
  await page.goto('/vehicles');
  await expect(page.getByRole('group', { name: 'Body style' }).getByRole('button')).toHaveText(['All', 'Trucks', 'SUVs', 'Cars']);
  await expect(page.locator('[data-wb-out="price"]')).toHaveText('$60,000');
  await expect(page.locator('[data-wb-out="year"]')).toHaveText('2019+');
  await expect(page.locator('[data-wb-out="miles"]')).toHaveText('80,000 mi');

  // Search reads year, make, model, colour and body style.
  const search = page.getByLabel('Search');
  await search.fill('red');
  expect(await stocks(page)).toEqual([4, 5, 11]);
  await search.fill('suv');
  expect(await stocks(page)).toEqual([2, 4, 7, 9, 12, 13]);
  await search.fill('2022');
  expect(await stocks(page)).toEqual([3, 13]);
  await search.fill('');

  await page.getByRole('button', { name: 'Trucks', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Trucks', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await stocks(page)).toEqual([1, 3, 5, 6, 8, 14, 15]);
  await page.getByLabel('Make').selectOption('Chevrolet');
  expect(await stocks(page)).toEqual([8, 14]);
  await expect(page.locator('[data-wb-count]')).toHaveText('2 vehicles of 15');

  await page.getByLabel('Make').selectOption('');
  await slide(page.locator('#wb-max-price'), 40000);
  await expect(page.locator('[data-wb-out="price"]')).toHaveText('$40,000');
  expect(await stocks(page)).toEqual([1, 5, 8, 14]);
  await slide(page.locator('#wb-min-year'), 2021);
  await expect(page.locator('[data-wb-out="year"]')).toHaveText('2021+');
  expect(await stocks(page)).toEqual([1, 14]);
  await slide(page.locator('#wb-max-miles'), 40000);
  await expect(page.locator('[data-wb-out="miles"]')).toHaveText('40,000 mi');
  expect(await stocks(page)).toEqual([14]);
  await expect(page.locator('[data-wb-count]')).toHaveText('1 vehicle of 15');
  await expect(page.locator('[data-wb-chips] button')).toHaveText(['Trucks', 'Under $40,000', '2021 or newer', 'Under 40,000 mi', 'Clear all']);
});

test('AC-4: a chip clears its filter; Clear all and Reset clear them all', async ({ page }) => {
  await page.goto('/vehicles');
  const chips = page.locator('[data-wb-chips] button');
  await page.getByLabel('Search').fill('ford');
  await expect(chips).toHaveText(['“ford”']);
  await page.getByRole('button', { name: 'Remove filter “ford”' }).click();
  await expect(page.getByLabel('Search')).toHaveValue('');
  await expect(chips).toHaveCount(0);
  await expect(cards(page)).toHaveCount(15);

  await page.getByRole('button', { name: 'SUVs', exact: true }).click();
  await page.getByLabel('Make').selectOption('Jeep');
  await expect(chips).toHaveText(['SUVs', 'Jeep', 'Clear all']);
  await page.getByRole('button', { name: 'Remove filter Jeep' }).click();
  await expect(chips).toHaveText(['SUVs']);
  await page.getByLabel('Make').selectOption('Jeep');
  await page.getByRole('button', { name: 'Clear all' }).click();
  await expect(chips).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(cards(page)).toHaveCount(15);

  await page.getByLabel('Search').fill('ram');
  await page.getByLabel('Sort by').selectOption('price-desc');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByLabel('Search')).toHaveValue('');
  await expect(page.getByLabel('Sort by')).toHaveValue('featured');
  expect(await stocks(page)).toEqual(DEFAULT_ORDER);
});

test('AC-5: the five sorts order the list as the source\'s do', async ({ page }) => {
  await page.goto('/vehicles');
  const sort = page.getByLabel('Sort by');
  await sort.selectOption('price-asc');
  expect(await stocks(page)).toEqual([8, 14, 7, 11, 10, 12, 1, 5, 6, 2, 9, 4, 3, 15, 13]);
  await sort.selectOption('price-desc');
  expect(await stocks(page)).toEqual([13, 15, 3, 4, 9, 2, 6, 5, 1, 12, 10, 11, 7, 14, 8]);
  await sort.selectOption('year-desc');
  expect(await stocks(page)).toEqual([13, 3, 11, 9, 4, 6, 14, 1, 10, 12, 15, 5, 2, 7, 8]);
  await sort.selectOption('miles-asc');
  expect(await stocks(page)).toEqual([13, 11, 3, 10, 9, 4, 6, 14, 1, 12, 15, 5, 2, 7, 8]);
  await sort.selectOption('featured');
  expect(await stocks(page)).toEqual(DEFAULT_ORDER);
});

test('AC-6: no match shows the empty state, whose reset restores all 15', async ({ page }) => {
  await page.goto('/vehicles');
  await page.getByLabel('Search').fill('lamborghini');
  const empty = page.locator('[data-wb-empty]');
  await expect(empty).toBeVisible();
  await expect(empty.locator('h2')).toHaveText('Nothing matches that combination.');
  await expect(empty.getByRole('link', { name: 'Ask us to look' })).toHaveAttribute('href', '/contact?topic=Vehicle%20search');
  await expect(page.locator('[data-wb-count]')).toHaveText('0 vehicles of 15');
  await empty.getByRole('button', { name: 'Reset all filters' }).click();
  await expect(empty).toBeHidden();
  await expect(cards(page)).toHaveCount(15);
});

test.describe('at 390 wide', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('AC-7: the filters hide behind a Filters button that reads Hide filters when open', async ({ page }) => {
    await page.goto('/vehicles');
    const filters = page.locator('[data-wb-filters]');
    const toggle = page.getByRole('button', { name: 'Filters', exact: true });
    await expect(filters).toBeHidden();
    await toggle.click();
    await expect(filters).toBeVisible();
    await expect(page.locator('[data-wb-filter-toggle]')).toHaveText('Hide filters');
    await expect(page.locator('[data-wb-filter-toggle]')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('[data-wb-filter-toggle]').click();
    await expect(filters).toBeHidden();
    await expect(page.locator('[data-wb-filter-toggle]')).toHaveText('Filters');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});

test('AC-8: ?type=Truck opens with Trucks chosen; an unknown type opens with All', async ({ page }) => {
  await page.goto('/vehicles?type=Truck');
  await expect(page.getByRole('button', { name: 'Trucks', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await stocks(page)).toEqual([1, 3, 5, 6, 8, 14, 15]);
  await page.goto('/vehicles?type=Boat');
  await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(cards(page)).toHaveCount(15);
});

test('AC-9: with the 15 samples the sliders run $25k–$60k, 2019–2022 and 10k–80k', async ({ page }) => {
  await page.goto('/vehicles');
  const ends = page.locator('.wb-range-ends');
  await expect(ends.nth(0)).toHaveText('$25k$60k');
  await expect(ends.nth(1)).toHaveText('20192022');
  await expect(ends.nth(2)).toHaveText('10k80k');
  await expect(page.locator('#wb-max-price')).toHaveAttribute('min', '25000');
  await expect(page.locator('#wb-max-price')).toHaveAttribute('max', '60000');
  await expect(page.locator('#wb-min-year')).toHaveAttribute('min', '2019');
  await expect(page.locator('#wb-max-miles')).toHaveAttribute('max', '80000');
});

test('AC-10 and AC-11: Details opens the pop-up; Escape, close and outside click close it', async ({ page }) => {
  await page.goto('/vehicles');
  const details = page.getByRole('link', { name: 'View details for 2021 Ford F-150' });
  await details.click();
  const dialog = page.getByRole('dialog', { name: '2021 Ford F-150' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-wb-d="kicker"]')).toHaveText('TRUCK · STOCK #001');
  await expect(dialog.locator('.wb-price--detail')).toHaveText('$38,900Sample listed price');
  await expect(dialog.locator('dt')).toHaveText(['Mileage', 'Year', 'Body style', 'Color', 'Make', 'Condition']);
  await expect(dialog.locator('dd')).toHaveText(['42,000 mi', '2021', 'Truck', 'Magnetic Gray', 'Ford', 'Excellent']);
  await expect(dialog.locator('.wb-note')).toHaveText(
    'Sample listing for demonstration. Photo is illustrative. Confirm availability, history and final price with the dealership.',
  );
  await expect(dialog.locator('img')).toHaveAttribute('alt', '2021 Ford F-150, Magnetic Gray');
  await expect(dialog.getByRole('link', { name: 'Ask about this car' })).toHaveAttribute('href', '/contact?vehicle=1');
  await expect(dialog.getByRole('link', { name: 'Call (sample)' })).toHaveAttribute('href', 'tel:+15551234567');
  await expect(dialog.locator('[data-wb-d="pending"]')).toBeHidden();
  expect(new URL(page.url()).searchParams.get('vehicle')).toBe('1');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  // The dialog's close event, which drops the parameter, follows a task later.
  await expect.poll(() => new URL(page.url()).searchParams.has('vehicle')).toBe(false);
  await expect(details).toBeFocused();

  await details.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close details' }).click();
  await expect(dialog).toBeHidden();
  await expect(details).toBeFocused();

  await details.click();
  await expect(dialog).toBeVisible();
  // The backdrop: a point outside the dialog's box.
  await page.mouse.click(10, 450);
  await expect(dialog).toBeHidden();
  await expect(details).toBeFocused();
  await expect.poll(() => new URL(page.url()).searchParams.has('vehicle')).toBe(false);
});

test('AC-12: /vehicles?vehicle=3 opens with the RAM 1500\'s pop-up', async ({ page }) => {
  await page.goto('/vehicles?vehicle=3');
  const dialog = page.getByRole('dialog', { name: '2022 RAM 1500' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-wb-d="kicker"]')).toHaveText('TRUCK · STOCK #003');
});

test('AC-13: a vehicle\'s own address answers 301 to its pop-up', async ({ request }) => {
  // An entity query is keyed by revision id; the node id is the value.
  const nid = drush('php:eval', "print current(\\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('type', 'vehicle')->condition('field_stock_number', 3)->execute());");
  const response = await request.get(`/node/${nid}`, { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(new URL(response.headers()['location'], 'https://x').pathname + new URL(response.headers()['location'], 'https://x').search).toBe('/vehicles?vehicle=3');
});

test('AC-22: /vehicles.html redirects to /vehicles with its query', async ({ request }) => {
  for (const query of ['', '?type=Truck', '?vehicle=3']) {
    const response = await request.get(`/vehicles.html${query}`, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    const location = new URL(response.headers()['location'], 'https://x');
    expect(location.pathname + location.search).toBe(`/vehicles${query}`);
  }
});
