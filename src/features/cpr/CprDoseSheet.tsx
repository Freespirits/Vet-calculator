/**
 * Weight-based dose sheet, grouped by purpose. One row per cited intervention:
 *   name                        total for this patient · draw-up volume   [Log]
 *   per-kg dose · when it is given · which vial strength the volume used
 *   short note summarising the recommendation
 *   recommendation ids (Table 2 / ALS-xx …)
 * The volume appears only when a vial strength is known.
 *
 * A drug the guideline suggests NOT giving to the species (lidocaine in cats)
 * shows the warning instead of a computed dose. While the clock is running,
 * a "Log" button time-stamps the drug in the event log — it records that the
 * team gave it; it does not record or imply a dose.
 */
import { useI18n } from '../../i18n/LanguageProvider';
import { tr, type LocalizedText } from '../../types/toxins';
import type { Species } from '../../types';
import { GlassCard } from '../../components/primitives';
import { formatAmount, type AmountRange, type CprSheetRow } from '../../cpr/cprSheet';
import { hasGiven, type CodeEventKind } from '../../cpr/codeClock';
import type { CprGroup, CprInterventionId } from '../../cpr/recoverGuideline';
import { CPR_TEXT } from './strings';
import type { CodeClock } from './CodeClockPanel';

/** How each intervention is written into the event log; absent = not loggable. */
const LOG_KIND: Partial<Record<CprInterventionId, CodeEventKind>> = {
  epinephrine: 'epinephrine',
  vasopressin: 'vasopressin',
  atropine: 'atropine',
  lidocaine: 'lidocaine',
  amiodarone: 'amiodarone',
  esmolol: 'esmolol',
  naloxone: 'reversal',
  atipamezole: 'reversal',
  flumazenil: 'reversal',
  sodium_bicarbonate: 'note',
  calcium_gluconate: 'note',
  calcium_chloride: 'note',
  fluid_bolus: 'note',
};

const ATROPINE_ALREADY_LOGGED: LocalizedText = {
  he: 'כבר נרשם פעם אחת — לא מומלץ לחזור על המנה (ALS-09)',
  en: 'Already logged once — repeat doses are recommended against (ALS-09)',
};

function formatRange(range: AmountRange, unit: string): string {
  const upper = range.max === undefined ? '' : `–${formatAmount(range.max)}`;
  return `${formatAmount(range.min)}${upper} ${unit}`;
}

function applicabilityWarning(row: CprSheetRow, species: Species): LocalizedText | null {
  if (row.applicability === 'alternative') return CPR_TEXT.alternativeOnly;
  if (row.applicability !== 'not-suggested') return null;
  return species === 'cat' ? CPR_TEXT.notSuggestedCat : CPR_TEXT.notSuggestedDog;
}

/** Keeps a number-with-unit fragment left-to-right inside right-to-left (Hebrew/Arabic) text. */
function Ltr({ children }: { children: string }) {
  return <bdi dir="ltr">{children}</bdi>;
}

function StrengthCaption({ row }: { row: CprSheetRow }) {
  const { lang } = useI18n();
  if (!row.concentration) return <>{tr(CPR_TEXT.volumeNeedsStrength, lang)}</>;
  const origin = row.concentration.origin === 'guideline' ? CPR_TEXT.guidelineStrength : CPR_TEXT.yourVial;
  return (
    <>
      {tr(origin, lang)}: <Ltr>{`${formatAmount(row.concentration.value)} ${row.concentration.unit}`}</Ltr>
    </>
  );
}

function infusionAmounts(infusion: NonNullable<CprSheetRow['infusion']>): string {
  const { microgramsPerMinute, milligramsPerHour, millilitersPerHour } = infusion;
  const volume = millilitersPerHour === undefined ? '' : ` = ${formatAmount(millilitersPerHour)} mL/h`;
  return `${formatAmount(microgramsPerMinute)} µg/min (${formatAmount(milligramsPerHour)} mg/h)${volume}`;
}

function AmountCell({ row }: { row: CprSheetRow }) {
  return (
    <div role="cell" className="flex shrink-0 flex-col items-end" dir="ltr">
      <span className="tnum text-xl font-bold leading-tight text-ink">{formatRange(row.total, row.total.unit)}</span>
      {row.volumeMl && (
        <span className="tnum text-xl font-bold leading-tight text-teal">{formatRange(row.volumeMl, 'mL')}</span>
      )}
    </div>
  );
}

/** "0.01 mg/kg · IV/IO · every 3–5 min · your vial: 1 mg/mL" — the facts behind the big numbers. */
function BasisLine({ row }: { row: CprSheetRow }) {
  const { lang } = useI18n();
  return (
    <span className="tnum text-muted">
      <Ltr>{formatRange(row.dosePerKg, row.dosePerKg.unit)}</Ltr> · {tr(row.timing, lang)}
      {row.total.unit !== 'mL' && (
        <>
          {' · '}
          <StrengthCaption row={row} />
        </>
      )}
    </span>
  );
}

