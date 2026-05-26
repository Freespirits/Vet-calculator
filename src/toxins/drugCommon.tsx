/**
 * Shared UI for human-drug ingestion calculators (acetaminophen, ibuprofen):
 * species + weight + product strength + quantity → total mg → species bands.
 */
import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/LanguageProvider';
import type { LocalizedText, ToxinMeta, ToxinResult, ToxSpecies } from '../types/toxins';
import { ToxinScaffold } from '../components/ToxinScaffold';
import { SelectField, NumberField } from '../components/forms';

export interface DrugProduct {
  id: string;
  label: LocalizedText;
  /** mg per tablet, or mg per mL for liquids. */
  mgPerUnit: number;
  unit: 'tablet' | 'ml';
}

export function DrugToxinCalculator({
  meta,
  products,
  compute,
}: {
  meta: ToxinMeta;
  products: DrugProduct[];
  compute: (args: { species: ToxSpecies; weightKg: number; mg: number }) => ToxinResult;
}) {
  const { t, lang } = useI18n();
  const [species, setSpecies] = useState<ToxSpecies>(meta.species[0]);
  const [weightKg, setWeightKg] = useState('');
  const [productId, setProductId] = useState(products[0].id);
  const [qty, setQty] = useState('');

  const product = products.find((p) => p.id === productId) ?? products[0];

  const result = useMemo(() => {
    const w = parseFloat(weightKg);
    const q = parseFloat(qty);
    if (!isFinite(w) || w <= 0 || !isFinite(q) || q <= 0) return null;
    return compute({ species, weightKg: w, mg: q * product.mgPerUnit });
  }, [species, weightKg, qty, product, compute]);

  return (
    <ToxinScaffold
      meta={meta}
      species={species}
      onSpecies={setSpecies}
      weightKg={weightKg}
      onWeightKg={setWeightKg}
      result={result}
    >
      <SelectField
        label={t('tox.source')}
        value={productId}
        onChange={setProductId}
        options={products.map((p) => ({ value: p.id, label: p.label[lang] }))}
      />
      <NumberField
        label={t('tox.amount')}
        value={qty}
        onChange={setQty}
        placeholder="0"
        suffix={product.unit === 'tablet' ? t('unit.tablets') : t('unit.ml')}
      />
    </ToxinScaffold>
  );
}
