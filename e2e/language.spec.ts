/**
 * Which language a visitor gets, and what <html lang dir> say about it.
 *
 * How it is supposed to work:
 *  - The root page (/) is prerendered in Hebrew. In the browser it switches to
 *    the language the visitor used last, else the first browser language the
 *    site supports, else stays Hebrew.
 *  - Every /<code>/ page is in its own language whatever is remembered.
 *  - The language in use is remembered, and <html lang dir> always describe
 *    what is on screen, so an English page is never laid out right-to-left.
 *  - The page title belongs to the address, not to the picker.
 *
 * <html lang dir> have two writers, the language provider and the head
 * manager, and the head manager writes late (on an animation frame). When it
 * was handed the route language it sometimes put lang="he" dir="rtl" back over
 * an English or French interface — one load in eighteen on the live site,
 * about half locally. That is a race, so each case is loaded several times and
 * read only after the page has settled.
 */
import { LOAD_BUDGET_MS, expect, pageLanguage, settled, storedValue, test, type Visitor } from './support';

const LOADS_PER_CASE = 4;

const cases: { who: string; path: string; visitor: Visitor; expected: string }[] = [
  { who: 'an English browser, nothing remembered', path: '/', visitor: { locale: 'en-US' }, expected: 'en/ltr' },
  { who: 'a Brazilian Portuguese browser', path: '/', visitor: { locale: 'pt-BR' }, expected: 'pt/ltr' },
  { who: 'a Hebrew browser', path: '/', visitor: { locale: 'he-IL' }, expected: 'he/rtl' },
  { who: 'a browser in a language the site lacks', path: '/', visitor: { locale: 'sv-SE' }, expected: 'he/rtl' },
  {
    who: 'French remembered, English browser',
    path: '/',
    visitor: { locale: 'en-US', stored: { 'vh.lang': 'fr' } },
    expected: 'fr/ltr',
  },
  {
    who: 'English remembered, Hebrew browser',
    path: '/',
    visitor: { locale: 'he-IL', stored: { 'vh.lang': 'en' } },
    expected: 'en/ltr',
  },
  {
    who: 'Hebrew remembered, on the English page',
    path: '/en/',
    visitor: { locale: 'he-IL', stored: { 'vh.lang': 'he' } },
    expected: 'en/ltr',
  },
  {
    who: 'English remembered, on the Arabic page',
    path: '/ar/',
    visitor: { locale: 'en-US', stored: { 'vh.lang': 'en' } },
    expected: 'ar/rtl',
  },
];

test.describe('<html lang dir> match the language on screen on every load', () => {
  test.describe.configure({ timeout: LOADS_PER_CASE * LOAD_BUDGET_MS });

  for (const { who, path, visitor, expected } of cases) {
    test(`${path} for ${who} is ${expected}`, async ({ openAs }) => {
      const [expectedLang, expectedDir] = expected.split('/');
      for (let load = 1; load <= LOADS_PER_CASE; load += 1) {
        const { page, problems } = await openAs(path, visitor);
        expect(await pageLanguage(page), `load ${load}`).toBe(expected);
        expect(await page.locator('h1').first().evaluate((heading) => getComputedStyle(heading).direction), `load ${load}`).toBe(expectedDir);
        expect(await storedValue(page, 'vh.lang'), `load ${load}`).toBe(expectedLang);
        expect(problems, `load ${load}`).toEqual([]);
      }
    });
  }
});

test('the picker changes the language, and the root page then opens in it', async ({ openAs }) => {
  test.setTimeout(2 * LOAD_BUDGET_MS);
  const { page, problems } = await openAs('/en/');

  await page.getByRole('button', { name: 'Select language' }).click();
  await page.getByRole('option', { name: /Deutsch/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await settled(page);
  expect(await pageLanguage(page)).toBe('de/ltr');
  expect(await storedValue(page, 'vh.lang')).toBe('de');

  await page.goto('/');
  await settled(page);
  expect(await pageLanguage(page)).toBe('de/ltr');
  expect(problems).toEqual([]);
});

test('the page title belongs to the address, not to the language in use', async ({ openAs }) => {
  const { page } = await openAs('/', { locale: 'en-US', stored: { 'vh.lang': 'fr' } });

  expect(await pageLanguage(page)).toBe('fr/ltr');
  await expect(page).toHaveTitle(/מחשבון וטרינרי/);
});
