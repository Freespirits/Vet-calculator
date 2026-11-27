import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { gramsFrom } from '../../lib/massUnits';
import { MeasureField } from '../../components/forms';
import { computeMacadamia } from './calc';
import { macadamiaMeta } from './meta';

export function MacadamiaCalculator() {
  const { t } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'g' | 'oz'>('g');

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const grams = gramsFrom(amount, unit);
    if (!isFinite(w) || w <= 0 || grams <= 0) return null;
    return computeMacadamia({ weightKg: w, grams });
  }, [weightKg, amount, unit]);

  return (
    <ToxinScaffold
      meta={macadamiaMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
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
