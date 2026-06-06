import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold, gramsFrom } from '../../components/ToxinScaffold';
import { SelectField, NumberField, MeasureField } from '../../components/forms';
import { ChocolateIcon } from '../../components/Icons';
import { CHOCOLATE_TYPES, chocolateTmPerG, computeChocolate } from './calc';

export const chocolateMeta: ToxinMeta = {
  id: 'chocolate',
  name: L('שוקולד / מתילקסנטינים', 'Chocolate / Methylxanthine'),
  blurb: L('תאוברומין וקפאין לפי סוג וכמות', 'Theobromine & caffeine by type and amount'),
  species: ['dog', 'cat'],
  accent: '#A87B4F',
  Icon: ChocolateIcon,
};

export function ChocolateCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [typeId, setTypeId] = useState('milk');
  const [darkPercent, setDarkPercent] = useState('70');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'g' | 'oz'>('g');

  const isDark = CHOCOLATE_TYPES.find((c) => c.id === typeId)?.isDark;

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const grams = gramsFrom(amount, unit);
    const pct = parseFloat(darkPercent) || 0;
    if (!isFinite(w) || w <= 0 || grams <= 0) return null;
    if (chocolateTmPerG(typeId, pct) <= 0 && typeId !== 'white') return null;
    return computeChocolate({ species, weightKg: w, grams, typeId, darkPercent: pct });
  }, [species, weightKg, amount, unit, typeId, darkPercent]);

  return (
    <ToxinScaffold
      meta={chocolateMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={typeId}
        onChange={setTypeId}
        options={CHOCOLATE_TYPES.map((c) => ({ value: c.id, label: tr(c.name, lang) }))}
      />

      {isDark && (
        <NumberField
          label={lang === 'he' ? 'אחוז קקאו' : 'Cacao percentage'}
          value={darkPercent}
          onChange={setDarkPercent}
          suffix="%"
          placeholder="70"
        />
      )}

      <MeasureField
        label={t('tox.amount')}
        unitLabel={t('common.unit')}
        value={amount}
        onChange={setAmount}
        unit={unit}
        onUnit={(v) => setUnit(v as 'g' | 'oz')}
        unitOptions={[
          { value: 'g', label: t('unit.g') },
          { value: 'oz', label: t('unit.oz') },
        ]}
        placeholder="0"
      />
    </ToxinScaffold>
  );
}
