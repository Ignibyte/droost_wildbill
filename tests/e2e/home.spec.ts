import { test, expect } from '@playwright/test';

/**
 * R01: the home page's copy sections, its title and description, the favicon,
 * reduced motion and the /index.html redirect. R02: the featured vehicles, the
 * body-style tiles and the hero's live count. The source is
 * design/src/Wild-Bills-Cars/artifacts/wildbills/index.html.
 */

test.use({ viewport: { width: 1280, height: 900 } });

test('AC-13: the copy sections, in the source order', async ({ page }) => {
  await page.goto('/');
  const main = page.locator('main#main');
  const sections = main.locator('section');
  // R02 put the featured vehicles and the body-style tiles third and fourth.
  await expect(sections).toHaveCount(7);

  const hero = sections.nth(0);
  await expect(hero.locator('.wb-eyebrow')).toHaveText('Independent used-car lot');
  await expect(hero.locator('h1')).toHaveText('Good used cars. Plainly sold.');
  await expect(hero.locator('h1 em')).toHaveText('Plainly');
  await expect(hero.locator('.wb-lede')).toHaveText(
    'Trucks, SUVs and cars with the price on the windshield and the answers up front. Look around online, then come drive the one you like.',
  );
  await expect(hero.getByRole('link', { name: 'Browse inventory' })).toHaveAttribute('href', '/vehicles');
  await expect(hero.getByRole('link', { name: 'Ask a question' })).toHaveAttribute('href', '/contact');
  const photo = hero.locator('figure img');
  await expect(photo).toHaveAttribute('alt', 'Used cars and pickup trucks lined up on a dealership lot at golden hour');
  expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(hero.locator('.wb-hero-tag b')).toHaveText('15 sample vehicles');
  await expect(hero.locator('.wb-hero-tag span')).toHaveText('Trucks, SUVs and cars to explore');
  await expect(hero.getByRole('link', { name: 'See them' })).toHaveAttribute('href', '/vehicles');

  await expect(sections.nth(1).locator('b')).toHaveText([
    'Price on every car', 'Look before you visit', 'Ask about any car', 'Visit on your schedule',
  ]);
  await expect(sections.nth(1).locator('span')).toHaveText([
    'Listed up front, no "call for price"', 'Filter by type, price, year and miles',
    'Inquiries come prefilled with the vehicle', 'Hours and directions on one page',
  ]);

  const steps = sections.nth(4);
  await expect(steps.locator('h2')).toHaveText('Four steps. No runaround.');
  await expect(steps.locator('.wb-step-n')).toHaveText(['01', '02', '03', '04']);
  await expect(steps.locator('.wb-step h3')).toHaveText(['Browse', 'Ask', 'Drive it', 'Decide']);

  const questions = sections.nth(5);
  await expect(questions.locator('h2')).toHaveText("Bring your questions. We'd rather you ask.");
  await expect(questions.locator('img')).toHaveAttribute('alt', 'A small dealership office with cars parked out front in late-afternoon light');
  await expect(questions.locator('.wb-checklist li')).toHaveText([
    'Vehicle history report and title status',
    'Service records and recent maintenance',
    'Whether a pre-purchase inspection by your mechanic is welcome',
    'Trade-in value and payment options, in writing',
  ]);
  await expect(questions.getByRole('link', { name: 'Send a question' })).toHaveAttribute('href', '/contact');
  await expect(questions.getByRole('link', { name: 'Hours & directions' })).toHaveAttribute('href', '/location');

  const cta = sections.nth(6);
  await expect(cta.locator('h2')).toHaveText('Found one you like?');
  await expect(cta.getByRole('link', { name: 'Browse inventory' })).toHaveAttribute('href', '/vehicles');
  await expect(cta.getByRole('link', { name: 'Plan a visit' })).toHaveAttribute('href', '/location');
});

