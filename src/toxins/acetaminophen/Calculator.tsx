import { L, type ToxinMeta } from '../../types/toxins';
import { CapsuleIcon } from '../../components/Icons';
import { DrugToxinCalculator } from '../drugCommon';
import { APAP_PRODUCTS, computeAcetaminophen } from './calc';

export const acetaminophenMeta: ToxinMeta = {
  id: 'acetaminophen',
  name: L('אקמול / פרצטמול', 'Acetaminophen / Paracetamol'),
  blurb: L('פגיעה כבדית ומתמוגלובינמיה', 'Liver injury & methemoglobinemia'),
  about: L(
    'אקמול/פרצטמול — משכך הכאבים הביתי הנפוץ — מסוכן מאוד לחיות מחמד: אצל חתולים גלולה אחת עלולה לשבש את יכולת הדם לשאת חמצן, ואצל כלבים מינונים גבוהים הורסים את הכבד. לעולם אין לתת אותו לחיה ללא הוראה וטרינרית.',
    'Acetaminophen (paracetamol — Tylenol, Acamol) is the everyday human painkiller, and it is highly dangerous to pets: in cats a single tablet can stop the blood carrying oxygen, and in dogs high doses destroy the liver. Never give it to an animal without veterinary instruction.',
  ),
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
