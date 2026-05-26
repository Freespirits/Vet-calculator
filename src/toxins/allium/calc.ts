/**
 * Allium (onion / garlic / leek / chive) toxicosis — canine & feline.
 * Organosulfur oxidants → Heinz-body hemolytic anemia (delayed days).
 * Dose expressed as onion-equivalent g/kg. Garlic ≈ 3–5× more potent than
 * onion; dehydrated/powder forms are far more concentrated. Cats most sensitive.
 */
import { L, type LocalizedText, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

/** Potency relative to raw onion (approximate, conservative). */
export const ALLIUM_FORMS: { id: string; name: LocalizedText; potency: number }[] = [
  { id: 'onion', name: L('בצל (טרי/מבושל)', 'Onion (raw/cooked)'), potency: 1 },
  { id: 'garlic', name: L('שום (טרי)', 'Garlic (fresh)'), potency: 4 },
  { id: 'onion_powder', name: L('אבקת בצל', 'Onion powder'), potency: 10 },
  { id: 'garlic_powder', name: L('אבקת שום', 'Garlic powder'), potency: 40 },
];

export interface AlliumInput {
  species: ToxSpecies;
  weightKg: number;
  grams: number;
  formId: string;
}

const SOURCES = [
  'Hayes C; rev. Brutlag A. Garlic and Onion (Allium spp) Toxicosis in Animals. Merck Veterinary Manual, 2024.',
  'Salgado BS, et al. Allium species poisoning in dogs and cats. J Venom Anim Toxins Incl Trop Dis.',
  'Cortinovis C, Caloni F. Household Food Items Toxic to Dogs and Cats. Front Vet Sci. 2016.',
];

function bandFor(onionEqv: number, species: ToxSpecies): RiskLevel {
  if (species === 'cat') {
    if (onionEqv < 2) return 'minimal';
    if (onionEqv < 5) return 'mild';
    if (onionEqv < 15) return 'moderate';
    return 'severe';
  }
  if (onionEqv < 5) return 'minimal';
  if (onionEqv < 15) return 'mild';
  if (onionEqv < 30) return 'moderate';
  return 'severe';
}

export function computeAllium(input: AlliumInput): ToxinResult {
  const form = ALLIUM_FORMS.find((f) => f.id === input.formId) ?? ALLIUM_FORMS[0];
  const gPerKg = input.grams / input.weightKg;
  const onionEqv = gPerKg * form.potency;
  const level = bandFor(onionEqv, input.species);
  const cap = input.species === 'cat' ? 20 : 40;
  const fraction = Math.min(1, onionEqv / cap);
  const emergency = level === 'moderate' || level === 'severe';

  return {
    level,
    fraction,
    doseLabel: `${onionEqv.toFixed(1)} g/kg`,
    doseSubLabel: L('שווה-ערך בצל למשקל גוף', 'onion-equivalent per body weight'),
    signs:
      level === 'minimal'
        ? L('לרוב ללא סימנים; ייתכן אי-נוחות עיכולית קלה.', 'Usually no signs; mild GI upset possible.')
        : L(
            'תחילה: רפיון, חוסר תיאבון, הקאות/שלשול. בהמשך (ימים): חיוורון/צהבת ריריות, חולשה, טכיקרדיה, שתן אדום-חום — אנמיה המוליטית.',
            'Early: lethargy, anorexia, vomiting/diarrhea. Later (days): pale/icteric mucous membranes, weakness, tachycardia, red-brown urine — hemolytic anemia.',
          ),
    action:
      level === 'minimal'
        ? L('נטר/י; פנה/י לרופא וטרינר אם מופיעים סימנים.', 'Monitor; contact a vet if signs develop.')
        : L(
            'פנה/י לרופא וטרינר. דה-קונטמינציה מוקדמת (הקאה ± פחם פעיל) וניטור ספירת דם (PCV) לאורך מספר ימים.',
            'Contact a vet. Early decontamination (emesis ± charcoal) and CBC/PCV monitoring over several days.',
          ),
    decon: L(
      'הסימנים מתעכבים לרוב בימים — חיה תקינה בהתחלה עדיין בסיכון. גופי היינץ תוך ~24 ש׳, מתמוגלובינמיה בשיא ~72 ש׳, שפל אנמי לאחר מספר ימים.',
      'Signs are typically delayed days — an early-normal patient is still at risk. Heinz bodies within ~24 h, methemoglobinemia peaks ~72 h, anemic nadir after several days.',
    ),
    context: L(
      'חתולים הם הרגישים ביותר. שום חזק פי 3–5 מבצל; צורות מיובשות/אבקה מרוכזות בהרבה. סף בצל: חתול ~5 גרם/ק"ג, כלב ~15–30 גרם/ק"ג.',
      'Cats are the most sensitive. Garlic is 3–5× more potent than onion; dehydrated/powder forms are far more concentrated. Onion thresholds: cat ~5 g/kg, dog ~15–30 g/kg.',
    ),
    emergency,
    stats: [
      { label: L('שווה-ערך בצל/ק"ג', 'Onion-eq/kg'), value: `${onionEqv.toFixed(1)} g/kg` },
      { label: L('עוצמה יחסית', 'Potency factor'), value: `×${form.potency}` },
    ],
    sources: SOURCES,
  };
}
