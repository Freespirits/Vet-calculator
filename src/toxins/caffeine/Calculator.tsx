import { L, type ToxinMeta } from '../../types/toxins';
import { DrugToxinCalculator, type DrugProduct } from '../drugCommon';
import { DropletIcon } from '../../components/Icons';
import { CAFFEINE_PRODUCTS, computeCaffeine } from './calc';

export const caffeineMeta: ToxinMeta = {
  id: 'caffeine',
  name: L('קפאין', 'Caffeine'),
  blurb: L('קפה, משקאות אנרגיה, כדורים', 'Coffee, energy drinks, pills'),
  species: ['dog', 'cat'],
  accent: '#92400E',
  Icon: DropletIcon,
};

export function CaffeineCalculator() {
  return (
    <DrugToxinCalculator
      meta={caffeineMeta}
      products={CAFFEINE_PRODUCTS as DrugProduct[]}
      compute={computeCaffeine}
    />
  );
}
