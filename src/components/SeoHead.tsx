/**
 * SeoHead — per-language-page head tags, rendered into the static HTML by
 * vite-react-ssg (react-helmet-async under the hood).
 *
 * `page` is the ROUTE language (/ = Hebrew, /<code>/ = the other thirteen),
 * deliberately not the live UI language: canonical + hreflang describe the
 * URL, and must not drift when the user flips the client-side picker.
 *
 * Titles and descriptions come from the i18n dictionaries themselves, so the
 * head copy always matches the visible page text (which is what Google reads
 * language from). Hebrew and English carry hand-tuned richer descriptions.
 */
import { Head } from 'vite-react-ssg';
import { LANGUAGES, dirOf, type Lang } from '../i18n/languages';
import { he } from '../i18n/he';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';
import { es } from '../i18n/es';
import { fr } from '../i18n/fr';
import { de } from '../i18n/de';
import { ru } from '../i18n/ru';
import { pt } from '../i18n/pt';
import { it } from '../i18n/it';
import { zh } from '../i18n/zh';
import { hi } from '../i18n/hi';
import { ja } from '../i18n/ja';
import { tr } from '../i18n/tr';
import { pl } from '../i18n/pl';

const ORIGIN = 'https://vet-holim.work';

const DICTS: Record<Lang, Record<string, string>> = {
  he, en, ar, es, fr, de, ru, pt, it, zh, hi, ja, tr, pl,
};

const OG_LOCALE: Record<Lang, string> = {
  he: 'he_IL', en: 'en_US', ar: 'ar_AR', es: 'es_ES', fr: 'fr_FR',
  de: 'de_DE', ru: 'ru_RU', pt: 'pt_PT', it: 'it_IT', zh: 'zh_CN',
  hi: 'hi_IN', ja: 'ja_JP', tr: 'tr_TR', pl: 'pl_PL',
};

/** Hebrew is the root page and the x-default; every other language gets /<code>/. */
export const pathFor = (lang: Lang): string => (lang === 'he' ? '/' : `/${lang}/`);
export const urlFor = (lang: Lang): string => `${ORIGIN}${pathFor(lang)}`;

export type PageLang = Lang;

const CUSTOM = {
  he: {
    title: 'מחשבון וטרינרי · Veterinary Calculator',
    description:
      'מחשבון וטרינרי: מינון תרופות וחישובי רעלים (שוקולד, ענבים, קסיליטול ועוד) לכלבים וחתולים',
  },
  en: {
    title: 'Veterinary Calculator — Drug Dosage & Toxicity for Dogs & Cats',
    description:
      'Free clinical calculator for dogs & cats: 130+ drug dosages and 14 cited toxicity tools (chocolate, grapes, xylitol…). Hebrew, English + 12 more languages.',
  },
} as const;

function metaFor(page: Lang) {
  const dict = DICTS[page];
  const custom = page === 'he' || page === 'en' ? CUSTOM[page] : null;
  return {
    lang: page,
    dir: dirOf(page),
    url: urlFor(page),
    locale: OG_LOCALE[page],
    title: custom?.title ?? `${dict['brand.name']} · Veterinary Calculator`,
    description: custom?.description ?? dict['hero.subtitle'],
  };
}

export function SeoHead({ page }: { page: PageLang }) {
  const m = metaFor(page);
  return (
    <Head>
      <html lang={m.lang} dir={m.dir} data-theme="dark" />
      <meta name="google-site-verification" content="_jEDp9adv4E7AlXwWmvQf1Y6Hi-SjTLJr5LzAl4IgWU" />
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <link rel="canonical" href={m.url} />

      {/* Bidirectional hreflang: every page lists all fourteen + x-default. */}
      {LANGUAGES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={urlFor(l.code)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${ORIGIN}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Vet-Holim · וט־חולים" />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      <meta property="og:url" content={m.url} />
      <meta property="og:image" content={`${ORIGIN}/og.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={m.locale} />
      {page !== 'he' && <meta property="og:locale:alternate" content={OG_LOCALE.he} />}
      {page !== 'en' && <meta property="og:locale:alternate" content={OG_LOCALE.en} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.description} />
      <meta name="twitter:image" content={`${ORIGIN}/og.png`} />
    </Head>
  );
}
