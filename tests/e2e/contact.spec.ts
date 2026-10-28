import { test, expect, Browser, Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';

/**
 * R04: the Contact page, its inquiry form that drafts an email in the
 * visitor's own mail app (Q4: nothing is sent to the site), the form opened
 * from a car (?vehicle=) or a topic (?topic=), the four contact cards, its
 * title and the /contact.html redirect. The source is
 * design/src/Wild-Bills-Cars/artifacts/wildbills/contact.html and
 * src/site/contact.ts.
 */

const CONFIG = 'wildbills_site.dealership';
const EMAIL = 'wildbill@wildbillscars.com';
const F150_MESSAGE = "Hi, I'm interested in the 2021 Ford F-150 (Magnetic Gray, 42,000 mi, listed at $38,900). Is it still available, and when could I come see it?";

function drush(...args: string[]): string {
  return execFileSync('ddev', ['drush', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

/** Sets one key of the dealership details. */
function setDetail(key: string, value: string | boolean) {
  drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->set('${key}', ${JSON.stringify(value)})->save();`);
}

/**
 * Sets a car's sale status, and publishes or unpublishes it, by stock number.
 *
 * Vehicles are in the basic_editorial workflow, whose moderation state
 * decides the published flag, so unpublishing is its `unpublished` state.
 */
function setCar(stock: number, status: 'available' | 'pending' | 'sold', published = true) {
  drush('php:eval', `$ids = \\Drupal::entityQuery('node')->accessCheck(FALSE)->condition('type', 'vehicle')->condition('field_stock_number', ${stock})->execute(); $n = \\Drupal\\node\\Entity\\Node::load(current($ids)); $n->set('field_sale_status', '${status}'); $n->set('moderation_state', '${published ? 'published' : 'unpublished'}'); $n->save();`);
}

/**
 * A page in a new browser context, so nothing comes from the browser's own
 * HTTP cache (the site sends max-age=900): every load reaches the site.
 */
async function freshPage(browser: Browser): Promise<Page> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ignoreHTTPSErrors: true, baseURL: 'https://wildbills-a.ddev.site' });
  return context.newPage();
}

const form = (page: Page) => page.locator('[data-wb-form]');
const handoff = (page: Page) => page.locator('[data-wb-handoff]');
const field = (page: Page, name: string) => page.locator(`[data-wb-field="${name}"]`);
const aside = (page: Page) => page.locator('main#main aside.wb-side-stack');
const card = (page: Page, heading: string) => aside(page).locator('.wb-info').filter({ has: page.locator('h3', { hasText: heading }) });

/** Every request the page makes to the site from now on. */
function siteRequests(page: Page): string[] {
  const seen: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).host === 'wildbills-a.ddev.site') {
      seen.push(`${request.method()} ${request.url()}`);
    }
  });
  return seen;
}

/** Fills the three required fields. */
async function fillValid(page: Page) {
  await field(page, 'name').fill('Jo Driver');
  await field(page, 'email').fill('jo@example.com');
  await field(page, 'message').fill('Do you take trade-ins?');
}

let original = '';

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { width: 1280, height: 900 } });

test.beforeAll(() => {
  original = drush('php:eval', `print json_encode(\\Drupal::config('${CONFIG}')->getRawData());`);
});

test.afterAll(() => {
  const encoded = Buffer.from(original).toString('base64');
  drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->setData(json_decode(base64_decode('${encoded}'), TRUE))->save();`);
  for (const stock of [1, 2, 3]) {
    setCar(stock, 'available');
  }
});

test('AC-1, AC-2: the heading, the notice, the fields and the topics', async ({ page }) => {
  await page.goto('/contact');
  const main = page.locator('main#main');
  await expect(main.locator('.wb-page-head .wb-eyebrow')).toHaveText('Contact');
  await expect(main.locator('h1')).toHaveText('Ask us anything.');
  await expect(main.locator('.wb-page-head .wb-lede')).toHaveText(
    "About a specific car, a test drive, your trade-in or how payment works. Write it here and we'll put it into an email for you to send.",
  );

  await expect(form(page).locator('.wb-notice')).toHaveText(
    'This site has no message server. Submitting prepares an email in your own mail app. Nothing is sent until you press send there.',
  );
  await expect(page.getByLabel('Your name')).toBeVisible();
  await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('type', 'email');
  await expect(form(page).locator('label', { hasText: 'Phone' })).toHaveText('Phone optional');
  await expect(field(page, 'phone')).toHaveAttribute('type', 'tel');
  await expect(field(page, 'topic').locator('option')).toHaveText(
    ['General question', 'Specific vehicle', 'Test drive', 'Trade-in', 'Payment options', 'Vehicle search'],
  );
  await expect(field(page, 'topic')).toHaveValue('General question');
  await expect(page.locator('[data-wb-count]')).toHaveText('0 / 1000');
  await expect(field(page, 'message')).toHaveAttribute('placeholder', 'What would you like to know?');
  await expect(form(page).getByRole('button', { name: 'Prepare email' })).toBeVisible();
  await expect(handoff(page)).toBeHidden();
  await expect(page.locator('[data-wb-vehicle]')).toHaveCount(0);
});

test('AC-3: the count follows the message, to 1000 characters', async ({ page }) => {
  await page.goto('/contact');
  await field(page, 'message').fill('Hello there');
  await expect(page.locator('[data-wb-count]')).toHaveText('11 / 1000');
  await field(page, 'message').fill('x'.repeat(1200));
  await expect(field(page, 'message')).toHaveValue('x'.repeat(1000));
  await expect(page.locator('[data-wb-count]')).toHaveText('1000 / 1000');
});

test('AC-4, AC-5: missing fields are named, focus goes to the first, nothing is sent', async ({ page }) => {
  await page.goto('/contact');
  const requests = siteRequests(page);
  await form(page).getByRole('button', { name: 'Prepare email' }).click();

  await expect(page.locator('#' + (await field(page, 'name').getAttribute('aria-describedby')))).toHaveText('Please add your name.');
  await expect(page.locator('#' + (await field(page, 'email').getAttribute('aria-describedby')))).toHaveText('Please add your email.');
  await expect(page.locator('#' + (await field(page, 'message').getAttribute('aria-describedby')))).toHaveText('Please write a short message.');
  for (const name of ['name', 'email', 'message']) {
    await expect(field(page, name)).toHaveAttribute('aria-invalid', 'true');
  }
  await expect(field(page, 'name')).toBeFocused();

  // Fixing the name clears its message as it is typed; the others stay.
  await field(page, 'name').pressSequentially('Jo');
  await expect(field(page, 'name')).toHaveAttribute('aria-invalid', 'false');
  await expect(page.locator('#' + (await field(page, 'name').getAttribute('aria-describedby')))).toHaveText('');

  await field(page, 'email').fill('jo@');
  await form(page).getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.locator('#' + (await field(page, 'email').getAttribute('aria-describedby')))).toHaveText("That email address doesn't look complete.");
  await expect(field(page, 'email')).toBeFocused();
  await field(page, 'email').fill('jo@example.com');
  await expect(page.locator('#' + (await field(page, 'email').getAttribute('aria-describedby')))).toHaveText('');
  await expect(field(page, 'message')).toHaveAttribute('aria-invalid', 'true');

  await expect(handoff(page)).toBeHidden();
  expect(requests).toEqual([]);
  expect(new URL(page.url()).pathname + new URL(page.url()).search).toBe('/contact');
});

test('AC-6, AC-7, AC-9: a valid form drafts the email; Edit brings the form back as it was', async ({ page }) => {
  await page.goto('/contact');
  const requests = siteRequests(page);
  await fillValid(page);
  await field(page, 'phone').fill('555 0101');
  await field(page, 'topic').selectOption('Trade-in');
  await form(page).getByRole('button', { name: 'Prepare email' }).click();

  await expect(form(page)).toBeHidden();
  await expect(handoff(page)).toBeVisible();
  await expect(handoff(page)).toBeFocused();
  await expect(handoff(page).locator('.wb-notice-warn')).toHaveText('Not sent yet. Your message is ready but has not left this page.');
  await expect(handoff(page).locator('h2')).toHaveText('Your email is ready to send.');
  await expect(handoff(page).locator('.wb-handoff-text')).toHaveText(
    `Open it in your email app, review it, and press send there. If no app opens, copy the text and send it to ${EMAIL} yourself. sample address`,
  );
  const body = 'Do you take trade-ins?\n\n—\nName: Jo Driver\nEmail: jo@example.com\nPhone: 555 0101\nTopic: Trade-in';
  await expect(page.locator('[data-wb-preview]')).toHaveText(`To: ${EMAIL}\nSubject: Website inquiry: Trade-in\n\n${body}`);

  const href = await page.getByRole('link', { name: 'Open in email app' }).getAttribute('href');
  const mailto = new URL(href!);
  expect(mailto.protocol).toBe('mailto:');
  expect(mailto.pathname).toBe(EMAIL);
  expect(href).toContain(`?subject=${encodeURIComponent('Website inquiry: Trade-in')}&body=${encodeURIComponent(body)}`);

  // Without a phone number the Phone line goes.
  await page.getByRole('button', { name: 'Edit message' }).click();
  await expect(handoff(page)).toBeHidden();
  await expect(form(page)).toBeVisible();
  await expect(field(page, 'message')).toBeFocused();
  await expect(field(page, 'name')).toHaveValue('Jo Driver');
  await expect(field(page, 'email')).toHaveValue('jo@example.com');
  await expect(field(page, 'phone')).toHaveValue('555 0101');
  await expect(field(page, 'topic')).toHaveValue('Trade-in');
  await expect(field(page, 'message')).toHaveValue('Do you take trade-ins?');
  await field(page, 'phone').fill('');
  await form(page).getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.locator('[data-wb-preview]')).not.toContainText('Phone:');

  expect(requests).toEqual([]);
});

