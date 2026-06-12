import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold, gramsFrom } from '../../components/ToxinScaffold';
import { MeasureField } from '../../components/forms';
import { NutIcon } from '../../components/Icons';
import { computeMacadamia } from './calc';

export const macadamiaMeta: ToxinMeta = {
  id: 'macadamia',
  name: L('אגוזי מקדמיה', 'Macadamia Nuts'),
  blurb: L('תסמונת נוירומוסקולרית הפיכה', 'Reversible neuromuscular syndrome'),
  about: L(
    'אגוזי מקדמיה גורמים בכלבים לתסמונת ייחודית והפיכה בדרך כלל: חולשת רגליים אחוריות, רעד, הקאות וחום תוך כ־12 שעות. שימו לב במיוחד לאגוזים מצופי שוקולד — שם השוקולד עלול להיות המסוכן יותר.',
    'Macadamia nuts cause a distinctive, usually reversible syndrome in dogs: hind-leg weakness, tremors, vomiting and fever within about 12 hours. Watch especially for chocolate-coated nuts — there the chocolate may be the bigger danger.',
  ),
  species: ['dog'],
  accent: '#D9A066',
  Icon: NutIcon,
};

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
