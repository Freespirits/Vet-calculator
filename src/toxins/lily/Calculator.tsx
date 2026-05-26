import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { L, type ToxinMeta, type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField } from '../../components/forms';
import { FlowerIcon } from '../../components/Icons';
import { computeLily, type LilyCategory } from './calc';

export const lilyMeta: ToxinMeta = {
  id: 'lily',
  name: L('שושנים (חתולים)', 'Lilies (cats)'),
  blurb: L('סיכון כלייתי — לפי זיהוי הצמח', 'Kidney risk — by plant identity'),
  species: ['cat'],
  accent: '#F472B6',
  Icon: FlowerIcon,
};

export function LilyCalculator() {
  const { t, lang } = useI18n();
  const [category, setCategory] = useState<LilyCategory>('nephrotoxic');

  const result = useMemo(() => computeLily(category), [category]);

  return (
    <ToxinScaffold
      meta={lilyMeta}
      species={'cat' as ToxSpecies}
      onSpecies={() => {}}
      weightKg=""
      onWeightKg={() => {}}
      showWeight={false}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={category}
        onChange={(v) => setCategory(v as LilyCategory)}
        options={[
          {
            value: 'nephrotoxic',
            label: lang === 'he' ? 'שושן אמיתי (Lilium / שושן-יום)' : 'True lily (Lilium / daylily)',
          },
          {
            value: 'oxalate',
            label: lang === 'he' ? 'מתחזה (חבצלת שלום / קלה)' : 'Imposter (peace / calla lily)',
          },
          {
            value: 'unknown',
            label: lang === 'he' ? 'לא ידוע איזה שושן' : 'Unsure which lily',
          },
        ]}
      />
    </ToxinScaffold>
  );
}
