/**
 * Hebrew Translations for the UI
 *
 * All UI text is defined here for easy maintenance
 * and potential future localization support
 */

export const translations = {
  // App header
  appTitle: 'וט-חולים',
  appSubtitle: 'מחשבון מינון תרופות וטרינרי',

  // Species
  species: 'מין',
  dog: 'כלב',
  cat: 'חתול',
  other: 'אחר',

  // Form labels
  weight: 'משקל',
  weightUnit: 'ק"ג',
  drugName: 'שם התרופה',
  drugNamePlaceholder: 'חפש או הקלד שם תרופה...',
  dose: 'מינון',
  dosePerKg: 'מינון לק"ג',
  concentration: 'ריכוז',
  route: 'דרך מתן',
  frequency: 'תדירות',
  frequencyPlaceholder: 'לדוג׳: כל 8 שעות',
  duration: 'משך טיפול',
  durationPlaceholder: 'לדוג׳: 7 ימים',

  // Routes
  routeIV: 'תוך-ורידי (IV)',
  routeIM: 'תוך-שרירי (IM)',
  routeSC: 'תת-עורי (SC)',
  routePO: 'דרך הפה (PO)',

  // Units
  mgPerKg: 'מ"ג/ק"ג',
  mcgPerKg: 'מק"ג/ק"ג',
  iuPerKg: 'IU/ק"ג',
  mlPerKg: 'מ"ל/ק"ג',
  mgPerMl: 'מ"ג/מ"ל',
  mcgPerMl: 'מק"ג/מ"ל',
  iuPerMl: 'IU/מ"ל',

  // Rounding
  roundingPrecision: 'דיוק עיגול',
  precision001: '0.01 מ"ל',
  precision005: '0.05 מ"ל',
  precision01: '0.1 מ"ל',

  // Buttons
  calculate: 'חשב',
  reset: 'אפס',
  copyResult: 'העתק תוצאה',
  shareResult: 'שתף',
  saveResult: 'שמור',

  // Result
  result: 'תוצאה',
  withdrawVolume: 'יש לשאוב',
  ml: 'מ"ל',
  fromVial: 'מהבקבוקון',

  // Calculation breakdown
  calculationBreakdown: 'פירוט החישוב',
  bodyWeight: 'משקל גוף',
  doseGiven: 'מינון שניתן',
  totalDose: 'מינון כולל',
  drugConcentration: 'ריכוז התרופה',
  rawVolume: 'נפח לפני עיגול',
  roundedVolume: 'נפח מעוגל',

  // Warnings
  warnings: 'אזהרות',
  noWarnings: 'אין אזהרות',

  // Settings
  settings: 'הגדרות',
  darkMode: 'מצב כהה',
  showBreakdown: 'הצג פירוט חישוב',

  // Errors
  invalidInput: 'ערך לא תקין',
  required: 'שדה חובה',
  mustBePositive: 'חייב להיות גדול מאפס',

  // Disclaimer
  disclaimer: 'כתב ויתור',
  disclaimerText:
    'מחשבון זה הוא כלי תמיכה קלינית ואינו מחליף שיקול דעת וטרינרי מקצועי. יש לאמת את החישובים ולעיין בהפניות תרופתיות לפני מתן התרופה.',

  // Footer
  footer: 'כל הזכויות שמורות © 2024',

  // Common
  select: 'בחר',
  search: 'חיפוש',
  close: 'סגור',
  confirm: 'אשר',
  cancel: 'בטל',
  loading: 'טוען...',
  success: 'הצלחה',
  error: 'שגיאה',
  info: 'מידע',
  warning: 'אזהרה',
  danger: 'סכנה',

  // Accessibility
  toggleDarkMode: 'החלף מצב כהה/בהיר',
  openSettings: 'פתח הגדרות',
  closeSettings: 'סגור הגדרות',
  clearInput: 'נקה שדה',

  // Drug categories
  categoryNSAID: 'נוגד דלקת לא סטרואידי',
  categoryAntibiotic: 'אנטיביוטיקה',
  categoryAntiemetic: 'נוגד הקאות',
  categoryOpioid: 'אופיואיד',
  categoryAnesthetic: 'חומר הרדמה',
  categorySedative: 'מרגיע',
  categoryDiuretic: 'משתן',
  categoryAntihistamine: 'אנטיהיסטמין',

  // Misc
  highRiskMedication: 'תרופה בסיכון גבוה',
  verifyDose: 'אמת מינון',
  optional: 'אופציונלי',
};

export type TranslationKey = keyof typeof translations;

/**
 * Get translation by key
 */
export function t(key: TranslationKey): string {
  return translations[key] || key;
}
