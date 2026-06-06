import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField, NumberField } from '../../components/forms';
import { AlertOctagonIcon } from '../../components/Icons';
import { ANTICOAGULANT_AGENTS, computeAnticoagulant } from './calc';

export const anticoagulantMeta: ToxinMeta = {
  id: 'anticoagulant_rodenticide',
  name: L('רעל עכברים נוגד קרישה', 'Anticoagulant rodenticide'),
  blurb: L('ברודיפקום, ברומדיולון ועוד', 'Brodifacoum, bromadiolone & others'),
  species: ['dog', 'cat'],
  accent: '#DC2626',
  Icon: AlertOctagonIcon,
};

/** Common bait active-ingredient concentrations (% w/w). */
const CONCENTRATIONS = [
  { id: 'c0005', pct: 0.005, label: L('פיתיון 0.005% (דור שני נפוץ)', '0.005% bait (common 2nd-gen)') },
  { id: 'c00025', pct: 0.0025, label: L('פיתיון 0.0025%', '0.0025% bait') },
  { id: 'c0025', pct: 0.025, label: L('פיתיון 0.025% (דור ראשון)', '0.025% bait (1st-gen)') },
  { id: 'c005', pct: 0.05, label: L('פיתיון 0.05%', '0.05% bait') },
];

export function AnticoagulantRodenticideCalculator() {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>('dog');
  const [weightKg, setWeightKg] = useState('');
  const [agentId, setAgentId] = useState(ANTICOAGULANT_AGENTS[0].id);
  const [concId, setConcId] = useState(CONCENTRATIONS[0].id);
  const [grams, setGrams] = useState('');

  const agent = ANTICOAGULANT_AGENTS.find((a) => a.id === agentId) ?? ANTICOAGULANT_AGENTS[0];
  const conc = CONCENTRATIONS.find((c) => c.id === concId) ?? CONCENTRATIONS[0];

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const g = parseFloat(grams);
    if (!isFinite(w) || w <= 0 || !isFinite(g) || g <= 0) return null;
    const mgActive = g * (conc.pct / 100) * 1000; // grams bait → mg active
    return computeAnticoagulant({
      species,
      weightKg: w,
      mgActive,
      thresholdMgPerKg: agent.thresholdMgPerKg,
    });
  }, [species, weightKg, grams, agent, conc]);

  return (
    <ToxinScaffold
      meta={anticoagulantMeta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={lang === 'he' ? 'חומר פעיל' : 'Active ingredient'}
        value={agentId}
        onChange={setAgentId}
        options={ANTICOAGULANT_AGENTS.map((a) => ({ value: a.id, label: lang === 'he' ? a.label.he : a.label.en }))}
      />
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
