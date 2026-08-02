/**
 * Guards the two SEO limits a site audit actually enforces.
 *
 * A 2026-08 crawl of vet-holim.work flagged one over-long title (en, 62 chars)
 * and six meta descriptions under 70 characters (ar, ru, zh, ja, hi, tr) — all
 * of which came from falling back to a short dictionary string. These bounds
 * fail the build rather than the next audit.
 */
import { describe, expect, it } from 'vitest';
import { DESCRIPTION, TITLE, structuredData } from './SeoHead';
import { SUPPORTED_LANGS } from '../i18n/languages';

const TITLE_MAX = 60;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;

describe('SEO head copy', () => {
  it.each(SUPPORTED_LANGS)('%s has a title within %i characters', (lang) => {
    const title = TITLE[lang];
    expect(title, `${lang} has no title`).toBeTruthy();
    expect.soft(title.length, `${lang} title is ${title.length} chars`).toBeLessThanOrEqual(
      TITLE_MAX,
    );
  });

  it.each(SUPPORTED_LANGS)('%s has a description of 70–160 characters', (lang) => {
    const description = DESCRIPTION[lang];
    expect(description, `${lang} has no description`).toBeTruthy();
    expect
      .soft(description.length, `${lang} description is ${description.length} chars`)
      .toBeGreaterThanOrEqual(DESCRIPTION_MIN);
    expect
      .soft(description.length, `${lang} description is ${description.length} chars`)
      .toBeLessThanOrEqual(DESCRIPTION_MAX);
  });

  it('has a unique title and description per language', () => {
    expect(new Set(Object.values(TITLE)).size).toBe(SUPPORTED_LANGS.length);
    expect(new Set(Object.values(DESCRIPTION)).size).toBe(SUPPORTED_LANGS.length);
  });

  it.each(SUPPORTED_LANGS)('%s emits parseable JSON-LD with six FAQ entries', (lang) => {
    const raw = structuredData(lang);
    // `<` is escaped so the payload can never close its own <script> tag.
    expect(raw).not.toContain('<');
    const data = JSON.parse(raw.replace(/\\u003c/g, '<'));

    const app = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'WebApplication');
    const faq = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'FAQPage');
    expect(app.inLanguage).toBe(lang);
    expect(app.isAccessibleForFree).toBe(true);
    expect(faq.mainEntity).toHaveLength(6);
    for (const q of faq.mainEntity) {
      expect(q.name.length).toBeGreaterThan(0);
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });
});
