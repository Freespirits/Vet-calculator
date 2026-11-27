/**
 * Display metadata for the Xylitol toxicity calculator: name, blurb, the
 * plain-language explanation, supported species, accent colour and icon. Kept
 * apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { DropletIcon } from '../../components/Icons';

export const xylitolMeta: ToxinMeta = {
  id: 'xylitol',
  name: L('קסיליטול', 'Xylitol'),
  blurb: L('היפוגליקמיה ופגיעה כבדית', 'Hypoglycemia & liver injury'),
  about: L(
    'קסיליטול הוא ממתיק נפוץ במסטיקים וסוכריות ללא סוכר, מאפים "דיאטטיים", חלק מחמאות הבוטנים ומשחות שיניים. אצל כלבים הוא משחרר אינסולין באופן מסיבי — הסוכר בדם צונח תוך 30–60 דקות — ובמינונים גבוהים נפגע גם הכבד.',
    'Xylitol is a sweetener in sugar-free gum and candy, "diet" baked goods, some peanut butters and toothpaste. In dogs it triggers a massive insulin release — blood sugar can crash within 30–60 minutes — and higher doses also injure the liver.',
  ),
  species: ['dog'],
  accent: '#22D3EE',
  Icon: DropletIcon,
};
