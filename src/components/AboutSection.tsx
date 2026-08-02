/**
 * AboutSection — the site's server-rendered prose.
 *
 * Everything else on the page is a control surface: the tools render labels and
 * numbers, not sentences, so a crawler that never clicks a tab saw ~100 words
 * per URL and every language page was flagged as thin content. This section is
 * plain semantic markup with no lazy loading, no client-only gating and no
 * animation, so vite-react-ssg bakes the full text of all fourteen languages
 * into their static HTML.
 *
 * Heading levels continue the page outline (h1 in the hero → h2 here → h3 per
 * card) so the Lighthouse heading-order audit stays clean. The FAQ is <details>
 * so it stays compact on mobile while the answers remain in the DOM — closed
 * <details> content is still indexed, and still readable by screen readers.
 */
import { useI18n } from '../i18n/LanguageProvider';

const TOPICS = [
  { title: 'about.dosage.title', body: 'about.dosage.body' },
  { title: 'about.toxins.title', body: 'about.toxins.body' },
  { title: 'about.plants.title', body: 'about.plants.body' },
  { title: 'about.patient.title', body: 'about.patient.body' },
] as const;

export const FAQ_KEYS = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
] as const;

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="mx-auto w-full max-w-2xl scroll-mt-20 px-4 pb-10 pt-4">
      <h2 className="mb-3 text-xl font-semibold text-ink">{t('about.title')}</h2>
      <p className="text-sm leading-relaxed text-muted">{t('about.lead')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {TOPICS.map(({ title, body }) => (
          <article key={title} className="rounded-4xl bg-white/4 p-5">
            <h3 className="mb-1.5 text-sm font-semibold text-ink/90">{t(title)}</h3>
            <p className="text-xs leading-relaxed text-muted">{t(body)}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-4xl bg-white/4 p-5">
        <h3 className="mb-1.5 text-sm font-semibold text-ink/90">{t('about.who.title')}</h3>
        <p className="text-xs leading-relaxed text-muted">{t('about.who.body')}</p>
      </div>

      <h2 className="mb-3 mt-10 text-xl font-semibold text-ink">{t('faq.title')}</h2>
      <div className="divide-y divide-white/8 overflow-hidden rounded-4xl bg-white/4">
        {FAQ_KEYS.map(({ q, a }) => (
          <details key={q} className="group px-5 py-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-ink/90 marker:content-none">
              <h3 className="inline">{t(q)}</h3>
              <span aria-hidden="true" className="float-end text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-xs leading-relaxed text-muted">{t(a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
