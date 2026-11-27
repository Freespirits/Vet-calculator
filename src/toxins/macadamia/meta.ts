/**
 * Display metadata for the Macadamia Nuts toxicity calculator: name, blurb,
 * the plain-language explanation, supported species, accent colour and icon.
 * Kept apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { NutIcon } from '../../components/Icons';

export const macadamiaMeta: ToxinMeta = {
  id: 'macadamia',
  name: L('אגוזי מקדמיה', 'Macadamia Nuts'),
  blurb: L('תסמונת נוירומוסקולרית הפיכה', 'Reversible neuromuscular syndrome'),
  about: L(
    'אגוזי מקדמיה גורמים בכלבים לתסמונת ייחודית והפיכה בדרך כלל: חולשת רגליים אחוריות, רעד, הקאות וחום תוך כ־12 שעות. שימו לב במיוחד לאגוזים מצופי שוקולד — שם השוקולד עלול להיות המסוכן יותר.',
    'Macadamia nuts cause a distinctive, usually reversible syndrome in dogs: hind-leg weakness, tremors, vomiting and fever within about 12 hours. Watch especially for chocolate-coated nuts — there the chocolate may be the bigger danger.',
  ),
  species: ['dog'],
  accent: '#D9A066',
  Icon: NutIcon,
};
