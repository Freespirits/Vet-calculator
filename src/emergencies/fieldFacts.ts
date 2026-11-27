/**
 * Field-emergency pack — cited statements and three small helpers.
 *
 * Four topics, each drawing on studies from more than one country so that no
 * topic rests on a single centre's experience:
 *   heat               UK (VetCompass, emergency clinics) + Israel
 *   snake              Israel, Sweden/Norway, USA, Australia
 *   caterpillar        France, Portugal, Israel
 *   anticholinesterase Israel, USA, South Africa
 *
 * Every statement is our own summary of the abstract or open-access text of
 * the cited paper and carries a `cite` key; the topic's `sources` map holds
 * the full reference. Nothing here is a treatment protocol and no antidote or
 * antivenom dose is given — those belong to the clinician's formulary.
 *
 * Helpers
 *  - caterpillarFlushWindow(hours): which of the three time-to-first-oral-
 *    flushing groups a case falls in, with the tongue-necrosis frequencies the
 *    French cohort reported for that group.
 *  - cholinergicTimeline(hours): whether a time since the acute cholinergic
 *    crisis is before, inside or after the 7–96 h window in which intermediate
 *    syndrome typically appears.
 *  - countViperRiskFactors(ids): how many of the factors associated with death
 *    in the Israeli viper cohort are present. It is a count, not a score: the
 *    study did not publish a weighting or a prediction rule.
 */
import { L } from '../types/toxins';
import type { FieldTopic } from './types';

/* ---------------------------------------------------------------- heat --- */

