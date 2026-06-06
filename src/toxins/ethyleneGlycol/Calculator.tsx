import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField, NumberField } from '../../components/forms';
import { DropletIcon } from '../../components/Icons';
import { computeEthyleneGlycol } from './calc';

export const ethyleneGlycolMeta: ToxinMeta = {
  id: 'ethylene_glycol',
  name: L('אתילן גליקול (אנטיפריז)', 'Ethylene glycol (antifreeze)'),
  blurb: L('נוזל קירור — מרווח בטיחות צר', 'Coolant — very narrow margin'),
  species: ['dog', 'cat'],
  accent: '#22D3EE',
  Icon: DropletIcon,
};

/** Common ethylene-glycol product strengths. */
const SOURCES_PCT = [
  { id: 'antifreeze', pct: 95, label: L('אנטיפריז מרוכז (~95%)', 'Concentrated antifreeze (~95%)') },
  { id: 'coolant50', pct: 50, label: L('נוזל קירור מהול (~50%)', 'Pre-mixed coolant (~50%)') },
  { id: 'brake', pct: 95, label: L('נוזל בלמים (~95%)', 'Brake fluid (~95%)') },
  { id: 'custom100', pct: 100, label: L('אתילן גליקול טהור (100%)', 'Pure ethylene glycol (100%)') },
];

export function EthyleneGlycolCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [sourceId, setSourceId] = useState(SOURCES_PCT[0].id);
  const [ml, setMl] = useState('');

  const source = SOURCES_PCT.find((s) => s.id === sourceId) ?? SOURCES_PCT[0];

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const v = parseFloat(ml);
    if (!isFinite(w) || w <= 0 || !isFinite(v) || v <= 0) return null;
    return computeEthyleneGlycol({ species, weightKg: w, mlProduct: v, percentEg: source.pct });
  }, [species, weightKg, ml, source]);

  return (
    <ToxinScaffold
      meta={ethyleneGlycolMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={sourceId}
        onChange={setSourceId}
        options={SOURCES_PCT.map((s) => ({ value: s.id, label: lang === 'he' ? s.label.he : s.label.en }))}
      />
      <NumberField
        label={t('tox.amount')}
        value={ml}
        onChange={setMl}
        placeholder="0"
        suffix={t('unit.ml')}
      />
    </ToxinScaffold>
  );
}
