import { defineConfig, devices } from '@playwright/test';

/**
 * The `playwright` gate runs `node_modules/.bin/playwright test` from the
 * project root, where droost runs: on this project, the host, against the
 * DDEV site. testDir is scoped so contrib's own JS tests are never reached.
 * One worker: this machine also runs another subject's suites (the
 * operator's choice, 2026-10-21), and a timeout should mean the site.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://wildbills-a.ddev.site',
    ignoreHTTPSErrors: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