const HEAT_TOPIC: FieldTopic = {
  id: 'heat',
  name: L('מכת חום', 'Heat-related illness'),
  blurb: L('דירוג חומרה לפי סימנים, קירור וגורמי סיכון', 'Severity grading by signs, cooling and risk factors'),
  accent: '#FB923C',
  regions: ['United Kingdom', 'Israel'],
  sections: [
    {
      title: L('קירור', 'Cooling'),
      facts: [
        {
          text: L(
            'הנחיות טרום-בית-חולים שפורסמו ב-2016 ממליצות: "קודם לקרר, אחר כך לפנות".',
            'Pre-hospital guidelines published in 2016 advise "cool first, transport second".',
          ),
          cite: 'Hall 2023',
        },
        {
          text: L(
            'השיטות המומלצות: טבילה במים קרים, או קירור באידוי (הרטבה במים יחד עם תנועת אוויר).',
            'Recommended methods: cold-water immersion, or evaporative cooling (water applied together with air movement).',
          ),
          cite: 'Hall 2023',
        },
        {
          text: L(
            'ברשומות בריטיות רק כחמישית מהכלבים קוררו לפני ההגעה, והשיטה הנפוצה ביותר הייתה מגבות רטובות — שאינה אחת מהשיטות המומלצות. עיכוב בהורדת החום מחמיר את התוצאה.',
            'In UK records only about one dog in five was cooled before arrival, and the commonest method was wet towels — not one of the recommended methods. Delay in lowering body temperature worsens outcome.',
          ),
          cite: 'Hall 2023',
        },
      ],
    },
    {
      title: L('גורמי סיכון לתמותה', 'Risk factors for death'),
      facts: [
        {
          text: L(
            'ישראל, 54 כלבים (תמותה 50%): הגעה מאוחרת (מעל 90 דקות), פרכוסים והשמנה; בקבלה — היפוגליקמיה (מתחת ל-47 מ"ג/ד"ל), PT מעל 18 שניות ו-aPTT מעל 30 שניות; קריאטינין מעל 1.5 מ"ג/ד"ל לאחר 24 שעות; DIC ואי-ספיקת כליות חריפה.',
            'Israel, 54 dogs (50% mortality): delayed admission (over 90 minutes), seizures and obesity; at admission — hypoglycaemia (below 47 mg/dL), PT over 18 s and aPTT over 30 s; creatinine above 1.5 mg/dL after 24 hours; DIC and acute renal failure.',
          ),
          cite: 'Bruchim 2006',
        },
        {
          text: L(
            'בריטניה: גיל, מבנה גולגולת (ברכיצפלים) ודרגת החומרה בקבלה נקשרו לתוצאה קטלנית; הסיכון למחלה קשה היה גבוה יותר כשהכלב לא יכול היה להתרחק ממקור החום (כליאה ברכב).',
            'United Kingdom: age, skull shape (brachycephalic) and clinical grade at presentation were associated with a fatal outcome; the risk of severe disease was greater when the dog could not escape the heat source (confinement in a vehicle).',
          ),
          cite: 'Hall 2022',
        },
      ],
    },
    {
      title: L('ציוני חומרה נוספים', 'Other severity scores'),
      facts: [
        {
          text: L(
            'ציון חומרה סטטיסטי שפותח ב-126 כלבים בישראל, על בסיס בדיקות מעבדה מ-24 השעות הראשונות, הבחין היטב בין שורדים ללא-שורדים. מחבריו מציינים שיש לתקף אותו בקבוצה נפרדת ולהשתמש בו בזהירות במקרה הבודד; הוא אינו משוחזר כאן.',
            'A statistically derived severity score built on 126 dogs in Israel, using laboratory values from the first 24 hours, separated survivors from non-survivors well. Its authors say it needs validation in an independent cohort and cautious use in individual cases; it is not reproduced here.',
          ),
          cite: 'Segev 2015',
        },
      ],
    },
  ],
  sources: {
    'Beard 2026':
      "Beard S, Hall EJ, Bradbury J, Carter AJ, Gilbert S, Leicester L, Barfield D, O'Neill DG. Evaluation and validation of a revised VetCompass clinical grading tool for heat-related illness in dogs. Sci Rep. 2026;16(1):4661. doi:10.1038/s41598-025-34768-9",
    'Hall 2021':
      "Hall EJ, Carter AJ, Bradbury J, Barfield D, O'Neill DG. Proposing the VetCompass clinical grading tool for heat-related illness in dogs. Sci Rep. 2021;11(1):6828. doi:10.1038/s41598-021-86235-w",
    'Hall 2023':
      "Hall EJ, Carter AJ, Bradbury J, Beard S, Gilbert S, Barfield D, O'Neill DG. Cooling methods used to manage heat-related illness in dogs presented to primary care veterinary practices during 2016–2018 in the UK. Vet Sci. 2023;10(7):465. doi:10.3390/vetsci10070465",
    'Hall 2022':
      "Hall EJ, Carter AJ, Chico G, Bradbury J, Gentle LK, Barfield D, O'Neill DG. Risk factors for severe and fatal heat-related illness in UK dogs — a VetCompass study. Vet Sci. 2022;9(5):231. doi:10.3390/vetsci9050231",
    'Bruchim 2006':
      'Bruchim Y, Klement E, Saragusty J, Finkeilstein E, Kass P, Aroch I. Heat stroke in dogs: a retrospective study of 54 cases (1999–2004) and analysis of risk factors for death. J Vet Intern Med. 2006;20(1):38–46.',
    'Segev 2015':
      'Segev G, Aroch I, Savoray M, Kass PH, Bruchim Y. A novel severity scoring system for dogs with heatstroke. J Vet Emerg Crit Care. 2015;25(2):240–247. doi:10.1111/vec.12284',
  },
};

/* --------------------------------------------------------------- snake --- */

