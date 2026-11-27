/**
 * Shock energies for the patient's weight: the first and subsequent external
 * biphasic shock (2 J/kg, then doubled — RECOVER 2024 ALS-12) and the Table 2
 * ranges for the other waveform/paddle combinations. "Log shock" time-stamps a
 * delivered shock; it does not record which energy was used.
 */
import { useI18n } from '../../i18n/LanguageProvider';
import { tr, type LocalizedText } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { formatAmount, type DefibrillationEnergies } from '../../cpr/cprSheet';
import { CPR_TEXT } from './strings';
import type { CodeClock } from './CodeClockPanel';

function joules(value: number): string {
  return `${formatAmount(value)} J`;
}

function joulesRange(range: { min: number; max: number }): string {
  return `${formatAmount(range.min)}–${formatAmount(range.max)} J`;
}

function EnergyLine({ label, value, primary }: { label: LocalizedText; value: string; primary?: boolean }) {
  const { lang } = useI18n();
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/4 px-4 py-2.5">
      <span className="text-sm text-muted">{tr(label, lang)}</span>
      <span className={`tnum font-bold ${primary ? 'text-xl text-ink' : 'text-base text-ink/80'}`} dir="ltr">
        {value}
      </span>
    </div>
  );
}

export function DefibrillationPanel({ energies, code }: { energies: DefibrillationEnergies; code: CodeClock }) {
  const { lang } = useI18n();
  const { biphasic, monophasic, references } = energies;
  return (
    <section aria-label={tr(CPR_TEXT.defibTitle, lang)}>
      <GlassCard className="flex flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-ink">{tr(CPR_TEXT.defibTitle, lang)}</h3>
        <EnergyLine label={CPR_TEXT.defibBiphasicFirst} value={joules(biphasic.externalFirstJ)} primary />
        <EnergyLine label={CPR_TEXT.defibBiphasicNext} value={joules(biphasic.externalSubsequentJ)} primary />
        <EnergyLine label={CPR_TEXT.defibBiphasicInternal} value={joulesRange(biphasic.internalJ)} />
        <EnergyLine label={CPR_TEXT.defibMonoExternal} value={joulesRange(monophasic.externalJ)} />
        <EnergyLine label={CPR_TEXT.defibMonoInternal} value={joulesRange(monophasic.internalJ)} />
        <p className="text-xs leading-relaxed text-muted">
          {tr(CPR_TEXT.defibNote, lang)}{' '}
          <span className="text-[11px] text-muted/70" dir="ltr">
            {references.join(' · ')}
          </span>
        </p>
        {code.running && (
          <button
            type="button"
            onClick={() => code.log('shock')}
            className="min-h-[44px] rounded-xl bg-amber/15 px-4 text-sm font-bold text-amber"
          >
            {tr(CPR_TEXT.logShock, lang)}
          </button>
        )}
      </GlassCard>
    </section>
  );
}
