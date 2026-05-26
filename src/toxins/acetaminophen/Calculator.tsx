import { L, type ToxinMeta } from '../../types/toxins';
import { CapsuleIcon } from '../../components/Icons';
import { DrugToxinCalculator } from '../drugCommon';
import { APAP_PRODUCTS, computeAcetaminophen } from './calc';

export const acetaminophenMeta: ToxinMeta = {
  id: 'acetaminophen',
  name: L('אקמול / פרצטמול', 'Acetaminophen / Paracetamol'),
  blurb: L('פגיעה כבדית ומתמוגלובינמיה', 'Liver injury & methemoglobinemia'),
  species: ['dog', 'cat'],
  accent: '#F43F5E',
  Icon: CapsuleIcon,
};

export function AcetaminophenCalculator() {
  return (
    <DrugToxinCalculator
      meta={acetaminophenMeta}
      products={APAP_PRODUCTS}
      compute={computeAcetaminophen}
    />
  );
}
