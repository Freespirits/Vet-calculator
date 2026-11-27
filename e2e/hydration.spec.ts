/**
 * The pages are prerendered to HTML and then hydrated. If the browser's first
 * render differs from that HTML, React throws the HTML away, reports error #418
 * and builds the page again: the visitor pays for the page twice.
 *
 * How it is supposed to work: whatever a visitor brings — a deep link, saved
 * settings, a browser language, OS preferences — the prerendered page is kept,
 * and no error of any kind reaches the console.
 */
import { SUPPORTED_LANGS } from '../src/i18n/languages';
import { expect, pageLanguage, test, type Visitor } from './support';

const PATIENT_SESSION = JSON.stringify({
  patient: { id: 'p', name: 'Rex', species: 'dog', weightKg: 20 },
  medications: [],
});

const visits: { who: string; path: string; visitor?: Visitor }[] = [
  { who: 'a first visit to the Hebrew root page', path: '/', visitor: { locale: 'he-IL' } },
  { who: 'a first visit to the English page', path: '/en/' },
  { who: 'a deep link to a toxin calculator', path: '/#/tox/chocolate', visitor: { locale: 'he-IL' } },
  { who: 'a deep link on the English page', path: '/en/#/plants' },
  { who: 'a deep link to Code Blue', path: '/#/cpr' },
  { who: 'a deep link to a field emergency', path: '/en/#/er/heat' },
  { who: 'a saved light theme', path: '/en/', visitor: { stored: { 'vh.theme': 'light' } } },
  { who: 'a remembered language on the root page', path: '/', visitor: { stored: { 'vh.lang': 'fr' } } },
  { who: 'a browser language other than the page language', path: '/', visitor: { locale: 'en-US' } },
  { who: 'the OS reduce-motion setting', path: '/', visitor: { reducedMotion: true } },
  { who: 'the OS reduce-motion setting on the English page', path: '/en/', visitor: { reducedMotion: true } },
  { who: 'the OS light colour scheme', path: '/', visitor: { colorScheme: 'light' } },
  {
    who: 'a stored patient session',
    path: '/#/patient',
    visitor: { stored: { '@vetcalc_web_patient_session': PATIENT_SESSION } },
  },
  {
    who: 'stored accessibility settings',
    path: '/',
    visitor: { stored: { 'vh.a11y': JSON.stringify({ contrast: true, fontScale: 1.2, reduceMotion: true }) } },
  },
];

test.describe('the prerendered page is kept', () => {
  for (const { who, path, visitor } of visits) {
    test(`for ${who}`, async ({ openAs }) => {
      const { problems } = await openAs(path, visitor);
      expect(problems).toEqual([]);
    });
  }
});

test.describe('every language page', () => {
  for (const language of SUPPORTED_LANGS) {
    const path = language === 'he' ? '/' : `/${language}/`;

    test(`${path} loads cleanly in its own language`, async ({ openAs }) => {
      // The root page follows the browser language, so give it a Hebrew browser.
      const { page, problems } = await openAs(path, { locale: language === 'he' ? 'he-IL' : 'en-US' });
      expect(await pageLanguage(page)).toMatch(new RegExp(`^${language}/`));
      expect(problems).toEqual([]);
    });
  }
});
