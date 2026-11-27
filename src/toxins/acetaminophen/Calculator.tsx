import { DrugToxinCalculator } from '../drugCommon';
import { APAP_PRODUCTS, computeAcetaminophen } from './calc';
import { acetaminophenMeta } from './meta';

export function AcetaminophenCalculator() {
  return (
    <DrugToxinCalculator
      meta={acetaminophenMeta}
      products={APAP_PRODUCTS}
      compute={computeAcetaminophen}
    />
  );
}