function InfusionLine({ row }: { row: CprSheetRow }) {
  const { lang } = useI18n();
  if (!row.infusion) return null;
  return (
    <span className="tnum font-medium text-ink/90">
      {tr(CPR_TEXT.thenInfusion, lang)}: <Ltr>{infusionAmounts(row.infusion)}</Ltr>
    </span>
  );
}

function LogButton({ row, code }: { row: CprSheetRow; code: CodeClock }) {
  const { lang } = useI18n();
  const kind = LOG_KIND[row.id];
  if (!kind || !code.running) return null;
  const name = tr(row.name, lang);
  const detail = kind === 'reversal' || kind === 'note' ? name : undefined;
  return (
    <button
      type="button"
      onClick={() => code.log(kind, detail)}
      aria-label={`${tr(CPR_TEXT.log, lang)} ${name}`}
      className="min-h-[44px] shrink-0 rounded-xl bg-teal/15 px-4 text-sm font-bold text-teal"
    >
      {tr(CPR_TEXT.log, lang)}
    </button>
  );
}

function RowNotes({ row, species, code }: { row: CprSheetRow; species: Species; code: CodeClock }) {
  const { lang } = useI18n();
  const warning = applicabilityWarning(row, species);
  const atropineRepeated = row.id === 'atropine' && hasGiven(code.state, 'atropine');
  return (
    <div role="cell" className="flex flex-col gap-0.5 text-xs leading-relaxed">
      <BasisLine row={row} />
      <InfusionLine row={row} />
      {warning && <span className="font-semibold text-amber">{tr(warning, lang)}</span>}
      {atropineRepeated && <span className="font-semibold text-rose">{tr(ATROPINE_ALREADY_LOGGED, lang)}</span>}
      {row.note && <span className="text-muted">{tr(row.note, lang)}</span>}
      <span className="text-[11px] text-muted/70" dir="ltr">
        {row.references.join(' · ')}
      </span>
    </div>
  );
}

function DoseRow({ row, species, code }: { row: CprSheetRow; species: Species; code: CodeClock }) {
  const { lang } = useI18n();
  const notSuggested = row.applicability === 'not-suggested';
  return (
    <div role="row" aria-label={tr(row.name, lang)} className="flex flex-col gap-1.5 rounded-2xl bg-white/4 p-3">
      <div className="flex items-center gap-3">
        <div role="cell" className={`min-w-0 flex-1 font-semibold text-ink ${notSuggested ? 'opacity-60' : ''}`}>
          {tr(row.name, lang)}
        </div>
        {!notSuggested && <AmountCell row={row} />}
        <LogButton row={row} code={code} />
      </div>
      <RowNotes row={row} species={species} code={code} />
    </div>
  );
}

const GROUP_ORDER: CprGroup[] = ['vasopressor', 'vagolytic', 'antiarrhythmic', 'reversal', 'situational', 'support'];

const GROUP_LABEL: Record<CprGroup, LocalizedText> = {
  vasopressor: { he: 'וזופרסורים', en: 'Vasopressors' },
  vagolytic: { he: 'וגוליטי', en: 'Vagolytic' },
  antiarrhythmic: { he: 'אנטי-אריתמיים (קצב בר-הלם עמיד)', en: 'Antiarrhythmics (refractory shockable rhythm)' },
  reversal: { he: 'תרופות היפוך', en: 'Reversal agents' },
  situational: { he: 'לפי מצב בלבד', en: 'Situational only' },
  support: { he: 'נוזלים והנשמה', en: 'Fluids and ventilation' },
};

function DoseGroup(props: { group: CprGroup; rows: CprSheetRow[]; species: Species; code: CodeClock }) {
  const { lang } = useI18n();
  const label = tr(GROUP_LABEL[props.group], lang);
  return (
    <div className="flex flex-col gap-1.5">
      <h4 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">{label}</h4>
      <div role="table" aria-label={label} className="flex flex-col gap-1.5">
        {props.rows.map((row) => (
          <DoseRow key={row.id} row={row} species={props.species} code={props.code} />
        ))}
      </div>
    </div>
  );
}

export function CprDoseSheet({
  rows,
  species,
  code,
}: {
  rows: CprSheetRow[];
  species: Species;
  code: CodeClock;
}) {
  const { lang } = useI18n();
  return (
    <GlassCard className="flex flex-col gap-3 p-4">
      <h3 className="text-base font-semibold text-ink">{tr(CPR_TEXT.sheetTitle, lang)}</h3>
      {GROUP_ORDER.map((group) => (
        <DoseGroup
          key={group}
          group={group}
          rows={rows.filter((row) => row.group === group)}
          species={species}
          code={code}
        />
      ))}
    </GlassCard>
  );
}