test('AC-8: Copy message copies the draft, or selects it when the clipboard refuses', async ({ browser }) => {
  const context = await browser.newContext({ ignoreHTTPSErrors: true, baseURL: 'https://wildbills-a.ddev.site' });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://wildbills-a.ddev.site' });
  const page = await context.newPage();
  await page.goto('/contact');
  await fillValid(page);
  await form(page).getByRole('button', { name: 'Prepare email' }).click();
  await page.getByRole('button', { name: 'Copy message' }).click();
  await expect(page.locator('[data-wb-copy-status]')).toHaveText('Copied. Paste it into a new email to send.');
  const preview = await page.locator('[data-wb-preview]').textContent();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(preview);
  await context.close();

  const refused = await browser.newContext({ ignoreHTTPSErrors: true, baseURL: 'https://wildbills-a.ddev.site' });
  const other = await refused.newPage();
  await other.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } });
  });
  await other.goto('/contact');
  await fillValid(other);
  await form(other).getByRole('button', { name: 'Prepare email' }).click();
  await other.getByRole('button', { name: 'Copy message' }).click();
  await expect(other.locator('[data-wb-copy-status]')).toHaveText("Couldn't copy automatically. The text is selected, press Ctrl/Cmd+C.");
  expect(await other.evaluate(() => window.getSelection()?.toString())).toBe(await other.locator('[data-wb-preview]').textContent());
  await refused.close();
});

