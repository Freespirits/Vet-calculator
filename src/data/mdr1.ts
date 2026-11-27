/**
 * MDR1 (ABCB1) pharmacogenetics — the published evidence behind the
 * breed/genotype check in the dosage calculator.
 *
 * Background: a 4-base-pair deletion in the canine MDR1 gene (ABCB1-1Δ) leaves
 * dogs without working P-glycoprotein, the pump that keeps many drugs out of
 * the brain and clears them into bile. Dogs with two copies of the mutation —
 * and, to a lesser degree, one copy — are prone to exaggerated effects of
 * P-glycoprotein substrate drugs. A different mutation (ABCB1 1930_1931del TC)
 * does the same in cats.
 *
 * What is in this file, and where it came from
 *  - MDR1_BREEDS: Table 1 of the 2023 review by the group that identified the
 *    mutation ("approximate breed frequency of the MDR1 mutation in dogs";
 *    frequency text is kept exactly as printed), plus the Israeli allele
 *    frequencies published by Dekel et al. 2017. These are two different
 *    measures and are shown separately, each with its own label.
 *  - MDR1_DRUG_RULES: only drugs with species-specific published evidence —
 *    the review's Table 2 (dogs) and Table 3 (cats), and one published case
 *    report (digoxin, mexiletine). A drug that is a P-glycoprotein substrate
 *    in people or mice only is deliberately NOT listed.
 *  - `guidance` mirrors what the review recommends for that drug:
 *      avoid           no data support a safe reduced dose → use an alternative
 *      reduce          general starting point −25% (one copy) / −50% (two copies)
 *      dose-dependent  label doses studied safe; high extra-label doses dangerous
 *      monitor         limited evidence and no drug-specific dose guidance
 *      studied-safe    tested in MDR1 mutant/mutant dogs without adverse events
 *
 * `finding` and `evidence` are our own short summaries (Hebrew + English) of
 * the cited papers; no text is reproduced from them.
 */
import { L, type LocalizedText } from '../types/toxins';
import type { Species } from '../types';

export const MDR1_SOURCES = {
  review2023:
    'Mealey KL, Owens JG, Freeman E. Canine and feline P-glycoprotein deficiency: What we know and where we need to go. J Vet Pharmacol Ther. 2023;46(1):1–16. doi:10.1111/jvp.13102',
  mealey2001:
    'Mealey KL, Bentjen SA, Gay JM, Cantor GH. Ivermectin sensitivity in collies is associated with a deletion mutation of the mdr1 gene. Pharmacogenetics. 2001;11(8):727–733. doi:10.1097/00008571-200111000-00012',
  mealey2008Heartworm:
    'Mealey KL. Canine ABCB1 and macrocyclic lactones: heartworm prevention and pharmacogenetics. Vet Parasitol. 2008;158(3):215–222. doi:10.1016/j.vetpar.2008.09.009',
  mealey2008Loperamide:
    'Mealey KL, Greene S, Bagley R, et al. P-glycoprotein contributes to the blood-brain, but not blood-cerebrospinal fluid, barrier in a spontaneous canine P-glycoprotein knockout model. Drug Metab Dispos. 2008;36(6):1073–1079. doi:10.1124/dmd.107.018978',
  sartor2004:
    'Sartor LL, Bentjen SA, Trepanier L, Mealey KL. Loperamide toxicity in a collie with the MDR1 mutation associated with ivermectin sensitivity. J Vet Intern Med. 2004;18(1):117–118.',
  deshpande2016:
    'Deshpande D, Hill KE, Mealey KL, Chambers JP, Gieseg MA. The effect of the canine ABCB1-1Δ mutation on sedation after intravenous administration of acepromazine. J Vet Intern Med. 2016;30(2):636–641. doi:10.1111/jvim.13827',
  campbell2017:
    'Campbell O, de Lorimier LP, Mealey KL. Adverse reaction to apomorphine in a Collie homozygous for the ABCB1-1Δ (MDR1) mutation. J Small Anim Pract. 2017;58(2):119. doi:10.1111/jsap.12618',
  henik2006:
    'Henik RA, Kellum HB, Bentjen SA, Mealey KL. Digoxin and mexiletine sensitivity in a Collie with the MDR1 mutation. J Vet Intern Med. 2006;20(2):415–417.',
  mackin2020:
    'Mackin AJ, Riggs C, Beatty T, Mealey K, Boothe D, Archer T. Excessive cyclosporine-associated immunosuppression in a dog heterozygous for the MDR1 (ABCB1-1Δ) mutation. J Am Anim Hosp Assoc. 2020;56(3):190. (as cited in Mealey et al. 2023)',
  walther2014:
    'Walther FM, Paul AJ, Allan MJ, Roepke RKA, Nuernberger MC. Safety of fluralaner, a novel systemic antiparasitic drug, in MDR1(−/−) collies after oral administration. Parasit Vectors. 2014;7:86. (as cited in Mealey et al. 2023)',
  mealeyBurke2015:
    'Mealey KL, Burke NS. Identification of a nonsense mutation in feline ABCB1. J Vet Pharmacol Ther. 2015;38(5):429–433. doi:10.1111/jvp.12212',
  dekel2017:
    'Dekel Y, Machluf Y, Stoler A, et al. Frequency of canine nt230(del4) MDR1 mutation in prone pure breeds, their crosses and mongrels in Israel — insights from a worldwide comparative perspective. BMC Vet Res. 2017;13:333. doi:10.1186/s12917-017-1251-9',
} as const;

