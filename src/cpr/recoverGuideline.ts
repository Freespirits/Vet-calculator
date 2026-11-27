/**
 * CPR reference figures cited from the 2024 RECOVER Guidelines.
 *
 * Source (read in full, open-access copy): Burkitt-Creedon JM, Boller M,
 * Fletcher DJ, et al. "2024 RECOVER Guidelines: Updated treatment
 * recommendations for CPR in dogs and cats." J Vet Emerg Crit Care.
 * 2024;34(S1):104–123. doi:10.1111/vec.13391.
 *
 * How this file is meant to work
 *  - It holds ONLY factual figures (dose per kg, timing, energy) and, next to
 *    each one, the identifier of the recommendation it came from: "Table 2"
 *    (the paper's CPR dosage chart) and/or the worksheet id printed in the
 *    paper's Table 1 (e.g. ALS-06, BLS-07, MON-10).
 *  - It does NOT reproduce the RECOVER CPR algorithm or the RECOVER drug
 *    dosing chart. Those are copyrighted by The RECOVER Initiative and may not
 *    be modified or built into a product without its written permission
 *    (https://recoverinitiative.org/brand-intellectual-property-guidelines/).
 *    The UI links out to the official chart instead.
 *  - No vial strength is asserted here. The paper's Table 2 lists doses, not
 *    concentrations, and strengths differ between countries; the only
 *    concentrations in this file are the two the guideline states itself
 *    ("10% calcium gluconate", "10% calcium chloride" = 100 mg/mL).
 *  - Notes are our own short summaries of the cited recommendation, written in
 *    Hebrew + English (other UI languages fall back to English, as for all
 *    clinical text in this app).
 */
import { L, type LocalizedText } from '../types/toxins';
import type { Species } from '../types';

export const RECOVER_2024 = {
  shortLabel: 'RECOVER 2024',
  citation:
    'Burkitt-Creedon JM, Boller M, Fletcher DJ, et al. 2024 RECOVER Guidelines: Updated treatment recommendations for CPR in dogs and cats. J Vet Emerg Crit Care. 2024;34(S1):104–123. doi:10.1111/vec.13391',
  url: 'https://doi.org/10.1111/vec.13391',
  organisation: 'The RECOVER Initiative',
  organisationUrl: 'https://recoverinitiative.org',
} as const;

export type CprInterventionId =
  | 'epinephrine'
  | 'vasopressin'
  | 'atropine'
  | 'lidocaine'
  | 'amiodarone'
  | 'esmolol'
  | 'naloxone'
  | 'atipamezole'
  | 'flumazenil'
  | 'sodium_bicarbonate'
  | 'calcium_gluconate'
  | 'calcium_chloride'
  | 'fluid_bolus'
  | 'tidal_volume';

export type CprGroup = 'vasopressor' | 'vagolytic' | 'antiarrhythmic' | 'reversal' | 'situational' | 'support';
export type CprDoseUnit = 'mg/kg' | 'U/kg' | 'µg/kg' | 'mEq/kg' | 'mL/kg';
export type CartUnit = 'mg/mL' | 'U/mL' | 'mEq/mL';

/** 'applies' = recommended/suggested for the species; 'alternative' = only if the first choice is unavailable. */
export type Applicability = 'applies' | 'alternative' | 'not-suggested';

export interface PerKgDose {
  min: number;
  max?: number;
  unit: CprDoseUnit;
}

export interface CprIntervention {
  id: CprInterventionId;
  group: CprGroup;
  name: LocalizedText;
  dose: PerKgDose;
  /** Species-specific dose that replaces `dose` (fluid bolus). */
  doseBySpecies?: Partial<Record<Species, PerKgDose>>;
  /** Defaults to 'applies' for both species. */
  applicability?: Partial<Record<Species, Applicability>>;
  /** Unit of the clinic-entered vial strength; absent when no draw-up volume applies. */
  cartUnit?: CartUnit;
  /** Strength stated by the guideline itself (mg/mL). */
  guidelineConcentrationMgPerMl?: number;
  /** Follow-on constant-rate infusion, µg/kg/min. */
  infusionMicrogramsPerKgPerMinute?: number;
  /** When / how the guideline says it is given. */
  timing: LocalizedText;
  note?: LocalizedText;
  /** Table / worksheet identifiers inside the RECOVER 2024 paper. */
  references: string[];
}

