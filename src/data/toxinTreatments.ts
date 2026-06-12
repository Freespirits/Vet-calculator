/**
 * "Treat now" registry — decontamination + antidote quick-doses per toxin.
 *
 * Rendered by <TreatNowPanel> inside every toxin result. Doses are for
 * veterinary professionals (the UI says so) and every row carries a source.
 * Content rules, in the spirit of the app's "cited clinical decision
 * support" identity:
 *   - Emesis/charcoal rows are GATED per toxin ('indicated' | 'caution' |
 *     'no') with the time window and contraindications in the note — an
 *     emetic dose is never shown where emesis is wrong for the substance.
 *   - Numeric rows compute total mg (or g / mL) for the entered weight;
 *     volume (mL) is shown only when a standard concentration exists.
 *   - No diagnosis, no improvisation: rows mirror the cited protocols.
 */
import { L, type LocalizedText } from '../types/toxins';

export type DeconStatus = 'indicated' | 'caution' | 'no';

export interface TreatmentDose {
  min: number;
  max?: number;
  unit: 'mg/kg' | 'mcg/kg' | 'g/kg' | 'mL/kg';
}

export interface TreatmentRow {
  name: LocalizedText;
  /** Numeric per-kg dose → the panel computes the total for the weight. */
  dose?: TreatmentDose;
  /** Standard concentration (mg/mL) → the panel also computes mL. */
  concMgMl?: number;
  /** Free-text dose when per-kg math doesn't apply (CRIs, protocols). */
  doseText?: LocalizedText;
  route: string;
  note?: LocalizedText;
  source: string;
}

export interface ToxinTreatment {
  emesis: DeconStatus;
  emesisNote: LocalizedText;
  charcoal: DeconStatus;
  charcoalNote: LocalizedText;
  rows: TreatmentRow[];
  monitoring: LocalizedText;
  sources: string[];
}

/* Shared decon rows (referenced from the panel, not per-toxin):
 * dogs — apomorphine 0.03 mg/kg IV / 0.04 mg/kg IM (mg only; injectable
 * concentrations vary by country/compounder);
 * cats — dexmedetomidine 7 mcg/kg IM.
 * Charcoal 1–2 g/kg PO unless the toxin binds poorly. */
export const EMESIS_DOG: TreatmentRow = {
  name: L('אפומורפין (כלב)', 'Apomorphine (dog)'),
  dose: { min: 0.03, unit: 'mg/kg' },
  route: 'IV',
  note: L('או 0.04 מ"ג/ק"ג IM. רק במטופל א-סימפטומטי עם הכרה מלאה.', 'or 0.04 mg/kg IM. Only in an asymptomatic, fully conscious patient.'),
  source: "Plumb's Veterinary Drug Handbook, 10th ed. — Apomorphine.",
};
export const EMESIS_CAT: TreatmentRow = {
  name: L('דקסמדטומידין (חתול)', 'Dexmedetomidine (cat)'),
  dose: { min: 7, unit: 'mcg/kg' },
  concMgMl: 0.5,
  route: 'IM',
  note: L('הקאה בחתולים פחות אמינה; אין להשתמש באפומורפין.', 'Emesis in cats is less reliable; do not use apomorphine.'),
  source: 'Thawley VJ, Drobatz KJ. Hydromorphone vs dexmedetomidine for emesis induction in cats. JAVMA 2015.',
};
export const CHARCOAL_ROW: TreatmentRow = {
  name: L('פחם פעיל', 'Activated charcoal'),
  dose: { min: 1, max: 2, unit: 'g/kg' },
  route: 'PO',
  note: L('מנה ראשונה עם סורביטול; רק במטופל שמסוגל לבלוע בבטחה.', 'First dose with sorbitol; only in a patient that can swallow safely.'),
  source: "Plumb's Veterinary Drug Handbook, 10th ed. — Charcoal, Activated.",
};