const SNAKE_TOPIC: FieldTopic = {
  id: 'snake',
  name: L('הכשת נחש', 'Snake envenomation'),
  blurb: L('ממצאים, ניטור וראיות לטיפול — לפי אזור בעולם', 'Findings, monitoring and treatment evidence — by world region'),
  accent: '#10B981',
  regions: ['Israel', 'Sweden', 'Norway', 'United States', 'Australia'],
  sections: [
    {
      title: L('צפע ארץ-ישראלי (ישראל והאזור)', 'Vipera palaestinae (Israel and neighbouring countries)'),
      facts: [
        {
          text: L(
            '327 כלבים: נפיחות מקומית ב-99.6%, אך סימני נשיכה נראו רק ב-51%. PT מוארך ב-68%, תרומבוציטופניה ב-30%. תמותה 4%.',
            '327 dogs: local swelling in 99.6%, but fang marks were seen in only 51%. PT was prolonged in 68% and thrombocytopenia was present in 30%. Mortality 4%.',
          ),
          cite: 'Segev 2004',
        },
        {
          text: L(
            '39 כלבים במעקב פרוספקטיבי: הפרעות המוסטזיס ב-37, ו-DIC בכל הלא-שורדים — יש לנטר קרישה מקרוב.',
            '39 dogs followed prospectively: haemostatic abnormalities in 37, and DIC in every non-survivor — haemostasis should be monitored closely.',
          ),
          cite: 'Aroch 2010',
        },
        {
          text: L(
            '18 חתולים: 22% לא שרדו; משקל גוף נמוך, חום רקטלי נמוך והמטוקריט נמוך בקבלה נקשרו לתמותה.',
            '18 cats: 22% did not survive; lower body weight, lower rectal temperature and lower haematocrit at presentation were associated with death.',
          ),
          cite: 'Lenchner 2014',
        },
      ],
    },
    {
      title: L('צפע אירופי (Vipera berus)', 'European adder (Vipera berus)'),
      facts: [
        {
          text: L(
            '53 כלבים בשוודיה: נפיחות מקומית בכולם ופגיעה במצב ההכרה ב-73%. בשישה כלבים הופיעו ממצאים לבביים רק בבדיקה השנייה. לא הייתה תמותה.',
            '53 dogs in Sweden: local swelling in all and altered mental status in 73%. In six dogs cardiac abnormalities appeared only at the second examination. No dog died.',
          ),
          cite: 'Lervik 2010',
        },
        {
          text: L(
            '21 כלבים בנורווגיה עם ניטור אק"ג רציף: 57% פיתחו הפרעות קצב חדריות בתוך 48 שעות (חמורות ב-29%), וטרופונין I עלה ב-81%.',
            '21 dogs in Norway on continuous ECG: 57% developed ventricular arrhythmias within 48 hours (severe in 29%), and troponin I rose in 81%.',
          ),
          cite: 'Harjen 2020',
        },
      ],
    },
    {
      title: L('צפעוני גומה (צפון אמריקה)', 'Pit vipers (North America)'),
      facts: [
        {
          text: L(
            'ניסוי אקראי רב-מרכזי ב-115 כלבים: ציוני החומרה התייצבו או השתפרו לאחר נוגד-ארס, ללא הבדל בין מנה אחת לשתי חצאי מנות; תגובות חריפות לנוגד-הארס ב-6%.',
            'Randomised multicentre trial in 115 dogs: severity scores stabilised or improved after antivenom, with no difference between one dose and two half-doses; acute antivenom reactions in 6%.',
          ),
          cite: 'Peterson 2011',
        },
        {
          text: L(
            '272 כלבים: 8 מתו. לא נמצאו ראיות שגלוקוקורטיקואידים, דיפנהידרמין, אנטיביוטיקה מניעתית או חיסון מפחיתים תחלואה או תמותה. תגובת רגישות-יתר חריפה לנוגד-ארס ב-0.7%.',
            '272 dogs: 8 died. No evidence was found that glucocorticoids, diphenhydramine, prophylactic antibiotics or vaccination lessen morbidity or mortality. Acute hypersensitivity to antivenom in 0.7%.',
          ),
          cite: 'Witsil 2015',
        },
        {
          text: L(
            '102 כלבים שלא קיבלו אנטיביוטיקה: זיהום פצע אחד בלבד — אנטיביוטיקה מניעתית אינה מומלצת.',
            '102 dogs given no antimicrobials: a single wound infection — prophylactic antimicrobials are not recommended.',
          ),
          cite: 'Carr 2015',
        },
        {
          text: L(
            '56 כלבים שטופלו בנוגד-ארס: 29% פיתחו פגיעה כלייתית חריפה — יש לעקוב אחר קריאטינין.',
            '56 antivenom-treated dogs: 29% developed acute kidney injury — creatinine should be followed.',
          ),
          cite: 'Martinez 2020',
        },
      ],
    },
    {
      title: L('אלפידים (אוסטרליה)', 'Elapids (Australia)'),
      facts: [
        {
          text: L(
            'קווינסלנד, 20 מקרים מפורטים: התמוטטות ושיתוק חלקי היו הסימנים הנפוצים שדווחו; חציון של 60 דקות עד הקבלה; זמן קרישה מופעל היה הבדיקה הנפוצה; 82.4% מהכלבים שקיבלו נוגד-ארס החלימו.',
            'Queensland, 20 detailed cases: collapse and paresis were the commonest signs owners reported; median 60 minutes to admission; activated clotting time was the commonest test; 82.4% of dogs given antivenom recovered.',
          ),
          cite: 'Valenza 2021',
        },
      ],
    },
    {
      title: L('ראיות לטיפול — מבט רוחבי', 'Treatment evidence across the studies'),
      facts: [
        {
          text: L(
            'גלוקוקורטיקואידים, צפע ארץ-ישראלי: הטיפול נקשר לתמותה מוגברת, והמחברים מציינים שהשימוש בהם עלול להזיק.',
            'Glucocorticoids, Vipera palaestinae: treatment was associated with increased mortality, and the authors suggest their use may be harmful.',
          ),
          cite: 'Segev 2004',
        },
        {
          text: L(
            'גלוקוקורטיקואידים ואנטיביוטיקה מניעתית, צפעוני גומה: לא נמצאו ראיות להפחתת תחלואה או תמותה.',
            'Glucocorticoids and prophylactic antibiotics, pit vipers: no evidence that they lessen morbidity or mortality.',
          ),
          cite: 'Witsil 2015',
        },
        {
          text: L(
            'נוגד-ארס, צפעוני גומה: נמצא בטוח בדרך כלל בכלבים.',
            'Antivenom, pit vipers: found generally safe in dogs.',
          ),
          cite: 'Witsil 2015',
        },
        {
          text: L(
            'נוגד-ארס, צפע ארץ-ישראלי: מנה של 10 מ"ל לכלב לא נקשרה לשיעור הישרדות גבוה יותר; המחברים קראו לבחון מינון ותזמון.',
            'Antivenom, Vipera palaestinae: 10 mL per dog was not associated with higher survival; the authors called for further study of dose and timing.',
          ),
          cite: 'Segev 2004',
        },
      ],
    },
  ],
  sources: {
    'Segev 2004':
      'Segev G, Shipov A, Klement E, Harrus S, Kass P, Aroch I. Vipera palaestinae envenomation in 327 dogs: a retrospective cohort study and analysis of risk factors for mortality. Toxicon. 2004;43(6):691–699. doi:10.1016/j.toxicon.2004.03.001',
    'Aroch 2010':
      'Aroch I, Yas-Natan E, Kuzi S, Segev G. Haemostatic abnormalities and clinical findings in Vipera palaestinae-envenomed dogs. Vet J. 2010;185(2):180–187. doi:10.1016/j.tvjl.2009.05.024',
    'Lenchner 2014':
      'Lenchner I, Aroch I, Segev G, Kelmer E, Bruchim Y. A retrospective evaluation of Vipera palaestinae envenomation in 18 cats: (2006–2011). J Vet Emerg Crit Care. 2014;24(4):437–443. doi:10.1111/vec.12207',
    'Lervik 2010':
      'Lervik JB, Lilliehöök I, Frendin JHM. Clinical and biochemical changes in 53 Swedish dogs bitten by the European adder — Vipera berus. Acta Vet Scand. 2010;52:26. doi:10.1186/1751-0147-52-26',
    'Harjen 2020':
      'Harjen HJ, Bjelland AA, Harris J, et al. Ambulatory electrocardiography and serum cardiac troponin I measurement in 21 dogs envenomated by the European adder (Vipera berus). J Vet Intern Med. 2020;34(4):1369–1378. doi:10.1111/jvim.15817',
    'Peterson 2011':
      'Peterson ME, Matz M, Seibold K, Plunkett S, Johnson S, Fitzgerald K. A randomized multicenter trial of Crotalidae polyvalent immune F(ab) antivenom for the treatment of rattlesnake envenomation in dogs. J Vet Emerg Crit Care. 2011;21(4):335–345. doi:10.1111/j.1476-4431.2011.00643.x',
    'Witsil 2015':
      "Witsil AJ, Wells RJ, Woods C, Rao S. 272 cases of rattlesnake envenomation in dogs: demographics and treatment including safety of F(ab')2 antivenom use in 236 patients. Toxicon. 2015;105:19–26. doi:10.1016/j.toxicon.2015.08.028",
    'Carr 2015':
      'Carr A, Schultz J. Prospective evaluation of the incidence of wound infection in rattlesnake envenomation in dogs. J Vet Emerg Crit Care. 2015;25(4):546–551. doi:10.1111/vec.12337',
    'Martinez 2020':
      'Martinez J, Londoño LA, Schaer M. Retrospective evaluation of acute kidney injury in dogs with pit viper envenomation (2008–2017): 56 cases. J Vet Emerg Crit Care. 2020;30(6):698–705. doi:10.1111/vec.13007',
    'Valenza 2021':
      'Valenza L, Allavena R, Haworth M, Cochrane J, Henning J. Diagnosis and treatment of snake envenomation in dogs in Queensland, Australia. Vet Sci. 2021;8(2):14. doi:10.3390/vetsci8020014',
  },
};

