/**
 * Anticoagulant rodenticide toxicosis — canine & feline.
 * These baits inhibit vitamin-K epoxide reductase, depleting clotting factors
 * II, VII, IX and X. Coagulopathy is delayed 2–5 days as existing factors are
 * consumed. The single-dose toxic threshold depends heavily on the active
 * ingredient, and individual susceptibility varies, so any meaningful
 * ingestion warrants veterinary assessment and a PT (INR) check at 48–72 h.
 *
 * Active-ingredient toxic thresholds below are approximate, dog-based figures
 * (Merck Veterinary Manual); cats are generally somewhat more resistant but
 * should be managed the same way.
 */
import { L, type LocalizedText, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

export interface AnticoagulantAgent {
  id: string;
  label: LocalizedText;
  /** Approximate single-dose toxic threshold in dogs (mg/kg). */
  thresholdMgPerKg: number;
  /** Generation, for context. */
  generation: 1 | 2;
}

export const ANTICOAGULANT_AGENTS: AnticoagulantAgent[] = [
  { id: 'brodifacoum', label: L('ברודיפקום', 'Brodifacoum'), thresholdMgPerKg: 0.2, generation: 2 },
  { id: 'bromadiolone', label: L('ברומדיולון', 'Bromadiolone'), thresholdMgPerKg: 0.9, generation: 2 },
  { id: 'difethialone', label: L('דיפתיאלון', 'Difethialone'), thresholdMgPerKg: 0.55, generation: 2 },
  { id: 'diphacinone', label: L('דיפצינון', 'Diphacinone'), thresholdMgPerKg: 0.9, generation: 1 },
  { id: 'chlorophacinone', label: L('כלורופצינון', 'Chlorophacinone'), thresholdMgPerKg: 0.9, generation: 1 },
  { id: 'warfarin', label: L('וורפרין', 'Warfarin'), thresholdMgPerKg: 5, generation: 1 },
];

const SOURCES = [
  'Murphy MJ. Anticoagulant Rodenticide Poisoning in Animals. Merck/MSD Veterinary Manual, 2023.',
  'ASPCA Animal Poison Control Center. Anticoagulant rodenticides.',
  'Means C. Rodenticides. In: Small Animal Toxicology, 3rd ed. Elsevier Saunders; 2013.',
];

export interface AnticoagulantInput {
  species: ToxSpecies;
  weightKg: number;
  /** Total active ingredient ingested, mg. */
  mgActive: number;
  /** Toxic threshold for the chosen agent, mg/kg. */
  thresholdMgPerKg: number;
}

export function computeAnticoagulant(input: AnticoagulantInput): ToxinResult {
  const mgPerKg = input.mgActive / input.weightKg;
  const ratio = mgPerKg / input.thresholdMgPerKg;

  let level: RiskLevel;
  if (ratio < 0.5) level = 'minimal';
  else if (ratio < 1) level = 'moderate';
  else if (ratio < 5) level = 'severe';
  else level = 'critical';

  const emergency = level === 'severe' || level === 'critical';
  const fraction = Math.min(1, ratio);

  const signs = L(
    'הקרישה מתעכבת 2–5 ימים: חולשה, חיוורון, קוצר נשימה (דימום ריאתי/חזה), שטפי דם/נקודות דימום, צליעה (דימום למפרק), דם בשתן/צואה.',
    'Coagulopathy is delayed 2–5 days: weakness, pallor, dyspnea (pulmonary/pleural bleeding), bruising/petechiae, lameness (joint bleeds), blood in urine/stool.',
  );

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(3)} mg/kg`,
    doseSubLabel: L('חומר פעיל למשקל גוף', 'active ingredient per body weight'),
    signs,
    action: L(
      'פנה/י לרופא וטרינר. דה-קונטמינציה מוקדמת (הקאה, פחם פעיל). אנטידוט: ויטמין K1 (פיטונדיון), לרוב 3–4 שבועות לדור שני. מומלץ לבדוק PT (INR) 48–72 שעות לאחר חשיפה גם אם המנה נמוכה — רגישות אישית משתנה.',
      'Contact a vet. Early decontamination (emesis, activated charcoal). Antidote: vitamin K1 (phytonadione), usually 3–4 weeks for second-generation agents. Check PT (INR) at 48–72 h after exposure even at low doses — individual susceptibility varies.',
    ),
    decon: L(
      'הקאה יזומה אם נאכל לאחרונה; פחם פעיל. אין סימנים מיידיים — ההפרעה בקרישה מתעכבת ימים, ולכן אין להסתמך על היעדר סימנים מוקדם.',
      'Induce emesis if recent; activated charcoal. There are no immediate signs — the coagulopathy is delayed by days, so do not rely on the early absence of signs.',
    ),
    context: L(
      'הסף תלוי מאוד בחומר הפעיל (דור שני חזק בהרבה). הערכים כאן מקורבים ומבוססי כלב; חתולים בדרך כלל עמידים מעט יותר אך מטופלים זהה. ויטמין K3 אינו יעיל — רק K1.',
      'The threshold depends heavily on the active ingredient (second-generation agents are far more potent). Values here are approximate and dog-based; cats are usually somewhat more resistant but treated the same. Vitamin K3 is not effective — only K1.',
    ),
    emergency,
    stats: [
      { label: L('סך חומר פעיל', 'Total active ingredient'), value: `${input.mgActive.toFixed(3)} mg` },
      { label: L('מ"ג/ק"ג', 'mg/kg'), value: `${mgPerKg.toFixed(3)} mg/kg` },
      { label: L('אחוז מהסף', '% of threshold'), value: `${(ratio * 100).toFixed(0)}%` },
    ],
    sources: SOURCES,
  };
}
