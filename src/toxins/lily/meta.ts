/**
 * Display metadata for the Lilies (cats) toxicity calculator: name, blurb, the
 * plain-language explanation, supported species, accent colour and icon. Kept
 * apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { FlowerIcon } from '../../components/Icons';

export const lilyMeta: ToxinMeta = {
  id: 'lily',
  name: L('שושנים (חתולים)', 'Lilies (cats)'),
  blurb: L('סיכון כלייתי — לפי זיהוי הצמח', 'Kidney risk — by plant identity'),
  about: L(
    'שושנים אמיתיות (Lilium) והמרוקליס קטלניות לחתולים: כל חלק של הצמח — כולל אבקה שמלוקקת מהפרווה ואפילו מי האגרטל — עלול לגרום לאי־ספיקת כליות חריפה. זהו כאן את סוג הצמח; אם זו שושנה אמיתית, מדובר במצב חירום.',
    'True lilies (Lilium) and daylilies (Hemerocallis) are deadly to cats: every part of the plant — including pollen licked off fur and even the vase water — can cause acute kidney failure. Identify the plant type here; if it is a true lily, treat it as an emergency.',
  ),
  species: ['cat'],
  accent: '#F472B6',
  Icon: FlowerIcon,
};