/** Factors significantly associated with death in 327 dogs envenomed by Vipera palaestinae (Segev 2004). */
export const VIPER_MORTALITY_FACTORS = [
  { id: 'weight_under_15kg', label: L('משקל גוף מתחת ל-15 ק"ג', 'Body weight below 15 kg') },
  { id: 'limb_bite', label: L('הכשה בגפה', 'Envenomation of a limb') },
  { id: 'night_bite', label: L('הכשה בלילה', 'Envenomation at night') },
  { id: 'severe_lethargy', label: L('אפתיה קשה', 'Severe lethargy') },
  { id: 'hypothermia', label: L('היפותרמיה', 'Hypothermia') },
  { id: 'systemic_bleeding', label: L('דימום סיסטמי', 'Systemic bleeding') },
  { id: 'shock', label: L('הלם', 'Shock') },
  { id: 'dyspnoea', label: L('קוצר נשימה', 'Dyspnoea') },
  { id: 'tachycardia', label: L('טכיקרדיה', 'Tachycardia') },
  { id: 'thrombocytopenia', label: L('תרומבוציטופניה', 'Thrombocytopenia') },
  { id: 'glucocorticoid_therapy', label: L('טיפול בגלוקוקורטיקואידים', 'Glucocorticoid therapy') },
] as const;

