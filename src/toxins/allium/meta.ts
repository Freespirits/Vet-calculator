/**
 * Display metadata for the Onion / Garlic toxicity calculator: name, blurb,
 * the plain-language explanation, supported species, accent colour and icon.
 * Kept apart from Calculator.tsx so that file exports only its component.
 */
import { L, type ToxinMeta } from '../../types/toxins';
import { OnionIcon } from '../../components/Icons';

export const alliumMeta: ToxinMeta = {
  id: 'allium',
  name: L('בצל / שום', 'Onion / Garlic'),
  blurb: L('אנמיה המוליטית (גופי היינץ)', 'Heinz-body hemolytic anemia'),
  about: L(
    'בצל, שום, כרישה ועירית (משפחת האליום) — טריים, מבושלים, מטוגנים או באבקה — הורסים כדוריות דם אדומות אצל כלבים וחתולים. האנמיה מופיעה לעיתים רק ימים אחרי האכילה, ושום חזק בערך פי 3–5 מבצל.',
    'Onion, garlic, leek and chives (the Allium family) — raw, cooked, fried or powdered — destroy red blood cells in dogs and cats. The anemia can surface only days after eating, and garlic is roughly 3–5× more potent than onion.',
  ),
  species: ['dog', 'cat'],
  accent: '#F59E0B',
  Icon: OnionIcon,
};
