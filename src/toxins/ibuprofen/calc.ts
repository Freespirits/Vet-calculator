/**
 * Ibuprofen (NSAID) toxicosis — canine & feline.
 * COX inhibition → GI ulceration, renal injury, CNS at high dose.
 * Dog bands (Villar 1998 / Dunayer 2004): 25–125 GI, >175 renal, >400 CNS,
 * >600 lethal. Cats ≈ 2× more sensitive ⇒ ~half the dog thresholds.
 */
import { L, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';
import type { DrugProduct } from '../drugCommon';

export const IBU_PRODUCTS: DrugProduct[] = [
  { id: 'tab200', label: L('טבליה 200 מ"ג (OTC)', 'Tablet 200 mg (OTC)'), mgPerUnit: 200, unit: 'tablet' },
  { id: 'tab400', label: L('טבליה 400 מ"ג', 'Tablet 400 mg'), mgPerUnit: 400, unit: 'tablet' },
  { id: 'tab600', label: L('טבליה 600 מ"ג', 'Tablet 600 mg'), mgPerUnit: 600, unit: 'tablet' },
  { id: 'tab800', label: L('טבליה 800 מ"ג', 'Tablet 800 mg'), mgPerUnit: 800, unit: 'tablet' },
  { id: 'liquid', label: L('סירופ 100 מ"ג/5 מ"ל', 'Liquid 100 mg/5 mL'), mgPerUnit: 20, unit: 'ml' },
];

const SOURCES = [
  'Dunayer E. Toxicology Brief: Ibuprofen toxicosis in dogs, cats, and ferrets. Veterinary Medicine. 2004:580–586.',
  'Villar D, et al. Ibuprofen, aspirin and acetaminophen toxicosis and treatment in dogs and cats. Vet Hum Toxicol. 1998;40(3):156–161.',
  'Richardson JA. Management of acetaminophen and ibuprofen toxicosis. J Vet Emerg Crit Care. 2000;10(4):285–291.',
  'Merck/MSD Veterinary Manual. Toxicoses From Human Analgesics in Animals.',
];

export interface IbuInput {
  species: ToxSpecies;
  weightKg: number;
  mg: number;
}

export function computeIbuprofen(input: IbuInput): ToxinResult {
  const mgPerKg = input.mg / input.weightKg;
  // Cats ≈ half the dog thresholds.
  const k = input.species === 'cat' ? 0.5 : 1;
  const t1 = 25 * k;
  const t2 = 125 * k;
  const t3 = 175 * k;
  const t4 = 400 * k;

  let level: RiskLevel;
  if (mgPerKg < t1) level = 'minimal';
  else if (mgPerKg < t2) level = 'mild';
  else if (mgPerKg < t3) level = 'moderate';
  else if (mgPerKg < t4) level = 'severe';
  else level = 'critical';

  const emergency = level === 'severe' || level === 'critical';
  const fraction = Math.min(1, mgPerKg / (450 * k));

  const signs =
    level === 'minimal'
      ? L('מתחת לסף; לרוב ללא סימנים. נטר/י.', 'Below threshold; usually no signs. Monitor.')
      : level === 'mild' || level === 'moderate'
        ? L(
            'מערכת העיכול: הקאות (לעיתים דמיות), כאב בטן, שלשול/מלנה, חוסר תיאבון.',
            'GI: vomiting (sometimes bloody), abdominal pain, diarrhea/melena, anorexia.',
          )
        : L(
            'כיב/דימום במערכת העיכול ואי-ספיקת כליות חריפה; במינונים גבוהים — דיכאון CNS, אטקסיה, פרכוסים, תרדמת.',
            'GI ulceration/bleeding and acute renal failure; at high doses — CNS depression, ataxia, seizures, coma.',
          );

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(0)} mg/kg`,
    doseSubLabel: L('איבופרופן למשקל גוף', 'ibuprofen per body weight'),
    signs,
    action:
      level === 'minimal'
        ? L('נטר/י ופנה/י לרופא וטרינר להתייעצות.', 'Monitor and consult a vet.')
        : L(
            'פנה/י לרופא וטרינר. פחם פעיל חוזר (מחזור אנטרוהפטי), מגני קיבה (אומפרזול, סוקרלפט, מיזופרוסטול), ובמינוני כליה — נוזלים IV ~48 ש׳ עם ניטור תפקוד כליות.',
            'Contact a vet. Repeated activated charcoal (enterohepatic recirculation), GI protectants (omeprazole, sucralfate, misoprostol), and for renal-risk doses IV fluids ~48 h with renal monitoring.',
          ),
    decon: L(
      'הקאה אם נאכל לאחרונה; פחם פעיל במנות חוזרות כל 6–8 ש׳ ל-24 ש׳. סימני כליה עשויים להופיע תוך 18 ש׳ או להתעכב 3–5 ימים.',
      'Emesis if recent; multiple-dose activated charcoal every 6–8 h for 24 h. Renal signs may appear within 18 h or be delayed 3–5 days.',
    ),
    context: L(
      'חתולים רגישים פי ~2 מכלבים. נפרוקסן רעיל בהרבה (מנה בודדת ~35 מ"ג/ק"ג גורמת לסימנים) בשל זמן מחצית חיים ארוך ומחזור אנטרוהפטי.',
      'Cats are ~2× more sensitive than dogs. Naproxen is far more toxic (a single ~35 mg/kg causes signs) due to its long half-life and enterohepatic recirculation.',
    ),
    emergency,
    stats: [{ label: L('איבופרופן/ק"ג', 'Ibuprofen/kg'), value: `${mgPerKg.toFixed(0)} mg/kg` }],
    sources: SOURCES,
  };
}
