import { test, expect, Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';

/**
 * R01: an editor owns the dealership details in one settings form, and the
 * header and footer follow it. Runs as a throwaway content editor, and puts
 * the shipped details back afterwards whatever happens.
 */

const FORM = '/admin/config/system/dealership';
const EDITOR = 'e2e-dealership-editor';
const CONFIG = 'wildbills_site.dealership';

function drush(...args: string[]): string {
  return execFileSync('ddev', ['drush', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

let original = '';

test.describe.configure({ mode: 'serial' });
test.use({ viewport: { width: 1280, height: 900 } });

test.beforeAll(() => {
  original = drush('php:eval', `print json_encode(\\Drupal::config('${CONFIG}')->getRawData());`);
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
  const encoded = Buffer.from(original).toString('base64');
  drush('php:eval', `\\Drupal::configFactory()->getEditable('${CONFIG}')->setData(json_decode(base64_decode('${encoded}'), TRUE))->save();`);
  drush('user:cancel', '--yes', '--delete-content', EDITOR);
});

async function logIn(page: Page) {
  const link = drush('user:login', `--name=${EDITOR}`, '--no-browser', '--uri=https://wildbills-a.ddev.site', FORM);
  await page.goto(link);
  await expect(page).toHaveURL(new RegExp(`${FORM}(\\?check_logged_in=1)?$`));
}

/**
 * Saves the form from the keyboard: Gin's sticky toolbar covers the button.
 */
async function save(page: Page) {
  await page.locator('#edit-submit').focus();
  await page.keyboard.press('Enter');
  await page.waitForLoadState('load');
}

test('AC-18: anonymous visitors are refused the form; a content editor reaches it', async ({ page, request }) => {
  const anonymous = await request.get(FORM, { maxRedirects: 0 });
  expect(anonymous.status()).toBe(403);
  await logIn(page);
  await expect(page.getByRole('heading', { name: 'Dealership details' })).toBeVisible();
});

test('AC-9: the time zone is chosen from the list, America/Chicago to start', async ({ page }) => {
  await logIn(page);
  const zone = page.getByLabel('Time zone');
  await expect(zone).toHaveValue('America/Chicago');
  await zone.selectOption('America/Denver');
  await save(page);
  await expect(page.getByText('The configuration options have been saved.')).toBeVisible();
  expect(drush('config:get', CONFIG, 'timezone')).toContain('America/Denver');
  await expect(page.getByLabel('Time zone')).toHaveValue('America/Denver');
});

test('AC-8 and AC-10: new contact lines and hours reach the header and footer', async ({ page, browser }) => {
  await logIn(page);
  await page.getByLabel('Phone').fill('(555) 987-6543');
  await page.getByLabel('Email').fill('sales@example.com');
  await page.getByLabel('Street address').fill('9 Mesquite Way');
  await page.getByLabel('City, state and ZIP').fill('Austin, TX 78702');
  const wednesday = page.getByRole('group', { name: 'Wednesday' });
  await wednesday.getByLabel('Opens').fill('10:00');
  await wednesday.getByLabel('Closes').fill('16:30');
  await save(page);
  await expect(page.getByText('The configuration options have been saved.')).toBeVisible();

  // An anonymous visitor, so the page cache is in play.
  const visitor = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await visitor.goto('/');
  await visitor.locator('.wb-menu-btn').click();
  const call = visitor.locator('#wb-mobile-nav a.wb-btn');
  await expect(call).toHaveText('Call (555) 987-6543 (sample)');
  await expect(call).toHaveAttribute('href', 'tel:+15559876543');

  const footer = visitor.locator('footer.wb-footer');
  await expect(footer.getByRole('link', { name: '(555) 987-6543' })).toHaveAttribute('href', 'tel:+15559876543');
  await expect(footer.getByRole('link', { name: 'sales@example.com' })).toHaveAttribute('href', 'mailto:sales@example.com');
  expect(await footer.locator('.wb-footer-top > div:nth-child(4) li').last().innerHTML()).toBe('9 Mesquite Way<br>Austin, TX 78702');
  // The summary is worked out from the week: Wednesday splits Mon–Fri.
  await expect(footer.locator('.wb-footer-top > div:nth-child(3) li')).toHaveText([
    'Mon–Tue 8am–7pm', 'Wednesday 10am–4:30pm', 'Thu–Fri 8am–7pm', 'Saturday 9am–6pm', 'Sunday closed',
  ]);
  await visitor.close();
});

test('the form refuses a day that closes before it opens', async ({ page }) => {
  await logIn(page);
  const friday = page.getByRole('group', { name: 'Friday' });
  await friday.getByLabel('Opens').fill('18:00');
  await friday.getByLabel('Closes').fill('09:00');
  await save(page);
  await expect(page.getByText('A day must close after it opens.')).toBeVisible();
});

test('AC-11: turning the demo notices off removes every demo notice and sample label', async ({ page, browser }) => {
  await logIn(page);
  await page.getByLabel('Show the demo notices').uncheck();
  await save(page);
  await expect(page.getByText('The configuration options have been saved.')).toBeVisible();

  const visitor = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await visitor.goto('/');
  await expect(visitor.locator('.wb-demo-bar')).toHaveCount(0);
  await visitor.locator('.wb-menu-btn').click();
  await expect(visitor.locator('#wb-mobile-nav a.wb-btn')).toHaveText(/^\s*Call \(555\) \d{3}-\d{4}$/);
  const footer = visitor.locator('footer.wb-footer');
  await expect(footer.locator('h4')).toHaveText(['Pages', 'Hours', 'Contact']);
  await expect(footer.locator('.wb-footer-bottom span')).toHaveText([`© ${new Date().getFullYear()} Wild Bill's Used Cars`]);
  await expect(visitor.locator('.wb-hero-tag b')).toHaveText('15 vehicles');
  // Nothing the switch governs still calls itself a sample or a demonstration:
  // the header, the footer, the hero and (R02) the vehicle cards. Section copy
  // an editor wrote in Canvas ("A few picks from the sample inventory.") is
  // the editor's to change.
  for (const part of ['header', 'footer', '.wb-hero', '[data-wb-vehicle]']) {
    const text = (await visitor.locator(part).allInnerTexts()).join(' ').toLowerCase();
    expect(text, part).not.toMatch(/sample|demonstration|demo site|placeholders/);
  }

  // R02: the inventory's price labels, the pop-up's note and its Call button.
  await visitor.setViewportSize({ width: 1280, height: 900 });
  await visitor.goto('/vehicles?vehicle=1');
  const dialog = visitor.getByRole('dialog', { name: '2021 Ford F-150' });
  await expect(dialog.locator('.wb-price--detail small')).toHaveText('Listed price');
  await expect(dialog.locator('.wb-note')).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: 'Call', exact: true })).toBeVisible();
  await expect(visitor.locator('[data-wb-vehicle] .wb-price small')).toHaveCount(0);
  await visitor.close();
});
