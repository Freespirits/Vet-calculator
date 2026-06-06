/**
 * Caffeine (methylxanthine) toxicosis — canine & feline.
 * Same mechanism as the caffeine fraction of chocolate, isolated here for
 * coffee / energy-drink / caffeine-pill ingestions.
 *
 * Bands (mg/kg, ASPCA APCC / Merck): >20 GI + restlessness, >40 cardiotoxic,
 * >60 tremors/seizures, minimum lethal dose dog 140–150 / cat 100–150. Cats
 * are slightly more sensitive, so feline thresholds are set a little lower.
 */
import { L, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';
import type { DrugProduct } from '../drugCommon';

/** Typical caffeine content per common serving (mg). */
export const CAFFEINE_PRODUCTS: DrugProduct[] = [
  { id: 'pill200', label: L('כדור קפאין 200 מ"ג', 'Caffeine pill 200 mg'), mgPerUnit: 200, unit: 'tablet' },
  { id: 'coffee', label: L('כוס קפה שחור (~95 מ"ג)', 'Mug of brewed coffee (~95 mg)'), mgPerUnit: 95, unit: 'serving' },
  { id: 'espresso', label: L('אספרסו (~63 מ"ג)', 'Espresso shot (~63 mg)'), mgPerUnit: 63, unit: 'serving' },
  { id: 'energy', label: L('פחית משקה אנרגיה (~80 מ"ג)', 'Energy-drink can (~80 mg)'), mgPerUnit: 80, unit: 'serving' },
  { id: 'instant', label: L('כפית נס קפה (~57 מ"ג)', 'Instant coffee tsp (~57 mg)'), mgPerUnit: 57, unit: 'serving' },
  { id: 'tea', label: L('כוס תה שחור (~47 מ"ג)', 'Cup of black tea (~47 mg)'), mgPerUnit: 47, unit: 'serving' },
  { id: 'cola', label: L('פחית קולה (~35 מ"ג)', 'Can of cola (~35 mg)'), mgPerUnit: 35, unit: 'serving' },
];

const SOURCES = [
  'ASPCA Animal Poison Control Center. Caffeine / Methylxanthine toxicosis.',
  'Merck/MSD Veterinary Manual. Chocolate (Methylxanthine) Toxicosis in Animals, 2024.',
  'Dolder LK, Peterson ME, Talcott PA. Methylxanthines. In: Small Animal Toxicology, 3rd ed. Elsevier Saunders; 2013:647–52.',
];

export interface CaffeineInput {
  species: ToxSpecies;
  weightKg: number;
  mg: number;
}

/** Species thresholds (mg/kg): [mild, moderate, severe, critical]. */
function thresholds(species: ToxSpecies): [number, number, number, number] {
  return species === 'cat' ? [15, 30, 50, 100] : [20, 40, 60, 140];
}

export function computeCaffeine(input: CaffeineInput): ToxinResult {
  const mgPerKg = input.mg / input.weightKg;
  const [a, b, c, d] = thresholds(input.species);

  let level: RiskLevel;
  if (mgPerKg < a) level = 'minimal';
  else if (mgPerKg < b) level = 'mild';
  else if (mgPerKg < c) level = 'moderate';
  else if (mgPerKg < d) level = 'severe';
  else level = 'critical';

  const emergency = level === 'severe' || level === 'critical';
  const fraction = Math.min(1, mgPerKg / d);

  const signs =
    level === 'minimal'
      ? L('מתחת לסף; לרוב ללא סימנים. נטר/י לאי-שקט או הקאות.', 'Below threshold; usually no signs. Watch for restlessness or vomiting.')
      : level === 'mild'
        ? L('אי-שקט, צמא ושתן מוגברים, הקאות, דפיקות לב מהירות.', 'Restlessness, increased thirst/urination, vomiting, tachycardia.')
        : level === 'moderate'
          ? L('היפראקטיביות, יתר לחץ דם, הפרעות קצב, רעד שרירי.', 'Hyperactivity, hypertension, arrhythmias, muscle tremors.')
          : L('רעד חמור, פרכוסים, הפרעות קצב מסכנות חיים, היפרתרמיה.', 'Severe tremors, seizures, life-threatening arrhythmias, hyperthermia.');

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(0)} mg/kg`,
    doseSubLabel: L('קפאין למשקל גוף', 'caffeine per body weight'),
    signs,
    action:
      level === 'minimal'
        ? L('נטר/י בבית; פנה/י לרופא וטרינר אם מופיעים סימנים.', 'Monitor at home; contact a vet if signs develop.')
        : L(
            'פנה/י לרופא וטרינר. הקאה יזומה אם נאכל לאחרונה, פחם פעיל חוזר, נוזלי IV (מזרזים הפרשה), ושליטה ברעד/פרכוסים והפרעות קצב.',
            'Contact a vet. Induce emesis if recent, repeated activated charcoal, IV fluids (enhance excretion), and control of tremors/seizures and arrhythmias.',
          ),
    decon: L(
      'ספיגה מהירה; הקאה יזומה מועילה מוקדם. פחם פעיל במנות חוזרות (מחזור אנטרוהפטי). חצי-חיים בכלב ~4.5 שעות; סימנים יכולים להימשך 12–48 שעות.',
      'Rapid absorption; early emesis helps. Multiple-dose activated charcoal (enterohepatic recirculation). Canine half-life ~4.5 h; signs may last 12–48 h.',
    ),
    context: L(
      'מינון קטלני מינימלי: כלב 140–150, חתול 100–150 מ"ג/ק"ג. כדור קפאין בודד (200 מ"ג) מסוכן לכלב קטן. שים/י לב לבליעה משולבת עם שוקולד.',
      'Minimum lethal dose: dog 140–150, cat 100–150 mg/kg. A single caffeine pill (200 mg) is dangerous to a small dog. Watch for co-ingestion with chocolate.',
    ),
    emergency,
    stats: [
      { label: L('סך קפאין', 'Total caffeine'), value: `${input.mg.toFixed(0)} mg` },
      { label: L('קפאין/ק"ג', 'Caffeine/kg'), value: `${mgPerKg.toFixed(0)} mg/kg` },
    ],
    sources: SOURCES,
  };
}
