/**
 * SeoHead — per-language-page head tags, rendered into the static HTML by
 * vite-react-ssg (react-helmet-async under the hood).
 *
 * `page` is the ROUTE language (/ = Hebrew, /<code>/ = the other thirteen),
 * deliberately not the live UI language: canonical + hreflang describe the
 * URL, and must not drift when the user flips the client-side picker.
 *
 * Titles and descriptions are hand-written per language rather than falling
 * back to a dictionary string. The fallback used to be `hero.subtitle`, which
 * left six languages (ar, ru, zh, ja, hi, tr) with meta descriptions of 22–68
 * characters — well under the ~70–160 range search engines will render. TITLE
 * and DESCRIPTION below are length-checked by seoHead.test.ts.
 *
 * The JSON-LD block describes the page as a free WebApplication and mirrors the
 * six on-page FAQ entries as a FAQPage, in the page's own language, so answer
 * engines can quote the site without executing JavaScript.
 */
import { Head } from 'vite-react-ssg';
import { LANGUAGES, dirOf, type Lang } from '../i18n/languages';
import { FAQ_KEYS } from './AboutSection';
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

/** Search engines truncate past ~60 characters; keep the keyword first. */
export const TITLE: Record<Lang, string> = {
  he: 'מחשבון וטרינרי · מינון ורעילות לכלבים וחתולים',
  en: 'Veterinary Calculator — Dog & Cat Dosage, Toxicity',
  ar: 'حاسبة بيطرية — جرعات الأدوية والسميّة للكلاب والقطط',
  es: 'Calculadora veterinaria: dosis y toxicidad en perros',
  fr: 'Calculateur vétérinaire : posologie et toxicité',
  de: 'Veterinärrechner: Dosierung und Toxizität für Hunde',
  ru: 'Ветеринарный калькулятор доз и токсичности',
  pt: 'Calculadora veterinária: dose e toxicidade em cães',
  it: 'Calcolatore veterinario: dosaggio e tossicità',
  zh: '兽医计算器 — 犬猫用药剂量与毒性计算',
  hi: 'पशु चिकित्सा कैलकुलेटर: खुराक और विषाक्तता',
  ja: '獣医用計算ツール — 犬猫の薬用量と中毒量',
  tr: 'Veteriner hesaplayıcı: köpek ve kedi dozu, toksisite',
  pl: 'Kalkulator weterynaryjny: dawki i toksyczność',
};

/** ~70–160 characters: shorter and Google writes its own snippet instead. */
export const DESCRIPTION: Record<Lang, string> = {
  he: 'מחשבון וטרינרי חינמי לכלבים ולחתולים: נפח להזרקה לפי משקל, יותר מ-130 טווחי מינון ייחוס, 14 מחשבוני רעילות (שוקולד, ענבים, קסיליטול) וספריית צמחים רעילים.',
  en: 'Free clinical calculator for dogs & cats: 130+ drug dosages and 14 cited toxicity tools (chocolate, grapes, xylitol…). Hebrew, English + 12 more languages.',
  ar: 'حاسبة بيطرية مجانية للكلاب والقطط: حجم الحقن حسب الوزن، أكثر من 130 نطاق جرعة مرجعية، و14 حاسبة سميّة موثّقة (الشوكولاتة، العنب، الزيليتول)، ومكتبة نباتات سامة.',
  es: 'Calculadora veterinaria gratuita para perros y gatos: volumen a cargar según el peso, 130+ rangos de dosis, 14 calculadoras de toxicidad y plantas tóxicas.',
  fr: 'Calculateur vétérinaire gratuit pour chiens et chats : volume à prélever selon le poids, 130+ fourchettes de doses, 14 calculs de toxicité et plantes toxiques.',
  de: 'Kostenloser Veterinärrechner für Hunde und Katzen: Injektionsvolumen nach Gewicht, über 130 Referenz-Dosisbereiche, 14 Toxizitätsrechner und giftige Pflanzen.',
  ru: 'Бесплатный ветеринарный калькулятор для собак и кошек: объём для инъекции по массе, свыше 130 диапазонов доз, 14 калькуляторов токсичности и ядовитые растения.',
  pt: 'Calculadora veterinária gratuita para cães e gatos: volume a aspirar pelo peso, mais de 130 faixas de dose, 14 calculadoras de toxicidade e plantas tóxicas.',
  it: 'Calcolatore veterinario gratuito per cani e gatti: volume da prelevare in base al peso, oltre 130 intervalli di dose, 14 calcoli di tossicità e piante tossiche.',
  zh: '面向犬猫的免费兽医计算器：按体重计算注射抽取体积，130 多种参考剂量范围，14 个附引用的毒性计算器（巧克力、葡萄、木糖醇），以及有毒植物图库。',
  hi: 'कुत्तों और बिल्लियों के लिए नि:शुल्क पशु चिकित्सा कैलकुलेटर: वज़न के अनुसार इंजेक्शन आयतन, 130+ खुराक श्रेणियाँ, 14 विषाक्तता कैलकुलेटर और विषैले पौधे।',
  ja: '犬と猫のための無料の獣医用計算ツール。体重から吸引量を算出し、130 を超える参考用量レンジ、出典付きの中毒計算 14 種（チョコレート、ブドウ、キシリトール）、有毒植物ライブラリを収載。',
  tr: 'Köpek ve kediler için ücretsiz veteriner hesaplayıcı: ağırlığa göre enjeksiyon hacmi, 130+ referans doz aralığı, 14 toksisite hesaplayıcısı ve zehirli bitkiler.',
  pl: 'Bezpłatny kalkulator weterynaryjny dla psów i kotów: objętość do nabrania wg masy ciała, 130+ zakresów dawek, 14 kalkulatorów toksyczności i rośliny trujące.',
};

/** Hebrew is the root page and the x-default; every other language gets /<code>/. */
export const pathFor = (lang: Lang): string => (lang === 'he' ? '/' : `/${lang}/`);
export const urlFor = (lang: Lang): string => `${ORIGIN}${pathFor(lang)}`;

export type PageLang = Lang;

function metaFor(page: Lang) {
  return {
    lang: page,
    dir: dirOf(page),
    url: urlFor(page),
    locale: OG_LOCALE[page],
    title: TITLE[page],
    description: DESCRIPTION[page],
  };
}

/**
 * JSON-LD for the page's own language. `</script>` and `<!--` inside a string
 * would end the block early, so escape `<` — the only character that can.
 */
export function structuredData(page: Lang): string {
  const dict = DICTS[page];
  const m = metaFor(page);

  const graph = [
    {
      '@type': 'WebApplication',
      '@id': `${m.url}#app`,
      name: dict['brand.name'],
      alternateName: 'Vet-Holim',
      url: m.url,
      description: m.description,
      inLanguage: page,
      applicationCategory: 'HealthApplication',
      applicationSubCategory: 'Veterinary drug dosage and toxicity calculator',
      operatingSystem: 'Any (web browser)',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        dict['about.dosage.title'],
        dict['about.toxins.title'],
        dict['about.plants.title'],
        dict['about.patient.title'],
      ],
      audience: { '@type': 'MedicalAudience', audienceType: 'Veterinarian' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${m.url}#faq`,
      inLanguage: page,
      mainEntity: FAQ_KEYS.map(({ q, a }) => ({
        '@type': 'Question',
        name: dict[q],
        acceptedAnswer: { '@type': 'Answer', text: dict[a] },
      })),
    },
  ];

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  );
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

      <script type="application/ld+json">{structuredData(page)}</script>
    </Head>
  );
}
