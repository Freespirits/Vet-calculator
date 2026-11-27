/**
 * Display metadata for the Caffeine toxicity calculator: name, blurb, the
 * plain-language explanation, supported species, accent colour and icon. Kept
 * apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { DropletIcon } from '../../components/Icons';

export const caffeineMeta: ToxinMeta = {
  id: 'caffeine',
  name: L('קפאין', 'Caffeine'),
  blurb: L('קפה, משקאות אנרגיה, כדורים', 'Coffee, energy drinks, pills'),
  about: L(
    'קפאין נמצא בקפה ובפולי/אבקת קפה, תה, משקאות אנרגיה, כדורי ערנות ואבקות אימון. אצל חיות מחמד הוא מעורר יתר על המידה את הלב ומערכת העצבים — כמה גרמים של אבקת קפה או כדור אחד עלולים לסכן כלב קטן או חתול.',
    'Caffeine is found in coffee and coffee grounds, tea, energy drinks, alertness pills and pre-workout powders. In pets it over-stimulates the heart and nervous system — a few grams of grounds or a single pill can endanger a small dog or cat.',
  ),
  species: ['dog', 'cat'],
  accent: '#92400E',
  Icon: DropletIcon,
};