export function countViperRiskFactors(presentIds: string[]): { present: number; total: number } {
  const knownIds = VIPER_MORTALITY_FACTORS.map((factor) => factor.id as string);
  const unknown = presentIds.find((factorId) => !knownIds.includes(factorId));
  if (unknown !== undefined) {
    throw new Error(`Viper risk factors: unknown factor id "${unknown}". Known ids: ${knownIds.join(', ')}.`);
  }
  return { present: new Set(presentIds).size, total: knownIds.length };
}

/* --------------------------------------------------------- caterpillar --- */

const CATERPILLAR_TOPIC: FieldTopic = {
  id: 'caterpillar',
  name: L('זחל תהלוכן האורן', 'Pine processionary caterpillar'),
  blurb: L('הזמן עד שטיפת הפה קובע את נמק הלשון', 'Time to oral flushing decides tongue necrosis'),
  accent: '#F59E0B',
  regions: ['France', 'Portugal', 'Israel'],
  sections: [
    {
      title: L('כלבים', 'Dogs'),
      facts: [
        {
          text: L(
            'צרפת, 109 כלבים: נגעי לשון (מבצקת ועד נמק קשה) ב-86%; סימנים סיסטמיים ב-55%, בעיקר הקאות (48%). שיעור ההישרדות 97%.',
            'France, 109 dogs: tongue lesions (from oedema to severe necrosis) in 86%; systemic signs in 55%, mostly vomiting (48%). Survival 97%.',
          ),
          cite: 'Pouzot-Nevoret 2017',
        },
        {
          text: L(
            'הזמן מהמגע ועד שטיפת הפה הראשונה היה הגורם המכריע: נמק לשון בקבלה ב-45% כשהשטיפה בוצעה לאחר יותר מ-6 שעות, לעומת 5% כשבוצעה מוקדם יותר. התוצאות הטובות ביותר — שטיפה בתוך 6 שעות.',
            'Time from contact to the first oral flushing was the key determinant: tongue necrosis at admission in 45% when flushing came after more than 6 hours, against 5% when it came earlier. Best results were seen with flushing within 6 hours.',
          ),
          cite: 'Pouzot-Nevoret 2017',
        },
        {
          text: L(
            'פורטוגל, 41 כלבים: בכולם ריור, קושי בבליעה, הגדלת בלוטות לימפה תת-לסתיות וכאב. נמק לשון התפתח בכל הכלבים שהגיעו לאחר יותר משעתיים וב-8 מתוך 27 שהגיעו בתוך שעתיים — המחברים ממליצים על התערבות בתוך שעתיים.',
            'Portugal, 41 dogs: all had drooling, dysphagia, submandibular lymph-node enlargement and pain. Tongue necrosis developed in every dog presented after more than 2 hours and in 8 of 27 presented within 2 hours — the authors advise intervention within 2 hours.',
          ),
          cite: 'Niza 2012',
        },
        {
          text: L(
            'ישראל (Thaumetopoea wilkinsoni), 3 כלבים: נמק ונשירה של קצה הלשון 2–5 ימים לאחר האשפוז; כולם החלימו. שני אנשי צוות שטיפלו בכלב פיתחו פריחה מגרדת — יש להגן על הצוות.',
            'Israel (Thaumetopoea wilkinsoni), 3 dogs: necrosis and sloughing of the tongue tip 2–5 days after admission; all recovered. Two staff members handling a dog developed an itchy rash — staff should be protected.',
          ),
          cite: 'Bruchim 2005',
        },
      ],
    },
    {
      title: L('חתולים', 'Cats'),
      facts: [
        {
          text: L(
            'צרפת, 11 חתולים: נגעי לשון וריור ב-91%, הקאות ב-36%; כולם שרדו, ללא נזק ארוך-טווח.',
            'France, 11 cats: tongue lesions and ptyalism in 91%, vomiting in 36%; all survived with no long-term disability.',
          ),
          cite: 'Pouzot-Nevoret 2018',
        },
      ],
    },
  ],
  sources: {
    'Pouzot-Nevoret 2017':
      'Pouzot-Nevoret C, Cambournac M, Violé A, Goy-Thollot I, Bourdoiseau G, Barthélemy A. Pine processionary caterpillar Thaumetopoea pityocampa envenomation in 109 dogs: a retrospective study. Toxicon. 2017;132:1–5. doi:10.1016/j.toxicon.2017.03.014',
    'Niza 2012':
      'Niza ME, Ferreira RL, Coimbra IV, et al. Effects of pine processionary caterpillar Thaumetopoea pityocampa contact in dogs: 41 cases (2002–2006). Zoonoses Public Health. 2012;59(1):35–38. doi:10.1111/j.1863-2378.2011.01415.x',
    'Bruchim 2005':
      'Bruchim Y, Ranen E, Saragusty J, Aroch I. Severe tongue necrosis associated with pine processionary moth (Thaumetopoea wilkinsoni) ingestion in three dogs. Toxicon. 2005;45(4):443–447. doi:10.1016/j.toxicon.2004.11.018',
    'Pouzot-Nevoret 2018':
      'Pouzot-Nevoret C, Cambournac M, Violé A, Goy-Thollot I, Bourdoiseau G, Barthélemy A. Pine processionary caterpillar Thaumetopoea pityocampa envenomation in 11 cats: a retrospective study. J Feline Med Surg. 2018;20(8):685–689. doi:10.1177/1098612X17723776',
  },
};

