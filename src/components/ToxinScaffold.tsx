/**
 * Shared chrome for every toxin calculator: titled glass card, species
 * toggle (when the toxin supports >1 species), body-weight field, the
 * toxin-specific inputs (children), and the rendered result.
 */
import { type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { tr, type ToxinMeta, type ToxinResult, type ToxSpecies } from '../types/toxins';
import { GlassCard, SegmentedControl } from './primitives';
import { NumberField } from './forms';
import { ToxinResultView } from './ToxinResultView';
import { ToxinArt } from './ToxinArt';
import { DogIcon, CatIcon, ScaleIcon } from './Icons';

export function ToxinScaffold({
  meta,
  species,
  onSpecies,
  weightKg,
  onWeightKg,
  weightError,
  children,
  result,
  showWeight = true,
}: {
  meta: ToxinMeta;
  species: ToxSpecies;
  onSpecies: (s: ToxSpecies) => void;
  weightKg: string;
  onWeightKg: (v: string) => void;
  weightError?: string;
  children: ReactNode;
  result: ToxinResult | null;
  showWeight?: boolean;
}) {
  const { t, lang } = useI18n();

  const speciesOpts = meta.species.map((s) => ({
    value: s,
    label: t(`species.${s}`),
    icon: s === 'dog' ? <DogIcon size={20} /> : <CatIcon size={20} />,
  }));

  return (
    <div>
      <GlassCard className="p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-2xl"
            style={{ background: `${meta.accent}1F` }}
          >
            <ToxinArt id={meta.id} size={34} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-ink">{tr(meta.name, lang)}</h2>
            <p className="text-sm text-muted">{tr(meta.blurb, lang)}</p>
          </div>
        </div>

        {/* What is this? — plain-language explainer, never just a name */}
        <p
          className="mb-5 border-s-2 ps-3 text-sm leading-relaxed text-ink/85"
          style={{ borderColor: meta.accent }}
        >
          {tr(meta.about, lang)}
        </p>

        <div className="flex flex-col gap-4">
          {meta.species.length > 1 && (
            <div>
              <span className="mb-1.5 block text-sm font-medium text-muted">{t('species.label')}</span>
              <SegmentedControl
                ariaLabel={`${meta.id}-species`}
                options={speciesOpts}
                value={species}
                onChange={onSpecies}
              />
            </div>
          )}

          {showWeight && (
            <NumberField
              label={t('field.weight')}
              icon={<ScaleIcon size={16} />}
              value={weightKg}
              onChange={onWeightKg}
              suffix={t('unit.kg')}
              placeholder="0.0"
              error={weightError}
            />
          )}

          {children}
        </div>
      </GlassCard>

      <AnimatePresence mode="wait">
        {result && (
          <ToxinResultView
            key={`${meta.id}-${result.level}-${result.doseLabel}`}
            result={result}
            title={tr(meta.name, lang)}
            toxinId={meta.id}
            weightKg={parseFloat(weightKg) > 0 ? parseFloat(weightKg) : null}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/** Small helper: amount input with a g/oz unit toggle, returns grams. */
export function gramsFrom(amount: string, unit: 'g' | 'oz'): number {
  const n = parseFloat(amount);
  if (!isFinite(n) || n <= 0) return 0;
  return unit === 'oz' ? n * 28.3495 : n;
}
