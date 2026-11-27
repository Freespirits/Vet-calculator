/**
 * The dosage calculator's headline number is the volume to draw up, and it
 * counts up to its value when a result appears.
 *
 * How it is supposed to work: the number rises from 0 to the calculated volume
 * and stops on exactly that; nothing shown on the way is negative or above the
 * result. With reduced motion the volume is shown at once.
 *
 * It once read "-0.0" for a single frame on every calculation: a frame is
 * stamped with the time it began, slightly before the clock reading the count
 * started from. jsdom has no animation frames, so only a real browser sees it.
 *
 * The inputs are arithmetic, not a clinical example:
 * 10 kg × 2 mg/kg ÷ 50 mg/mL = 0.4 mL.
 */
import type { Page } from '@playwright/test';
import { expect, test } from './support';

const VOLUME = '[data-testid="dose-volume"] .tnum';
const EXPECTED_VOLUME = '0.4';

type RecordingWindow = Window & { shownVolumes?: string[] };

/** Records every distinct text the volume shows from now on. */
async function recordShownVolumes(page: Page): Promise<void> {
  await page.evaluate((volumeSelector) => {
    const shown: string[] = [];
    (window as RecordingWindow).shownVolumes = shown;
    const noteCurrentVolume = () => {
      const text = document.querySelector(volumeSelector)?.textContent;
      if (text != null && shown[shown.length - 1] !== text) shown.push(text);
    };
    new MutationObserver(noteCurrentVolume).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }, VOLUME);
}

const shownVolumes = (page: Page): Promise<string[]> =>
  page.evaluate(() => (window as RecordingWindow).shownVolumes ?? []);

async function calculate(page: Page): Promise<void> {
  await page.getByLabel('Body weight').first().fill('10');
  await page.locator('input[list="drug-list"]').fill('Arithmetic check');
  await page.getByLabel('Dose per kg').first().fill('2');
  await page.getByLabel('Concentration').first().fill('50');
  await recordShownVolumes(page);
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.locator(VOLUME)).toHaveText(EXPECTED_VOLUME);
}

test('the volume counts up to the result and never reads as negative', async ({ openAs }) => {
  const { page, problems } = await openAs('/en/#/dosage');
  await calculate(page);

  const shown = await shownVolumes(page);
  const numbers = shown.map(Number);
  expect(shown.at(-1)).toBe(EXPECTED_VOLUME);
  expect(shown.length, `shown: ${shown.join(', ')}`).toBeGreaterThan(1);
  expect(shown.filter((text) => text.startsWith('-')), `shown: ${shown.join(', ')}`).toEqual([]);
  expect(numbers, `shown: ${shown.join(', ')}`).toEqual([...numbers].sort((first, second) => first - second));
  expect(Math.max(...numbers)).toBe(Number(EXPECTED_VOLUME));
  expect(problems).toEqual([]);
});

test('with reduced motion the volume is shown at once', async ({ openAs }) => {
  const { page, problems } = await openAs('/en/#/dosage', { reducedMotion: true });
  await calculate(page);

  expect(await shownVolumes(page)).toEqual([EXPECTED_VOLUME]);
  expect(problems).toEqual([]);
});
