import { test, expect, Browser, Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';

/**
 * R03: the Location & hours page, its map links, the address and hours from
 * the dealership details, the open status on the dealership's clock (Q8), its
 * title and the /location.html redirect. The source is
 * design/src/Wild-Bills-Cars/artifacts/wildbills/location.html.
 *
 * The browser runs in Tokyo, so a status worked out on the visitor's clock
 * would disagree with the dealership's (America/Chicago, CDT in October).
 */

const CONFIG = 'wildbills_site.dealership';
const ADDRESS = '123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701';

function drush(...args: string[]): string {
  return execFileSync('ddev', ['drush', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

/** Sets one key of the dealership details. */
function setDetail(key: string, value: string | boolean) {
  drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->set('${key}', ${JSON.stringify(value)})->save();`);
}

/** Opens /location with the browser's clock stopped at an instant. */
async function openAt(page: Page, instant: string) {
  await page.clock.setFixedTime(new Date(instant));
  return page.goto('/location');
}

/**
 * A page in a new browser context, so nothing comes from the browser's own
 * HTTP cache (the site sends max-age=900): every load reaches the site.
 */
async function freshPage(browser: Browser): Promise<Page> {
  const context = await browser.newContext({ timezoneId: 'Asia/Tokyo', viewport: { width: 1280, height: 900 }, ignoreHTTPSErrors: true, baseURL: 'https://wildbills-a.ddev.site' });
  return context.newPage();
}

const hours = (page: Page) => page.locator('.wb-hours');
const statusLine = (page: Page) => hours(page).getByRole('status');

let original = '';

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { width: 1280, height: 900 }, timezoneId: 'Asia/Tokyo' });

test.beforeAll(() => {
  original = drush('php:eval', `print json_encode(\\Drupal::config('${CONFIG}')->getRawData());`);
});

test.afterAll(() => {
  const encoded = Buffer.from(original).toString('base64');
  drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->setData(json_decode(base64_decode('${encoded}'), TRUE))->save();`);
});

test('AC-1, AC-5, AC-10, AC-11: the heading, the advice, the note and the shortlist panel', async ({ page }) => {
  await page.goto('/location');
  const main = page.locator('main#main');
  await expect(main.locator('.wb-eyebrow').first()).toHaveText('Visit');
  await expect(main.locator('h1')).toHaveText('Come see it in person.');
  await expect(main.locator('.wb-page-head .wb-lede')).toHaveText(
    'Photos only tell you so much. Stop by during open hours, walk the lot and take one for a drive.',
  );

  const advice = main.locator('.wb-info').nth(1);
  await expect(advice.locator('h3')).toHaveText('Before you head over');
  await expect(advice.locator('p').first()).toHaveText(
    "Call or email to confirm the car you want to see is still on the lot, and bring your driver's license for a test drive.",
  );
  await expect(advice.getByRole('link', { name: 'Ask about a test drive' })).toHaveAttribute('href', '/contact?topic=Test%20drive');

  await expect(hours(page).locator('.wb-hours-note')).toHaveText("Status uses the dealership's local time.");
  await expect(main.getByText("Status uses your device's clock.")).toHaveCount(0);

  const aside = main.locator('aside');
  const panel = aside.locator('.wb-cta--panel');
  await expect(aside.locator(':scope > *')).toHaveCount(2);
  await expect(aside.locator(':scope > *').nth(1)).toHaveClass(/wb-cta--panel/);
  await expect(panel.locator('h2')).toHaveText('Shortlist first.');
  await expect(panel.locator('p')).toHaveText('Browse the lot online so you know which cars to look at when you arrive.');
  await expect(panel.getByRole('link', { name: 'Browse inventory' })).toHaveAttribute('href', '/vehicles');
  const below = await panel.boundingBox();
  const above = await hours(page).boundingBox();
  expect(below!.y).toBeGreaterThan(above!.y + above!.height);
});

test('AC-2, AC-3: the map card and its links to both map services, in a new tab', async ({ page }) => {
  await page.goto('/location');
  const map = page.locator('.wb-map-card');
  await expect(map).toHaveAttribute('role', 'img');
  await expect(map.locator('svg.wb-map-art')).toBeVisible();
  await expect(map.locator('.wb-map-pin span')).toHaveText("Wild Bill's");
  await expect(map.locator('.wb-map-caption')).toHaveText(
    'Illustrative graphic, not a real map. The address below is a sample placeholder.',
  );

  const google = page.getByRole('link', { name: 'Open in Google Maps' });
  await expect(google).toHaveAttribute('href', `https://www.google.com/maps/search/?api=1&query=${ADDRESS}`);
  const apple = page.getByRole('link', { name: 'Apple Maps' });
  await expect(apple).toHaveAttribute('href', `https://maps.apple.com/?q=${ADDRESS}`);
  for (const link of [google, apple]) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener');
  }
});

test('AC-4: the address comes from the dealership details', async ({ page, browser }) => {
  await page.goto('/location');
  const address = page.locator('.wb-info').first();
  await expect(address.locator('h3')).toHaveText('Address sample');
  await expect(address.locator('.wb-tag-sample')).toHaveText('sample');
  await expect(address.locator('.wb-info-address')).toHaveText('123 Dusty Creek RdDusty Creek, TX 78701');

  setDetail('street', '9 Mesquite Ln');
  try {
    const later = await freshPage(browser);
    await later.goto('/location');
    await expect(later.locator('.wb-info').first().locator('.wb-info-address')).toHaveText('9 Mesquite LnDusty Creek, TX 78701');
    await expect(later.getByRole('link', { name: 'Apple Maps' })).toHaveAttribute(
      'href', 'https://maps.apple.com/?q=9%20Mesquite%20Ln%2C%20Dusty%20Creek%2C%20TX%2078701',
    );
  }
  finally {
    setDetail('street', '123 Dusty Creek Rd');
  }
});

test('AC-6: the week from the dealership details, Monday first', async ({ page }) => {
  await page.goto('/location');
  await expect(hours(page).locator('h2')).toHaveText('Hours sample');
  const rows = hours(page).locator('li');
  await expect(rows.locator('span:first-child')).toHaveText(
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => new RegExp(`^${day}( · today)?$`)),
  );
  await expect(rows.locator('span:last-child')).toHaveText([
    '8:00am – 7:00pm', '8:00am – 7:00pm', '8:00am – 7:00pm', '8:00am – 7:00pm', '8:00am – 7:00pm',
    '9:00am – 6:00pm', 'Closed',
  ]);
});

