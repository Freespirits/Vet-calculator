import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold, gramsFrom } from '../../components/ToxinScaffold';
import { SelectField, NumberField, MeasureField } from '../../components/forms';
import { NutIcon } from '../../components/Icons';
import { computeThc } from './calc';

export const thcMeta: ToxinMeta = {
  id: 'thc',
  name: L('קנאביס / THC', 'Cannabis / THC'),
  blurb: L('מאפים, פרח מיובש, תמצית', 'Edibles, dried flower, concentrate'),
  species: ['dog', 'cat'],
  accent: '#16A34A',
  Icon: NutIcon,
};

/** Source → mg THC per gram (dried flower assumed ~15%, concentrate ~60%). */
const FORMS = [
  { id: 'edible_mg', label: L('מאפה — THC במ"ג מהתווית', 'Edible — THC in mg from label'), mode: 'mg' as const },
  { id: 'flower', label: L('פרח מיובש (~15% THC)', 'Dried flower (~15% THC)'), mode: 'grams' as const, mgPerG: 150 },
  { id: 'concentrate', label: L('תמצית / האש (~60% THC)', 'Concentrate / hash (~60% THC)'), mode: 'grams' as const, mgPerG: 600 },
];

export function ThcCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [formId, setFormId] = useState(FORMS[0].id);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'g' | 'oz'>('g');

  const form = FORMS.find((f) => f.id === formId) ?? FORMS[0];

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    if (!isFinite(w) || w <= 0) return null;
    let mgThc: number;
    if (form.mode === 'mg') {
      const mg = parseFloat(amount);
      if (!isFinite(mg) || mg <= 0) return null;
      mgThc = mg;
    } else {
      const grams = gramsFrom(amount, unit);
      if (grams <= 0) return null;
      mgThc = grams * form.mgPerG;
    }
    return computeThc({ species, weightKg: w, mgThc });
  }, [species, weightKg, form, amount, unit]);

  return (
    <ToxinScaffold
      meta={thcMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={formId}
        onChange={(v) => {
          setFormId(v);
          setAmount('');
        }}
        options={FORMS.map((f) => ({ value: f.id, label: lang === 'he' ? f.label.he : f.label.en }))}
      />
      {form.mode === 'mg' ? (
        <NumberField
          label={t('tox.amount')}
          value={amount}
          onChange={setAmount}
          placeholder="0"
          suffix={t('unit.mg')}
        />
      ) : (
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
      )}
    </ToxinScaffold>
  );
}
