import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField, NumberField } from '../../components/forms';
import { PillIcon } from '../../components/Icons';
import { computeCholecalciferol, IU_PER_MG } from './calc';

export const cholecalciferolMeta: ToxinMeta = {
  id: 'cholecalciferol',
  name: L('כולקלציפרול (ויטמין D3)', 'Cholecalciferol (vitamin D3)'),
  blurb: L('פיתיון מכרסמים, תוספי ויטמין D', 'Rodenticide bait, vitamin-D supplements'),
  about: L(
    'כולקלציפרול (ויטמין D3) נמצא גם בפתיונות נגד מכרסמים וגם בתוספי תזונה לבני אדם. מנת יתר מזניקה את הסידן בדם ומסיידת את הכליות והלב; הסימנים מופיעים רק אחרי 12–36 שעות והטיפול ממושך. מרעלי המכרסמים המסוכנים ביותר לגרם.',
    'Cholecalciferol (vitamin D3) appears both in rodent baits and in human vitamin supplements. Overdose drives blood calcium sky-high, calcifying the kidneys and heart; signs only appear after 12–36 hours and treatment is prolonged. Per gram, one of the most dangerous rodenticides.',
  ),
  species: ['dog', 'cat'],
  accent: '#FACC15',
  Icon: PillIcon,
};

/**
 * Each source maps the entered amount to milligrams of cholecalciferol.
 * `factor` is mg per entered unit; the suffix tells the user what to enter.
 */
const FORMS = [
  { id: 'bait', label: L('פיתיון 0.075% (גרם)', '0.075% bait (g)'), factor: 0.75, suffix: L('גרם', 'g') },
  { id: 'iu', label: L('תוסף ויטמין D3 (יחב"ל)', 'Vitamin D3 supplement (IU)'), factor: 1 / IU_PER_MG, suffix: L('יחב"ל', 'IU') },
  { id: 'mg', label: L('כולקלציפרול (מ"ג)', 'Cholecalciferol (mg)'), factor: 1, suffix: L('מ"ג', 'mg') },
];

export function CholecalciferolCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [formId, setFormId] = useState(FORMS[0].id);
  const [amount, setAmount] = useState('');

  const form = FORMS.find((f) => f.id === formId) ?? FORMS[0];

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const a = parseFloat(amount);
    if (!isFinite(w) || w <= 0 || !isFinite(a) || a <= 0) return null;
    return computeCholecalciferol({ weightKg: w, mg: a * form.factor });
  }, [species, weightKg, amount, form]);

  return (
    <ToxinScaffold
      meta={cholecalciferolMeta}
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
      <NumberField
        label={t('tox.amount')}
        value={amount}
        onChange={setAmount}
        placeholder="0"
        suffix={lang === 'he' ? form.suffix.he : form.suffix.en}
      />
    </ToxinScaffold>
  );
}