test('R02 AC-14: the featured vehicles, then a tile per body style on the lot', async ({ page }) => {
  await page.goto('/');
  const sections = page.locator('main#main section');
  const featured = sections.nth(2);
  await expect(featured.locator('.wb-eyebrow')).toHaveText('On the lot');
  await expect(featured.locator('h2')).toHaveText('Featured this week');
  await expect(featured.locator('.wb-lede')).toHaveText('A few picks from the sample inventory.');
  await expect(featured.getByRole('link', { name: 'All vehicles' })).toHaveAttribute('href', '/vehicles');
  const cards = featured.locator('[data-wb-vehicle]');
  await expect(cards.locator('h3')).toHaveText(['Ford F-150', 'Chevrolet Tahoe', 'RAM 1500', 'Jeep Wrangler']);
  await expect(cards.locator('.wb-chip')).toHaveText(['Featured', 'Featured', 'Featured', 'Featured']);
  await expect(featured.getByRole('link', { name: 'View details for 2022 RAM 1500' })).toHaveAttribute('href', '/vehicles?vehicle=3');

  const styles = sections.nth(3);
  await expect(styles.locator('.wb-eyebrow')).toHaveText('Shop by body style');
  await expect(styles.locator('h2')).toHaveText('What do you need it to do?');
  const tiles = styles.locator('a.wb-cat');
  await expect(tiles.locator('h3')).toHaveText(['Trucks', 'SUVs', 'Cars']);
  await expect(tiles.locator('.wb-cat-label span:not(.wb-cat-arrow)')).toHaveText(['Haul, tow, work', 'Room for everyone', 'Just for driving']);
  expect(await tiles.evaluateAll((els) => els.map((el) => el.getAttribute('href')))).toEqual(
    ['/vehicles?type=Truck', '/vehicles?type=SUV', '/vehicles?type=Car'],
  );
  // The source's photos: v6, v9 and v11.
  expect(await tiles.locator('img').evaluateAll((els) => els.map((el) => (el as HTMLImageElement).src.match(/v\d+\.jpg/)?.[0]))).toEqual(
    ['v6.jpg', 'v9.jpg', 'v11.jpg'],
  );
  // Three to a row.
  const tops = await tiles.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
  expect(new Set(tops).size).toBe(1);
});

test('R02 AC-15: the hero counts the listed vehicles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.wb-hero-tag b')).toHaveText('15 sample vehicles');
});

test('AC-15: the title, description, theme colour and green favicon', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("Wild Bill's Used Cars — Straightforward used cars, trucks and SUVs");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    "Browse sample inventory from Wild Bill's Used Cars, an independent used-car lot. Clear prices, plain answers, no pressure. Demo website.",
  );
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#173e32');
  const icon = page.locator('link[rel="icon"]');
  await expect(icon).toHaveAttribute('type', 'image/svg+xml');
  const svg = await (await request.get((await icon.getAttribute('href'))!)).text();
  expect(svg).toContain('fill="#173E32"');
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', "Wild Bill's Used Cars");
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('AC-16: sections that reveal on scroll show at once, without motion', async ({ page }) => {
    await page.goto('/');
    const reveals = page.locator('.wb-reveal');
    expect(await reveals.count()).toBeGreaterThanOrEqual(4);
    // Below the fold, never scrolled to: still fully shown, not moving.
    const states = await reveals.evaluateAll((els) => els.map((el) => {
      const s = getComputedStyle(el);
      return { opacity: s.opacity, transform: s.transform, duration: parseFloat(s.transitionDuration) };
    }));
    for (const state of states) {
      expect(state.opacity).toBe('1');
      expect(state.transform).toBe('none');
      expect(state.duration).toBeLessThan(0.01);
    }
  });
});

test('AC-16 (control): without the preference, sections below the fold wait to reveal', async ({ page }) => {
  await page.goto('/');
  const last = page.locator('.wb-reveal').last();
  await expect(last).not.toHaveClass(/is-in/);
  await last.scrollIntoViewIfNeeded();
  await expect(last).toHaveClass(/is-in/);
});

test('AC-17: /index.html redirects to /', async ({ request }) => {
  const response = await request.get('/index.html', { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(new URL(response.headers()['location'], 'https://x').pathname).toBe('/');
});
