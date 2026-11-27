/**
 * Code Blue wording — Hebrew + English.
 *
 * Code Blue text is clinical wording, so it follows the app's rule for
 * clinical content: authored in Hebrew and English only, with every other UI
 * language falling back to English (no machine-translated clinical text).
 *
 * The acknowledgment and attribution wording is deliberate:
 *  - responsibility for every clinical decision stays with the attending
 *    veterinarian; the tool is offered as a timekeeping/calculation aid only;
 *  - the RECOVER name is used only as a citation, with the organisation's full
 *    name and a link, and an explicit statement of no affiliation, as its
 *    brand guidelines require.
 */
import { L } from '../../types/toxins';
import { RECOVER_2024 } from '../../cpr/recoverGuideline';

export const CPR_TEXT = {
  title: L('קוד כחול · עזר החייאה', 'Code Blue · CPR aid'),
  subtitle: L(
    'שעון מחזורים, מטרונום, מינונים לפי משקל ורישום אירועים — לצוות וטרינרי מיומן.',
    'Cycle clock, metronome, weight-based doses and an event log — for trained veterinary teams.',
  ),
  standingNotice: L(
    'עזר לתזמון ולחישוב בלבד. יש לאמת כל מינון וריכוז מול התווית. האחריות הקלינית על הרופא/ה המטפל/ת.',
    'Timekeeping and calculation aid only. Verify every dose and vial strength against the label. Clinical responsibility rests with the attending veterinarian.',
  ),

  gateTitle: L('לפני שמתחילים — לאנשי מקצוע וטרינריים', 'Before you start — for veterinary professionals'),
  gatePoints: [
    L(
      'קוד כחול הוא עזר לתזמון, לחישוב ולרישום עבור צוות וטרינרי מיומן. הוא אינו מאבחן, אינו בוחר טיפול ואינו מחליף הכשרת החייאה או שיקול דעת קליני.',
      'Code Blue is a timekeeping, calculation and record-keeping aid for trained veterinary teams. It does not diagnose, does not choose treatment, and does not replace CPR training or clinical judgment.',
    ),
    L(
      'כל נתון מצוטט מהנחיות RECOVER 2024, ומזהה ההמלצה מוצג לצדו. יש לבדוק כל תרופה, מינון וריכוז מול התווית ומול הפרוטוקול של המרפאה לפני מתן.',
      'Every figure is cited from the 2024 RECOVER Guidelines, with the recommendation number shown beside it. Check each drug, dose and vial strength against the label and your own clinic protocol before giving it.',
    ),
    L(
      'נפחי שאיבה מחושבים אך ורק מריכוזי האמפולות שתזינו בעצמכם. שום ריכוז אינו ממולא מראש.',
      'Draw-up volumes are calculated only from the vial strengths you enter yourself. No strength is pre-filled.',
    ),
    L(
      'הרופא/ה המטפל/ת נושא/ת באחריות לכל החלטה קלינית. הכלי ניתן כמות שהוא, ללא אחריות מכל סוג; האתר, בעליו ותורמיו אינם אחראים לשימוש בו או לתוצאותיו.',
      'The attending veterinarian remains responsible for every clinical decision. The tool is provided as is, without warranty of any kind; the site, its owner and its contributors accept no liability for its use or for any outcome.',
    ),
    L(
      `זהו כלי עצמאי. הוא אינו אלגוריתם או טבלת מינונים של RECOVER, ואינו קשור ל-${RECOVER_2024.organisation}, אינו מאושר ואינו מוסמך על ידה.`,
      `This is an independent tool. It is not a RECOVER algorithm or dosing chart, and it is not affiliated with, endorsed or certified by ${RECOVER_2024.organisation}.`,
    ),
  ],
  gateCheckbox: L(
    'אני איש/אשת מקצוע וטרינרי/ת, קראתי והבנתי את האמור לעיל.',
    'I am a veterinary professional and I have read and understood the above.',
  ),
  gateContinue: L('פתיחת קוד כחול', 'Open Code Blue'),

  weightNeeded: L('הזינו משקל כדי לקבל מינונים לפי משקל.', 'Enter a weight to see weight-based doses.'),
  patientFromSession: L('מולא מהמטופל הפעיל', 'Filled from the active patient'),

  startClock: L('התחלת שעון החייאה', 'Start CPR clock'),
  totalTime: L('זמן כולל', 'Total time'),
  cycle: L('מחזור', 'Cycle'),
  cycleRemaining: L('נותר במחזור', 'left in this cycle'),
  cycleComplete: L('2 דקות הושלמו', '2 minutes complete'),
  pauseAndCheck: L('עצירה ובדיקה', 'Pause & check'),
  pauseRunning: L('משך העצירה', 'Pause length'),
  pauseOverLimit: L('מעל 10 שניות', 'over 10 seconds'),
  resume: L('חידוש עיסויים', 'Resume compressions'),
  endRosc: L('סיום: ROSC', 'End: ROSC'),
  endStopped: L('סיום: הפסקת החייאה', 'End: stop CPR'),
  newCode: L('קוד חדש', 'New code'),
  codeEnded: L('הקוד הסתיים', 'Code ended'),

  metronome: L('מטרונום', 'Metronome'),
  metronomeOn: L('צליל פעיל', 'Sound on'),
  metronomeOff: L('צליל כבוי', 'Sound off'),
  perMinute: L('לדקה', '/min'),

  vasopressorSince: L('מאז אפינפרין / וזופרסין אחרון', 'Since last epinephrine / vasopressin'),
  vasopressorNone: L('טרם נרשם', 'none logged yet'),
  vasopressorInterval: L('מרווח לפי ההנחיות: 3–5 דקות (ALS-07)', 'Guideline interval: 3–5 minutes (ALS-07)'),

  sheetTitle: L('מינונים לפי משקל', 'Weight-based doses'),
  log: L('רישום', 'Log'),
  volumeNeedsStrength: L('לנפח: הזינו ריכוז אמפולה', 'For volume: set the vial strength'),
  yourVial: L('האמפולה שלכם', 'your vial'),
  guidelineStrength: L('ריכוז לפי ההנחיות', 'strength stated by the guideline'),
  thenInfusion: L('ולאחר מכן עירוי', 'then infusion'),
  notSuggestedCat: L('לא מוצע לחתולים', 'Not suggested for cats'),
  notSuggestedDog: L('לא מוצע לכלבים', 'Not suggested for dogs'),
  alternativeOnly: L('חלופה בלבד — אם אין לידוקאין', 'Alternative only — if lidocaine is unavailable'),

  cartButton: L('עגלת החייאה — ריכוזי האמפולות שלכם', 'Crash cart — your vial strengths'),
  cartIntro: L(
    'הזינו פעם אחת את הריכוז המודפס על כל אמפולה במרפאה. הנתונים נשמרים במכשיר זה בלבד. דבר אינו ממולא מראש — הריכוזים משתנים בין מדינות ויצרנים.',
    'Enter, once, the strength printed on each vial your clinic stocks. It is stored on this device only. Nothing is pre-filled — strengths differ between countries and manufacturers.',
  ),

  defibTitle: L('דפיברילציה', 'Defibrillation'),
  defibBiphasicFirst: L('ביפאזי חיצוני — הלם ראשון', 'Biphasic, external — first shock'),
  defibBiphasicNext: L('ביפאזי חיצוני — הלמים נוספים', 'Biphasic, external — subsequent shocks'),
  defibBiphasicInternal: L('ביפאזי פנימי', 'Biphasic, internal'),
  defibMonoExternal: L('מונופאזי חיצוני', 'Monophasic, external'),
  defibMonoInternal: L('מונופאזי פנימי', 'Monophasic, internal'),
  defibNote: L(
    'מומלץ דפיברילטור ביפאזי. לאחר הלם ראשון שנכשל — הכפלת האנרגיה.',
    'A biphasic defibrillator is recommended. After an unsuccessful first shock the energy is doubled.',
  ),
  logShock: L('רישום הלם', 'Log shock'),

  logTitle: L('יומן אירועים', 'Event log'),
  logEmpty: L('האירועים יופיעו כאן לאחר התחלת השעון.', 'Events appear here once the clock is started.'),
  copyRecord: L('העתקת הרישום', 'Copy record'),
  copied: L('הועתק', 'Copied'),
  quickLog: L('רישום מהיר', 'Quick log'),

  referenceTitle: L('נתוני ייחוס', 'Reference figures'),

  attributionLead: L('מינונים וזמנים מצוטטים מהנחיות RECOVER 2024 —', 'Doses and timings are cited from the 2024 RECOVER Guidelines —'),
  attributionJournal: L(
    'J Vet Emerg Crit Care 2024;34(S1):104–123.',
    'J Vet Emerg Crit Care 2024;34(S1):104–123.',
  ),
  attributionIndependent: L(
    'זהו עזר עצמאי: אינו אלגוריתם או טבלת מינונים של RECOVER, ואינו קשור לארגון, מאושר או מוסמך על ידו.',
    'This is an independent aid: it is not a RECOVER algorithm or dosing chart, and it is not affiliated with, endorsed or certified by the organisation.',
  ),
  officialChart: L(
    'לאלגוריתם ולטבלת המינונים הרשמיים ↗',
    'Official CPR algorithm and dosing chart ↗',
  ),
  readPaper: L('למאמר המלא ↗', 'Read the paper ↗'),
} as const;

