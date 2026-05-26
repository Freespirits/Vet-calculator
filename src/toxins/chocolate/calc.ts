/**
 * Methylxanthine (chocolate / caffeine) toxicosis — canine & feline.
 *
 * Built to the VIN monograph: Galles B, Gwaltney-Brant S,
 * "Methylxanthine Toxicosis (Canine)", revised 2023.
 *
 * Methodology
 *  - Content table stores TOTAL methylxanthine (TM = theobromine + caffeine).
 *  - Caffeine ≈ 10% of theobromine ⇒ theobromine = TM / 1.1, caffeine = TM × 0.0909.
 *  - Dog risk bands are stated by the monograph on TM mg/kg:
 *      <20 none · 20–40 mild–moderate · 40–50 cardiac/CNS · ≥60–80 seizures/death.
 *  - Cats are more sensitive (theobromine LD50 200 vs dog 250–500); thresholds
 *    are shifted ~20% lower and a sensitivity note is added.
 */
import { L, type LocalizedText, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

export const OZ_TO_G = 28.3495;

export interface ChocolateType {
  id: string;
  name: LocalizedText;
  /** Total methylxanthine mg per gram. Omitted for dark (computed from % cacao). */
  tmPerG?: number;
  isDark?: boolean;
}

/** From the monograph table (mg/oz) ÷ 28.35, cross-checked against the figure (mg/g). */
export const CHOCOLATE_TYPES: ChocolateType[] = [
  { id: 'white', name: L('שוקולד לבן', 'White chocolate'), tmPerG: 0.01 },
  { id: 'milk', name: L('שוקולד חלב', 'Milk chocolate'), tmPerG: 2.26 },
  { id: 'semisweet', name: L('שוקולד מריר-למחצה', 'Semisweet chocolate'), tmPerG: 5.29 },
  { id: 'dark', name: L('שוקולד מריר (% קקאו)', 'Dark chocolate (% cacao)'), isDark: true },
  { id: 'baking', name: L('שוקולד מאפה / לא ממותק', 'Baking / unsweetened'), tmPerG: 14.11 },
  { id: 'liquor', name: L('משחת קקאו (chocolate liquor)', 'Chocolate liquor'), tmPerG: 25 },
  { id: 'cocoa_powder', name: L('אבקת קקאו לא ממותקת', 'Cocoa powder (unsweetened)'), tmPerG: 28.22 },
  { id: 'cocoa_nibs', name: L('פולי קקאו שבורים (nibs)', 'Cocoa nibs'), tmPerG: 22 },
  { id: 'cacao_beans', name: L('פולי קקאו', 'Cacao beans'), tmPerG: 31.7 },
];

export function chocolateTmPerG(typeId: string, darkPercent: number): number {
  const type = CHOCOLATE_TYPES.find((t) => t.id === typeId);
  if (!type) return 0;
  if (type.isDark) return (darkPercent / 100) * 14.11; // % cacao × baking-chocolate TM
  return type.tmPerG ?? 0;
}

export interface ChocolateInput {
  species: ToxSpecies;
  weightKg: number;
  /** Amount eaten, already converted to grams. */
  grams: number;
  typeId: string;
  darkPercent: number;
}

const SIGNS: Record<RiskLevel, LocalizedText> = {
  minimal: L(
    'לא צפויים סימנים משמעותיים. ייתכן אי-נוחות קלה במערכת העיכול עקב תכולת השומן והסוכר.',
    'Significant signs unlikely. Mild GI upset possible from the fat and sugar content.',
  ),
  mild: L(
    'הקאות, ריבוי שתן, שלשול וחוסר מנוחה.',
    'Vomiting, polyuria, diarrhea and restlessness.',
  ),
  moderate: L(
    'אי-שקט, פעילות-יתר, אטקסיה, טכיקרדיה, טכיפנאה, יתר לחץ-דם והיפרתרמיה.',
    'Agitation, hyperactivity, ataxia, tachycardia, tachypnea, hypertension and hyperthermia.',
  ),
  severe: L(
    'רעד, פרכוסים, הפרעות קצב לב חמורות; בריכוזים גבוהים — תרדמת ומוות.',
    'Tremors, seizures and severe cardiac arrhythmias; at high doses — coma and death.',
  ),
  critical: L(
    'מסכן חיים: פרכוסים, הפרעות קצב חדריות, היפרתרמיה ותרדמת. סכנת מוות.',
    'Life-threatening: seizures, ventricular arrhythmias, hyperthermia and coma. Risk of death.',
  ),
  emergency: L('', ''),
};

const ACTION: Record<RiskLevel, LocalizedText> = {
  minimal: L(
    'נטר/י את החיה. בכמות גדולה — פנה/י לרופא וטרינר; ניתן לשקול הקאה יזומה עד 4–6 שעות מהאכילה.',
    'Monitor at home. For a large amount, contact a vet; induced emesis can be considered up to 4–6 h post-ingestion.',
  ),
  mild: L(
    'פנה/י לרופא וטרינר. דה-קונטמינציה (הקאה ± פחם פעיל), ניטור ותמיכה.',
    'Contact a veterinarian. Decontaminate (emesis ± activated charcoal), monitor and support.',
  ),
  moderate: L(
    'פנה/י לרופא וטרינר בהקדם. ניטור קרדיולוגי, נוזלים IV וטיפול תומך.',
    'Seek veterinary care promptly. Cardiac monitoring, IV fluids and supportive care.',
  ),
  severe: L(
    'חירום — פנה/י מיד לרופא וטרינר. ניטור ECG, שליטה בפרכוסים והפרעות קצב, נוזלים IV, קטטר שתן.',
    'Emergency — go to a vet now. ECG monitoring, seizure/arrhythmia control, IV fluids, urinary catheter.',
  ),
  critical: L(
    'חירום מיידי. טיפול נמרץ: שליטה בפרכוסים, אנטי-אריתמיים, קירור, נוזלים IV אגרסיביים.',
    'Immediate emergency. Intensive care: seizure control, antiarrhythmics, cooling, aggressive IV fluids.',
  ),
  emergency: L('', ''),
};

const DECON = L(
  'הקאה יזומה עשויה להועיל עד 4–6 שעות מהאכילה (ספיגה איטית). פחם פעיל חוזר במנות גבוהות. חצי-חיים: תאוברומין 17.5 ש׳ (מחזור אנטרוהפטי), קפאין 4.5 ש׳ — סימנים נמשכים 12–72 ש׳.',
  'Induced emesis can help up to 4–6 h post-ingestion (slow absorption). Repeated activated charcoal for large doses. Half-life: theobromine 17.5 h (enterohepatic recirculation), caffeine 4.5 h — signs last 12–72 h.',
);

const CONTEXT = L(
  'LD50 תאוברומין: כלב 250–500, חתול 200 מ"ג/ק"ג. מינון קטלני מינימלי קפאין: כלב 140–150, חתול 100–150. מקרה מוות מתועד: 64 מ"ג/ק"ג תאוברומין + 19.7 קפאין. כלבים סימפטומטיים: חציון תאוברומין 70.8 (טווח 19.5–332).',
  'Theobromine LD50: dog 250–500, cat 200 mg/kg. Caffeine minimum lethal dose: dog 140–150, cat 100–150. Documented fatal case: 64 mg/kg theobromine + 19.7 caffeine. Symptomatic dogs: median theobromine 70.8 (range 19.5–332).',
);

const SOURCES = [
  'Galles B, Gwaltney-Brant S. Methylxanthine Toxicosis (Canine). Veterinary Information Network (VIN), revised 16 May 2023.',
  'Weingart C, Hartmann A, Kohn B. Chocolate ingestion in dogs: 156 events (2015–2019). J Small Anim Pract. 2021;62(11):979–983.',
  'Dolder LK, Peterson ME, Talcott PA. Methylxanthines. In: Small Animal Toxicology, 3rd ed. Elsevier Saunders; 2013:647–52.',
];

/** Species-specific TM thresholds (mg/kg): [mild, moderate, severe, critical]. */
function thresholds(species: ToxSpecies): [number, number, number, number] {
  return species === 'cat' ? [15, 30, 50, 80] : [20, 40, 60, 100];
}

function bandFor(tmPerKg: number, species: ToxSpecies): RiskLevel {
  const [a, b, c, d] = thresholds(species);
  if (tmPerKg < a) return 'minimal';
  if (tmPerKg < b) return 'mild';
  if (tmPerKg < c) return 'moderate';
  if (tmPerKg < d) return 'severe';
  return 'critical';
}

export function computeChocolate(input: ChocolateInput): ToxinResult {
  const tmPerG = chocolateTmPerG(input.typeId, input.darkPercent);
  const tmMg = input.grams * tmPerG;
  const tmPerKg = tmMg / input.weightKg;
  const theobromine = tmPerKg / 1.1;
  const caffeine = tmPerKg - theobromine;

  const level = bandFor(tmPerKg, input.species);
  const cap = input.species === 'cat' ? 80 : 100;
  const fraction = Math.min(1, tmPerKg / cap);
  const emergency = level === 'severe' || level === 'critical';

  const catNote =
    input.species === 'cat'
      ? L(
          ' חתולים רגישים יותר למתילקסנטינים — הספים נמוכים יותר.',
          ' Cats are more sensitive to methylxanthines — thresholds are lower.',
        )
      : L('', '');

  return {
    level,
    fraction,
    doseLabel: `${tmPerKg.toFixed(1)} mg/kg`,
    doseSubLabel: L('סך מתילקסנטינים', 'total methylxanthine'),
    signs: L(SIGNS[level].he + catNote.he, SIGNS[level].en + catNote.en),
    action: ACTION[level],
    decon: DECON,
    context: CONTEXT,
    emergency,
    stats: [
      { label: L('תאוברומין', 'Theobromine'), value: `${theobromine.toFixed(1)} mg/kg` },
      { label: L('קפאין', 'Caffeine'), value: `${caffeine.toFixed(1)} mg/kg` },
      { label: L('סך נאכל', 'Total ingested'), value: `${tmMg.toFixed(0)} mg` },
      { label: L('מתילקסנטין/ק"ג', 'Methylxanthine/kg'), value: `${tmPerKg.toFixed(1)} mg/kg` },
    ],
    sources: SOURCES,
  };
}
