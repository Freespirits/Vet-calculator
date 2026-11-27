import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { type ToxSpecies } from '../../types/toxins';
import { ToxinScaffold } from '../../components/ToxinScaffold';
import { SelectField } from '../../components/forms';
import { computeLily, type LilyCategory } from './calc';
import { lilyMeta } from './meta';

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