/** Cited basic-life-support and monitoring figures shown on the reference card. */
export const CPR_REFERENCE_FACTS = [
  { text: L('קצב עיסויים: 100–120 לדקה', 'Compressions: 100–120 per minute'), refs: 'BLS-07' },
  {
    text: L(
      'עומק: שליש עד חצי מרוחב בית החזה בשכיבה צידית; רבע בשכיבה על הגב',
      'Depth: one-third to one-half of chest width in lateral recumbency; one-quarter in dorsal recumbency',
    ),
    refs: 'BLS-18',
  },
  { text: L('שחרור מלא של בית החזה בין עיסויים', 'Full chest-wall recoil between compressions'), refs: 'BLS-01' },
  {
    text: L('מחזורים רצופים של 2 דקות; עצירות קצרות מ-10 שניות', 'Uninterrupted 2-minute cycles; pauses shorter than 10 seconds'),
    refs: 'BLS-08 · BLS-16',
  },
  { text: L('ללא אינטובציה: 30 עיסויים : 2 נשימות', 'Not intubated: 30 compressions : 2 breaths'), refs: 'BLS-09' },
  {
    text: L('עם אינטובציה: 10 נשימות לדקה, 10 מ"ל/ק"ג, שאיפה של שנייה', 'Intubated: 10 breaths per minute, 10 mL/kg, 1-second inspiration'),
    refs: 'BLS-13 · BLS-14',
  },
  { text: L('יעד ETCO₂ בזמן החייאה: לפחות 18 ממ"כ', 'ETCO₂ target during CPR: at least 18 mm Hg'), refs: 'MON-10' },
  {
    text: L('עדיפות לגישה ורידית; תוך-גרמית אם אין וריד בתוך 2 דקות', 'IV access preferred; intraosseous if IV is not placed within 2 minutes'),
    refs: 'ALS-14',
  },
  {
    text: L(
      'חשד ל-ROSC באמצע מחזור: להפסיק רק אם יש גם עלייה פתאומית ומתמשכת ב-ETCO₂ (ב-10 ממ"כ לפחות, ל-35 ומעלה) וגם דופק נפרד מהעיסויים',
      'Suspected ROSC mid-cycle: interrupt only with both a sudden, sustained ETCO₂ rise (by at least 10 mm Hg, to 35 or more) and a pulse distinct from compressions',
    ),
    refs: 'BLS-17',
  },
] as const;
