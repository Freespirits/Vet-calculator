import { L, type ToxinMeta } from '../../types/toxins';
import { PillIcon } from '../../components/Icons';
import { DrugToxinCalculator } from '../drugCommon';
import { IBU_PRODUCTS, computeIbuprofen } from './calc';

export const ibuprofenMeta: ToxinMeta = {
  id: 'ibuprofen',
  name: L('איבופרופן (נורופן)', 'Ibuprofen (Advil/Nurofen)'),
  blurb: L('כיב עיכולי ופגיעה כלייתית', 'GI ulceration & renal injury'),
  about: L(
    'איבופרופן (נורופן, אדוויל) הוא נוגד דלקת אנושי שגוף של כלב או חתול אינו מסוגל לפנות ביעילות: במינונים נמוכים הוא גורם לכיבי קיבה, ובמינונים גבוהים — לאי־ספיקת כליות ולפרכוסים. חתולים רגישים בערך פי שניים מכלבים.',
    'Ibuprofen (Advil, Nurofen) is a human anti-inflammatory that dog and cat bodies cannot clear efficiently: low doses burn stomach ulcers, higher ones shut down the kidneys and can cause seizures. Cats are about twice as sensitive as dogs.',
  ),
  species: ['dog', 'cat'],
  accent: '#FB923C',
  Icon: PillIcon,
};

export function IbuprofenCalculator() {
  return (
    <DrugToxinCalculator meta={ibuprofenMeta} products={IBU_PRODUCTS} compute={computeIbuprofen} />
  );
}