export const CPR_INTERVENTIONS: CprIntervention[] = [
  {
    id: 'epinephrine',
    group: 'vasopressor',
    name: L('אפינפרין (אדרנלין)', 'Epinephrine'),
    dose: { min: 0.01, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    timing: L('IV/IO · כל 3–5 דקות כל עוד הקצב אינו בר-הלם', 'IV/IO · every 3–5 min while a non-shockable rhythm persists'),
    note: L(
      'מינון גבוה (0.1 מ"ג/ק"ג) אינו מומלץ עוד. בקצב בר-הלם — לא לפני ניסיון הדפיברילציה הראשון.',
      'High-dose epinephrine (0.1 mg/kg) is no longer recommended. In shockable rhythms, not before the first defibrillation attempt.',
    ),
    references: ['Table 2', 'ALS-06', 'ALS-07', 'ALS-08', 'ALS-16'],
  },
  {
    id: 'vasopressin',
    group: 'vasopressor',
    name: L('וזופרסין', 'Vasopressin'),
    dose: { min: 0.8, unit: 'U/kg' },
    cartUnit: 'U/mL',
    timing: L('IV/IO · כל 3–5 דקות', 'IV/IO · every 3–5 min'),
    note: L(
      'חלופה לאפינפרין בקצב שאינו בר-הלם; מוצע בקצב בר-הלם שנמשך לאחר ההלם הראשון.',
      'An alternative to epinephrine in non-shockable rhythms; suggested when a shockable rhythm persists beyond the first shock.',
    ),
    references: ['Table 2', 'ALS-16', 'ALS-07'],
  },
  {
    id: 'atropine',
    group: 'vagolytic',
    name: L('אטרופין', 'Atropine'),
    dose: { min: 0.04, max: 0.054, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    timing: L('IV/IO · פעם אחת בלבד, מוקדם ככל האפשר', 'IV/IO · once only, as early as possible'),
    note: L(
      'לקצב שאינו בר-הלם כשיש חשד לטונוס וגאלי גבוה. אין לחזור על המנה.',
      'For non-shockable rhythms when high vagal tone is suspected. Do not repeat the dose.',
    ),
    references: ['Table 2', 'ALS-09', 'ALS-19'],
  },
  {
    id: 'lidocaine',
    group: 'antiarrhythmic',
    name: L('לידוקאין', 'Lidocaine'),
    dose: { min: 2, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    applicability: { cat: 'not-suggested' },
    timing: L('IV/IO · לאורך 2–4 דקות', 'IV/IO · over 2–4 min'),
    note: L(
      'כלבים: VF או VT ללא דופק שלא הגיבו להלם הראשון. בחתולים מוצע שלא לתת.',
      'Dogs: VF or pulseless VT refractory to the first shock. Suggested not to be given to cats.',
    ),
    references: ['Table 2', 'ALS-01'],
  },
  {
    id: 'amiodarone',
    group: 'antiarrhythmic',
    name: L('אמיודרון', 'Amiodarone'),
    dose: { min: 5, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    applicability: { dog: 'alternative' },
    timing: L('IV/IO · לאורך 2–4 דקות', 'IV/IO · over 2–4 min'),
    note: L(
      'חתולים: VF/VT ללא דופק שלא הגיבו להלם הראשון. כלבים: רק אם אין לידוקאין; אין להשתמש בתכשיר המכיל פוליסורבט-80.',
      'Cats: VF/pulseless VT refractory to the first shock. Dogs: only if lidocaine is unavailable; avoid polysorbate-80 formulations.',
    ),
    references: ['Table 2', 'ALS-02'],
  },
  {
    id: 'esmolol',
    group: 'antiarrhythmic',
    name: L('אסמולול', 'Esmolol'),
    dose: { min: 0.5, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    infusionMicrogramsPerKgPerMinute: 50,
    timing: L('IV/IO · לאורך 3–5 דקות, ולאחריו עירוי מתמשך', 'IV/IO · over 3–5 min, then a constant-rate infusion'),
    note: L(
      'מוצע בקצב בר-הלם שלא התהפך לאחר הדפיברילציה הראשונה.',
      'Suggested for shockable rhythms that do not convert after the first defibrillation.',
    ),
    references: ['Table 2', 'ALS-03'],
  },
  {
    id: 'naloxone',
    group: 'reversal',
    name: L('נלוקסון', 'Naloxone'),
    dose: { min: 0.04, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    timing: L('IV/IO', 'IV/IO'),
    note: L('לאחר מתן אופיואידים לאחרונה.', 'After recently administered opioids.'),
    references: ['Table 2', 'ALS-13'],
  },
  {
    id: 'atipamezole',
    group: 'reversal',
    name: L('אטיפמזול', 'Atipamezole'),
    dose: { min: 100, unit: 'µg/kg' },
    cartUnit: 'mg/mL',
    timing: L('IV/IO', 'IV/IO'),
    note: L('היפוך תרופת הרגעה/הרדמה הפיכה — ניתן לשקול.', 'Reversal of a reversible sedative/anesthetic — may be considered.'),
    references: ['Table 2', '2012-ALS13'],
  },
  {
    id: 'flumazenil',
    group: 'reversal',
    name: L('פלומזניל', 'Flumazenil'),
    dose: { min: 0.01, unit: 'mg/kg' },
    cartUnit: 'mg/mL',
    timing: L('IV/IO', 'IV/IO'),
    note: L('היפוך בנזודיאזפינים — ניתן לשקול.', 'Benzodiazepine reversal — may be considered.'),
    references: ['Table 2', '2012-ALS13'],
  },
  {
    id: 'sodium_bicarbonate',
    group: 'situational',
    name: L('סודיום ביקרבונט', 'Sodium bicarbonate'),
    dose: { min: 1, unit: 'mEq/kg' },
    cartUnit: 'mEq/mL',
    timing: L('IV/IO', 'IV/IO'),
    note: L(
      'ניתן לשקול בהחייאה ממושכת (מעל 10–15 דקות), במיוחד אם pH נמדד נמוך מ-7.0.',
      'May be considered after prolonged CPA (more than 10–15 min), particularly if a measured blood pH is below 7.0.',
    ),
    references: ['Table 2', '2012-ALS16'],
  },
  {
    id: 'calcium_gluconate',
    group: 'situational',
    name: L('קלציום גלוקונאט 10%', 'Calcium gluconate 10%'),
    dose: { min: 50, unit: 'mg/kg' },
    guidelineConcentrationMgPerMl: 100,
    timing: L('IV/IO · לאורך 2–5 דקות', 'IV/IO · over 2–5 min'),
    note: L(
      'רק בהיפוקלצמיה מתועדת (סידן מיונן נמוך מ-0.8 mmol/L) או כשהיפרקלמיה ידועה/חשודה כגורם לדום. לא לשימוש שגרתי.',
      'Only for documented hypocalcemia (ionized calcium below 0.8 mmol/L) or when hyperkalemia is known/suspected to have contributed to the arrest. Not for routine use.',
    ),
    references: ['MON-09', 'ALS-15'],
  },
  {
    id: 'calcium_chloride',
    group: 'situational',
    name: L('קלציום כלוריד 10%', 'Calcium chloride 10%'),
    dose: { min: 15, unit: 'mg/kg' },
    guidelineConcentrationMgPerMl: 100,
    timing: L('IV/IO · לאורך 2–5 דקות', 'IV/IO · over 2–5 min'),
    note: L(
      'אותן התוויות כמו קלציום גלוקונאט. לא לשימוש שגרתי.',
      'Same indications as calcium gluconate. Not for routine use.',
    ),
    references: ['MON-09', 'ALS-15'],
  },
  {
    id: 'fluid_bolus',
    group: 'support',
    name: L('בולוס נוזלים (קריסטלואיד איזוטוני)', 'Fluid bolus (isotonic crystalloid)'),
    dose: { min: 20, unit: 'mL/kg' },
    doseBySpecies: { cat: { min: 10, max: 15, unit: 'mL/kg' } },
    timing: L('IV/IO', 'IV/IO'),
    note: L(
      'רק בהיפוולמיה ידועה או חשודה. לא מומלץ בחיה אאוולמית.',
      'Only with known or suspected hypovolemia. Recommended against in euvolemic animals.',
    ),
    references: ['ALS-10'],
  },
  {
    id: 'tidal_volume',
    group: 'support',
    name: L('נפח נשימה (מונשם/ת)', 'Tidal volume (intubated)'),
    dose: { min: 10, unit: 'mL/kg' },
    timing: L('10 נשימות בדקה · זמן שאיפה של שנייה', '10 breaths/min · 1-second inspiratory time'),
    note: L(
      'לחץ שאיפה שיוצר עליית חזה נראית אך לא מוגזמת; לא מעל 40 ס"מ מים באופן שגרתי.',
      'Use a peak inspiratory pressure that gives visible but not excessive chest rise; not routinely above 40 cm H₂O.',
    ),
    references: ['BLS-13', 'BLS-14', 'BLS-19'],
  },
];

/** Electrical defibrillation energies, J/kg (Table 2; first/subsequent biphasic shock from ALS-12). */
export const DEFIBRILLATION_J_PER_KG = {
  biphasic: {
    externalFirst: 2,
    externalSubsequent: 4,
    external: { min: 2, max: 4 },
    internal: { min: 0.2, max: 0.4 },
  },
  monophasic: {
    external: { min: 4, max: 6 },
    internal: { min: 0.5, max: 1 },
  },
  references: ['Table 2', 'ALS-11', 'ALS-12'],
} as const;

/** Basic-life-support and monitoring figures the code clock and reference card rely on. */
export const CPR_TIMING = {
  /** Compressions per minute (BLS-07). */
  compressionRatePerMinute: { min: 100, max: 120 },
  /** Uninterrupted chest-compression cycle (BLS-08, BLS-15). */
  cycleSeconds: 120,
  /** Longest pause between cycles (BLS-16). */
  maxPauseSeconds: 10,
  /** Breaths per minute once intubated (BLS-14). */
  ventilationRatePerMinute: 10,
  /** Compressions : breaths when not intubated (BLS-09). */
  nonIntubatedRatio: { compressions: 30, breaths: 2 },
  /** Standard vasopressor dosing interval (ALS-07). */
  vasopressorIntervalMinutes: { min: 3, max: 5 },
  /** ETCO₂ to aim for during CPR, mm Hg (MON-10). */
  minimumEtco2MmHg: 18,
  /** Try intraosseous access if IV is not placed within this time (ALS-14). */
  intraosseousAfterMinutes: 2,
} as const;
