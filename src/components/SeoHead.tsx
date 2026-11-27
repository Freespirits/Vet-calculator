/**
 * SeoHead — per-language-page head tags, rendered into the static HTML by
 * vite-react-ssg (react-helmet-async under the hood).
 *
 * `page` is the ROUTE language (/ = Hebrew, /<code>/ = the other thirteen),
 * deliberately not the live UI language: canonical + hreflang describe the
 * URL, and must not drift when the user flips the client-side picker.
 *
 * The copy itself (titles, descriptions, URLs, JSON-LD) lives in seoMeta.ts.
 *
 * Theme: the head manager copies the <html> attributes given here onto the
 * document in the browser too, and it does so after the theme hook has run.
 * `data-theme` is therefore taken from the theme hook rather than written as a
 * constant: a constant "dark" overwrote a visitor's saved light theme on every
 * reload (the toggle showed the light state while the page stayed dark). The
 * prerendered HTML is unchanged — the hook reports "dark" while prerendering.
 */
import { Head } from 'vite-react-ssg';
import { useTheme } from '../hooks/useTheme';
import { LANGUAGES } from '../i18n/languages';
import { OG_LOCALE, ORIGIN, metaFor, structuredData, urlFor, type PageLang } from './seoMeta';

export function SeoHead({ page }: { page: PageLang }) {
  const m = metaFor(page);
  const { theme } = useTheme();
  return (
    <Head>
      <html lang={m.lang} dir={m.dir} data-theme={theme} />
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

      <script type="application/ld+json">{structuredData(page)}</script>
    </Head>
  );
}
