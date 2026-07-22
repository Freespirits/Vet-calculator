/**
 * SeoHead — per-language-page head tags, rendered into the static HTML by
 * vite-react-ssg (react-helmet-async under the hood).
 *
 * `page` is the ROUTE language (/ = Hebrew, /en = English), deliberately not
 * the live UI language: canonical + hreflang describe the URL, and must not
 * drift when the user flips the client-side language picker.
 */
import { Head } from 'vite-react-ssg';

const ORIGIN = 'https://vet-holim.work';

const META = {
  he: {
    lang: 'he',
    dir: 'rtl',
    url: `${ORIGIN}/`,
    locale: 'he_IL',
    altLocale: 'en_US',
    title: 'מחשבון וטרינרי · Veterinary Calculator',
    description:
      'מחשבון וטרינרי: מינון תרופות וחישובי רעלים (שוקולד, ענבים, קסיליטול ועוד) לכלבים וחתולים',
  },
  en: {
    lang: 'en',
    dir: 'ltr',
    url: `${ORIGIN}/en/`,
    locale: 'en_US',
    altLocale: 'he_IL',
    title: 'Veterinary Calculator — Drug Dosage & Toxicity for Dogs & Cats',
    description:
      'Free clinical calculator for dogs & cats: 130+ drug dosages and 14 cited toxicity tools (chocolate, grapes, xylitol…). Hebrew, English + 12 more languages.',
  },
} as const;

export type PageLang = keyof typeof META;

export function SeoHead({ page }: { page: PageLang }) {
  const m = META[page];
  return (
    <Head>
      <html lang={m.lang} dir={m.dir} data-theme="dark" />
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <link rel="canonical" href={m.url} />

      {/* Bidirectional hreflang: every page lists itself + the alternate. */}
      <link rel="alternate" hrefLang="he" href={`${ORIGIN}/`} />
      <link rel="alternate" hrefLang="en" href={`${ORIGIN}/en/`} />
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
      <meta property="og:locale:alternate" content={m.altLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.description} />
      <meta name="twitter:image" content={`${ORIGIN}/og.png`} />
    </Head>
  );
}
