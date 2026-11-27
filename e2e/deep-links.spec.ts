/**
 * Tools are addressed by the URL hash (#/dosage, #/tox/<id>, #/plants, …).
 *
 * How it is supposed to work: a link with a hash opens that tool and scrolls it
 * into view; a link without one leaves the page at the top; choosing a tab
 * updates the address, so Back returns to where the visitor was.
 *
 * The first render cannot know the hash (it must match the prerendered HTML),
 * so the tool is opened and scrolled to right after hydration. This checks that
 * it still happens.
 */
import { expect, test } from './support';

const toolTab = (page: import('@playwright/test').Page, name: string) =>
  page.locator('#tools').getByRole('tab', { name, exact: true });

test('a deep link opens the linked calculator and brings the tools into view', async ({ openAs }) => {
  const { page, problems } = await openAs('/en/#/tox/chocolate');

  await expect(toolTab(page, 'Toxins')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Chocolate / Methylxanthine' })).toBeVisible();
  await expect(page.locator('#tools')).toBeInViewport();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  expect(problems).toEqual([]);
});

test('a page opened without a link stays at the top', async ({ openAs }) => {
  const { page } = await openAs('/en/');

  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('choosing a tab updates the address, and Back returns to the linked tool', async ({ openAs }) => {
  const { page, problems } = await openAs('/en/#/tox/chocolate');

  await toolTab(page, 'Plants').click();
  await expect(page).toHaveURL(/#\/plants$/);
  await expect(toolTab(page, 'Plants')).toHaveAttribute('aria-selected', 'true');

  await page.goBack();
  await expect(page).toHaveURL(/#\/tox\/chocolate$/);
  await expect(toolTab(page, 'Toxins')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Chocolate / Methylxanthine' })).toBeVisible();
  expect(problems).toEqual([]);
});
