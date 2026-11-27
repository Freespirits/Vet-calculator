/**
 * Display metadata for the Ibuprofen (Advil/Nurofen) toxicity calculator:
 * name, blurb, the plain-language explanation, supported species, accent
 * colour and icon. Kept apart from Calculator.tsx so that file exports only
 * its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { PillIcon } from '../../components/Icons';

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