// [instant, the dealership's day, the status there]. Each instant is a
// different day, or a different side of opening, in Tokyo.
const CLOCKS: [string, string, string][] = [
  ['2026-10-23T13:30:00Z', 'Friday', 'Open now · closes 7:00pm'],
  ['2026-10-23T23:59:00Z', 'Friday', 'Open now · closes 7:00pm'],
  ['2026-10-23T12:00:00Z', 'Friday', 'Closed · opens today at 8:00am'],
  ['2026-10-24T00:00:00Z', 'Friday', 'Closed · opens tomorrow at 9:00am'],
  ['2026-10-24T23:30:00Z', 'Saturday', 'Closed · opens Monday at 8:00am'],
  ['2026-10-25T15:00:00Z', 'Sunday', 'Closed · opens tomorrow at 8:00am'],
];

for (const [instant, day, status] of CLOCKS) {
  test(`AC-7, AC-8: at ${instant} it is ${day} in Chicago: "${status}"`, async ({ page }) => {
    await openAt(page, instant);
    await expect(statusLine(page)).toHaveText(status);
    await expect(statusLine(page).locator('.wb-dot')).toHaveClass(status.startsWith('Open') ? /is-on/ : /^wb-dot$/);
    const today = hours(page).locator('li[aria-current="date"]');
    await expect(today).toHaveCount(1);
    await expect(today.locator('span').first()).toHaveText(`${day} · today`);
    await expect(today).toHaveClass(/is-today/);
    await expect(hours(page).locator('li.is-today')).toHaveCount(1);
  });
}

test('AC-8: hours an editor sets, with a half hour, on the dealership time zone', async ({ browser }) => {
  setDetail('timezone', 'America/New_York');
  drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->set('hours.friday', ['open' => '08:30', 'close' => '17:30'])->save();`);
  try {
    // 08:15 in New York (EDT): not open yet today.
    const early = await freshPage(browser);
    await openAt(early, '2026-10-23T12:15:00Z');
    await expect(statusLine(early)).toHaveText('Closed · opens today at 8:30am');
    // 17:00 in New York: open, closing at half past.
    const late = await freshPage(browser);
    await openAt(late, '2026-10-23T21:00:00Z');
    await expect(statusLine(late)).toHaveText('Open now · closes 5:30pm');
  }
  finally {
    const encoded = Buffer.from(original).toString('base64');
    drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->setData(json_decode(base64_decode('${encoded}'), TRUE))->save();`);
  }
});

test('AC-9: a page served from the cache still follows the clock', async ({ browser }) => {
  const first = await freshPage(browser);
  await openAt(first, '2026-10-23T13:30:00Z');
  await expect(statusLine(first)).toHaveText('Open now · closes 7:00pm');

  const second = await freshPage(browser);
  const cached = await openAt(second, '2026-10-24T23:30:00Z');
  expect(cached!.headers()['x-drupal-cache']).toBe('HIT');
  await expect(statusLine(second)).toHaveText('Closed · opens Monday at 8:00am');
  await expect(hours(second).locator('li[aria-current="date"] span').first()).toHaveText('Saturday · today');
});

test('AC-13: the title and description', async ({ page }) => {
  await page.goto('/location');
  await expect(page).toHaveTitle("Location & Hours — Wild Bill's Used Cars");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content', "Opening hours, address and map links for visiting Wild Bill's Used Cars. Sample location details for this demo website.",
  );
});

test('AC-14: /location.html redirects to /location, query and all', async ({ request }) => {
  for (const [from, to] of [['/location.html', '/location'], ['/location.html?from=ad', '/location?from=ad']]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(new URL(response.headers()['location'], 'https://wildbills-a.ddev.site').pathname
      + new URL(response.headers()['location'], 'https://wildbills-a.ddev.site').search).toBe(to);
  }
});

test('AC-15: with the demo notices off, no "sample" tags', async ({ browser }) => {
  setDetail('demo_notices', false);
  try {
    const page = await freshPage(browser);
    await page.goto('/location');
    await expect(page.locator('main .wb-tag-sample')).toHaveCount(0);
    await expect(page.locator('.wb-info').first().locator('h3')).toHaveText('Address');
    await expect(hours(page).locator('h2')).toHaveText('Hours');
  }
  finally {
    setDetail('demo_notices', true);
  }
});

test('AC-17: the home page keeps its closing band and its title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("Wild Bill's Used Cars — Straightforward used cars, trucks and SUVs");
  const band = page.locator('main section').last();
  await expect(band).toHaveClass(/wb-section--flush-top/);
  await expect(band.locator('.wb-cta')).not.toHaveClass(/wb-cta--panel/);
  await expect(band.locator('.wb-cta h2.wb-h2')).toHaveText('Found one you like?');
  await expect(band.locator('.wb-cta-actions a')).toHaveCount(2);
});
