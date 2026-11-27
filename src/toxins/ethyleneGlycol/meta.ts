/**
 * Display metadata for the Ethylene glycol (antifreeze) toxicity calculator:
 * name, blurb, the plain-language explanation, supported species, accent
 * colour and icon. Kept apart from Calculator.tsx so that file exports only
 * its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { DropletIcon } from '../../components/Icons';

export const ethyleneGlycolMeta: ToxinMeta = {
  id: 'ethylene_glycol',
  name: L('אתילן גליקול (אנטיפריז)', 'Ethylene glycol (antifreeze)'),
  blurb: L('נוזל קירור — מרווח בטיחות צר', 'Coolant — very narrow margin'),
  about: L(
    'אתילן גליקול — אנטיפריז/נוזל קירור לרכב — מתוק לטעם ונלקק משלוליות ברצפת החניה או המוסך. כמה מיליליטרים מספיקים להרוג חתול, וכמה כפות — כלב. לאנטידוט יש חלון של שעות בודדות, לפני שגבישי אוקסלט הורסים את הכליות.',
    'Ethylene glycol — automotive antifreeze/coolant — tastes sweet and gets licked from puddles on garage floors. A few milliliters can kill a cat, a few tablespoons a dog. The antidote has a window of just hours, before oxalate crystals destroy the kidneys.',
  ),
  species: ['dog', 'cat'],
  accent: '#22D3EE',
  Icon: DropletIcon,
};
