import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, tr, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold, gramsFrom } from '../../components/ToxinScaffold';
import { SelectField, MeasureField } from '../../components/forms';
import { OnionIcon } from '../../components/Icons';
import { ALLIUM_FORMS, computeAllium } from './calc';

export const alliumMeta: ToxinMeta = {
  id: 'allium',
  name: L('בצל / שום', 'Onion / Garlic'),
  blurb: L('אנמיה המוליטית (גופי היינץ)', 'Heinz-body hemolytic anemia'),
  species: ['dog', 'cat'],
  accent: '#F59E0B',
  Icon: OnionIcon,
};

export function AlliumCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [formId, setFormId] = useState('onion');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'g' | 'oz'>('g');

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const grams = gramsFrom(amount, unit);
    if (!isFinite(w) || w <= 0 || grams <= 0) return null;
    return computeAllium({ species, weightKg: w, grams, formId });
  }, [species, weightKg, amount, unit, formId]);

  return (
    <ToxinScaffold
      meta={alliumMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={formId}
        onChange={setFormId}
        options={ALLIUM_FORMS.map((f) => ({ value: f.id, label: tr(f.name, lang) }))}
      />
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
