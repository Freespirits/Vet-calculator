/**
 * Drug Database
 *
 * Contains veterinary drug information including:
 * - Common doses by species
 * - Therapeutic ranges
 * - Safety warnings
 *
 * Note: This is a sample database for demonstration.
 * In production, this would connect to a more comprehensive
 * drug reference database.
 */

import type { DrugInfo } from '../types';

/**
 * Sample veterinary drug database
 * All doses are for reference only - consult drug references for clinical use
 */
export const DRUG_DATABASE: DrugInfo[] = [
  {
    id: 'meloxicam',
    name: 'Meloxicam',
    nameHe: 'מלוקסיקם',
    category: 'NSAID',
    categoryHe: 'נוגד דלקת לא סטרואידי',
    defaultConcentration: 5,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'SC', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg' },
      { species: 'cat', route: 'SC', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg' },
      { species: 'cat', route: 'PO', minDose: 0.05, maxDose: 0.1, unit: 'mg/kg' },
    ],
    isHighRisk: false,
    warnings: ['Not for use in animals with renal disease'],
    warningsHe: ['אין לשימוש בבעלי חיים עם מחלת כליות'],
  },
  {
    id: 'metoclopramide',
    name: 'Metoclopramide',
    nameHe: 'מטוקלופרמיד',
    category: 'Antiemetic',
    categoryHe: 'נוגד הקאות',
    defaultConcentration: 5,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'SC', minDose: 0.2, maxDose: 0.5, unit: 'mg/kg' },
      { species: 'dog', route: 'IV', minDose: 0.2, maxDose: 0.5, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 0.2, maxDose: 0.5, unit: 'mg/kg' },
      { species: 'cat', route: 'SC', minDose: 0.2, maxDose: 0.4, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.2, maxDose: 0.4, unit: 'mg/kg' },
    ],
    isHighRisk: false,
  },
  {
    id: 'maropitant',
    name: 'Maropitant (Cerenia)',
    nameHe: 'מרופיטנט (צרניה)',
    category: 'Antiemetic',
    categoryHe: 'נוגד הקאות',
    defaultConcentration: 10,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'SC', minDose: 1, maxDose: 1, unit: 'mg/kg' },
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 1, unit: 'mg/kg' },
      { species: 'cat', route: 'SC', minDose: 1, maxDose: 1, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 1, maxDose: 1, unit: 'mg/kg' },
    ],
    isHighRisk: false,
  },
  {
    id: 'cefazolin',
    name: 'Cefazolin',
    nameHe: 'צפזולין',
    category: 'Antibiotic',
    categoryHe: 'אנטיביוטיקה',
    defaultConcentration: 100,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 20, maxDose: 35, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 20, maxDose: 35, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 20, maxDose: 35, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 20, maxDose: 35, unit: 'mg/kg' },
    ],
    isHighRisk: false,
  },
  {
    id: 'enrofloxacin',
    name: 'Enrofloxacin (Baytril)',
    nameHe: 'אנרופלוקסצין (בייטריל)',
    category: 'Antibiotic',
    categoryHe: 'אנטיביוטיקה',
    defaultConcentration: 50,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'SC', minDose: 5, maxDose: 20, unit: 'mg/kg' },
      { species: 'dog', route: 'IV', minDose: 5, maxDose: 20, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 5, maxDose: 20, unit: 'mg/kg' },
      { species: 'cat', route: 'SC', minDose: 5, maxDose: 5, unit: 'mg/kg' },
      { species: 'cat', route: 'PO', minDose: 5, maxDose: 5, unit: 'mg/kg' },
    ],
    isHighRisk: false,
    warnings: ['Limit to 5 mg/kg in cats to avoid retinal toxicity'],
    warningsHe: ['מגביל ל-5 מ"ג/ק"ג בחתולים כדי למנוע רעילות רשתית'],
  },
  {
    id: 'morphine',
    name: 'Morphine',
    nameHe: 'מורפין',
    category: 'Opioid',
    categoryHe: 'אופיואיד',
    defaultConcentration: 10,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.5, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 0.3, maxDose: 1, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.05, maxDose: 0.2, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.1, maxDose: 0.3, unit: 'mg/kg' },
    ],
    isHighRisk: true,
    warnings: ['Controlled substance - document usage', 'May cause respiratory depression'],
    warningsHe: ['חומר מפוקח - יש לתעד שימוש', 'עלול לגרום לדיכוי נשימתי'],
  },
  {
    id: 'buprenorphine',
    name: 'Buprenorphine',
    nameHe: 'בופרנורפין',
    category: 'Opioid',
    categoryHe: 'אופיואיד',
    defaultConcentration: 0.3,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.01, maxDose: 0.02, unit: 'mg/kg' },
    ],
    isHighRisk: true,
    warnings: ['Controlled substance'],
    warningsHe: ['חומר מפוקח'],
  },
  {
    id: 'ketamine',
    name: 'Ketamine',
    nameHe: 'קטמין',
    category: 'Anesthetic',
    categoryHe: 'חומר הרדמה',
    defaultConcentration: 100,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 3, maxDose: 8, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 5, maxDose: 10, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 3, maxDose: 6, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 5, maxDose: 10, unit: 'mg/kg' },
    ],
    isHighRisk: true,
    warnings: ['Controlled substance', 'Not suitable as sole anesthetic'],
    warningsHe: ['חומר מפוקח', 'לא מתאים כחומר הרדמה יחיד'],
  },
  {
    id: 'dexmedetomidine',
    name: 'Dexmedetomidine (Dexdomitor)',
    nameHe: 'דקסמדטומידין',
    category: 'Sedative',
    categoryHe: 'מרגיע',
    defaultConcentration: 0.5,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.005, maxDose: 0.02, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 0.01, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.005, maxDose: 0.02, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
    ],
    isHighRisk: true,
    warnings: ['Causes significant bradycardia', 'Have reversal agent ready'],
    warningsHe: ['גורם לברדיקרדיה משמעותית', 'יש להכין חומר היפוך'],
  },
  {
    id: 'atropine',
    name: 'Atropine',
    nameHe: 'אטרופין',
    category: 'Anticholinergic',
    categoryHe: 'אנטיכולינרגי',
    defaultConcentration: 0.5,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 0.02, maxDose: 0.04, unit: 'mg/kg' },
    ],
    isHighRisk: false,
    warnings: ['Emergency drug - verify indication'],
    warningsHe: ['תרופת חירום - יש לאמת אינדיקציה'],
  },
  {
    id: 'furosemide',
    name: 'Furosemide (Lasix)',
    nameHe: 'פורוסמיד (לזיקס)',
    category: 'Diuretic',
    categoryHe: 'משתן',
    defaultConcentration: 10,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 4, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 1, maxDose: 4, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 1, maxDose: 4, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 1, maxDose: 4, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 1, maxDose: 4, unit: 'mg/kg' },
      { species: 'cat', route: 'PO', minDose: 1, maxDose: 4, unit: 'mg/kg' },
    ],
    isHighRisk: false,
    warnings: ['Monitor hydration and electrolytes'],
    warningsHe: ['יש לנטר הידרציה ואלקטרוליטים'],
  },
  {
    id: 'famotidine',
    name: 'Famotidine',
    nameHe: 'פמוטידין',
    category: 'H2 Blocker',
    categoryHe: 'חוסם H2',
    defaultConcentration: 10,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.5, maxDose: 1, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.5, maxDose: 1, unit: 'mg/kg' },
      { species: 'cat', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg' },
    ],
    isHighRisk: false,
  },
  {
    id: 'ondansetron',
    name: 'Ondansetron',
    nameHe: 'אונדנסטרון',
    category: 'Antiemetic',
    categoryHe: 'נוגד הקאות',
    defaultConcentration: 2,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 0.5, maxDose: 1, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 0.1, maxDose: 0.2, unit: 'mg/kg' },
    ],
    isHighRisk: false,
  },
  {
    id: 'diphenhydramine',
    name: 'Diphenhydramine (Benadryl)',
    nameHe: 'דיפנהידרמין (בנדריל)',
    category: 'Antihistamine',
    categoryHe: 'אנטיהיסטמין',
    defaultConcentration: 50,
    concentrationUnit: 'mg/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 1, maxDose: 2, unit: 'mg/kg' },
      { species: 'dog', route: 'IM', minDose: 1, maxDose: 2, unit: 'mg/kg' },
      { species: 'dog', route: 'PO', minDose: 2, maxDose: 4, unit: 'mg/kg' },
      { species: 'cat', route: 'IV', minDose: 1, maxDose: 2, unit: 'mg/kg' },
      { species: 'cat', route: 'IM', minDose: 1, maxDose: 2, unit: 'mg/kg' },
    ],
    isHighRisk: false,
  },
  {
    id: 'insulin_regular',
    name: 'Regular Insulin',
    nameHe: 'אינסולין רגיל',
    category: 'Hormone',
    categoryHe: 'הורמון',
    defaultConcentration: 100,
    concentrationUnit: 'IU/mL',
    commonDoses: [
      { species: 'dog', route: 'IV', minDose: 0.1, maxDose: 0.25, unit: 'IU/kg' },
      { species: 'dog', route: 'SC', minDose: 0.25, maxDose: 1, unit: 'IU/kg' },
      { species: 'cat', route: 'IV', minDose: 0.1, maxDose: 0.25, unit: 'IU/kg' },
      { species: 'cat', route: 'SC', minDose: 0.25, maxDose: 1, unit: 'IU/kg' },
    ],
    isHighRisk: true,
    warnings: ['Monitor blood glucose closely', 'Have dextrose ready for hypoglycemia'],
    warningsHe: ['יש לנטר סוכר בדם בקפידה', 'יש להכין דקסטרוז להיפוגליקמיה'],
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

  // Try exact match first
  const exactMatch = DRUG_DATABASE.find(
    (drug) =>
      drug.name.toLowerCase() === normalizedName ||
      drug.nameHe === name
  );

  if (exactMatch) {
    return exactMatch;
  }

  // Try partial match
  const partialMatch = DRUG_DATABASE.find(
    (drug) =>
      drug.name.toLowerCase().includes(normalizedName) ||
      drug.nameHe.includes(name)
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