export type Mdr1Genotype = 'unknown' | 'normal' | 'one-copy' | 'two-copies';

export interface Mdr1Breed {
  id: string;
  name: LocalizedText;
  /** Exactly as printed in Mealey et al. 2023, Table 1. */
  frequencyText: string;
  /** Mutant-allele frequency in Israel, percent (Dekel et al. 2017). */
  israelAllelePercent?: number;
}

export const MDR1_BREEDS: Mdr1Breed[] = [
  { id: 'collie', name: L('קולי', 'Collie'), frequencyText: '70%', israelAllelePercent: 28 },
  { id: 'longhaired_whippet', name: L('וויפט ארוך-שיער', 'Longhaired Whippet'), frequencyText: '65%' },
  { id: 'australian_shepherd', name: L('רועה אוסטרלי', 'Australian Shepherd'), frequencyText: '50%', israelAllelePercent: 31 },
  { id: 'mini_australian_shepherd', name: L('רועה אוסטרלי מיניאטורי', 'Miniature Australian Shepherd'), frequencyText: '50%' },
  { id: 'mcnab', name: L('מקנאב', 'McNab'), frequencyText: '30%' },
  { id: 'silken_windhound', name: L('סילקן וינדהאונד', 'Silken Windhound'), frequencyText: '30%' },
  { id: 'english_shepherd', name: L('רועה אנגלי', 'English Shepherd'), frequencyText: '15%' },
  { id: 'shetland_sheepdog', name: L('רועה שטלנדי (שלטי)', 'Shetland Sheepdog'), frequencyText: '15%' },
  { id: 'german_shepherd', name: L('רועה גרמני', 'German Shepherd'), frequencyText: '10%', israelAllelePercent: 2.4 },
  { id: 'herding_cross', name: L('הכלאה של גזע רועים', 'Herding-breed cross'), frequencyText: '10%' },
  { id: 'old_english_sheepdog', name: L('רועה אנגלי עתיק (בובטייל)', 'Old English Sheepdog'), frequencyText: '5%' },
  { id: 'mixed', name: L('מעורב', 'Mixed breed'), frequencyText: '5%', israelAllelePercent: 1 },
  { id: 'border_collie', name: L('בורדר קולי', 'Border Collie'), frequencyText: '<5%', israelAllelePercent: 4.8 },
  { id: 'black_mouth_cur', name: L('בלאק מאות׳ קר', 'Black Mouth Cur'), frequencyText: '8/26 dogs tested' },
  { id: 'chinook', name: L('צ׳ינוק', 'Chinook'), frequencyText: '4/13 dogs tested' },
  { id: 'carolina_dog', name: L('כלב קרוליינה', 'Carolina Dog'), frequencyText: '4/13 dogs tested' },
  { id: 'boxer', name: L('בוקסר', 'Boxer'), frequencyText: '<1%' },
  { id: 'siberian_husky', name: L('האסקי סיבירי', 'Siberian Husky'), frequencyText: '<1%' },
];

/** Feline ABCB1 1930_1931del TC: estimated frequency, no breed predilection (Mealey et al. 2023). */
export const FELINE_MUTATION_FREQUENCY_TEXT = '≈4%';