test('AC-10, AC-11: ?vehicle=1 asks about the F-150, and the draft names it', async ({ page }) => {
  await page.goto('/contact?vehicle=1');
  const pick = page.locator('[data-wb-vehicle]');
  await expect(pick.locator('.wb-pick-label')).toHaveText('ASKING ABOUT');
  await expect(pick.locator('b')).toHaveText('2021 Ford F-150');
  await expect(pick.locator('.wb-help')).toHaveText('$38,900 · 42,000 mi · Magnetic Gray');
  await expect(pick.getByRole('button', { name: 'Remove' })).toBeVisible();
  const photo = pick.locator('img');
  await expect(photo).toHaveAttribute('src', /v1\.jpg/);
  expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(field(page, 'topic')).toHaveValue('Specific vehicle');
  await expect(field(page, 'message')).toHaveValue(F150_MESSAGE);
  await expect(page.locator('[data-wb-count]')).toHaveText(`${F150_MESSAGE.length} / 1000`);

  const requests = siteRequests(page);
  await field(page, 'name').fill('Jo Driver');
  await field(page, 'email').fill('jo@example.com');
  await form(page).getByRole('button', { name: 'Prepare email' }).click();
  const preview = page.locator('[data-wb-preview]');
  await expect(preview).toContainText('Subject: Inquiry: 2021 Ford F-150\n');
  await expect(preview).toContainText('Topic: Specific vehicle\nVehicle: 2021 Ford F-150 · Stock #001 · $38,900\nListing: https://wildbills-a.ddev.site/vehicles?vehicle=1');
  const href = await page.getByRole('link', { name: 'Open in email app' }).getAttribute('href');
  expect(href).toContain(`subject=${encodeURIComponent('Inquiry: 2021 Ford F-150')}`);
  expect(requests).toEqual([]);
});

