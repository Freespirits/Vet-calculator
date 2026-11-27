/**
 * Display metadata for the Cholecalciferol (vitamin D3) toxicity calculator:
 * name, blurb, the plain-language explanation, supported species, accent
 * colour and icon. Kept apart from Calculator.tsx so that file exports only
 * its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { PillIcon } from '../../components/Icons';

export const cholecalciferolMeta: ToxinMeta = {
  id: 'cholecalciferol',
  name: L('כולקלציפרול (ויטמין D3)', 'Cholecalciferol (vitamin D3)'),
  blurb: L('פיתיון מכרסמים, תוספי ויטמין D', 'Rodenticide bait, vitamin-D supplements'),
  about: L(
    'כולקלציפרול (ויטמין D3) נמצא גם בפתיונות נגד מכרסמים וגם בתוספי תזונה לבני אדם. מנת יתר מזניקה את הסידן בדם ומסיידת את הכליות והלב; הסימנים מופיעים רק אחרי 12–36 שעות והטיפול ממושך. מרעלי המכרסמים המסוכנים ביותר לגרם.',
    'Cholecalciferol (vitamin D3) appears both in rodent baits and in human vitamin supplements. Overdose drives blood calcium sky-high, calcifying the kidneys and heart; signs only appear after 12–36 hours and treatment is prolonged. Per gram, one of the most dangerous rodenticides.',
  ),
  species: ['dog', 'cat'],
  accent: '#FACC15',
  Icon: PillIcon,
};
