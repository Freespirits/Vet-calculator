import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold, gramsFrom } from '../../components/ToxinScaffold';
import { SelectField, MeasureField } from '../../components/forms';
import { GrapeIcon } from '../../components/Icons';
import { computeGrapes } from './calc';

export const grapesMeta: ToxinMeta = {
  id: 'grapes',
  name: L('ענבים / צימוקים', 'Grapes / Raisins'),
  blurb: L('רעילות כלייתית אידיוסינקרטית', 'Idiosyncratic kidney toxicity'),
  about: L(
    'ענבים, צימוקים וכל מאכל שמכיל אותם עלולים לגרום לאי־ספיקת כליות חריפה בכלבים. המנגנון (כנראה חומצה טרטרית) בלתי צפוי — יש כלבים שמגיבים לענב בודד — ולכן כל בליעה נחשבת מסוכנת פוטנציאלית.',
    'Grapes, raisins, sultanas and anything containing them can cause acute kidney failure in dogs. The mechanism (likely tartaric acid) is unpredictable — some dogs react to a single grape — so any ingestion is treated as potentially serious.',
  ),
  species: ['dog'],
  accent: '#8B5CF6',
  Icon: GrapeIcon,
};

export function GrapesCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [typeId, setTypeId] = useState<'grapes' | 'raisins'>('grapes');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'g' | 'oz'>('g');

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const grams = gramsFrom(amount, unit);
    if (!isFinite(w) || w <= 0 || grams <= 0) return null;
    return computeGrapes({ typeId, weightKg: w, grams });
  }, [typeId, weightKg, amount, unit]);

  return (
    <ToxinScaffold
      meta={grapesMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={typeId}
        onChange={(v) => setTypeId(v as 'grapes' | 'raisins')}
        options={[
          { value: 'grapes', label: lang === 'he' ? 'ענבים' : 'Grapes' },
          { value: 'raisins', label: lang === 'he' ? 'צימוקים' : 'Raisins' },
        ]}
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