test('AC-12: Remove drops the car, its topic and the parameter', async ({ page }) => {
  await page.goto('/contact?vehicle=1');
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('[data-wb-vehicle]')).toHaveCount(0);
  await expect(field(page, 'topic')).toHaveValue('General question');
  expect(new URL(page.url()).search).toBe('');
  await expect(field(page, 'message')).toHaveValue(F150_MESSAGE);

  await field(page, 'name').fill('Jo Driver');
  await field(page, 'email').fill('jo@example.com');
  await form(page).getByRole('button', { name: 'Prepare email' }).click();
  const preview = page.locator('[data-wb-preview]');
  await expect(preview).toContainText('Subject: Website inquiry: General question');
  await expect(preview).not.toContainText('Vehicle:');
  await expect(preview).not.toContainText('Listing:');

  // A topic other than Specific vehicle is kept.
  await page.goto('/contact?vehicle=1');
  await field(page, 'topic').selectOption('Payment options');
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(field(page, 'topic')).toHaveValue('Payment options');
});

test('AC-13: ?topic= picks a known topic and ignores any other', async ({ page }) => {
  await page.goto('/contact?topic=Test%20drive');
  await expect(field(page, 'topic')).toHaveValue('Test drive');
  await page.goto('/contact?topic=Trade-in');
  await expect(field(page, 'topic')).toHaveValue('Trade-in');
  await page.goto('/contact?topic=Financing');
  await expect(field(page, 'topic')).toHaveValue('General question');
  await page.goto('/contact?vehicle=2&topic=Trade-in');
  await expect(field(page, 'topic')).toHaveValue('Specific vehicle');
});

test('AC-14: a sold, unpublished or unknown car is ignored; a sale-pending one is not', async ({ page }) => {
  setCar(1, 'sold');
  setCar(2, 'available', false);
  setCar(3, 'pending');
  try {
    for (const query of ['?vehicle=1', '?vehicle=2', '?vehicle=99', '?vehicle=abc']) {
      await page.goto(`/contact${query}`);
      await expect(page.locator('[data-wb-vehicle]'), query).toHaveCount(0);
      await expect(field(page, 'topic'), query).toHaveValue('General question');
      await expect(field(page, 'message'), query).toHaveValue('');
    }
    await page.goto('/contact?vehicle=3');
    await expect(page.locator('[data-wb-vehicle] b')).toHaveText('2022 RAM 1500');
    await expect(field(page, 'topic')).toHaveValue('Specific vehicle');
  }
  finally {
    setCar(1, 'available');
    setCar(2, 'available');
    setCar(3, 'available');
  }
});

test('AC-15: the page cache keeps each link\'s form, and a sale clears it', async ({ browser }) => {
  for (const query of ['', '?vehicle=1']) {
    const warm = await freshPage(browser);
    await warm.goto(`/contact${query}`);
    await warm.context().close();
  }
  const plain = await freshPage(browser);
  const plainResponse = await plain.goto('/contact');
  expect(plainResponse!.headers()['x-drupal-cache']).toBe('HIT');
  await expect(plain.locator('[data-wb-vehicle]')).toHaveCount(0);
  await plain.context().close();

  const asking = await freshPage(browser);
  const askingResponse = await asking.goto('/contact?vehicle=1');
  expect(askingResponse!.headers()['x-drupal-cache']).toBe('HIT');
  await expect(asking.locator('[data-wb-vehicle] b')).toHaveText('2021 Ford F-150');
  await asking.context().close();

  setCar(1, 'sold');
  try {
    const sold = await freshPage(browser);
    await sold.goto('/contact?vehicle=1');
    await expect(sold.locator('[data-wb-vehicle]')).toHaveCount(0);
    await sold.context().close();
  }
  finally {
    setCar(1, 'available');
  }
});

