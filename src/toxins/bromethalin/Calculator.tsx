import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField, NumberField } from '../../components/forms';
import { AlertTriangleIcon } from '../../components/Icons';
import { computeBromethalin } from './calc';

export const bromethalinMeta: ToxinMeta = {
  id: 'bromethalin',
  name: L('ברומתלין (רעל עכברים)', 'Bromethalin (rodenticide)'),
  blurb: L('רעל עצבי — ללא אנטידוט', 'Neurotoxic rodenticide — no antidote'),
  about: L(
    'ברומתלין הוא רעל מכרסמים מודרני שתוקף את המוח ולא את קרישת הדם — ואין לו אנטידוט. גם מנות צנועות גורמות לבצקת מוחית, רעד ושיתוק, ולכן טיהור (הקאה/פחם) בשעות הראשונות קריטי. חשוב לא להתבלבל בינו לבין פתיונות נוגדי קרישה.',
    'Bromethalin is a modern rodent bait that attacks the brain rather than blood clotting — and it has no antidote. Even modest doses cause brain swelling, tremors and paralysis, so decontamination in the first hours is everything. Do not confuse it with anticoagulant baits.',
  ),
  species: ['dog', 'cat'],
  accent: '#7C3AED',
  Icon: AlertTriangleIcon,
};

/** Common bromethalin bait concentrations (% w/w). */
const CONCENTRATIONS = [
  { id: 'c001', pct: 0.01, label: L('פיתיון 0.01% (נפוץ)', '0.01% bait (common)') },
  { id: 'c0025', pct: 0.025, label: L('פיתיון 0.025%', '0.025% bait') },
];

export function BromethalinCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [concId, setConcId] = useState(CONCENTRATIONS[0].id);
  const [grams, setGrams] = useState('');

  const conc = CONCENTRATIONS.find((c) => c.id === concId) ?? CONCENTRATIONS[0];

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const g = parseFloat(grams);
    if (!isFinite(w) || w <= 0 || !isFinite(g) || g <= 0) return null;
    const mg = g * (conc.pct / 100) * 1000; // grams bait → mg bromethalin
    return computeBromethalin({ species, weightKg: w, mg });
  }, [species, weightKg, grams, conc]);

  return (
    <ToxinScaffold
      meta={bromethalinMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={concId}
        onChange={setConcId}
        options={CONCENTRATIONS.map((c) => ({ value: c.id, label: lang === 'he' ? c.label.he : c.label.en }))}
      />
      <NumberField
        label={t('tox.amount')}
        value={grams}
        onChange={setGrams}
        placeholder="0"
        suffix={t('unit.g')}
      />
    </ToxinScaffold>
  );
}
