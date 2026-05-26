import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField, NumberField } from '../../components/forms';
import { DropletIcon } from '../../components/Icons';
import { computeXylitol } from './calc';

export const xylitolMeta: ToxinMeta = {
  id: 'xylitol',
  name: L('קסיליטול', 'Xylitol'),
  blurb: L('היפוגליקמיה ופגיעה כבדית', 'Hypoglycemia & liver injury'),
  species: ['dog'],
  accent: '#22D3EE',
  Icon: DropletIcon,
};

// mg of xylitol per input unit
const PER_UNIT: Record<string, number> = { gum: 1000, g: 1000, mg: 1 };

export function XylitolCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [mode, setMode] = useState<'gum' | 'g' | 'mg'>('gum');
  const [amount, setAmount] = useState('');

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const a = parseFloat(amount);
    if (!isFinite(w) || w <= 0 || !isFinite(a) || a <= 0) return null;
    return computeXylitol({ weightKg: w, xylitolMg: a * PER_UNIT[mode] });
  }, [weightKg, amount, mode]);

  const amountLabel =
    mode === 'gum'
      ? lang === 'he'
        ? 'מספר יחידות מסטיק'
        : 'Gum pieces'
      : mode === 'g'
        ? lang === 'he'
          ? 'קסיליטול (גרם)'
          : 'Xylitol (g)'
        : lang === 'he'
          ? 'קסיליטול (מ"ג)'
          : 'Xylitol (mg)';

  return (
    <ToxinScaffold
      meta={xylitolMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={mode}
        onChange={(v) => setMode(v as 'gum' | 'g' | 'mg')}
        options={[
          { value: 'gum', label: lang === 'he' ? 'מסטיק (הנחה: 1 גרם ליחידה)' : 'Gum (assume 1 g/piece)' },
          { value: 'g', label: lang === 'he' ? 'קסיליטול בגרמים' : 'Xylitol in grams' },
          { value: 'mg', label: lang === 'he' ? 'קסיליטול במ"ג' : 'Xylitol in mg' },
        ]}
      />
      <NumberField
        label={amountLabel}
        value={amount}
        onChange={setAmount}
        placeholder="0"
        suffix={mode === 'gum' ? t('unit.pieces') : mode === 'g' ? t('unit.g') : t('unit.mg')}
      />
    </ToxinScaffold>
  );
}
