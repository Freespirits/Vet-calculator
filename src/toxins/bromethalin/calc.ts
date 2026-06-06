/**
 * Bromethalin rodenticide toxicosis — canine & feline.
 * A non-anticoagulant rodenticide that uncouples oxidative phosphorylation in
 * the CNS, causing cerebral edema. There is NO antidote — early, aggressive
 * decontamination is the mainstay, and cats are markedly more sensitive than
 * dogs.
 *
 * Approximate thresholds (mg/kg, Merck Veterinary Manual):
 *   dog: minimum lethal dose ~2.4; treat/decontaminate from ~0.1
 *   cat: minimum lethal dose ~0.54 — roughly one-fifth of the dog figures.
 * Baits are typically 0.01% bromethalin (0.1 mg/g).
 */
import { L, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

const SOURCES = [
  'Dorman DC. Bromethalin Poisoning in Animals. Merck/MSD Veterinary Manual, 2023.',
  'ASPCA Animal Poison Control Center. Bromethalin rodenticide toxicosis.',
  'Dunayer E. Bromethalin: the other rodenticide. Vet Med. 2003;98:732–736.',
];

export interface BromethalinInput {
  species: ToxSpecies;
  weightKg: number;
  /** Total bromethalin ingested, mg. */
  mg: number;
}

/** Thresholds (mg/kg): [decontaminate, severe, critical]. Cats ≈ 0.22× dog. */
function thresholds(species: ToxSpecies): [number, number, number] {
  const dog: [number, number, number] = [0.1, 0.3, 0.75];
  if (species === 'dog') return dog;
  return [dog[0] * 0.22, dog[1] * 0.22, dog[2] * 0.22];
}

export function computeBromethalin(input: BromethalinInput): ToxinResult {
  const mgPerKg = input.mg / input.weightKg;
  const [a, b, c] = thresholds(input.species);

  let level: RiskLevel;
  if (mgPerKg < a) level = 'minimal';
  else if (mgPerKg < b) level = 'moderate';
  else if (mgPerKg < c) level = 'severe';
  else level = 'critical';

  const emergency = level === 'severe' || level === 'critical';
  const fraction = Math.min(1, mgPerKg / c);

  const signs =
    level === 'minimal'
      ? L('מתחת לסף הטיפול; נטר/י. סימנים יכולים להופיע בעיכוב.', 'Below the treatment threshold; monitor. Signs can be delayed.')
      : L(
          'תסמונת על-מינון: רעד, פרכוסים, רגישות-יתר, היפרתרמיה תוך שעות. מינון נמוך יותר: דיכאון, חולשה ברגליים אחוריות, אטקסיה, שיתוק — בעיכוב של 1–4 ימים.',
          'High-dose syndrome: tremors, seizures, hyperexcitability, hyperthermia within hours. Lower dose: depression, hind-limb weakness, ataxia, paralysis — delayed 1–4 days.',
        );

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(3)} mg/kg`,
    doseSubLabel: L('ברומתלין למשקל גוף', 'bromethalin per body weight'),
    signs,
    action:
      level === 'minimal'
        ? L('נטר/י ופנה/י לרופא וטרינר; ייתכן ניטור נוירולוגי לכמה ימים.', 'Monitor and consult a vet; neurological monitoring for several days may be advised.')
        : L(
            'פנה/י לרופא וטרינר בדחיפות. אין אנטידוט — דה-קונטמינציה מוקדמת ואגרסיבית: הקאה אם נאכל לאחרונה, ופחם פעיל במנות חוזרות (מחזור אנטרוהפטי). טיפול בבצקת מוחית (מניטול), שליטה בפרכוסים, טיפול תומך.',
            'Contact a vet urgently. There is no antidote — early, aggressive decontamination: emesis if recent, and multiple-dose activated charcoal (enterohepatic recirculation). Treat cerebral edema (mannitol), control seizures, supportive care.',
          ),
    decon: L(
      'פחם פעיל חוזר הוא מרכזי בשל מחזור אנטרוהפטי. סימנים עלולים להתעכב 1–4 ימים — אין להסתמך על מצב תקין מוקדם.',
      'Multiple-dose activated charcoal is central due to enterohepatic recirculation. Signs may be delayed 1–4 days — do not rely on an early normal status.',
    ),
    context: L(
      'מינון קטלני מינימלי: כלב ~2.4, חתול ~0.54 מ"ג/ק"ג — חתולים רגישים בהרבה. פיתיון אופייני 0.01% (0.1 מ"ג/גרם). אין אנטידוט.',
      'Minimum lethal dose: dog ~2.4, cat ~0.54 mg/kg — cats are far more sensitive. Typical bait is 0.01% (0.1 mg/g). There is no antidote.',
    ),
    emergency,
    stats: [
      { label: L('סך ברומתלין', 'Total bromethalin'), value: `${input.mg.toFixed(3)} mg` },
      { label: L('מ"ג/ק"ג', 'mg/kg'), value: `${mgPerKg.toFixed(3)} mg/kg` },
    ],
    sources: SOURCES,
  };
}
