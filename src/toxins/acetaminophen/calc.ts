/**
 * Acetaminophen / paracetamol toxicosis — canine & feline.
 * NAPQI-mediated injury: dogs → hepatotoxicity (>100 mg/kg), methemoglobinemia
 * (>200 mg/kg); cats → methemoglobinemia/Heinz-body anemia with NO safe dose
 * (signs from ~10 mg/kg). Antidote: N-acetylcysteine.
 */
import { L, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';
import type { DrugProduct } from '../drugCommon';

export const APAP_PRODUCTS: DrugProduct[] = [
  { id: 'tab325', label: L('טבליה 325 מ"ג', 'Tablet 325 mg'), mgPerUnit: 325, unit: 'tablet' },
  { id: 'tab500', label: L('טבליה 500 מ"ג (extra)', 'Tablet 500 mg (extra strength)'), mgPerUnit: 500, unit: 'tablet' },
  { id: 'tab650', label: L('טבליה 650 מ"ג (ER)', 'Tablet 650 mg (ER)'), mgPerUnit: 650, unit: 'tablet' },
  { id: 'chew160', label: L('לעיסה 160 מ"ג', 'Chewable 160 mg'), mgPerUnit: 160, unit: 'tablet' },
  { id: 'liquid', label: L('סירופ 160 מ"ג/5 מ"ל', 'Liquid 160 mg/5 mL'), mgPerUnit: 32, unit: 'ml' },
];

const SOURCES = [
  'Merck/MSD Veterinary Manual. Toxicoses From Human Analgesics in Animals.',
  'Sellon RK. Acetaminophen. In: Small Animal Toxicology (Veterian Key), 2016.',
  'Richardson JA. Management of acetaminophen and ibuprofen toxicosis in dogs and cats. J Vet Emerg Crit Care. 2000;10(4):285–291.',
  'Villar D, et al. Ibuprofen, aspirin and acetaminophen toxicosis and treatment in dogs and cats. Vet Hum Toxicol. 1998;40(3):156–161.',
];

export interface ApapInput {
  species: ToxSpecies;
  weightKg: number;
  mg: number;
}

export function computeAcetaminophen(input: ApapInput): ToxinResult {
  const mgPerKg = input.mg / input.weightKg;
  let level: RiskLevel;
  let emergency: boolean;
  let fraction: number;

  if (input.species === 'cat') {
    // No safe dose — any exposure is treated as an emergency.
    if (mgPerKg < 10) level = 'moderate';
    else if (mgPerKg < 50) level = 'severe';
    else level = 'critical';
    emergency = true;
    fraction = Math.min(1, mgPerKg / 100);
  } else {
    if (mgPerKg < 100) level = 'minimal';
    else if (mgPerKg < 200) level = 'moderate';
    else if (mgPerKg < 450) level = 'severe';
    else level = 'critical';
    emergency = mgPerKg >= 100;
    fraction = Math.min(1, mgPerKg / 450);
  }

  const signs =
    input.species === 'cat'
      ? L(
          'תוך שעות: רפיון, חולשה, ריור, הקאות, בצקת פנים/כפות, ציאנוזה וריריות חום-שוקולד (מתמוגלובינמיה), קוצר נשימה.',
          'Within hours: lethargy, weakness, salivation, vomiting, facial/paw edema, cyanosis and chocolate-brown mucous membranes (methemoglobinemia), dyspnea.',
        )
      : L(
          'מוקדם: הקאות, חוסר תיאבון, כאב בטן. מאוחר (24–48 ש׳): צהבת, שתן כהה, אי-ספיקת כבד; מתמוגלובינמיה ובצקת במינונים גבוהים.',
          'Early: vomiting, anorexia, abdominal pain. Late (24–48 h): icterus, dark urine, hepatic failure; methemoglobinemia and edema at high doses.',
        );

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(0)} mg/kg`,
    doseSubLabel: L('אצטמינופן למשקל גוף', 'acetaminophen per body weight'),
    signs,
    action: L(
      'פנה/י לרופא וטרינר בדחיפות. אנטידוט: N-אצטילציסטאין (NAC) — מנת העמסה 140 מ"ג/ק"ג ואז 70 מ"ג/ק"ג כל 6 ש׳. הקאה/פחם פעיל אם נאכל לאחרונה; SAMe, ויטמין C, חמצן ונוזלים.',
      'Seek veterinary care urgently. Antidote: N-acetylcysteine (NAC) — 140 mg/kg loading then 70 mg/kg every 6 h. Emesis/charcoal if recent; SAMe, vitamin C, oxygen and IV fluids.',
    ),
    decon: L(
      'הקאה יזומה ופחם פעיל אם נאכל לאחרונה ובהיעדר סימנים. ניטור מתמוגלובין ותפקודי כבד.',
      'Induce emesis and give activated charcoal if recent and asymptomatic. Monitor methemoglobin and liver function.',
    ),
    context:
      input.species === 'cat'
        ? L(
            'לחתולים אין מנה בטוחה (חוסר בגלוקורונידציה). טבליה אחת 325 מ"ג בחתול 4 ק"ג ≈ 81 מ"ג/ק"ג — מסכן חיים.',
            'Cats have no safe dose (deficient glucuronidation). One 325 mg tablet in a 4 kg cat ≈ 81 mg/kg — life-threatening.',
          )
        : L(
            'כלב: הפטוטוקסיות >100, מתמוגלובינמיה >200, חמור ~450 מ"ג/ק"ג. הפגיעה הכבדית מתעכבת 24–48 ש׳.',
            'Dog: hepatotoxicity >100, methemoglobinemia >200, severe ~450 mg/kg. Hepatic injury is delayed 24–48 h.',
          ),
    emergency,
    stats: [{ label: L('אצטמינופן/ק"ג', 'APAP/kg'), value: `${mgPerKg.toFixed(0)} mg/kg` }],
    sources: SOURCES,
  };
}
