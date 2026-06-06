/**
 * Cholecalciferol (vitamin D3) toxicosis — canine & feline.
 * Found in some rodenticides and in human/pet vitamin-D supplements. Causes
 * hypercalcemia and hyperphosphatemia → soft-tissue mineralisation and acute
 * kidney injury, often with a delayed, protracted course.
 *
 * Thresholds (mg/kg of cholecalciferol, Merck Veterinary Manual):
 *   >0.1  hypercalcemia possible (monitor/treat)
 *   >0.5  serious toxicosis likely
 *   ≥2    potentially lethal
 * 1 mg cholecalciferol = 40,000 IU.
 */
import { L, type ToxinResult } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

export const IU_PER_MG = 40000;

const SOURCES = [
  'Rumbeiha WK. Cholecalciferol (Vitamin D3) Toxicosis. Merck/MSD Veterinary Manual, 2023.',
  'ASPCA Animal Poison Control Center. Cholecalciferol (vitamin D3) rodenticide and supplement toxicosis.',
  'Peterson ME. Vitamin D toxicosis. In: Small Animal Toxicology, 3rd ed. Elsevier Saunders; 2013.',
];

export interface CholecalciferolInput {
  weightKg: number;
  /** Total cholecalciferol ingested, mg. */
  mg: number;
}

export function computeCholecalciferol(input: CholecalciferolInput): ToxinResult {
  const mgPerKg = input.mg / input.weightKg;

  let level: RiskLevel;
  if (mgPerKg < 0.1) level = 'minimal';
  else if (mgPerKg < 0.5) level = 'moderate';
  else if (mgPerKg < 2) level = 'severe';
  else level = 'critical';

  // Hypercalcemia is insidious and the course is prolonged, so any toxic dose
  // (≥0.1 mg/kg) is treated as an emergency.
  const emergency = mgPerKg >= 0.1;
  const fraction = Math.min(1, mgPerKg / 2);

  const signs =
    level === 'minimal'
      ? L('מתחת לסף ההיפרקלצמיה; נטר/י. ערכי סידן/זרחן עשויים לעלות תוך 12–24 ש׳.', 'Below the hypercalcemia threshold; monitor. Calcium/phosphorus may rise within 12–24 h.')
      : L(
          'אנורקסיה, רפיון, צמא ושתן מרובים, הקאות (לעיתים דמיות), אי-ספיקת כליות חריפה תוך 1–3 ימים.',
          'Anorexia, lethargy, marked thirst/urination, vomiting (sometimes bloody), acute kidney injury within 1–3 days.',
        );

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(3)} mg/kg`,
    doseSubLabel: L('כולקלציפרול למשקל גוף', 'cholecalciferol per body weight'),
    signs,
    action:
      level === 'minimal'
        ? L('נטר/י ופנה/י לרופא וטרינר; ייתכן צורך בבדיקות סידן/זרחן/כליות חוזרות.', 'Monitor and consult a vet; serial calcium/phosphorus/renal values may be needed.')
        : L(
            'פנה/י לרופא וטרינר בדחיפות. דה-קונטמינציה מוקדמת (הקאה, פחם פעיל חוזר). טיפול בהיפרקלצמיה: נוזלי IV, פורוסמיד, גלוקוקורטיקואידים, ולעיתים ביספוספונטים (פמידרונט). ניטור ממושך של סידן/כליות.',
            'Contact a vet urgently. Early decontamination (emesis, repeated activated charcoal). Treat hypercalcemia: IV fluids, furosemide, glucocorticoids, and often bisphosphonates (pamidronate). Prolonged calcium/renal monitoring.',
          ),
    decon: L(
      'דה-קונטמינציה יעילה רק מוקדם. ההשפעות מתעכבות (24–72 ש׳) ונמשכות שבועות בשל אגירה בשומן — נדרש ניטור מתמשך.',
      'Decontamination helps only early. Effects are delayed (24–72 h) and persist for weeks due to fat storage — ongoing monitoring is required.',
    ),
    context: L(
      'ספים: >0.1 מ"ג/ק"ג היפרקלצמיה אפשרית, ≥2 מ"ג/ק"ג קטלני. 1 מ"ג = 40,000 יחב"ל. פיתיונות כולקלציפרול נפוצים בריכוז ~0.075% (0.75 מ"ג/גרם).',
      'Thresholds: >0.1 mg/kg possible hypercalcemia, ≥2 mg/kg potentially lethal. 1 mg = 40,000 IU. Cholecalciferol baits are commonly ~0.075% (0.75 mg/g).',
    ),
    emergency,
    stats: [
      { label: L('סך כולקלציפרול', 'Total cholecalciferol'), value: `${input.mg.toFixed(3)} mg` },
      { label: L('שווה-ערך יחב"ל', 'IU equivalent'), value: `${Math.round(input.mg * IU_PER_MG).toLocaleString()} IU` },
      { label: L('מ"ג/ק"ג', 'mg/kg'), value: `${mgPerKg.toFixed(3)} mg/kg` },
    ],
    sources: SOURCES,
  };
}