test('AC-16: the four cards come from the dealership details', async ({ browser }) => {
  const page = await freshPage(browser);
  await page.goto('/contact');
  await expect(aside(page).locator('.wb-info h3')).toHaveText(['Phone sample', 'Email sample', 'Visit sample', 'Hours sample']);
  const phone = card(page, 'Phone');
  await expect(phone.getByRole('link')).toHaveText('(555) 123-4567');
  await expect(phone.getByRole('link')).toHaveAttribute('href', 'tel:+15551234567');
  await expect(phone.locator('p').nth(1)).toHaveText('Placeholder number from the original site.');
  await expect(card(page, 'Email').getByRole('link')).toHaveAttribute('href', `mailto:${EMAIL}`);
  await expect(card(page, 'Email').getByRole('link')).toHaveText(EMAIL);
  const visit = card(page, 'Visit');
  expect(await visit.locator('p').first().innerText()).toBe('123 Dusty Creek Rd\nDusty Creek, TX 78701');
  await expect(visit.getByRole('link', { name: 'Hours & directions' })).toHaveAttribute('href', '/location');
  expect(await card(page, 'Hours').locator('p').innerText()).toBe('Mon–Fri 8:00am–7:00pm\nSaturday 9:00am–6:00pm\nSunday closed');
  await page.context().close();

  setDetail('phone', '(555) 987-6543');
  try {
    const changed = await freshPage(browser);
    await changed.goto('/contact');
    await expect(card(changed, 'Phone').getByRole('link')).toHaveText('(555) 987-6543');
    await expect(card(changed, 'Phone').getByRole('link')).toHaveAttribute('href', 'tel:+15559876543');
    await changed.context().close();
  }
  finally {
    setDetail('phone', '(555) 123-4567');
  }
});

test('AC-17: with the demo notices off, no sample tags', async ({ browser }) => {
  setDetail('demo_notices', false);
  try {
    const page = await freshPage(browser);
    await page.goto('/contact');
    await expect(aside(page).locator('.wb-info h3')).toHaveText(['Phone', 'Email', 'Visit', 'Hours']);
    await fillValid(page);
    await form(page).getByRole('button', { name: 'Prepare email' }).click();
    await expect(handoff(page).locator('.wb-handoff-text')).not.toContainText('sample address');
    await expect(page.locator('main#main .wb-tag-sample')).toHaveCount(0);
    await page.context().close();
  }
  finally {
    setDetail('demo_notices', true);
  }
});

test('AC-18: the title and description', async ({ page }) => {
  await page.goto('/contact');
  await expect(page).toHaveTitle('Contact — Wild Bill\'s Used Cars');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Ask Wild Bill\'s Used Cars about a vehicle, a test drive, trade-ins or payment options. Prepares an email in your own mail app. Demo website.',
  );
});

test('AC-19: /contact.html redirects to /contact, query and all', async ({ request }) => {
  for (const query of ['', '?vehicle=3', '?topic=Trade-in']) {
    const response = await request.get(`/contact.html${query}`, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    const location = new URL(response.headers()['location'], 'https://x');
    expect(location.pathname + location.search).toBe(`/contact${query}`);
  }
});

test('AC-21: the inventory and location pages\' links open the form ready', async ({ page }) => {
  await page.goto('/vehicles?vehicle=1');
  const dialog = page.getByRole('dialog', { name: '2021 Ford F-150' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Ask about this car' }).click();
  await expect(page).toHaveURL(/\/contact\?vehicle=1$/);
  await expect(page.locator('[data-wb-vehicle] b')).toHaveText('2021 Ford F-150');
  await expect(field(page, 'topic')).toHaveValue('Specific vehicle');

  await page.goto('/location');
  await page.getByRole('link', { name: 'Ask about a test drive' }).click();
  await expect(page).toHaveURL(/\/contact\?topic=Test%20drive$/);
  await expect(field(page, 'topic')).toHaveValue('Test drive');
});

test('AC-22: the location cards, the inventory fields and the footer hours are as before', async ({ page }) => {
  await page.goto('/location');
  const advice = page.locator('main#main .wb-info').filter({ hasText: 'Before you head over' });
  expect(await advice.locator('.wb-info-link').evaluate((p) => getComputedStyle(p).marginTop)).toBe('12.8px');
  const address = page.locator('main#main .wb-info').filter({ hasText: 'Address' }).locator('p').first();
  await expect(address).toHaveClass('wb-info-address');
  expect(await address.evaluate((p) => getComputedStyle(p).fontSize)).toBe('25.6px');
  await expect(page.locator('footer')).toContainText('Mon–Fri 8am–7pm');

  await page.goto('/contact');
  expect(await card(page, 'Visit').locator('.wb-info-link').evaluate((p) => getComputedStyle(p).marginTop)).toBe('3.2px');

  await page.goto('/vehicles');
  const sort = page.locator('.wb-toolbar .wb-select');
  expect(await sort.evaluate((el) => {
    const style = getComputedStyle(el);
    return [style.minHeight, style.borderTopLeftRadius, style.appearance, style.width === 'auto' || parseFloat(style.width) >= 190];
  })).toEqual(['46px', '12px', 'none', true]);
});
