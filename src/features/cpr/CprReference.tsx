/**
 * Reference card + source attribution.
 *
 * The card lists the cited basic-life-support and monitoring figures with
 * their recommendation ids. The attribution names The RECOVER Initiative in
 * full with a link (required whenever the RECOVER name is used), states that
 * this tool is independent and not endorsed, and links out to the official
 * algorithm and dosing chart rather than reproducing them.
 */
import { useI18n } from '../../i18n/LanguageProvider';
import { tr } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { RECOVER_2024 } from '../../cpr/recoverGuideline';
import { CPR_REFERENCE_FACTS, CPR_TEXT } from './strings';

const OFFICIAL_GUIDELINES_URL = `${RECOVER_2024.organisationUrl}/2024-guidelines/`;
const LINK = 'font-semibold text-teal underline underline-offset-2';

function ReferenceFacts() {
  const { lang } = useI18n();
  return (
    <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink/90">
      {CPR_REFERENCE_FACTS.map((fact) => (
        <li key={fact.refs + fact.text.en} className="rounded-2xl bg-white/4 px-3.5 py-2.5">
          {tr(fact.text, lang)}{' '}
          <span className="text-[11px] text-muted/70" dir="ltr">
            {fact.refs}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Attribution() {
  const { lang } = useI18n();
  return (
    <div className="flex flex-col gap-2 text-xs leading-relaxed text-muted">
      <p>
        {tr(CPR_TEXT.attributionLead, lang)}{' '}
        <a href={RECOVER_2024.organisationUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          {RECOVER_2024.organisation}
        </a>
        . {tr(CPR_TEXT.attributionJournal, lang)} {tr(CPR_TEXT.attributionIndependent, lang)}
      </p>
      <p className="flex flex-wrap gap-x-4 gap-y-1">
        <a href={OFFICIAL_GUIDELINES_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
          {tr(CPR_TEXT.officialChart, lang)}
        </a>
        <a href={RECOVER_2024.url} target="_blank" rel="noopener noreferrer" className={LINK}>
          {tr(CPR_TEXT.readPaper, lang)}
        </a>
      </p>
    </div>
  );
}

export function CprReference() {
  const { lang } = useI18n();
  return (
    <GlassCard className="flex flex-col gap-3 p-4">
      <h3 className="text-base font-semibold text-ink">{tr(CPR_TEXT.referenceTitle, lang)}</h3>
      <ReferenceFacts />
      <Attribution />
    </GlassCard>
  );
}
