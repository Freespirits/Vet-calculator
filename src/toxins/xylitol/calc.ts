/**
 * Xylitol toxicosis — canine.
 * Dog-specific: rapid insulin release → hypoglycemia; higher doses → hepatic
 * injury. Cats are not at risk. Activated charcoal does NOT bind xylitol.
 * Thresholds: >100 mg/kg hypoglycemia, >500 mg/kg hepatic failure.
 */
import { L, type ToxinResult } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

export interface XylitolInput {
  weightKg: number;
  /** Total xylitol ingested, in mg. */
  xylitolMg: number;
}

const SOURCES = [
  'Hayes C; Brutlag A. Xylitol Toxicosis in Dogs. Merck Veterinary Manual, rev. 2024–25.',
  'Murphy LA, Coleman AE. Xylitol toxicosis in dogs: an update. Vet Clin North Am Small Anim Pract. 2019.',
  'Schmid RD, Hovda LR. Acute Hepatic Failure in a Dog after Xylitol Ingestion. J Med Toxicol.',
];

export function computeXylitol(input: XylitolInput): ToxinResult {
  const mgPerKg = input.xylitolMg / input.weightKg;
  let level: RiskLevel;
  if (mgPerKg < 100) level = 'minimal';
  else if (mgPerKg < 500) level = 'severe';
  else level = 'critical';

  const emergency = mgPerKg >= 100;
  const fraction = Math.min(1, mgPerKg / 600);

  const signs =
    level === 'critical'
      ? L(
          'היפוגליקמיה (הקאות, חולשה, אטקסיה, פרכוסים) ולאחר מכן פגיעה כבדית: צהבת, קרישיות יתר/דימום, עלייה באנזימי כבד.',
          'Hypoglycemia (vomiting, weakness, ataxia, seizures) then hepatic injury: icterus, coagulopathy, raised liver enzymes.',
        )
      : level === 'severe'
        ? L(
            'היפוגליקמיה: הקאות, חולשה, אטקסיה, רפיון, ובמקרים חמורים פרכוסים.',
            'Hypoglycemia: vomiting, weakness, ataxia, lethargy and, when severe, seizures.',
          )
        : L(
            'מתחת לסף ההיפוגליקמיה; לרוב ללא סימנים, אך מומלץ ניטור.',
            'Below the hypoglycemia threshold; usually no signs, but monitoring is advised.',
          );

  return {
    level,
    fraction,
    doseLabel: `${mgPerKg.toFixed(0)} mg/kg`,
    doseSubLabel: L('קסיליטול למשקל גוף', 'xylitol per body weight'),
    signs,
    action:
      level === 'minimal'
        ? L(
            'נטר/י ופנה/י לרופא וטרינר להתייעצות. אין לתת פחם פעיל — אינו קושר קסיליטול.',
            'Monitor and consult a vet. Do not give activated charcoal — it does not bind xylitol.',
          )
        : L(
            'חירום — פנה/י מיד לרופא וטרינר. ניטור סוכר בדם ומתן דקסטרוז IV; ניטור אנזימי כבד; הגנה כבדית.',
            'Emergency — see a vet now. Monitor blood glucose with IV dextrose; monitor liver enzymes; hepatoprotectants.',
          ),
    decon: L(
      'פחם פעיל אינו יעיל. הקאה רק אם החיה תקינה והאכילה לאחרונה. ניטור סוכר כל 1–2 ש׳ ל-12 ש׳ לפחות; אנזימי כבד כל 24 ש׳ ל-72 ש׳.',
      'Activated charcoal is ineffective. Emesis only if clinically normal and recent. Monitor glucose every 1–2 h for ≥12 h; liver enzymes every 24 h for 72 h.',
    ),
    context: L(
      'תכולת מסטיק 0.2–1+ גרם ליחידה (לרוב לא מסומנת — הנח/י תרחיש מחמיר). הופעת היפוגליקמיה 30 ד׳–12 ש׳ (עד 18 ש׳ במסטיקים). חתולים אינם בסיכון.',
      'Gum contains 0.2–1+ g per piece (often undisclosed — assume worst case). Hypoglycemia onset 30 min–12 h (up to 18 h with gum). Cats are not at risk.',
    ),
    emergency,
    stats: [{ label: L('קסיליטול/ק"ג', 'Xylitol/kg'), value: `${mgPerKg.toFixed(0)} mg/kg` }],
    sources: SOURCES,
  };
}
