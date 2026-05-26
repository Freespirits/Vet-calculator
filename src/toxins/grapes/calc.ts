/**
 * Grape / raisin / currant toxicosis — canine.
 *
 * Toxic principle: tartaric acid / potassium bitartrate (Wegenast 2021).
 * IDIOSYNCRATIC — no reliable dose-response. The calculator never returns a
 * "safe" reading: any ingestion above the conservative trigger branches to
 * decontamination guidance. The g/kg figure is shown for context only.
 */
import { L, type ToxinResult } from '../../types/toxins';

export interface GrapeInput {
  typeId: 'grapes' | 'raisins';
  weightKg: number;
  grams: number;
}

const SOURCES = [
  'Hayes C; rev. Brutlag A. Grape, Raisin, and Tamarind Toxicosis in Dogs. Merck Veterinary Manual, 2024.',
  'Wegenast C, et al. Tartaric acid / potassium bitartrate as the toxic principle. J Am Vet Med Assoc. 2021;258(7).',
  'Dijkman MA, et al. Incidence of Vitis-fruit clinical signs and AKI in dogs and cats. J Small Anim Pract. 2022;63(6):447–453.',
];

export function computeGrapes(input: GrapeInput): ToxinResult {
  const gPerKg = input.grams / input.weightKg;
  // Lowest documented toxic doses, used as context flags only.
  const docToxic = input.typeId === 'raisins' ? 3 : 20;
  const overTrigger = gPerKg >= docToxic;

  return {
    level: 'critical',
    idiosyncratic: true,
    doseLabel: `${gPerKg.toFixed(1)} g/kg`,
    doseSubLabel: L('כמות יחסית למשקל (להמחשה בלבד)', 'amount per body weight (context only)'),
    bandLabel: L('אידיוסינקרטי — אין סף בטוח', 'Idiosyncratic — no safe threshold'),
    signs: L(
      'הקאות ושלשול (6–12 ש׳), חוסר תיאבון, חולשה, כאב בטן; פגיעה כלייתית חריפה (אוליגוריה/אנוריה) תוך 24–72 שעות.',
      'Vomiting and diarrhea (6–12 h), anorexia, weakness, abdominal pain; acute kidney injury (oliguria/anuria) within 24–72 h.',
    ),
    action: L(
      'פנה/י לרופא וטרינר מיד — גם בכמות קטנה. דה-קונטמינציה (הקאה ± פחם פעיל) ועירוי נוזלים אגרסיבי ל-48 שעות לפחות עם ניטור תפקוד כליות.',
      'Contact a vet immediately — even for a small amount. Decontaminate (emesis ± charcoal) and run aggressive IV fluid diuresis for ≥48 h with renal monitoring.',
    ),
    decon: L(
      'מומלצת דה-קונטמינציה מוקדמת. AKI מופיע בדרך כלל תוך 72 שעות; פרוגנוזה גרועה לאחר אנוריה.',
      'Early decontamination advised. AKI typically appears within 72 h; prognosis is poor once anuric.',
    ),
    context: L(
      `אין קשר מנה-תגובה אמין: AKI תועד אחרי 4–5 ענבים בכלב קטן, בעוד כלבים אחרים אכלו כמויות גדולות ללא נזק. מינון רעיל מתועד נמוך: ענבים ~20 גרם/ק"ג, צימוקים ~3 גרם/ק"ג. כאן: ${gPerKg.toFixed(1)} גרם/ק"ג${overTrigger ? ' — מעל המינון הרעיל המתועד.' : '.'} חתולים: סימני עיכול בלבד, ללא AKI מתועד.`,
      `No reliable dose-response: AKI reported after 4–5 grapes in a small dog, while other dogs ate large amounts unharmed. Lowest documented toxic doses: grapes ~20 g/kg, raisins ~3 g/kg. Here: ${gPerKg.toFixed(1)} g/kg${overTrigger ? ' — above the documented toxic dose.' : '.'} Cats: GI signs only, no documented AKI.`,
    ),
    emergency: true,
    stats: [
      { label: L('כמות/ק"ג', 'Amount/kg'), value: `${gPerKg.toFixed(1)} g/kg` },
      { label: L('מינון רעיל מתועד', 'Documented toxic'), value: `~${docToxic} g/kg` },
    ],
    sources: SOURCES,
  };
}
