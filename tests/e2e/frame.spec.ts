import { test, expect, Page } from '@playwright/test';

/**
 * R01: the site header and footer on every page, at 1280 and 390 wide.
 * The source is design/src/Wild-Bills-Cars/artifacts/wildbills/src/site/shared.ts
 * (initShell); the dealership details are their shipped samples.
 */

const year = String(new Date().getFullYear());

async function linkTargets(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((links) =>
    links.map((a) => [a.textContent?.replace(/\s+/g, ' ').trim(), a.getAttribute('href')]),
  );
}

test.describe('header at 1280', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('AC-1: demo bar, brand, links with the current page marked, Browse cars', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.wb-header');
    await expect(header).toHaveCount(1);
    await expect(header.locator('.wb-demo-bar')).toHaveText(
      'Demo site. Inventory, phone, email, address and hours shown here are sample information, not a live dealership listing.',
    );
    const brand = header.locator('a.wb-brand');
    await expect(brand).toHaveAttribute('href', '/');
    await expect(brand).toHaveText("WBWild Bill'sUsed Cars");
    expect(await linkTargets(page, 'header .wb-nav-links a')).toEqual([
      ['Home', '/'],
      ['Inventory', '/vehicles'],
      ['Contact', '/contact'],
      ['Visit', '/location'],
    ]);
    await expect(header.locator('.wb-nav-links a[aria-current="page"]')).toHaveText('Home');
    await expect(header.locator('.wb-nav-links a[aria-current]')).toHaveCount(1);
    const browse = header.getByRole('link', { name: 'Browse cars' });
    await expect(browse).toBeVisible();
    await expect(browse).toHaveAttribute('href', '/vehicles');
    // The mobile menu and its button stay out of the way on a wide screen.
    await expect(header.locator('.wb-menu-btn')).toBeHidden();
    await expect(header.locator('#wb-mobile-nav')).toBeHidden();
    await expect(header).toHaveCSS('position', 'sticky');
  });
});

test.describe('header at 390', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('AC-2: the links fold into a menu button that opens them and the call button', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.wb-header');
    const menu = header.locator('#wb-mobile-nav');
    const button = header.getByRole('button', { name: 'Open menu' });
    // Closed: only the brand and the button.
    await expect(header.locator('.wb-nav-links')).toBeHidden();
    await expect(header.getByRole('link', { name: 'Browse cars' })).toBeHidden();
    await expect(menu).toBeHidden();
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await button.click();
    await expect(menu).toBeVisible();
    await expect(header.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(await linkTargets(page, '#wb-mobile-nav a')).toEqual([
      ['Home', '/'],
      ['Inventory', '/vehicles'],
      ['Contact', '/contact'],
      ['Visit', '/location'],
      ['Call (555) 123-4567 (sample)', 'tel:+15551234567'],
    ]);
    await expect(menu.locator('a[aria-current="page"]')).toHaveText('Home');
  });

  test('AC-3: Escape closes the menu and returns focus to the button', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('.wb-menu-btn');
    await button.click();
    await expect(page.locator('#wb-mobile-nav')).toBeVisible();
    await page.locator('#wb-mobile-nav a').first().focus();
    await page.keyboard.press('Escape');
    await expect(page.locator('#wb-mobile-nav')).toBeHidden();
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toHaveAttribute('aria-label', 'Open menu');
  });
});

test.describe('footer', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('AC-4: brand, Pages, Hours (sample), Contact (sample) and the two footnotes', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer.wb-footer');
    await expect(footer).toHaveCount(1);
    await expect(footer.locator('a.wb-brand')).toHaveText("WBWild Bill'sUsed Cars");
    await expect(footer).toContainText('An independent used-car lot. Look at the car, ask your questions, decide in your own time.');
    await expect(footer.locator('h4')).toHaveText(['Pages', 'Hours (sample)', 'Contact (sample)']);

    const columns = footer.locator('.wb-footer-top > div');
    expect(await linkTargets(page, 'footer .wb-footer-top > div:nth-child(2) a')).toEqual([
      ['Home', '/'],
      ['Inventory', '/vehicles'],
      ['Contact', '/contact'],
      ['Location & hours', '/location'],
    ]);
    await expect(columns.nth(2).locator('li')).toHaveText(['Mon–Fri 8am–7pm', 'Saturday 9am–6pm', 'Sunday closed']);
    expect(await linkTargets(page, 'footer .wb-footer-top > div:nth-child(4) a')).toEqual([
      ['(555) 123-4567', 'tel:+15551234567'],
      ['wildbill@wildbillscars.com', 'mailto:wildbill@wildbillscars.com'],
    ]);
    const address = columns.nth(3).locator('li').last();
    expect(await address.innerHTML()).toBe('123 Dusty Creek Rd<br>Dusty Creek, TX 78701');

    await expect(footer.locator('.wb-footer-bottom span')).toHaveText([
      `© ${year} Wild Bill's Used Cars · Demonstration website`,
      'Vehicle photos are illustrative. Contact details are placeholders.',
    ]);
  });

  test('AC-5: no privacy links and no consent dialog', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: 'Privacy policy' })).toHaveCount(0);
    await expect(page.getByText('My privacy settings')).toHaveCount(0);
    await expect(page.locator('.klaro, #klaro, [class*="cookie-modal"], [class*="cookie-notice"]')).toHaveCount(0);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});

test.describe('keyboard', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('AC-6: Skip to content is the first stop, and focus is visible on every control', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator(':focus');
    await expect(skip).toHaveText('Skip to content');
    await expect(skip).toHaveAttribute('href', '#main');
    await expect(skip).toBeInViewport();
    await expect(page.locator('main#main')).toHaveCount(1);

    // Walk the header's controls and a few of the page's: each shows the ring.
    for (let i = 0; i < 12; i++) {
      const outline = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        const style = getComputedStyle(el);
        return { tag: el.tagName, style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
      });
      expect(outline.style, `focused ${outline.tag} #${i}`).not.toBe('none');
      expect(outline.width, `focused ${outline.tag} #${i}`).toBeGreaterThanOrEqual(2);
      await page.keyboard.press('Tab');
    }
  });
});