export const TOXIN_TREATMENTS: Record<string, ToxinTreatment> = {
  chocolate: {
    emesis: 'indicated',
    emesisNote: L(
      'עד 2–4 שעות מהאכילה (שוקולד מתעכל לאט; בכמויות גדולות אף עד 6 שעות) — רק בא-סימפטומטי.',
      'Within 2–4 h of ingestion (chocolate empties slowly; up to 6 h after large ingestions) — asymptomatic patients only.',
    ),
    charcoal: 'indicated',
    charcoalNote: L(
      'מתילקסנטינים עוברים מחזור אנטרו-הפטי: במקרים חמורים חזרו על חצי מנה כל 6–8 שעות.',
      'Methylxanthines recirculate enterohepatically: in severe cases repeat half-dose q6–8h.',
    ),
    rows: [
      {
        name: L('פרופרנולול — לטכיאריתמיה', 'Propranolol — for tachyarrhythmia'),
        dose: { min: 0.02, max: 0.06, unit: 'mg/kg' },
        concMgMl: 1,
        route: 'IV איטי / slow IV',
        note: L('לטכיקרדיה/אריתמיה משמעותית בלבד; טיטרציה לאפקט.', 'Only for significant tachycardia/arrhythmia; titrate to effect.'),
        source: "Plumb's 10th ed. — Propranolol; Gwaltney-Brant S. Chocolate intoxication. Vet Med 2001.",
      },
      {
        name: L('לידוקאין — לאריתמיה חדרית (כלב)', 'Lidocaine — ventricular arrhythmia (dog)'),
        dose: { min: 2, unit: 'mg/kg' },
        concMgMl: 20,
        route: 'IV',
        note: L('בולוס איטי, ואז CRI לפי הצורך; זהירות רבה בחתולים.', 'Slow bolus, then CRI as needed; use extreme caution in cats.'),
        source: "Plumb's 10th ed. — Lidocaine.",
      },
      {
        name: L('נוזלים IV + קטטר שתן / הוצאה תכופה', 'IV fluids + urinary catheter / frequent walks'),
        doseText: L('קצב תחזוקה–כפול; תאוברומין נספג חזרה משלפוחית מלאה.', 'Maintenance–2× rate; theobromine reabsorbs from a full bladder.'),
        route: 'IV',
        source: 'Gwaltney-Brant S. Chocolate intoxication. Vet Med 2001; ASPCA APCC guidance.',
      },
    ],
    monitoring: L(
      'ECG/דופק, לחץ דם וטמפרטורה; סימנים מופיעים תוך 6–12 שעות ונמשכים עד 72.',
      'ECG/heart rate, blood pressure and temperature; signs start within 6–12 h and can last 72 h.',
    ),
    sources: [
      'Gwaltney-Brant S. Chocolate intoxication. Vet Med 2001.',
      "Plumb's Veterinary Drug Handbook, 10th ed.",
    ],
  },

  caffeine: {
    emesis: 'indicated',
    emesisNote: L(
      'עד 1–2 שעות מהבליעה, רק בא-סימפטומטי — קפאין נספג מהר.',
      'Within 1–2 h of ingestion, asymptomatic only — caffeine absorbs fast.',
    ),
    charcoal: 'indicated',
    charcoalNote: L(
      'מחזור אנטרו-הפטי: במקרים חמורים חזרו על חצי מנה כל 6–8 שעות.',
      'Enterohepatic recirculation: in severe cases repeat half-dose q6–8h.',
    ),
    rows: [
      {
        name: L('פרופרנולול — לטכיאריתמיה', 'Propranolol — for tachyarrhythmia'),
        dose: { min: 0.02, max: 0.06, unit: 'mg/kg' },
        concMgMl: 1,
        route: 'IV איטי / slow IV',
        source: "Plumb's 10th ed. — Propranolol.",
      },
      {
        name: L('דיאזפם — לפרכוסים/אי-שקט', 'Diazepam — seizures/agitation'),
        dose: { min: 0.5, max: 1, unit: 'mg/kg' },
        concMgMl: 5,
        route: 'IV',
        source: "Plumb's 10th ed. — Diazepam.",
      },
    ],
    monitoring: L(
      'ECG, טמפרטורה, לחץ דם; נוזלים IV להאצת פינוי.',
      'ECG, temperature, blood pressure; IV fluids to speed elimination.',
    ),
    sources: ["Plumb's Veterinary Drug Handbook, 10th ed.", 'ASPCA APCC — caffeine/methylxanthine guidance.'],
  },

  grapes: {
    emesis: 'indicated',
    emesisNote: L(
      'עד 2–4 שעות (ענבים/צימוקים שוהים בקיבה) — גם מאוחר יותר אם נראים בהקאה.',
      'Within 2–4 h (grapes/raisins linger in the stomach) — even later if material is still seen.',
    ),
    charcoal: 'indicated',
    charcoalNote: L('מנה בודדת 1–2 ג/ק"ג; יעילות לא מוכחת אך מקובלת.', 'Single dose 1–2 g/kg; unproven but standard practice.'),
    rows: [
      {
        name: L('נוזלים IV — הטיפול המרכזי', 'IV fluids — the core treatment'),
        doseText: L('1.5–2× תחזוקה למשך 48 שעות לאחר חשיפה משמעותית.', '1.5–2× maintenance for 48 h after a significant exposure.'),
        route: 'IV',
        note: L('אין אנטידוט; המטרה היא הגנה כלייתית.', 'No antidote exists; the goal is renal protection.'),
        source: 'Eubig PA et al. Acute renal failure in dogs after raisin/grape ingestion. J Vet Intern Med 2005.',
      },
    ],
    monitoring: L(
      'קריאטינין ו-BUN בסיס, 24, 48 ו-72 שעות; תפוקת שתן.',
      'Baseline, 24 h, 48 h and 72 h creatinine and BUN; urine output.',
    ),
    sources: [
      'Eubig PA et al. JVIM 2005.',
      'Wegenast C et al. Letter: unique sensitivity of dogs to tartaric acid (grape toxicosis). JAVMA 2021.',
    ],
  },

  xylitol: {
    emesis: 'caution',
    emesisNote: L(
      'רק תוך 30–60 דקות, בא-סימפטומטי ועם גלוקוז תקין — היפוגליקמיה יכולה להופיע מהר מאוד.',
      'Only within 30–60 min, asymptomatic AND normoglycemic — hypoglycemia can start very fast.',
    ),
    charcoal: 'no',
    charcoalNote: L('פחם פעיל אינו קושר קסיליטול — אין תועלת.', 'Activated charcoal does not bind xylitol — no benefit.'),
    rows: [
      {
        name: L('דקסטרוז — בולוס להיפוגליקמיה', 'Dextrose — bolus for hypoglycemia'),
        dose: { min: 0.5, max: 1, unit: 'mL/kg' },
        route: 'IV',
        note: L('של תמיסת 50% מדוללת 1:2–1:4, ואז CRI של 2.5–5% דקסטרוז.', 'of 50% solution diluted 1:2–1:4, then a 2.5–5% dextrose CRI.'),
        source: "Plumb's 10th ed. — Dextrose; Murphy LA, Coleman AE. Vet Clin North Am 2019.",
      },
      {
        name: L('SAMe — הגנה כבדית', 'SAMe — hepatoprotection'),
        dose: { min: 18, max: 20, unit: 'mg/kg' },
        route: 'PO q24h',
        note: L('במינוני קסיליטול מעל ~500 מ"ג/ק"ג או עליית אנזימי כבד.', 'For xylitol doses above ~500 mg/kg or rising liver enzymes.'),
        source: "Plumb's 10th ed. — S-Adenosylmethionine.",
      },
    ],
    monitoring: L(
      'גלוקוז כל 1–2 שעות למשך 12 שעות; אנזימי כבד וקרישה ב-24/48/72 שעות.',
      'Glucose q1–2h for 12 h; liver enzymes and coagulation at 24/48/72 h.',
    ),
    sources: ['Murphy LA, Coleman AE. Xylitol toxicosis in dogs: an update. Vet Clin North Am 2019.'],
  },

  allium: {
    emesis: 'indicated',
    emesisNote: L('עד 2 שעות מהאכילה, בא-סימפטומטי.', 'Within 2 h of ingestion, asymptomatic patients.'),
    charcoal: 'indicated',
    charcoalNote: L('מנה בודדת 1–2 ג/ק"ג בחשיפה משמעותית.', 'Single dose 1–2 g/kg for significant exposures.'),
    rows: [
      {
        name: L('אין אנטידוט — תמיכה והמתנה', 'No antidote — supportive care'),
        doseText: L('חמצן לפי צורך; עירוי דם אם PCV צונח עם סימנים קליניים.', 'Oxygen as needed; blood transfusion if PCV drops with clinical signs.'),
        route: '—',
        source: 'Cope RB. Allium species poisoning in dogs and cats. Vet Med 2005.',
      },
    ],
    monitoring: L(
      'PCV וגופי היינץ מדי יום למשך 5–7 ימים — השפל מופיע באיחור של 3–5 ימים.',
      'Daily PCV and Heinz-body check for 5–7 days — the nadir is delayed 3–5 days.',
    ),
    sources: ['Cope RB. Allium species poisoning in dogs and cats. Vet Med 2005.'],
  },

  macadamia: {
    emesis: 'indicated',
    emesisNote: L('עד 1–2 שעות ובכמויות גדולות בלבד; לרוב אינו נדרש.', 'Within 1–2 h and only for large ingestions; often unnecessary.'),
    charcoal: 'indicated',
    charcoalNote: L('מנה בודדת בכמויות גדולות.', 'Single dose for large ingestions.'),
    rows: [
      {
        name: L('תמיכה בלבד — חולף מעצמו', 'Supportive only — self-limiting'),
        doseText: L('נוזלים, חימום ומנוחה; החלמה תוך 24–48 שעות.', 'Fluids, warmth and rest; recovery within 24–48 h.'),
        route: '—',
        note: L('בדקו ציפוי שוקולד — שם הסכנה האמיתית.', 'Check for chocolate coating — that is the bigger danger.'),
        source: 'Hansen SR et al. Weakness, tremors and depression associated with macadamia nuts in dogs. Vet Hum Toxicol 2000.',
      },
    ],
    monitoring: L('טמפרטורה וחולשה; פנו שוב אם אין שיפור תוך 48 שעות.', 'Temperature and weakness; re-present if no improvement within 48 h.'),
    sources: ['Hansen SR et al. Vet Hum Toxicol 2000.'],
  },

  lily: {
    emesis: 'indicated',
    emesisNote: L('עד 1–2 שעות מהלעיסה (דקסמדטומידין 7 מק"ג/ק"ג IM בחתול).', 'Within 1–2 h of chewing (dexmedetomidine 7 mcg/kg IM in the cat).'),
    charcoal: 'indicated',
    charcoalNote: L('מנה בודדת לאחר ההקאה.', 'Single dose after emesis.'),
    rows: [
      {
        name: L('רחצה — הסרת אבקה מהפרווה', 'Bathe — remove pollen from the coat'),
        doseText: L('אבקה שמלוקקת מהפרווה מספיקה לפגיעה כלייתית.', 'Pollen groomed off the coat is enough to injure the kidneys.'),
        route: '—',
        source: 'Rumbeiha WK et al. Experimental Easter lily toxicosis in cats. J Vet Diagn Invest 2004.',
      },
      {
        name: L('נוזלים IV — דיורזה מוקדמת', 'IV fluids — early diuresis'),
        doseText: L('2× תחזוקה למשך 48 שעות, להתחיל לפני עליית קריאטינין.', '2× maintenance for 48 h, started before creatinine rises.'),
        route: 'IV',
        note: L('דיאליזה אם מתפתחת אנוריה.', 'Dialysis if anuria develops.'),
        source: 'Rumbeiha WK et al. JVDI 2004; Fitzgerald KT. Lily toxicity in the cat. Top Companion Anim Med 2010.',
      },
    ],
    monitoring: L(
      'קריאטינין בסיס ו-24/48/72 שעות; תפוקת שתן — אנוריה = פרוגנוזה גרועה.',
      'Baseline and 24/48/72 h creatinine; urine output — anuria carries a grave prognosis.',
    ),
    sources: ['Rumbeiha WK et al. J Vet Diagn Invest 2004.'],
  },

  thc: {
    emesis: 'caution',
    emesisNote: L(
      'רק אם הבליעה ממש טרייה והמטופל ערני — THC נוגד הקאה ומעלה סיכון אספירציה.',
      'Only if ingestion is very recent and the patient fully alert — THC is antiemetic and raises aspiration risk.',
    ),
    charcoal: 'caution',
    charcoalNote: L('רק במטופל ערני שבולע בבטחה; אפשר מנה שנייה (מחזור אנטרו-הפטי).', 'Only in an alert patient that swallows safely; a second dose is reasonable (enterohepatic recirculation).'),
    rows: [
      {
        name: L('אינטרליפיד 20% — להרעלה קשה', 'Intralipid 20% — for severe intoxication'),
        dose: { min: 1.5, unit: 'mL/kg' },
        route: 'IV bolus',
        note: L('ואז 0.25 מ"ל/ק"ג/דקה למשך 30–60 דקות; THC ליפופילי.', 'then 0.25 mL/kg/min for 30–60 min; THC is lipophilic.'),
        source: 'Fernandez AL et al. Intravenous lipid emulsion in toxicology. JVECC 2011.',
      },
      {
        name: L('תמיכה — חום גוף, נוזלים, סביבה שקטה', 'Supportive — temperature, fluids, quiet environment'),
        doseText: L('רוב המקרים מחלימים תוך 24–72 שעות.', 'Most patients recover in 24–72 h.'),
        route: '—',
        source: 'Meola SD et al. Marijuana toxicosis in dogs. JVECC 2012.',
      },
    ],
    monitoring: L('טמפרטורה, דופק ולחץ דם; הגנה מאספירציה במטופל מנומנם.', 'Temperature, heart rate and blood pressure; protect the obtunded patient from aspiration.'),
    sources: ['Meola SD et al. JVECC 2012.', 'Fernandez AL et al. JVECC 2011.'],
  },

  acetaminophen: {
    emesis: 'indicated',
    emesisNote: L('עד 1–2 שעות מהבליעה, בא-סימפטומטי.', 'Within 1–2 h of ingestion, asymptomatic patients.'),
    charcoal: 'indicated',
    charcoalNote: L('1–2 ג/ק"ג; אל תיתנו יחד עם NAC פומי (מרווח של שעתיים).', '1–2 g/kg; separate from oral NAC by two hours.'),
    rows: [
      {
        name: L('N-אצטילציסטאין (NAC) — האנטידוט', 'N-acetylcysteine (NAC) — the antidote'),
        dose: { min: 140, unit: 'mg/kg' },
        route: 'PO/IV (מדולל ל-5%)',
        note: L('העמסה, ואז 70 מ"ג/ק"ג כל 6 שעות, 7 מנות לפחות.', 'Loading dose, then 70 mg/kg q6h for at least 7 doses.'),
        source: "Plumb's 10th ed. — Acetylcysteine.",
      },
      {
        name: L('SAMe — תוספת הגנה כבדית', 'SAMe — adjunct hepatoprotection'),
        dose: { min: 18, max: 20, unit: 'mg/kg' },
        route: 'PO q24h',
        source: "Plumb's 10th ed. — S-Adenosylmethionine.",
      },
      {
        name: L('חמצן — למתמוגלובינמיה', 'Oxygen — for methemoglobinemia'),
        doseText: L('ריריות חומות/ציאנוטיות = מתמוגלובינמיה; חמצן ותמיכה.', 'Brown/cyanotic mucous membranes = methemoglobinemia; oxygen and support.'),
        route: '—',
        source: 'Aronson LR, Drobatz K. Acetaminophen toxicosis in cats. JVECC 1996.',
      },
    ],
    monitoring: L(
      'צבע ריריות ו-MetHb; PCV (גופי היינץ); ALT ב-24/48/72 שעות.',
      'Mucous-membrane color and MetHb; PCV (Heinz bodies); ALT at 24/48/72 h.',
    ),
    sources: ["Plumb's Veterinary Drug Handbook, 10th ed.", 'Aronson LR, Drobatz K. JVECC 1996.'],
  },

  ibuprofen: {
    emesis: 'indicated',
    emesisNote: L('עד שעה–שעתיים — NSAIDs נספגים מהר.', 'Within 1–2 h — NSAIDs absorb quickly.'),
    charcoal: 'indicated',
    charcoalNote: L('בכמויות גדולות חזרו כל 6–8 שעות (מחזור אנטרו-הפטי).', 'For large ingestions repeat q6–8h (enterohepatic recirculation).'),
    rows: [
      {
        name: L('אומפרזול — הגנה עיכולית', 'Omeprazole — GI protection'),
        dose: { min: 1, unit: 'mg/kg' },
        route: 'PO/IV q24h',
        note: L('למשך 5–10 ימים.', 'For 5–10 days.'),
        source: "Plumb's 10th ed. — Omeprazole.",
      },
      {
        name: L('מיזופרוסטול (כלב)', 'Misoprostol (dog)'),
        dose: { min: 2, max: 5, unit: 'mcg/kg' },
        route: 'PO q8h',
        note: L('להפחתת סיכון כיב; לא בהריון.', 'Reduces ulcer risk; never in pregnancy.'),
        source: "Plumb's 10th ed. — Misoprostol.",
      },
      {
        name: L('נוזלים IV — הגנה כלייתית', 'IV fluids — renal protection'),
        doseText: L('1.5–2× תחזוקה ל-48 שעות במינונים נפרוטוקסיים.', '1.5–2× maintenance for 48 h at nephrotoxic doses.'),
        route: 'IV',
        source: 'Villar D et al. Ibuprofen toxicosis in dogs, cats and ferrets. Vet Hum Toxicol 1998.',
      },
    ],
    monitoring: L(
      'קריאטינין/BUN ב-24/48/72 שעות; צואה שחורה/הקאת דם; שתן.',
      'Creatinine/BUN at 24/48/72 h; melena/hematemesis; urinalysis.',
    ),
    sources: ['Villar D et al. Vet Hum Toxicol 1998.', "Plumb's Veterinary Drug Handbook, 10th ed."],
  },

  ethylene_glycol: {
    emesis: 'caution',
    emesisNote: L(
      'רק תוך 30–60 דקות — אתילן גליקול נספג מהר מאוד; לא במטופל מדוכא.',
      'Only within 30–60 min — ethylene glycol absorbs extremely fast; never in a depressed patient.',
    ),
    charcoal: 'no',
    charcoalNote: L('פחם קושר אתילן גליקול בצורה גרועה — אל תתעכבו עליו.', 'Charcoal binds ethylene glycol poorly — do not delay for it.'),
    rows: [
      {
        name: L('פומפיזול (4-MP) — כלב', 'Fomepizole (4-MP) — dog'),
        dose: { min: 20, unit: 'mg/kg' },
        route: 'IV',
        note: L('העמסה, ואז 15 מ"ג/ק"ג ב-12 ו-24 שעות, 5 מ"ג/ק"ג ב-36 שעות.', 'Loading, then 15 mg/kg at 12 h and 24 h, 5 mg/kg at 36 h.'),
        source: "Plumb's 10th ed. — Fomepizole; Connally HE et al. JAVMA 1996.",
      },
      {
        name: L('פומפיזול במינון גבוה — חתול', 'High-dose fomepizole — cat'),
        dose: { min: 125, unit: 'mg/kg' },
        route: 'IV',
        note: L('העמסה תוך 3 שעות מהחשיפה, ואז 31.25 מ"ג/ק"ג ב-12/24/36 שעות.', 'Load within 3 h of exposure, then 31.25 mg/kg at 12/24/36 h.'),
        source: 'Connally HE, Thrall MA, Hamar DW. Fomepizole for EG-poisoned cats. JVECC 2010.',
      },
      {
        name: L('אתנול 20% — אם אין פומפיזול (כלב)', 'Ethanol 20% — if no fomepizole (dog)'),
        dose: { min: 5.5, unit: 'mL/kg' },
        route: 'IV',
        note: L('כל 4 שעות ×5 מנות, ואז כל 6 שעות ×4 מנות.', 'q4h ×5 doses, then q6h ×4 doses.'),
        source: "Plumb's 10th ed. — Ethanol.",
      },
    ],
    monitoring: L(
      'גזים בדם (חמצת), סידן-אוקסלט בשתן, קריאטינין כל 12 שעות; משקל סגולי לפני נוזלים.',
      'Blood gas (acidosis), urine calcium-oxalate crystals, creatinine q12h; USG before fluids.',
    ),
    sources: ['Connally HE et al. JAVMA 1996; JVECC 2010.', "Plumb's Veterinary Drug Handbook, 10th ed."],
  },

  anticoagulant_rodenticide: {
    emesis: 'indicated',
    emesisNote: L('עד 2–4 שעות — פיתיון שוהה בקיבה.', 'Within 2–4 h — bait lingers in the stomach.'),
    charcoal: 'indicated',
    charcoalNote: L('מנה בודדת 1–2 ג/ק"ג לאחר ההקאה.', 'Single dose 1–2 g/kg after emesis.'),
    rows: [
      {
        name: L('ויטמין K1 — האנטידוט', 'Vitamin K1 — the antidote'),
        dose: { min: 3, max: 5, unit: 'mg/kg' },
        route: 'PO ביום, מחולק q12h',
        note: L('עם ארוחה שומנית; 4 שבועות לדור שני. PT יומיים-שלושה אחרי הפסקה.', 'With a fatty meal; 4 weeks for 2nd-gen agents. Check PT 48–72 h after the last dose.'),
        source: "Plumb's 10th ed. — Phytonadione (Vitamin K1).",
      },
      {
        name: L('פלזמה טרייה-קפואה — אם מדמם', 'Fresh-frozen plasma — if bleeding'),
        doseText: L('10–20 מ"ל/ק"ג IV; ויטמין K לוקח 6–12 שעות לפעול.', '10–20 mL/kg IV; vitamin K needs 6–12 h to act.'),
        route: 'IV',
        source: 'Sheafor SE, Couto CG. Anticoagulant rodenticide toxicity in 21 dogs. JAAHA 1999.',
      },
    ],
    monitoring: L(
      'אם לא מטפלים מיד: PT ב-48 וב-72 שעות מהבליעה — עלייה מחייבת K1.',
      'If not treating immediately: PT at 48 h and 72 h post-ingestion — any rise mandates K1.',
    ),
    sources: ["Plumb's Veterinary Drug Handbook, 10th ed.", 'Sheafor SE, Couto CG. JAAHA 1999.'],
  },

  bromethalin: {
    emesis: 'indicated',
    emesisNote: L('עד 1–2 שעות, בא-סימפטומטי — נספג מהר.', 'Within 1–2 h, asymptomatic only — absorbed quickly.'),
    charcoal: 'indicated',
    charcoalNote: L(
      'זהו עיקר הטיפול: 1–2 ג/ק"ג ואז 0.5–1 ג/ק"ג כל 8 שעות למשך 2–3 ימים (מחזור אנטרו-הפטי).',
      'This IS the main therapy: 1–2 g/kg then 0.5–1 g/kg q8h for 2–3 days (enterohepatic recirculation).',
    ),
    rows: [
      {
        name: L('מניטול — לבצקת מוחית', 'Mannitol — for cerebral edema'),
        dose: { min: 0.5, max: 1, unit: 'g/kg' },
        route: 'IV על פני 20 דק׳',
        note: L('אין אנטידוט לברומתלין; טיפול תומך בלבד בסימנים נוירולוגיים.', 'Bromethalin has no antidote; neurological signs get supportive care only.'),
        source: 'Dorman DC et al. Bromethalin toxicosis. JAAHA 1990; DeClementi C, Sobczak BR. Vet Clin North Am 2018.',
      },
    ],
    monitoring: L(
      'בדיקות נוירולוגיות 24–72 שעות (עד שבוע); רעד/אטקסיה/פרכוסים = אשפוז.',
      'Neuro checks for 24–72 h (up to a week); tremor/ataxia/seizures mean hospitalization.',
    ),
    sources: ['DeClementi C, Sobczak BR. Common rodenticide toxicoses. Vet Clin North Am 2018.'],
  },

  cholecalciferol: {
    emesis: 'indicated',
    emesisNote: L('עד 2 שעות מהבליעה.', 'Within 2 h of ingestion.'),
    charcoal: 'indicated',
    charcoalNote: L('1–2 ג/ק"ג ואז חצי מנה כל 6–8 שעות ביממה הראשונה.', '1–2 g/kg then half-dose q6–8h for the first 24 h.'),
    rows: [
      {
        name: L('נוזלי NaCl 0.9% — דיורזה', '0.9% NaCl — saline diuresis'),
        doseText: L('2–3× תחזוקה; הסידן מופרש בשתן.', '2–3× maintenance; promotes urinary calcium excretion.'),
        route: 'IV',
        source: 'DeClementi C, Sobczak BR. Vet Clin North Am 2018.',
      },
      {
        name: L('פורוסמיד', 'Furosemide'),
        dose: { min: 2, max: 4, unit: 'mg/kg' },
        concMgMl: 10,
        route: 'IV/PO q8–12h',
        note: L('רק אחרי מילוי נוזלים.', 'Only after volume repletion.'),
        source: "Plumb's 10th ed. — Furosemide.",
      },
      {
        name: L('פרדניזולון', 'Prednisolone'),
        dose: { min: 1, max: 2, unit: 'mg/kg' },
        route: 'PO q12h',
        note: L('מפחית ספיגת סידן.', 'Reduces calcium absorption.'),
        source: "Plumb's 10th ed. — Prednisolone.",
      },
      {
        name: L('פמידרונט — להיפרקלצמיה מבוססת', 'Pamidronate — for established hypercalcemia'),
        dose: { min: 1.3, max: 2, unit: 'mg/kg' },
        route: 'IV מדולל, על פני 2–4 שעות',
        source: 'Rumbeiha WK et al. Pamidronate disodium for cholecalciferol toxicosis. Am J Vet Res 2000.',
      },
    ],
    monitoring: L(
      'סידן, זרחן וקריאטינין ב-24/48/72 שעות ואז יומי — ההשפעה נמשכת שבועות.',
      'Calcium, phosphorus and creatinine at 24/48/72 h then daily — effects persist for weeks.',
    ),
    sources: [
      'Rumbeiha WK et al. Am J Vet Res 2000.',
      'DeClementi C, Sobczak BR. Common rodenticide toxicoses. Vet Clin North Am 2018.',
    ],
  },
};
