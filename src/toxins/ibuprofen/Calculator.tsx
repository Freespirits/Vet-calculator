import { L, type ToxinMeta } from '../../types/toxins';
import { PillIcon } from '../../components/Icons';
import { DrugToxinCalculator } from '../drugCommon';
import { IBU_PRODUCTS, computeIbuprofen } from './calc';

export const ibuprofenMeta: ToxinMeta = {
  id: 'ibuprofen',
  name: L('איבופרופן (נורופן)', 'Ibuprofen (Advil/Nurofen)'),
  blurb: L('כיב עיכולי ופגיעה כלייתית', 'GI ulceration & renal injury'),
  species: ['dog', 'cat'],
  accent: '#FB923C',
  Icon: PillIcon,
};

export function IbuprofenCalculator() {
  return (
    <DrugToxinCalculator meta={ibuprofenMeta} products={IBU_PRODUCTS} compute={computeIbuprofen} />
  );
}
