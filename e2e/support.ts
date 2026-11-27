/**
 * Shared set-up for the real-browser checks.
 *
 * Every check opens the built site as a particular kind of visitor — a browser
 * language, things already in localStorage, OS settings — because the defects
 * these checks guard against all came from state the build cannot know about.
 *
 * `openAs(path, visitor)` gives each visit a fresh browser profile, waits until
 * the page has hydrated and settled, and collects every uncaught error and
 * console error on the way. React reports a discarded prerendered page (error
 * #418) as one of those, so "no problems" is the hydration assertion.
 *
 * One visit is open at a time: opening the next closes the previous one. The
 * page animates a WebGL background, and a handful of them open together starve
 * each other in a small container until checks time out.
 *
 * Third-party requests are answered locally with empty responses. The page
 * asks other hosts for a logo and an animation, and Vercel for an analytics
 * script that only exists on Vercel; none of that is under test, and a check
 * must not fail because another site is slow or down. The animation player is
 * loaded with a subresource-integrity hash, which an empty stand-in cannot
 * satisfy, so console errors that name an address outside the site are not
 * counted as problems: they are about the stand-ins, not about the site.
 */
import {
  test as base,
  expect,
  type BrowserContext,
  type BrowserContextOptions,
  type Page,
  type Route,
} from '@playwright/test';

/** What a visitor brings that the build cannot know about. */
export interface Visitor {
  /** Browser language, e.g. "pt-BR". Defaults to "en-US". */
  locale?: string;
  /** localStorage entries already there when the page loads (a returning visitor). */
  stored?: Record<string, string>;
  /** The OS "reduce motion" setting. */
  reducedMotion?: boolean;
  /** The OS colour scheme. */
  colorScheme?: 'light' | 'dark';
}

export interface Visit {
  page: Page;
  /** Uncaught errors and console errors seen so far on this page. */
  problems: string[];
}

type OpenAs = (path: string, visitor?: Visitor) => Promise<Visit>;

/** How long after the second animation frame the page is given to finish follow-up work. */
const SETTLE_PAUSE_MS = 300;

const EMPTY_SCRIPT = { status: 200, contentType: 'application/javascript', body: '' };
const EMPTY_IMAGE = {
  status: 200,
  contentType: 'image/svg+xml',
  body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
};
const EMPTY_JSON = { status: 200, contentType: 'application/json', body: '{}' };

function emptyResponseFor(route: Route) {
  const resourceType = route.request().resourceType();
  if (resourceType === 'script') return EMPTY_SCRIPT;
  if (resourceType === 'image') return EMPTY_IMAGE;
  return EMPTY_JSON;
}

async function stubThirdParties(context: BrowserContext, siteOrigin: string): Promise<void> {
  const isOutsideTheSite = (url: URL) =>
    url.protocol.startsWith('http') && (url.origin !== siteOrigin || url.pathname.startsWith('/_vercel/'));
  await context.route(isOutsideTheSite, (route) => route.fulfill(emptyResponseFor(route)));
}

function contextOptionsFor(baseURL: string, visitor: Visitor): BrowserContextOptions {
  const localStorage = Object.entries(visitor.stored ?? {}).map(([name, value]) => ({ name, value }));
  return {
    baseURL,
    locale: visitor.locale ?? 'en-US',
    reducedMotion: visitor.reducedMotion ? 'reduce' : 'no-preference',
    colorScheme: visitor.colorScheme,
    storageState: { cookies: [], origins: [{ origin: new URL(baseURL).origin, localStorage }] },
  };
}

const firstLine = (text: string): string => text.split('\n')[0].slice(0, 200);

/** True when a console message is about an address on some other site (one of the stand-ins). */
function namesAnotherSite(text: string, siteOrigin: string): boolean {
  const addresses = text.match(/https?:\/\/[^\s'")]+/g) ?? [];
  return addresses.some((address) => !address.startsWith(siteOrigin));
}

function collectProblems(page: Page, siteOrigin: string): string[] {
  const problems: string[] = [];
  page.on('pageerror', (error) => problems.push(`uncaught error: ${firstLine(error.message)}`));
  page.on('console', (message) => {
    if (message.type() !== 'error' || namesAnotherSite(message.text(), siteOrigin)) return;
    problems.push(`console error: ${firstLine(message.text())}`);
  });
  return problems;
}

/**
 * Resolves once React has hydrated the page and what follows hydration has had
 * time to run: effects, the follow-up render with the visitor's own state, and
 * the head manager, which writes to <html> on an animation frame.
 *
 * React marks every element it has taken over with a `__reactFiber$…` property;
 * that mark on the app's content element is the hydration signal.
 */
export async function settled(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const content = document.getElementById('app-content');
    return content !== null && Object.keys(content).some((key) => key.startsWith('__reactFiber$'));
  });
  await page.waitForLoadState('load');
  await page.evaluate(
    (pauseMs) =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, pauseMs)));
      }),
    SETTLE_PAUSE_MS,
  );
}

export const test = base.extend<{ openAs: OpenAs }>({
  openAs: async ({ browser, baseURL }, provideToTest) => {
    if (!baseURL) throw new Error('The browser checks need a baseURL: see playwright.config.ts (E2E_BASE_URL).');
    const siteOrigin = new URL(baseURL).origin;
    let openContext: BrowserContext | undefined;
    await provideToTest(async (path, visitor = {}) => {
      await openContext?.close();
      openContext = await browser.newContext(contextOptionsFor(baseURL, visitor));
      await stubThirdParties(openContext, siteOrigin);
      const page = await openContext.newPage();
      const problems = collectProblems(page, siteOrigin);
      await page.goto(path);
      await settled(page);
      return { page, problems };
    });
    await openContext?.close();
  },
});

export { expect };

/** `lang/dir` as they stand on <html>, e.g. "fr/ltr". */
export const pageLanguage = (page: Page): Promise<string> =>
  page.evaluate(() => `${document.documentElement.lang}/${document.documentElement.dir}`);

/** The theme as it stands on <html data-theme>. */
export const pageTheme = (page: Page): Promise<string> =>
  page.evaluate(() => document.documentElement.dataset.theme ?? '(none)');

export const storedValue = (page: Page, key: string): Promise<string | null> =>
  page.evaluate((name) => window.localStorage.getItem(name), key);
