/**
 * Display metadata for the Cannabis / THC toxicity calculator: name, blurb,
 * the plain-language explanation, supported species, accent colour and icon.
 * Kept apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { NutIcon } from '../../components/Icons';

export const thcMeta: ToxinMeta = {
  id: 'thc',
  name: L('קנאביס / THC', 'Cannabis / THC'),
  blurb: L('מאפים, פרח מיובש, תמצית', 'Edibles, dried flower, concentrate'),
  about: L(
    'קנאביס משפיע על חיות מחמד הרבה יותר מאשר על בני אדם. כלבים נחשפים בעיקר דרך מאפים (אדיבלס), פרח מיובש או תמציות; הסימנים: חוסר יציבות, טפטוף שתן, דופק איטי ונמנום. מאפים מסוכנים כפליים — לעיתים יש בהם גם שוקולד או קסיליטול.',
    'Cannabis hits pets far harder than people. Dogs are exposed mostly through edibles, dried flower or concentrates; signs are wobbliness, dribbling urine, slow heart rate and drowsiness. Edibles are doubly risky — they often also contain chocolate or xylitol.',
  ),
  species: ['dog', 'cat'],
  accent: '#16A34A',
  Icon: NutIcon,
};
