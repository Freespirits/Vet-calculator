/**
 * Drug Database - Based on Plumb's Veterinary Drug Handbook
 *
 * IMPORTANT: Standard dosing from Plumb's is for veterinary professional use only.
 * All doses must be verified before administration.
 */

import type { DrugInfo } from '../types';

export const DRUG_DATABASE: DrugInfo[] = [
  // NSAIDs
  {
    id: 'meloxicam',
    name: 'Meloxicam',
    nameHe: 'מלוקסיקם',
    genericName: 'Meloxicam',
    genericNameHe: 'מלוקסיקם',
    brandNames: ['Metacam', 'Loxicom', 'Meloxidyl'],
    category: 'NSAID',
    categoryHe: 'נוגד דלקת לא סטרואידי',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg', frequency: 'כל 24 שעות', notes: 'First dose can be 0.2 mg/kg', notesHe: 'מינון ראשון יכול להיות 0.2 מ"ג/ק"ג' },
      { species: 'dog', route: 'SC', minDose: 0.2, maxDose: 0.2, unit: 'mg/kg', frequency: 'פעם אחת', notes: 'Single injection only', notesHe: 'הזרקה בודדת בלבד' },
      { species: 'cat', route: 'PO', minDose: 0.05, maxDose: 0.1, unit: 'mg/kg', frequency: 'כל 24 שעות', notes: 'Use with caution in cats', notesHe: 'יש להשתמש בזהירות בחתולים' },
      { species: 'cat', route: 'SC', minDose: 0.3, maxDose: 0.3, unit: 'mg/kg', frequency: 'פעם אחת', notes: 'Single perioperative dose', notesHe: 'מינון פריאופרטיבי בודד' },
    ],
    isHighRisk: false,
    warnings: ['Contraindicated in renal disease', 'Do not use with other NSAIDs or corticosteroids'],
    warningsHe: ['אסור בשימוש במחלת כליות', 'אין לשלב עם NSAIDs אחרים או סטרואידים'],
  },
  {
    id: 'carprofen',
    name: 'Carprofen',
    nameHe: 'קרפרופן',
    genericName: 'Carprofen',
    genericNameHe: 'קרפרופן',
    brandNames: ['Rimadyl', 'Novox', 'Quellin'],
    category: 'NSAID',
    categoryHe: 'נוגד דלקת לא סטרואידי',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 2, maxDose: 4.4, unit: 'mg/kg', frequency: 'כל 12-24 שעות', notes: '4.4 mg/kg once daily or 2.2 mg/kg twice daily', notesHe: '4.4 מ"ג/ק"ג פעם ביום או 2.2 מ"ג/ק"ג פעמיים ביום' },
      { species: 'dog', route: 'SC', minDose: 4, maxDose: 4, unit: 'mg/kg', frequency: 'פעם אחת', notes: 'Perioperative use', notesHe: 'שימוש פריאופרטיבי' },
      { species: 'dog', route: 'IV', minDose: 4, maxDose: 4, unit: 'mg/kg', frequency: 'פעם אחת', notes: 'Perioperative use', notesHe: 'שימוש פריאופרטיבי' },
    ],
    isHighRisk: false,
    warnings: ['Not approved for cats', 'Monitor liver enzymes with long-term use'],
    warningsHe: ['לא מאושר לחתולים', 'יש לנטר אנזימי כבד בשימוש ממושך'],
  },

  // Antibiotics
  {
    id: 'amoxicillin_clavulanate',
    name: 'Amoxicillin/Clavulanate',
    nameHe: 'אמוקסיצילין/קלבולנאט',
    genericName: 'Amoxicillin-Clavulanic Acid',
    genericNameHe: 'אמוקסיצילין-חומצה קלבולנית',
    brandNames: ['Clavamox', 'Synulox', 'Augmentin'],
    category: 'Antibiotic',
    categoryHe: 'אנטיביוטיקה',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 12.5, maxDose: 25, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'cat', route: 'PO', minDose: 12.5, maxDose: 25, unit: 'mg/kg', frequency: 'כל 12 שעות' },
    ],
    isHighRisk: false,
    warnings: ['May cause GI upset', 'Give with food'],
    warningsHe: ['עלול לגרום להפרעות במערכת העיכול', 'יש לתת עם אוכל'],
  },
  {
    id: 'enrofloxacin',
    name: 'Enrofloxacin',
    nameHe: 'אנרופלוקסצין',
    genericName: 'Enrofloxacin',
    genericNameHe: 'אנרופלוקסצין',
    brandNames: ['Baytril'],
    category: 'Antibiotic - Fluoroquinolone',
    categoryHe: 'אנטיביוטיקה - פלואורוקינולון',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 5, maxDose: 20, unit: 'mg/kg', frequency: 'כל 24 שעות' },
      { species: 'dog', route: 'SC', minDose: 5, maxDose: 20, unit: 'mg/kg', frequency: 'כל 24 שעות' },
      { species: 'dog', route: 'IV', minDose: 5, maxDose: 20, unit: 'mg/kg', frequency: 'כל 24 שעות', notes: 'Dilute and give slowly', notesHe: 'יש לדלל ולתת לאט' },
      { species: 'cat', route: 'PO', minDose: 5, maxDose: 5, unit: 'mg/kg', frequency: 'כל 24 שעות', notes: 'Do not exceed 5 mg/kg in cats!', notesHe: 'אין לעבור 5 מ"ג/ק"ג בחתולים!' },
    ],
    isHighRisk: false,
    warnings: ['Limit to 5 mg/kg in cats - retinal toxicity risk', 'Avoid in growing animals'],
    warningsHe: ['מגביל ל-5 מ"ג/ק"ג בחתולים - סיכון לרעילות רשתית', 'יש להימנע בבעלי חיים צעירים בגדילה'],
  },
  {
    id: 'cefazolin',
    name: 'Cefazolin',
    nameHe: 'צפזולין',
    genericName: 'Cefazolin Sodium',
    genericNameHe: 'צפזולין נתרן',
    brandNames: ['Ancef', 'Kefzol'],
    category: 'Antibiotic - Cephalosporin',
    categoryHe: 'אנטיביוטיקה - צפלוספורין',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 20, maxDose: 35, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'dog', route: 'IM', minDose: 20, maxDose: 35, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'cat', route: 'IV', minDose: 20, maxDose: 35, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'cat', route: 'IM', minDose: 20, maxDose: 35, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
    ],
    isHighRisk: false,
    warnings: ['Surgical prophylaxis: give 30 min before incision'],
    warningsHe: ['פרופילקסיה כירורגית: לתת 30 דקות לפני חתך'],
  },
  {
    id: 'metronidazole',
    name: 'Metronidazole',
    nameHe: 'מטרונידזול',
    genericName: 'Metronidazole',
    genericNameHe: 'מטרונידזול',
    brandNames: ['Flagyl'],
    category: 'Antibiotic/Antiprotozoal',
    categoryHe: 'אנטיביוטיקה/נוגד טפילים',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 10, maxDose: 25, unit: 'mg/kg', frequency: 'כל 12 שעות' },
      { species: 'dog', route: 'IV', minDose: 10, maxDose: 15, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'cat', route: 'PO', minDose: 10, maxDose: 25, unit: 'mg/kg', frequency: 'כל 12-24 שעות' },
    ],
    isHighRisk: false,
    warnings: ['Neurotoxicity at high doses', 'Reduce dose in hepatic disease'],
    warningsHe: ['רעילות עצבית במינונים גבוהים', 'יש להפחית מינון במחלת כבד'],
  },

  // Antiemetics
  {
    id: 'maropitant',
    name: 'Maropitant',
    nameHe: 'מרופיטנט',
    genericName: 'Maropitant Citrate',
    genericNameHe: 'מרופיטנט ציטראט',
    brandNames: ['Cerenia'],
    category: 'Antiemetic',
    categoryHe: 'נוגד הקאות',
    plumbsDosing: [
      { species: 'dog', route: 'SC', minDose: 1, maxDose: 1, unit: 'mg/kg', frequency: 'כל 24 שעות' },
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 1, unit: 'mg/kg', frequency: 'כל 24 שעות' },
      { species: 'dog', route: 'PO', minDose: 2, maxDose: 2, unit: 'mg/kg', frequency: 'כל 24 שעות', notes: 'For motion sickness: 8 mg/kg', notesHe: 'למחלת תנועה: 8 מ"ג/ק"ג' },
      { species: 'cat', route: 'SC', minDose: 1, maxDose: 1, unit: 'mg/kg', frequency: 'כל 24 שעות' },
      { species: 'cat', route: 'IV', minDose: 1, maxDose: 1, unit: 'mg/kg', frequency: 'כל 24 שעות' },
    ],
    isHighRisk: false,
    warnings: ['SC injection may sting', 'Use within 1 hour of reconstitution'],
    warningsHe: ['הזרקה תת-עורית עלולה לצרוב', 'יש להשתמש תוך שעה מהמסה'],
  },
  {
    id: 'metoclopramide',
    name: 'Metoclopramide',
    nameHe: 'מטוקלופרמיד',
    genericName: 'Metoclopramide HCl',
    genericNameHe: 'מטוקלופרמיד הידרוכלוריד',
    brandNames: ['Reglan'],
    category: 'Antiemetic/Prokinetic',
    categoryHe: 'נוגד הקאות/פרוקינטי',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 0.2, maxDose: 0.5, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'dog', route: 'SC', minDose: 0.2, maxDose: 0.5, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 2, unit: 'mg/kg', frequency: 'CRI per 24 hours', notes: 'As CRI: 1-2 mg/kg/day', notesHe: 'כעירוי מתמשך: 1-2 מ"ג/ק"ג/יום' },
      { species: 'cat', route: 'PO', minDose: 0.2, maxDose: 0.4, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'cat', route: 'SC', minDose: 0.2, maxDose: 0.4, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
    ],
    isHighRisk: false,
    warnings: ['May cause extrapyramidal signs', 'Avoid in GI obstruction'],
    warningsHe: ['עלול לגרום לתסמינים אקסטרה-פירמידליים', 'יש להימנע בחסימת מערכת עיכול'],
  },
  {
    id: 'ondansetron',
    name: 'Ondansetron',
    nameHe: 'אונדנסטרון',
    genericName: 'Ondansetron HCl',
    genericNameHe: 'אונדנסטרון הידרוכלוריד',
    brandNames: ['Zofran'],
    category: 'Antiemetic',
    categoryHe: 'נוגד הקאות',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg', frequency: 'כל 6-12 שעות' },
      { species: 'dog', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות' },
      { species: 'cat', route: 'IV', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg', frequency: 'כל 6-12 שעות' },
    ],
    isHighRisk: false,
  },

  // Opioids
  {
    id: 'buprenorphine',
    name: 'Buprenorphine',
    nameHe: 'בופרנורפין',
    genericName: 'Buprenorphine HCl',
    genericNameHe: 'בופרנורפין הידרוכלוריד',
    brandNames: ['Simbadol', 'Buprenex', 'Vetergesic'],
    category: 'Opioid Analgesic',
    categoryHe: 'משכך כאבים אופיואידי',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'dog', route: 'IM', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'cat', route: 'IV', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'cat', route: 'IM', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg', frequency: 'כל 6-8 שעות' },
      { species: 'cat', route: 'PO', minDose: 0.02, maxDose: 0.03, unit: 'mg/kg', frequency: 'כל 8-12 שעות', notes: 'Transmucosal (OTM)', notesHe: 'טרנסמוקוזלי' },
    ],
    isHighRisk: true,
    isControlled: true,
    warnings: ['Controlled substance - Schedule III', 'Partial agonist - ceiling effect'],
    warningsHe: ['חומר מפוקח', 'אגוניסט חלקי - יש אפקט תקרה'],
  },
  {
    id: 'morphine',
    name: 'Morphine',
    nameHe: 'מורפין',
    genericName: 'Morphine Sulfate',
    genericNameHe: 'מורפין סולפט',
    brandNames: [],
    category: 'Opioid Analgesic',
    categoryHe: 'משכך כאבים אופיואידי',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.5, unit: 'mg/kg', frequency: 'כל 4-6 שעות', notes: 'Give slowly', notesHe: 'לתת לאט' },
      { species: 'dog', route: 'IM', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
      { species: 'dog', route: 'SC', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
      { species: 'cat', route: 'IM', minDose: 0.1, maxDose: 0.3, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
    ],
    isHighRisk: true,
    isControlled: true,
    warnings: ['Controlled substance - Schedule II', 'May cause respiratory depression', 'Histamine release - avoid IV bolus'],
    warningsHe: ['חומר מפוקח', 'עלול לגרום לדיכוי נשימתי', 'שחרור היסטמין - להימנע מבולוס IV'],
  },
  {
    id: 'methadone',
    name: 'Methadone',
    nameHe: 'מתדון',
    genericName: 'Methadone HCl',
    genericNameHe: 'מתדון הידרוכלוריד',
    brandNames: [],
    category: 'Opioid Analgesic',
    categoryHe: 'משכך כאבים אופיואידי',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.5, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
      { species: 'dog', route: 'IM', minDose: 0.1, maxDose: 0.5, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
      { species: 'cat', route: 'IV', minDose: 0.1, maxDose: 0.3, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
      { species: 'cat', route: 'IM', minDose: 0.1, maxDose: 0.3, unit: 'mg/kg', frequency: 'כל 4-6 שעות' },
    ],
    isHighRisk: true,
    isControlled: true,
    warnings: ['Controlled substance - Schedule II', 'NMDA receptor antagonist activity'],
    warningsHe: ['חומר מפוקח', 'פעילות אנטגוניסט לקולטן NMDA'],
  },

  // Sedatives
  {
    id: 'dexmedetomidine',
    name: 'Dexmedetomidine',
    nameHe: 'דקסמדטומידין',
    genericName: 'Dexmedetomidine HCl',
    genericNameHe: 'דקסמדטומידין הידרוכלוריד',
    brandNames: ['Dexdomitor', 'Sileo'],
    category: 'Alpha-2 Agonist/Sedative',
    categoryHe: 'אגוניסט אלפא-2/מרגיע',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.001, maxDose: 0.005, unit: 'mg/kg', notes: '1-5 mcg/kg', notesHe: '1-5 מק"ג/ק"ג' },
      { species: 'dog', route: 'IM', minDose: 0.005, maxDose: 0.02, unit: 'mg/kg', notes: '5-20 mcg/kg', notesHe: '5-20 מק"ג/ק"ג' },
      { species: 'cat', route: 'IV', minDose: 0.005, maxDose: 0.01, unit: 'mg/kg', notes: '5-10 mcg/kg', notesHe: '5-10 מק"ג/ק"ג' },
      { species: 'cat', route: 'IM', minDose: 0.01, maxDose: 0.04, unit: 'mg/kg', notes: '10-40 mcg/kg', notesHe: '10-40 מק"ג/ק"ג' },
    ],
    isHighRisk: true,
    warnings: ['Causes significant bradycardia', 'Have atipamezole ready for reversal', 'Reduce dose in debilitated patients'],
    warningsHe: ['גורם לברדיקרדיה משמעותית', 'יש להכין אטיפמזול להיפוך', 'יש להפחית מינון בחולים מוחלשים'],
  },
  {
    id: 'acepromazine',
    name: 'Acepromazine',
    nameHe: 'אצפרומזין',
    genericName: 'Acepromazine Maleate',
    genericNameHe: 'אצפרומזין מלאט',
    brandNames: ['PromAce', 'Atravet'],
    category: 'Phenothiazine/Sedative',
    categoryHe: 'פנותיאזין/מרגיע',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.01, maxDose: 0.05, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 0.02, maxDose: 0.1, unit: 'mg/kg' },
      { species: 'dog', route: 'SC', minDose: 0.02, maxDose: 0.1, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.01, maxDose: 0.05, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.02, maxDose: 0.1, unit: 'mg/kg' },
    ],
    isHighRisk: false,
    warnings: ['No analgesic effect', 'Avoid in seizure patients', 'Causes hypotension'],
    warningsHe: ['אין אפקט משכך כאבים', 'יש להימנע בחולים עם פרכוסים', 'גורם ליתר לחץ דם'],
  },

  // Anesthetics
  {
    id: 'ketamine',
    name: 'Ketamine',
    nameHe: 'קטמין',
    genericName: 'Ketamine HCl',
    genericNameHe: 'קטמין הידרוכלוריד',
    brandNames: ['Ketaset', 'Vetalar'],
    category: 'Dissociative Anesthetic',
    categoryHe: 'חומר הרדמה דיסוציאטיבי',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 2, maxDose: 5, unit: 'mg/kg', notes: 'Induction - combine with benzodiazepine', notesHe: 'אינדוקציה - לשלב עם בנזודיאזפין' },
      { species: 'dog', route: 'IM', minDose: 5, maxDose: 10, unit: 'mg/kg', notes: 'With sedative premedication', notesHe: 'עם פרמדיקציה מרגיעה' },
      { species: 'cat', route: 'IV', minDose: 2, maxDose: 5, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 5, maxDose: 10, unit: 'mg/kg' },
    ],
    isHighRisk: true,
    isControlled: true,
    warnings: ['Controlled substance - Schedule III', 'Do not use as sole agent', 'Increases intracranial pressure'],
    warningsHe: ['חומר מפוקח', 'אין להשתמש כחומר יחיד', 'מעלה לחץ תוך גולגולתי'],
  },
  {
    id: 'propofol',
    name: 'Propofol',
    nameHe: 'פרופופול',
    genericName: 'Propofol',
    genericNameHe: 'פרופופול',
    brandNames: ['Diprivan', 'PropoFlo'],
    category: 'Injectable Anesthetic',
    categoryHe: 'חומר הרדמה להזרקה',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 4, maxDose: 6, unit: 'mg/kg', notes: 'Induction - give slowly to effect', notesHe: 'אינדוקציה - לתת לאט עד אפקט' },
      { species: 'cat', route: 'IV', minDose: 4, maxDose: 8, unit: 'mg/kg', notes: 'Give slowly to effect', notesHe: 'לתת לאט עד אפקט' },
    ],
    isHighRisk: true,
    warnings: ['Causes apnea - be ready to intubate', 'No preservative - discard within 6 hours', 'Pain on injection'],
    warningsHe: ['גורם לדום נשימה - יש להיות מוכנים לאינטובציה', 'ללא משמר - להשליך תוך 6 שעות', 'כאב בהזרקה'],
  },

  // Cardiac
  {
    id: 'furosemide',
    name: 'Furosemide',
    nameHe: 'פורוסמיד',
    genericName: 'Furosemide',
    genericNameHe: 'פורוסמיד',
    brandNames: ['Lasix', 'Salix'],
    category: 'Loop Diuretic',
    categoryHe: 'משתן לולאה',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-12 שעות', notes: 'CHF: up to 4 mg/kg q1-4h acute', notesHe: 'אי ספיקת לב: עד 4 מ"ג/ק"ג כל 1-4 שעות באקוטי' },
      { species: 'dog', route: 'IM', minDose: 1, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'dog', route: 'PO', minDose: 1, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-24 שעות' },
      { species: 'cat', route: 'IV', minDose: 1, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'cat', route: 'IM', minDose: 1, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'cat', route: 'PO', minDose: 1, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-24 שעות' },
    ],
    isHighRisk: false,
    warnings: ['Monitor electrolytes', 'May cause hypokalemia', 'Ototoxicity with aminoglycosides'],
    warningsHe: ['יש לנטר אלקטרוליטים', 'עלול לגרום להיפוקלמיה', 'רעילות אוזן עם אמינוגליקוזידים'],
  },
  {
    id: 'pimobendan',
    name: 'Pimobendan',
    nameHe: 'פימובנדן',
    genericName: 'Pimobendan',
    genericNameHe: 'פימובנדן',
    brandNames: ['Vetmedin'],
    category: 'Inodilator',
    categoryHe: 'אינודילטור',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 0.25, maxDose: 0.3, unit: 'mg/kg', frequency: 'כל 12 שעות', notes: 'Give 1 hour before food', notesHe: 'לתת שעה לפני אוכל' },
    ],
    isHighRisk: false,
    warnings: ['Not for use in hypertrophic cardiomyopathy', 'Give on empty stomach'],
    warningsHe: ['לא לשימוש בקרדיומיופתיה היפרטרופית', 'לתת על קיבה ריקה'],
  },
  {
    id: 'atropine',
    name: 'Atropine',
    nameHe: 'אטרופין',
    genericName: 'Atropine Sulfate',
    genericNameHe: 'אטרופין סולפט',
    brandNames: [],
    category: 'Anticholinergic',
    categoryHe: 'אנטיכולינרגי',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg', notes: 'Emergency: up to 0.04 mg/kg', notesHe: 'חירום: עד 0.04 מ"ג/ק"ג' },
      { species: 'dog', route: 'IM', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'dog', route: 'SC', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
    ],
    isHighRisk: false,
    warnings: ['Increases heart rate', 'May cause ileus', 'Organophosphate toxicity: use higher doses'],
    warningsHe: ['מעלה קצב לב', 'עלול לגרום לאילאוס', 'הרעלת אורגנופוספט: להשתמש במינונים גבוהים יותר'],
  },

  // GI
  {
    id: 'famotidine',
    name: 'Famotidine',
    nameHe: 'פמוטידין',
    genericName: 'Famotidine',
    genericNameHe: 'פמוטידין',
    brandNames: ['Pepcid'],
    category: 'H2 Receptor Antagonist',
    categoryHe: 'אנטגוניסט לקולטן H2',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות' },
      { species: 'dog', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות' },
      { species: 'cat', route: 'IV', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות' },
      { species: 'cat', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות' },
    ],
    isHighRisk: false,
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    nameHe: 'אומפרזול',
    genericName: 'Omeprazole',
    genericNameHe: 'אומפרזול',
    brandNames: ['Prilosec', 'GastroGard'],
    category: 'Proton Pump Inhibitor',
    categoryHe: 'מעכב משאבת פרוטונים',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות', notes: 'Give before meals', notesHe: 'לתת לפני ארוחות' },
      { species: 'cat', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 24 שעות' },
    ],
    isHighRisk: false,
    warnings: ['More effective than H2 blockers for GI ulcers'],
    warningsHe: ['יעיל יותר מחוסמי H2 לכיבים במערכת העיכול'],
  },

  // Corticosteroids
  {
    id: 'dexamethasone',
    name: 'Dexamethasone',
    nameHe: 'דקסמתזון',
    genericName: 'Dexamethasone Sodium Phosphate',
    genericNameHe: 'דקסמתזון נתרן פוספט',
    brandNames: ['Azium'],
    category: 'Corticosteroid',
    categoryHe: 'קורטיקוסטרואיד',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg', notes: 'Anti-inflammatory dose', notesHe: 'מינון נוגד דלקת' },
      { species: 'dog', route: 'IV', minDose: 2, maxDose: 4, unit: 'mg/kg', notes: 'Shock dose', notesHe: 'מינון הלם' },
      { species: 'cat', route: 'IV', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg', notes: 'Anti-inflammatory', notesHe: 'נוגד דלקת' },
    ],
    isHighRisk: false,
    warnings: ['Immunosuppressive at high doses', 'May cause PU/PD, polyphagia', 'Do not use with NSAIDs'],
    warningsHe: ['מדכא חיסון במינונים גבוהים', 'עלול לגרום לפוליאוריה/פולידיפסיה, פוליפגיה', 'אין לשלב עם NSAIDs'],
  },
  {
    id: 'prednisolone',
    name: 'Prednisolone',
    nameHe: 'פרדניזולון',
    genericName: 'Prednisolone',
    genericNameHe: 'פרדניזולון',
    brandNames: [],
    category: 'Corticosteroid',
    categoryHe: 'קורטיקוסטרואיד',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות', notes: 'Anti-inflammatory', notesHe: 'נוגד דלקת' },
      { species: 'dog', route: 'PO', minDose: 2, maxDose: 4, unit: 'mg/kg', frequency: 'כל 24 שעות', notes: 'Immunosuppressive', notesHe: 'מדכא חיסון' },
      { species: 'cat', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg', frequency: 'כל 12-24 שעות', notes: 'Use prednisolone, not prednisone, in cats', notesHe: 'להשתמש בפרדניזולון, לא פרדניזון, בחתולים' },
    ],
    isHighRisk: false,
    warnings: ['Taper dose gradually', 'GI ulceration risk', 'Use prednisolone (not prednisone) in cats'],
    warningsHe: ['להוריד מינון בהדרגה', 'סיכון לכיב במערכת העיכול', 'להשתמש בפרדניזולון (לא פרדניזון) בחתולים'],
  },

  // Anticonvulsants
  {
    id: 'phenobarbital',
    name: 'Phenobarbital',
    nameHe: 'פנוברביטל',
    genericName: 'Phenobarbital',
    genericNameHe: 'פנוברביטל',
    brandNames: [],
    category: 'Anticonvulsant',
    categoryHe: 'נוגד פרכוסים',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 2.5, maxDose: 5, unit: 'mg/kg', frequency: 'כל 12 שעות', notes: 'Maintenance', notesHe: 'מינון תחזוקה' },
      { species: 'dog', route: 'IV', minDose: 2, maxDose: 4, unit: 'mg/kg', notes: 'Status epilepticus - can repeat', notesHe: 'סטטוס אפילפטיקוס - ניתן לחזור' },
      { species: 'cat', route: 'PO', minDose: 2, maxDose: 3, unit: 'mg/kg', frequency: 'כל 12 שעות' },
    ],
    isHighRisk: true,
    isControlled: true,
    warnings: ['Controlled substance', 'Hepatotoxicity - monitor liver enzymes', 'Causes sedation initially'],
    warningsHe: ['חומר מפוקח', 'רעילות כבד - יש לנטר אנזימי כבד', 'גורם לישנוניות בהתחלה'],
  },
  {
    id: 'diazepam',
    name: 'Diazepam',
    nameHe: 'דיאזפאם',
    genericName: 'Diazepam',
    genericNameHe: 'דיאזפאם',
    brandNames: ['Valium'],
    category: 'Benzodiazepine',
    categoryHe: 'בנזודיאזפין',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.5, maxDose: 2, unit: 'mg/kg', notes: 'Status epilepticus', notesHe: 'סטטוס אפילפטיקוס' },
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.25, unit: 'mg/kg', notes: 'Pre-anesthetic', notesHe: 'פרה-הרדמתי' },
      { species: 'cat', route: 'IV', minDose: 0.5, maxDose: 2, unit: 'mg/kg', notes: 'Status epilepticus', notesHe: 'סטטוס אפילפטיקוס' },
    ],
    isHighRisk: true,
    isControlled: true,
    warnings: ['Controlled substance - Schedule IV', 'Hepatotoxicity reported in cats with oral use', 'Adsorbs to plastic - give immediately'],
    warningsHe: ['חומר מפוקח', 'דווח על רעילות כבד בחתולים בשימוש פומי', 'נספג לפלסטיק - לתת מיידית'],
  },

  // Antihistamines
  {
    id: 'diphenhydramine',
    name: 'Diphenhydramine',
    nameHe: 'דיפנהידרמין',
    genericName: 'Diphenhydramine HCl',
    genericNameHe: 'דיפנהידרמין הידרוכלוריד',
    brandNames: ['Benadryl'],
    category: 'Antihistamine',
    categoryHe: 'אנטיהיסטמין',
    plumbsDosing: [
      { species: 'dog', route: 'PO', minDose: 2, maxDose: 4, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 2, unit: 'mg/kg', frequency: 'כל 8-12 שעות', notes: 'Give slowly', notesHe: 'לתת לאט' },
      { species: 'dog', route: 'IM', minDose: 1, maxDose: 2, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
      { species: 'cat', route: 'PO', minDose: 1, maxDose: 2, unit: 'mg/kg', frequency: 'כל 8-12 שעות' },
    ],
    isHighRisk: false,
    warnings: ['Sedation common', 'Anticholinergic effects'],
    warningsHe: ['ישנוניות שכיחה', 'אפקטים אנטיכולינרגיים'],
  },

  // Emergency
  {
    id: 'epinephrine',
    name: 'Epinephrine',
    nameHe: 'אפינפרין',
    genericName: 'Epinephrine (Adrenaline)',
    genericNameHe: 'אפינפרין (אדרנלין)',
    brandNames: ['Adrenalin'],
    category: 'Sympathomimetic',
    categoryHe: 'סימפטומימטי',
    plumbsDosing: [
      { species: 'dog', route: 'IV', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg', notes: 'Cardiac arrest - use 1:10,000', notesHe: 'דום לב - להשתמש ב-1:10,000' },
      { species: 'dog', route: 'IM', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg', notes: 'Anaphylaxis - use 1:1,000', notesHe: 'אנפילקסיס - להשתמש ב-1:1,000' },
      { species: 'cat', route: 'IV', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg' },
    ],
    isHighRisk: true,
    warnings: ['Emergency drug', 'Know your dilutions: 1:1000 vs 1:10,000', 'Causes arrhythmias'],
    warningsHe: ['תרופת חירום', 'יש להכיר דילולים: 1:1000 לעומת 1:10,000', 'גורם להפרעות קצב'],
  },
];

/**
 * Search for drugs by name (supports Hebrew and English)
 */
export function searchDrugs(query: string): DrugInfo[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return DRUG_DATABASE;
  }

  return DRUG_DATABASE.filter(
    (drug) =>
      drug.name.toLowerCase().includes(normalizedQuery) ||
      drug.nameHe.includes(query) ||
      drug.genericName.toLowerCase().includes(normalizedQuery) ||
      drug.genericNameHe.includes(query) ||
      drug.brandNames?.some(b => b.toLowerCase().includes(normalizedQuery)) ||
      drug.category.toLowerCase().includes(normalizedQuery) ||
      drug.categoryHe.includes(query)
  );
}

/**
 * Get drug by ID
 */
export function getDrugById(id: string): DrugInfo | null {
  return DRUG_DATABASE.find((drug) => drug.id === id) || null;
}

/**
 * Get drug by name (exact or partial match)
 */
export function getDrugByName(name: string): DrugInfo | null {
  const normalizedName = name.toLowerCase().trim();

  const exactMatch = DRUG_DATABASE.find(
    (drug) =>
      drug.name.toLowerCase() === normalizedName ||
      drug.nameHe === name ||
      drug.genericName.toLowerCase() === normalizedName
  );

  if (exactMatch) {
    return exactMatch;
  }

  const partialMatch = DRUG_DATABASE.find(
    (drug) =>
      drug.name.toLowerCase().includes(normalizedName) ||
      drug.nameHe.includes(name) ||
      drug.genericName.toLowerCase().includes(normalizedName)
  );

  return partialMatch || null;
}

/**
 * Get all drug categories
 */
export function getDrugCategories(): { en: string; he: string }[] {
  const categories = new Map<string, string>();

  DRUG_DATABASE.forEach((drug) => {
    if (!categories.has(drug.category)) {
      categories.set(drug.category, drug.categoryHe);
    }
  });

  return Array.from(categories.entries()).map(([en, he]) => ({ en, he }));
}

/**
 * Get high-risk drugs list
 */
export function getHighRiskDrugs(): DrugInfo[] {
  return DRUG_DATABASE.filter((drug) => drug.isHighRisk);
}

/**
 * Get controlled substances list
 */
export function getControlledDrugs(): DrugInfo[] {
  return DRUG_DATABASE.filter((drug) => drug.isControlled);
}
