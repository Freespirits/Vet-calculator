/**
 * Real-browser checks (`npm run test:browser`), kept apart from the unit tests.
 *
 * The unit tests run in jsdom, which has no layout, no animation frames and no
 * real head manager. Three defects in this project only showed up in a real
 * browser: React discarding the prerendered page, the head manager and the app
 * racing for <html lang dir data-theme>, and a one-frame "-0.0" in the dosage
 * volume. The checks in e2e/ open the BUILT site in Chromium and guard those.
 *
 * They run against `vite preview`, which serves dist/, so build first
 * (`npm run test:browser` does). To check another copy of the site — a deploy
 * preview, or an older build — set E2E_BASE_URL and no server is started.
 */
import { defineConfig, devices } from '@playwright/test';

const PREVIEW_PORT = 4173;
const externalBaseUrl = process.env.E2E_BASE_URL;
const baseURL = externalBaseUrl ?? `http://localhost:${PREVIEW_PORT}`;
const runningInCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: runningInCi,
  // No retries: several checks guard against races, and a retry would turn
  // "wrong on one load in five" into a pass.
  retries: 0,
  // Some checks load a page several times, and the page's WebGL background is
  // slow to draw without a GPU, so a load can take a few seconds in CI.
  timeout: 60_000,
  reporter: runningInCi ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL,
    trace: runningInCi ? 'retain-on-failure' : 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: `npx vite preview --port ${PREVIEW_PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !runningInCi,
        timeout: 60_000,
      },
});
