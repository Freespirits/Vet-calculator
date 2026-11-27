/**
 * Dark is the default theme; light is opt-in and remembered in localStorage.
 *
 * How it is supposed to work: the toggle switches <html data-theme> at once,
 * and the chosen theme is still there after a reload — on every language page
 * and however the visitor arrived.
 *
 * <html data-theme> has two writers, the theme hook and the head manager, and
 * the head manager writes late (on an animation frame). When it was handed a
 * constant "dark" it overwrote a saved light theme on reload. That is a race,
 * so the saved-theme check loads each page several times.
 */
import { expect, pageTheme, settled, storedValue, test } from './support';

const LOADS_PER_PAGE = 3;

test('the toggle switches the theme, and the choice survives a reload', async ({ openAs }) => {
  const { page, problems } = await openAs('/en/');
  expect(await pageTheme(page)).toBe('dark');

  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await storedValue(page, 'vh.theme')).toBe('light');

  await page.reload();
  await settled(page);
  expect(await pageTheme(page)).toBe('light');

  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await settled(page);
  expect(await pageTheme(page)).toBe('dark');
  expect(problems).toEqual([]);
});

test.describe('a saved light theme is still applied once the page has settled', () => {
  for (const path of ['/', '/en/', '/ar/', '/en/#/tox/chocolate']) {
    test(`on ${path}`, async ({ openAs }) => {
      for (let load = 1; load <= LOADS_PER_PAGE; load += 1) {
        const { page, problems } = await openAs(path, { stored: { 'vh.theme': 'light' } });
        expect(await pageTheme(page), `load ${load} of ${path}`).toBe('light');
        expect(await storedValue(page, 'vh.theme'), `load ${load} of ${path}`).toBe('light');
        expect(problems, `load ${load} of ${path}`).toEqual([]);
      }
    });
  }
});