export type Mdr1Guidance = 'avoid' | 'reduce' | 'dose-dependent' | 'monitor' | 'studied-safe';

export interface Mdr1DrugRule {
  /** Id in DRUG_DATABASE. */
  drugId: string;
  species: Species;
  guidance: Mdr1Guidance;
  /** Kind of evidence, as classified in the review's tables. */
  evidence: LocalizedText;
  /** What was observed. */
  finding: LocalizedText;
  sources: string[];
}

const S = MDR1_SOURCES;

export const MDR1_DRUG_RULES: Mdr1DrugRule[] = [
  {
    drugId: 'ivermectin',
    species: 'dog',
    guidance: 'dose-dependent',
    evidence: L(
      'כלבים עם גנוטיפ ידוע; מחקר רטרוספקטיבי ומחקר בטיחות בחיית המטרה; קו תאים כלבי',
      'Genotyped dogs; retrospective study and target-animal safety study; canine cell line',
    ),
    finding: L(
      'כלבים עם שני עותקים של המוטציה מפתחים רעילות נוירולוגית לאיברמקטין. במינון התווית למניעת תולעת הלב התכשירים נמצאו בטוחים גם בשני עותקים; מינונים חוץ-תוויתיים גבוהים פי 50–100 (כפי שניתנו בעבר לדמודקס) קטלניים לעיתים קרובות ללא טיפול נמרץ.',
      'Dogs with two copies of the mutation develop neurological toxicosis from ivermectin. At the heartworm-prevention label dose, approved products were safe even with two copies; extra-label doses 50–100 times higher (as once used for demodicosis) are often fatal without intensive care.',
    ),
    sources: [S.mealey2001, S.mealey2008Heartworm, S.review2023],
  },
  {
    drugId: 'loperamide',
    species: 'dog',
    guidance: 'avoid',
    evidence: L(
      'כלבים עם גנוטיפ ידוע; שני מחקרים פרוספקטיביים; קו תאים כלבי',
      'Genotyped dogs; two prospective studies; canine cell line',
    ),
    finding: L(
      'דיכוי מערכת העצבים המרכזית הופיע בכל הכלבים עם שני עותקים במינון 0.2 מ"ג/ק"ג וברובם במינון 0.1 מ"ג/ק"ג, ולא הופיע בכלבים תקינים. בעותק אחד הסימנים קלים יותר.',
      'CNS depression occurred in all dogs with two copies at 0.2 mg/kg and in most at 0.1 mg/kg, and in no normal dogs. Signs are milder with one copy.',
    ),
    sources: [S.mealey2008Loperamide, S.sartor2004, S.review2023],
  },
  {
    drugId: 'apomorphine',
    species: 'dog',
    guidance: 'avoid',
    evidence: L('כלב עם גנוטיפ ידוע; דיווח מקרה', 'Genotyped dog; case report'),
    finding: L(
      'דווחה תגובה נוירולוגית חריגה בקולי עם שני עותקים; אפומורפין גורם לדיכוי מערכת העצבים המרכזית בכלבים עם המוטציה.',
      'An adverse neurological reaction was reported in a Collie with two copies; apomorphine causes CNS depression in dogs with the mutation.',
    ),
    sources: [S.campbell2017, S.review2023],
  },
  {
    drugId: 'acepromazine',
    species: 'dog',
    guidance: 'reduce',
    evidence: L('כלבים עם גנוטיפ ידוע; מחקר פרוספקטיבי', 'Genotyped dogs; prospective study'),
    finding: L(
      'ב-29 כלבי קולי שקיבלו 0.04 מ"ג/ק"ג IV, הסדציה הייתה עמוקה וממושכת יותר בשני עותקים. מסקנת המחקר: להפחית מינון ולנטר בקפידה.',
      'In 29 collies given 0.04 mg/kg IV, sedation was deeper and longer with two copies. The study concluded that the dose should be reduced and sedation monitored carefully.',
    ),
    sources: [S.deshpande2016, S.review2023],
  },
  {
    drugId: 'butorphanol',
    species: 'dog',
    guidance: 'reduce',
    evidence: L(
      'כלבים עם גנוטיפ ידוע; ניסיון קליני של מחברת הסקירה (לא מחקר מבוקר)',
      "Genotyped dogs; the review author's clinical experience (not a controlled study)",
    ),
    finding: L(
      'מסווג כסובסטרט של P-glycoprotein בכלבים; הסקירה מציעה הפחתת מינון.',
      'Classed as a canine P-glycoprotein substrate; the review proposes a dose reduction.',
    ),
    sources: [S.review2023],
  },
  {
    drugId: 'cyclosporine',
    species: 'dog',
    guidance: 'reduce',
    evidence: L('כלב עם גנוטיפ ידוע; דיווח מקרה; קו תאים כלבי', 'Genotyped dog; case report; canine cell line'),
    finding: L(
      'דווח דיכוי חיסוני מוגזם בכלב עם עותק אחד, למרות רמות פלזמה בטווח הטיפולי. ניטור פרמקודינמי עשוי להיות אמין יותר מניטור רמות.',
      'Excessive immunosuppression was reported in a dog with one copy despite plasma concentrations in the therapeutic range. Pharmacodynamic monitoring may be more reliable than drug-level monitoring.',
    ),
    sources: [S.mackin2020, S.review2023],
  },
  {
    drugId: 'maropitant',
    species: 'dog',
    guidance: 'monitor',
    evidence: L(
      'כלבים עם גנוטיפ ידוע; ניסיון קליני של מחברת הסקירה; קו תאים כלבי',
      "Genotyped dogs; the review author's clinical experience; canine cell line",
    ),
    finding: L(
      'מסווג כסובסטרט של P-glycoprotein בכלבים. הסקירה אינה נותנת הנחיית מינון ייעודית לתרופה זו.',
      'Classed as a canine P-glycoprotein substrate. The review gives no dose guidance specific to this drug.',
    ),
    sources: [S.review2023],
  },
  {
    drugId: 'digoxin',
    species: 'dog',
    guidance: 'monitor',
    evidence: L('דיווח מקרה יחיד', 'A single case report'),
    finding: L(
      'דווחה רגישות לדיגוקסין ולמקסילטין בקולי עם מוטציית MDR1.',
      'Sensitivity to digoxin and mexiletine was reported in a Collie with the MDR1 mutation.',
    ),
    sources: [S.henik2006],
  },
  {
    drugId: 'mexiletine',
    species: 'dog',
    guidance: 'monitor',
    evidence: L('דיווח מקרה יחיד', 'A single case report'),
    finding: L(
      'דווחה רגישות לדיגוקסין ולמקסילטין בקולי עם מוטציית MDR1.',
      'Sensitivity to digoxin and mexiletine was reported in a Collie with the MDR1 mutation.',
    ),
    sources: [S.henik2006],
  },
  {
    drugId: 'fluralaner',
    species: 'dog',
    guidance: 'studied-safe',
    evidence: L('מחקר בטיחות בכלבי קולי עם שני עותקים', 'Safety study in collies with two copies'),
    finding: L(
      'ניתן לכלבי קולי עם שני עותקים במינון פי 3 מהמינון המרבי המומלץ ללא תופעות לוואי.',
      'Given to collies with two copies at 3 times the maximum recommended dose with no adverse events.',
    ),
    sources: [S.walther2014, S.review2023],
  },
  {
    drugId: 'ivermectin',
    species: 'cat',
    guidance: 'monitor',
    evidence: L('חתולים עם גנוטיפ ידוע; דיווחי מקרה', 'Genotyped cats; case reports'),
    finding: L(
      'מוטציה אחרת (ABCB1 1930_1931del TC) גורמת לחסר P-glycoprotein בחתולים; דווחה רעילות נוירולוגית לאחר איברמקטין בחתול עם שני עותקים. אין נטייה גזעית ידועה.',
      'A different mutation (ABCB1 1930_1931del TC) causes P-glycoprotein deficiency in cats; neurological toxicosis after ivermectin was reported in a cat with two copies. No breed predilection is known.',
    ),
    sources: [S.mealeyBurke2015, S.review2023],
  },
];

/**
 * Drugs the review names as canine P-glycoprotein substrates that are in this
 * app's drug database. Two of them given together can compete for the pump and
 * cause "acquired" P-glycoprotein dysfunction in any dog, whatever its breed.
 * Ketoconazole is included because the review classes it as a strong substrate.
 */
export const PGP_SUBSTRATE_DRUG_IDS = [
  'acepromazine',
  'apomorphine',
  'butorphanol',
  'cyclosporine',
  'ivermectin',
  'ketoconazole',
  'loperamide',
  'maropitant',
] as const;
