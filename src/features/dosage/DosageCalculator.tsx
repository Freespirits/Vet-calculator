import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/LanguageProvider';
import { useCalculator } from '../../hooks/useCalculator';
import { DRUG_DATABASE } from '../../data/drugDatabase';
import { formatVolume } from '../../lib/calculationEngine';
import type { DoseUnit, ConcentrationUnit, AdministrationRoute, Species } from '../../types';
import { GlassCard, CountUp, SegmentedControl } from '../../components/primitives';
import { NumberField, TextField, SelectField } from '../../components/forms';
import { RangeGauge } from '../../components/gauges';
import { WarningList, SourceList, StatPill, type Severity } from '../../components/feedback';
import { DogIcon, CatIcon, PawIcon, SyringeIcon, PillIcon, ScaleIcon, RefreshIcon, CopyIcon, CheckIcon } from '../../components/Icons';

const DOSE_UNITS: DoseUnit[] = ['mg/kg', 'mcg/kg', 'IU/kg', 'mL/kg'];
const CONC_UNITS: ConcentrationUnit[] = ['mg/mL', 'mcg/mL', 'IU/mL'];
const ROUTES: AdministrationRoute[] = ['IV', 'IM', 'SC', 'PO'];

export function DosageCalculator() {
  const { t, lang } = useI18n();
  const { state, result, selectedDrug, validation, isValid, hasInput, updateField, calculate, reset } =
    useCalculator();
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const speciesOpts = [
    { value: 'dog' as Species, label: t('species.dog'), icon: <DogIcon size={20} /> },
    { value: 'cat' as Species, label: t('species.cat'), icon: <CatIcon size={20} /> },
    { value: 'other' as Species, label: t('species.other'), icon: <PawIcon size={20} /> },
  ];

  // Localised inline error for a field (only once the field has a value).
  const errorFor = (field: string, hasValue: boolean) => {
    if (!hasValue) return undefined;
    const err = validation.errors.find((e) => e.field === field);
    return err ? (lang === 'he' ? err.messageHe : err.message) : undefined;
  };

  // Therapeutic reference range for the current species + route.
  const range = useMemo(() => {
    if (!selectedDrug) return null;
    const d = selectedDrug.plumbsDosing.find(
      (x) => x.species === state.species && x.route === state.route,
    );
    if (!d || d.unit !== state.doseUnit) return null;
    return d;
  }, [selectedDrug, state.species, state.route, state.doseUnit]);

  const decimals = 2;

  const handleCopy = async () => {
    if (!result) return;
    const drug = selectedDrug ? (lang === 'he' ? selectedDrug.nameHe : selectedDrug.name) : state.drugName;
    const text = `${drug} — ${formatVolume(result.volumeMl)} ${t('unit.ml')} (${state.weightKg} ${t('unit.kg')} × ${state.dosePerKg} ${state.doseUnit})`;
    try {
      if (canShare) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user dismissed share sheet */
    }
  };

  const warnings = (result?.warnings ?? []).map((w) => ({
    id: w.id,
    severity: w.severity as Severity,
    message: lang === 'he' ? w.messageHe : w.message,
  }));

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/15 text-teal">
            <SyringeIcon size={22} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-ink">{t('dose.title')}</h2>
            <p className="text-sm text-muted">{t('dose.subtitle')}</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculate();
          }}
          className="flex flex-col gap-4"
        >
          {/* species */}
          <div>
            <span className="mb-1.5 block text-sm font-medium text-muted">{t('species.label')}</span>
            <SegmentedControl
              ariaLabel={t('species.label')}
              options={speciesOpts}
              value={state.species}
              onChange={(v) => updateField('species', v)}
            />
          </div>

          <NumberField
            label={t('field.weight')}
            icon={<ScaleIcon size={16} />}
            value={state.weightKg}
            onChange={(v) => updateField('weightKg', v)}
            suffix={t('unit.kg')}
            placeholder="0.0"
            error={errorFor('weightKg', !!state.weightKg)}
          />

          <TextField
            label={t('dose.drug')}
            icon={<PillIcon size={16} />}
            value={state.drugName}
            onChange={(v) => updateField('drugName', v)}
            placeholder={t('dose.drugPlaceholder')}
            list="drug-list"
          />
          <datalist id="drug-list">
            {DRUG_DATABASE.map((d) => (
              <option key={d.id} value={lang === 'he' ? d.nameHe : d.name} />
            ))}
          </datalist>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={t('dose.perKg')}
              value={state.dosePerKg}
              onChange={(v) => updateField('dosePerKg', v)}
              placeholder="0.0"
              error={errorFor('dosePerKg', !!state.dosePerKg)}
            />
            <SelectField
              label={t('dose.doseUnit')}
              value={state.doseUnit}
              onChange={(v) => updateField('doseUnit', v as DoseUnit)}
              options={DOSE_UNITS.map((u) => ({ value: u, label: u }))}
            />
          </div>

          {state.doseUnit !== 'mL/kg' && (
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label={t('dose.concentration')}
                value={state.concentration}
                onChange={(v) => updateField('concentration', v)}
                placeholder="0.0"
                error={errorFor('concentration', !!state.concentration)}
              />
              <SelectField
                label={t('dose.concUnit')}
                value={state.concentrationUnit}
                onChange={(v) => updateField('concentrationUnit', v as ConcentrationUnit)}
                options={CONC_UNITS.map((u) => ({ value: u, label: u }))}
              />
            </div>
          )}

          <SelectField
            label={t('dose.route')}
            value={state.route}
            onChange={(v) => updateField('route', v as AdministrationRoute)}
            options={ROUTES.map((r) => ({ value: r, label: t(`route.${r}`) }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextField
              label={t('dose.frequency')}
              optional={t('common.optional')}
              value={state.frequency}
              onChange={(v) => updateField('frequency', v)}
              placeholder={t('dose.freqPlaceholder')}
            />
            <TextField
              label={t('dose.duration')}
              optional={t('common.optional')}
              value={state.duration}
              onChange={(v) => updateField('duration', v)}
              placeholder={t('dose.durationPlaceholder')}
            />
          </div>

          <div className="mt-1 flex gap-3">
            <button type="submit" disabled={!isValid} className="btn-primary flex-1">
              {t('common.calculate')}
            </button>
            {hasInput && (
              <button type="button" onClick={reset} className="btn-ghost !px-4" aria-label={t('common.reset')}>
                <RefreshIcon size={20} />
              </button>
            )}
          </div>
        </form>
      </GlassCard>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key="dose-result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="overflow-hidden p-5 sm:p-6">
              {/* headline volume */}
              <div className="text-center">
                <div className="text-sm font-medium text-muted">{t('dose.volumeToDraw')}</div>
                <div className="mt-1 flex items-baseline justify-center gap-2">
                  <span className="grad-text text-result font-black">
                    <CountUp value={result.volumeMl} decimals={decimals} />
                  </span>
                  <span className="text-2xl font-bold text-ink/70">{t('unit.ml')}</span>
                </div>
              </div>

              {/* therapeutic range gauge */}
              {range && (
                <div className="mt-6">
                  <div className="mb-2 text-sm font-medium text-muted">{t('dose.therapeuticRange')}</div>
                  <RangeGauge
                    min={range.minDose}
                    max={range.maxDose}
                    value={parseFloat(state.dosePerKg) || 0}
                    unit={range.unit}
                    labelBelow={t('dose.belowRange')}
                    labelIn={t('dose.inRange')}
                    labelAbove={t('dose.aboveRange')}
                  />
                </div>
              )}

              {/* stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatPill
                  label={t('dose.totalDose')}
                  value={`${result.totalDose.toLocaleString(undefined, { maximumFractionDigits: 3 })} ${result.totalDoseUnit}`}
                />
                <StatPill label={t('dose.bodyWeight')} value={`${state.weightKg} ${t('unit.kg')}`} />
              </div>

              {/* warnings */}
              {warnings.length > 0 && (
                <div className="mt-6">
                  <div className="mb-2 text-sm font-medium text-muted">{t('dose.warnings')}</div>
                  <WarningList items={warnings} />
                </div>
              )}

              {/* breakdown */}
              <details className="group mt-5 rounded-2xl bg-white/4 p-1">
                <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium text-muted hover:text-ink">
                  {t('dose.breakdown')}
                </summary>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-3 pb-3 pt-1 text-sm">
                  <dt className="text-muted">{t('dose.bodyWeight')}</dt>
                  <dd className="tnum text-end text-ink">{result.calculationBreakdown.weightKg} {t('unit.kg')}</dd>
                  <dt className="text-muted">{t('dose.doseGiven')}</dt>
                  <dd className="tnum text-end text-ink">{result.calculationBreakdown.dosePerKg} {result.calculationBreakdown.doseUnit}</dd>
                  <dt className="text-muted">{t('dose.totalDose')}</dt>
                  <dd className="tnum text-end text-ink">{result.calculationBreakdown.totalDose.toLocaleString(undefined, { maximumFractionDigits: 3 })}</dd>
                  <dt className="text-muted">{t('dose.rawVolume')}</dt>
                  <dd className="tnum text-end text-ink">{result.calculationBreakdown.rawVolumeMl.toLocaleString(undefined, { maximumFractionDigits: 4 })} {t('unit.ml')}</dd>
                  <dt className="text-muted">{t('dose.roundedVolume')}</dt>
                  <dd className="tnum text-end text-ink">{result.calculationBreakdown.roundedVolumeMl} {t('unit.ml')}</dd>
                </dl>
              </details>

              <button onClick={handleCopy} className="btn-ghost mt-4 w-full">
                {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                {copied ? t('common.copied') : canShare ? t('common.share') : t('common.copy')}
              </button>

              <p className="mt-4 text-center text-xs text-muted">{t('dose.subtitle')}</p>
              <div className="mt-2">
                <SourceList sources={[lang === 'he' ? 'מינונים להמחשה בלבד — יש לאמת מול Plumb\'s Veterinary Drug Handbook ומקורות קליניים.' : "Reference doses for illustration — verify against Plumb's Veterinary Drug Handbook and clinical sources."]} />
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
