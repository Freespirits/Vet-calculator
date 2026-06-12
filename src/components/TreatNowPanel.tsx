/**
 * "Treat now" — decontamination + antidote quick-doses inside a toxin result.
 *
 * Diagnose→treat on one screen: emesis/charcoal verdicts gated per toxin
 * (an emetic dose is never shown where emesis is wrong), antidote rows with
 * the total mg / g / mL computed live from the entered weight, a monitoring
 * line, and the source for every row. Veterinary-professional content — the
 * panel says so and opens collapsed unless the result is an emergency.
 */
import { useState } from 'react';
import { useI18n } from '../i18n/LanguageProvider';
import { tr, type LocalizedText } from '../types/toxins';
import {
  TOXIN_TREATMENTS,
  EMESIS_DOG,
  EMESIS_CAT,
  CHARCOAL_ROW,
  type DeconStatus,
  type TreatmentRow,
  type TreatmentDose,
} from '../data/toxinTreatments';
import { SourceList } from './feedback';
import { SyringeIcon, ChevronDownIcon, ShieldIcon, HeartPulseIcon } from './Icons';

const STATUS_COLOR: Record<DeconStatus, string> = {
  indicated: '#2DD4BF',
  caution: '#F59E0B',
  no: '#F43F5E',
};

function fmt(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1).replace(/\.0$/, '');
  if (n >= 1) return n.toFixed(2).replace(/\.?0+$/, '');
  return n.toPrecision(2);
}

/** "0.02–0.06 mg/kg" and, with a weight, "→ 0.6–1.8 mg (0.6–1.8 mL)". */
function doseLine(dose: TreatmentDose, weightKg: number | null, concMgMl?: number): { basis: string; total?: string } {
  const range = (lo: number, hi?: number) => (hi && hi !== lo ? `${fmt(lo)}–${fmt(hi)}` : fmt(lo));
  const basis = `${range(dose.min, dose.max)} ${dose.unit}`;
  if (!weightKg || weightKg <= 0) return { basis };

  const unitTotal = dose.unit.replace('/kg', '');
  const lo = dose.min * weightKg;
  const hi = (dose.max ?? dose.min) * weightKg;
  let total = `${range(lo, hi)} ${unitTotal}`;

  if (concMgMl && (dose.unit === 'mg/kg' || dose.unit === 'mcg/kg')) {
    const k = dose.unit === 'mcg/kg' ? 0.001 : 1;
    const mlLo = (lo * k) / concMgMl;
    const mlHi = (hi * k) / concMgMl;
    total += ` (${range(mlLo, mlHi)} mL)`;
  }
  return { basis, total };
}

function DeconLine({
  label,
  status,
  note,
}: {
  label: string;
  status: DeconStatus;
  note: LocalizedText;
}) {
  const { t, lang } = useI18n();
  const color = STATUS_COLOR[status];
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ink/85">{label}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-bold"
          style={{ background: `${color}24`, color }}
        >
          {t(`treat.status.${status}`)}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-muted">{tr(note, lang)}</p>
    </div>
  );
}

function Row({ row, weightKg }: { row: TreatmentRow; weightKg: number | null }) {
  const { lang } = useI18n();
  const computed = row.dose ? doseLine(row.dose, weightKg, row.concMgMl) : null;
  return (
    <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <span className="text-sm font-semibold text-ink/90">{tr(row.name, lang)}</span>
        <span className="text-xs text-muted">{row.route}</span>
      </div>
      {computed && (
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          {computed.total && (
            <span className="tnum text-base font-bold text-teal" dir="ltr">
              {computed.total}
            </span>
          )}
          <span className="tnum text-xs text-muted" dir="ltr">
            {computed.basis}
          </span>
        </div>
      )}
      {row.doseText && <p className="mt-1 text-sm text-ink/85">{tr(row.doseText, lang)}</p>}
      {row.note && <p className="mt-1 text-xs leading-relaxed text-muted">{tr(row.note, lang)}</p>}
    </div>
  );
}

export function TreatNowPanel({
  toxinId,
  weightKg,
  emergency,
}: {
  toxinId: string;
  /** Parsed weight from the calculator; null when absent (e.g. lily). */
  weightKg: number | null;
  /** Emergency results open the panel by default. */
  emergency: boolean;
}) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(emergency);
  const plan = TOXIN_TREATMENTS[toxinId];
  if (!plan) return null;

  const emesisRows: TreatmentRow[] = plan.emesis === 'no' ? [] : [EMESIS_DOG, EMESIS_CAT];
  const charcoalRows: TreatmentRow[] = plan.charcoal === 'no' ? [] : [CHARCOAL_ROW];

  return (
    <div className="mt-4 overflow-hidden rounded-2xl" style={{ background: 'rgba(45,212,191,0.07)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-4 text-start"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-teal">
          <SyringeIcon size={16} />
          {t('treat.title')}
        </span>
        <ChevronDownIcon
          size={18}
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-2.5 px-4 pb-4">
          {/* decontamination verdicts */}
          <DeconLine label={t('treat.emesis')} status={plan.emesis} note={plan.emesisNote} />
          {plan.emesis !== 'no' && emesisRows.map((r, i) => <Row key={`e${i}`} row={r} weightKg={weightKg} />)}
          <DeconLine label={t('treat.charcoal')} status={plan.charcoal} note={plan.charcoalNote} />
          {plan.charcoal !== 'no' && charcoalRows.map((r, i) => <Row key={`c${i}`} row={r} weightKg={weightKg} />)}

          {/* antidotes / key treatments */}
          {plan.rows.map((r, i) => (
            <Row key={i} row={r} weightKg={weightKg} />
          ))}

          {/* monitoring */}
          <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-ink/80">
              <HeartPulseIcon size={15} className="text-muted" />
              {t('treat.monitoring')}
            </div>
            <p className="text-sm leading-relaxed text-ink/85">{tr(plan.monitoring, lang)}</p>
          </div>

          <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
            <ShieldIcon size={13} className="mt-0.5 shrink-0" />
            {t('treat.disclaimer')}
          </p>

          <SourceList sources={plan.sources} />
        </div>
      )}
    </div>
  );
}
