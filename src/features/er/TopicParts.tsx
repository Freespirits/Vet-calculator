/**
 * Building blocks shared by every card in the emergency & critical-care suite.
 *
 *  - TopicShell      title, the countries the evidence comes from, the body,
 *                    the collapsible full reference list and the standing
 *                    "what this is not" notice. Every card uses it, so no card
 *                    can appear without its sources and its limits.
 *  - FactSections    cited statements, each followed by its study key.
 *  - ResultPanel     the live result of an interactive helper (role="status").
 *  - CheckRow        a labelled checkbox row with a ≥44px touch target.
 */
import type { ReactNode } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr, type LocalizedText } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { SourceList } from '../../components/feedback';
import { ShieldIcon } from '../../components/Icons';
import type { FactSection } from '../../emergencies/types';

const TEXT = {
  evidenceFrom: L('הראיות מגיעות מ:', 'Evidence from:'),
  notice: L(
    'סיכום של מחקרים שפורסמו, לאנשי מקצוע וטרינריים. אינו פרוטוקול טיפול ואינו מחליף אבחנה, בדיקה או שיקול דעת קליני. האחריות לכל החלטה היא של הרופא/ה המטפל/ת; האתר ובעליו אינם אחראים לשימוש במידע.',
    'A summary of published studies for veterinary professionals. It is not a treatment protocol and does not replace diagnosis, examination or clinical judgment. Every decision remains the attending veterinarian’s responsibility; the site and its owner accept no liability for use of this information.',
  ),
};

export function TopicShell({
  name,
  regions,
  sources,
  children,
}: {
  name: LocalizedText;
  regions: string[];
  /** Full references, in the order they should be listed. */
  sources: string[];
  children: ReactNode;
}) {
  const { lang } = useI18n();
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h2 className="text-xl font-bold text-ink">{tr(name, lang)}</h2>
        <p className="mt-1 text-xs text-muted">
          {tr(TEXT.evidenceFrom, lang)} {regions.join(' · ')}
        </p>
      </header>
      {children}
      <SourceList sources={sources} />
      <p className="flex items-start gap-2 rounded-2xl bg-white/4 px-3.5 py-3 text-[11px] leading-relaxed text-muted">
        <ShieldIcon size={15} className="mt-0.5 shrink-0" />
        {tr(TEXT.notice, lang)}
      </p>
    </div>
  );
}

export function FactSections({ sections }: { sections: FactSection[] }) {
  const { lang } = useI18n();
  return (
    <>
      {sections.map((section) => (
        <GlassCard key={section.title.en} className="flex flex-col gap-2.5 p-4">
          <h3 className="text-base font-semibold text-ink">{tr(section.title, lang)}</h3>
          <ul className="flex flex-col gap-2.5">
            {section.facts.map((fact) => (
              <li key={fact.text.en} className="text-sm leading-relaxed text-ink/90">
                {tr(fact.text, lang)}{' '}
                <span className="whitespace-nowrap rounded-md bg-white/8 px-1.5 py-0.5 text-[11px] text-muted" dir="ltr">
                  {fact.cite}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </>
  );
}

export function ResultPanel({ tone = 'neutral', children }: { tone?: 'neutral' | 'amber' | 'rose' | 'teal'; children: ReactNode }) {
  const toneClass = {
    neutral: 'border-hairline/40 bg-white/4',
    amber: 'border-amber/45 bg-amber/10',
    rose: 'border-rose/45 bg-rose/10',
    teal: 'border-teal/35 bg-teal/[0.08]',
  }[tone];
  return (
    <div role="status" aria-live="polite" className={`flex flex-col gap-1.5 rounded-2xl border p-3.5 text-sm leading-relaxed text-ink/90 ${toneClass}`}>
      {children}
    </div>
  );
}

export function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl bg-white/4 px-3 py-2 text-sm text-ink/90">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-teal"
      />
      {label}
    </label>
  );
}
