/**
 * Macadamia nut toxicosis — canine.
 * Unidentified toxin; a characteristic, generally NON-fatal neuromuscular
 * syndrome. Decontaminate >1–2 g/kg; signs reported from 2.4 g/kg.
 */
import { L, type ToxinResult } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

export interface MacadamiaInput {
  weightKg: number;
  grams: number;
}

const SOURCES = [
  'Hayes C (ASPCA APCC); rev. Brutlag A. Macadamia Nut Toxicosis in Dogs. Merck Veterinary Manual, 2024.',
  'Hansen SR. Macadamia nut toxicosis in dogs. ASPCA Toxicology Brief / Vet Med, 2002.',
];

export function computeMacadamia(input: MacadamiaInput): ToxinResult {
  const gPerKg = input.grams / input.weightKg;
  let level: RiskLevel;
  if (gPerKg < 1) level = 'minimal';
  else if (gPerKg < 2.4) level = 'mild';
  else if (gPerKg < 20) level = 'moderate';
  else level = 'severe';

  const fraction = Math.min(1, gPerKg / 20);

  return {
    level,
    fraction,
    doseLabel: `${gPerKg.toFixed(1)} g/kg`,
    doseSubLabel: L('אגוזים למשקל גוף', 'nuts per body weight'),
    signs:
      level === 'minimal'
        ? L('לרוב ללא סימנים בכמות זו.', 'Usually no signs at this amount.')
        : L(
            'חולשה (בעיקר ברגליים אחוריות), דיכאון, הקאות, אטקסיה, רעד והיפרתרמיה. בדרך כלל חולף מעצמו.',
            'Weakness (esp. hind limbs), depression, vomiting, ataxia, tremors and hyperthermia. Usually self-limiting.',
          ),
    action:
      level === 'minimal'
        ? L('נטר/י בבית; פנה/י לרופא וטרינר אם מופיעים סימנים.', 'Monitor at home; contact a vet if signs develop.')
        : L(
            'פנה/י לרופא וטרינר. הקאה יזומה מעל ~1–2 גרם/ק"ג; טיפול תומך (נוזלים, נוגדי הקאה, משככי כאב, הורדת חום).',
            'Contact a vet. Induce emesis above ~1–2 g/kg; supportive care (fluids, antiemetics, analgesia, antipyretics).',
          ),
    decon: L(
      'הופעת סימנים תוך 12 שעות, חלוף תוך 12–48 שעות. הקאה יזומה מעל 1–2 גרם/ק"ג.',
      'Onset within 12 h, resolution within 12–48 h. Induce emesis above 1–2 g/kg.',
    ),
    context: L(
      'הרעלן אינו מזוהה והתסמונת בדרך כלל אינה קטלנית. שים/י לב: אגוזים מצופי שוקולד (רעילות מתילקסנטינים) וסיכון לדלקת לבלב מעומס שומן.',
      'The toxin is unidentified and the syndrome is generally non-fatal. Note: chocolate-coated nuts add methylxanthine toxicity, and the fat load risks pancreatitis.',
    ),
    emergency: false,
    stats: [{ label: L('אגוזים/ק"ג', 'Nuts/kg'), value: `${gPerKg.toFixed(1)} g/kg` }],
    sources: SOURCES,
  };
}
