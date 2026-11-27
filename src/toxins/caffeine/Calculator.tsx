import { DrugToxinCalculator, type DrugProduct } from '../drugCommon';
import { CAFFEINE_PRODUCTS, computeCaffeine } from './calc';
import { caffeineMeta } from './meta';

export function CaffeineCalculator() {
  return (
    <DrugToxinCalculator
      meta={caffeineMeta}
      products={CAFFEINE_PRODUCTS as DrugProduct[]}
      compute={computeCaffeine}
    />
  );
}
