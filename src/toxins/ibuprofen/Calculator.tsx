import { DrugToxinCalculator } from '../drugCommon';
import { IBU_PRODUCTS, computeIbuprofen } from './calc';
import { ibuprofenMeta } from './meta';

export function IbuprofenCalculator() {
  return (
    <DrugToxinCalculator meta={ibuprofenMeta} products={IBU_PRODUCTS} compute={computeIbuprofen} />
  );
}