export type FlushGroup = 'under-2h' | '2-to-6h' | 'over-6h';

export interface FlushWindow {
  group: FlushGroup;
  /** Tongue necrosis already present at admission, percent of that group. */
  necrosisAtAdmissionPercent: number;
  /** Tongue necrosis developing during hospitalisation, percent of that group. */
  necrosisInHospitalPercent: number;
}

const FLUSH_WINDOWS: Record<FlushGroup, FlushWindow> = {
  'under-2h': { group: 'under-2h', necrosisAtAdmissionPercent: 5, necrosisInHospitalPercent: 21 },
  '2-to-6h': { group: '2-to-6h', necrosisAtAdmissionPercent: 5, necrosisInHospitalPercent: 31 },
  'over-6h': { group: 'over-6h', necrosisAtAdmissionPercent: 45, necrosisInHospitalPercent: 65 },
};

function assertElapsedHours(hours: number, context: string): void {
  if (!Number.isFinite(hours) || hours < 0) {
    throw new RangeError(`${context}: elapsed time must be zero or more hours, got ${hours}.`);
  }
}

/** Groups as defined in Pouzot-Nevoret 2017: under 2 h, 2–6 h, over 6 h from contact to first oral flushing. */
export function caterpillarFlushWindow(hoursSinceContact: number): FlushWindow {
  assertElapsedHours(hoursSinceContact, 'Caterpillar flush window');
  if (hoursSinceContact < 2) return FLUSH_WINDOWS['under-2h'];
  return hoursSinceContact <= 6 ? FLUSH_WINDOWS['2-to-6h'] : FLUSH_WINDOWS['over-6h'];
}

/* -------------------------------------------------- anticholinesterase --- */

const ANTICHOLINESTERASE_TOPIC: FieldTopic = {
  id: 'anticholinesterase',
  name: L('הרעלת זרחנים אורגניים / קרבמטים', 'Organophosphate / carbamate poisoning'),
  blurb: L('סימנים, מהלך ותסמונת הביניים', 'Signs, course and the intermediate syndrome'),
  accent: '#8B5CF6',
  regions: ['Israel', 'United States', 'South Africa'],
  sections: [
    {
      title: L('משבר כולינרגי חריף', 'Acute cholinergic crisis'),
      facts: [
        {
          text: L(
            'ישראל, 102 כלבים: הסימנים הנפוצים — רעד שרירים, ריור יתר, מיוזיס, חולשה, הקאות ושלשול. תמותה 17%. כשל נשימתי והצורך בהנשמה מלאכותית נקשרו לתמותה; כחמישית מהכלבים נזקקו להרדמה ולהנשמה.',
            'Israel, 102 dogs: the commonest signs were muscle tremor, hypersalivation, miosis, weakness, vomiting and diarrhoea. Mortality 17%. Respiratory failure and the need for mechanical ventilation were associated with death; about one dog in five needed anaesthesia and ventilation.',
          ),
          cite: 'Klainbart 2019',
        },
        {
          text: L(
            'ארה"ב, 15 כלבים עם הרעלת אלדיקרב: הקאות, ריור, שלשול ורעד; 10 מתוך 11 המאושפזים שרדו. המחברים ממליצים על טיפול תומך וניטור במשך 18–24 שעות לפחות.',
            'United States, 15 dogs with aldicarb toxicosis: vomiting, ptyalism, diarrhoea and tremors; 10 of 11 hospitalised dogs survived. The authors advise supportive care and monitoring for at least 18–24 hours.',
          ),
          cite: 'Anastasio 2011',
        },
        {
          text: L(
            'דרום אפריקה (סקירה פרמקולוגית): הצלחת הטיפול תלויה במתן מוקדם של תרופה אנטי-מוסקרינית (כגון אטרופין); נוזלים, דיפנהידרמין, בנזודיאזפינים ופחם פעיל הם אפשרויות תומכות.',
            'South Africa (pharmacological review): successful treatment depends on timely use of an antimuscarinic drug (for example atropine); fluids, diphenhydramine, benzodiazepines and activated charcoal are supportive options.',
          ),
          cite: 'Arnot 2011',
        },
      ],
    },
    {
      title: L('תסמונת הביניים', 'Intermediate syndrome'),
      facts: [
        {
          text: L(
            'מופיעה בדרך כלל 7–96 שעות לאחר המשבר הכולינרגי: חולשה של שרירי הגפיים הקרובים, שרירי הנשימה וכופפי הצוואר. מתוך 32 כלבים, 9 פיתחו אותה. כל 15 הכלבים עם התסמונת שרדו, כולל רבע שנזקקו להנשמה.',
            'Typically appears 7–96 hours after the cholinergic crisis: weakness of proximal limb, respiratory and neck-flexor muscles. Of 32 dogs, 9 developed it. All 15 dogs with the syndrome survived, including a quarter that needed ventilation.',
          ),
          cite: 'Klainbart 2022',
        },
      ],
    },
  ],
  sources: {
    'Klainbart 2019':
      'Klainbart S, Grabernik M, Kelmer E, Chai O, Cuneah O, Segev G, Aroch I. Clinical manifestations, laboratory findings, treatment and outcome of acute organophosphate or carbamate intoxication in 102 dogs: a retrospective study. Vet J. 2019;251:105349. doi:10.1016/j.tvjl.2019.105349',
    'Klainbart 2022':
      'Klainbart S, Kelmer E, Chai O, Segev G, Aroch I. Prevalence, clinical manifestations, laboratory findings, treatment, and outcome of intermediate syndrome in anticholinesterase pesticide intoxication of dogs: a retrospective study. Vet J. 2022;287:105883. doi:10.1016/j.tvjl.2022.105883',
    'Anastasio 2011':
      'Anastasio JD, Sharp CR. Acute aldicarb toxicity in dogs: 15 cases (2001–2009). J Vet Emerg Crit Care. 2011;21(3):253–260. doi:10.1111/j.1476-4431.2011.00613.x',
    'Arnot 2011':
      'Arnot LF, Veale DJ, Steyl JC, Myburgh JG. Treatment rationale for dogs poisoned with aldicarb (carbamate pesticide). J S Afr Vet Assoc. 2011;82(4):232–238. doi:10.4102/jsava.v82i4.80',
  },
};

export const INTERMEDIATE_SYNDROME_HOURS = { from: 7, to: 96 } as const;

export type CholinergicPhase = 'before-window' | 'in-window' | 'after-window';

/** Where a time since the acute cholinergic crisis falls relative to the 7–96 h intermediate-syndrome window. */
export function cholinergicTimeline(hoursSinceCrisis: number): { phase: CholinergicPhase } {
  assertElapsedHours(hoursSinceCrisis, 'Cholinergic timeline');
  const { from, to } = INTERMEDIATE_SYNDROME_HOURS;
  if (hoursSinceCrisis < from) return { phase: 'before-window' };
  return { phase: hoursSinceCrisis <= to ? 'in-window' : 'after-window' };
}

export const FIELD_TOPICS: FieldTopic[] = [HEAT_TOPIC, SNAKE_TOPIC, CATERPILLAR_TOPIC, ANTICHOLINESTERASE_TOPIC];
