/**
 * Ethylene glycol (antifreeze) toxicosis — canine & feline.
 * Metabolised to glycolic/oxalic acid → severe metabolic acidosis and oxalate
 * nephrosis. One of the narrowest toxic margins in small-animal toxicology and
 * a true time-critical emergency: the antidote (fomepizole / ethanol) works
 * only before significant metabolism.
 *
 * Minimum lethal dose of *pure* EG: dog ≈ 4.4 mL/kg, cat ≈ 1.5 mL/kg
 * (Merck Veterinary Manual). Because the margin is so small and onset rapid,
 * any meaningful ingestion is treated as an emergency.
 */
import { L, type ToxinResult, type ToxSpecies } from '../../types/toxins';
import type { RiskLevel } from '../../components/gauges';

const SOURCES = [
  'Thrall MA, et al. Ethylene Glycol Toxicosis. Merck/MSD Veterinary Manual, 2023.',
  'ASPCA Animal Poison Control Center. Ethylene glycol (antifreeze) poisoning.',
  'Connally HE, Thrall MA, Hamar DW. Safety and efficacy of high-dose fomepizole for ethylene glycol-intoxicated cats. J Vet Emerg Crit Care. 2010;20(2):191–206.',
];

/** Minimum lethal dose of pure ethylene glycol (mL/kg). */
function minLethal(species: ToxSpecies): number {
  return species === 'cat' ? 1.5 : 4.4;
}

export interface EthyleneGlycolInput {
  species: ToxSpecies;
  weightKg: number;
  /** Volume of product ingested, mL. */
  mlProduct: number;
  /** Ethylene-glycol concentration of the product, percent (antifreeze ≈ 95). */
  percentEg: number;
}

export function computeEthyleneGlycol(input: EthyleneGlycolInput): ToxinResult {
  const mlEg = input.mlProduct * (input.percentEg / 100);
  const mlEgPerKg = mlEg / input.weightKg;
  const mld = minLethal(input.species);
  const ratio = mlEgPerKg / mld;

  // Practically there is no "safe" oral dose — even a fraction of the MLD is
  // an emergency given the time-critical antidote window.
  let level: RiskLevel;
  if (ratio < 0.25) level = 'moderate';
  else if (ratio < 0.5) level = 'severe';
  else level = 'critical';

  const fraction = Math.min(1, ratio);

  return {
    level,
    fraction,
    doseLabel: `${mlEgPerKg.toFixed(2)} mL/kg`,
    doseSubLabel: L('אתילן גליקול טהור למשקל גוף', 'pure ethylene glycol per body weight'),
    bandLabel: L('חירום', 'Emergency'),
    signs: L(
      'שלב מוקדם (30 דק׳–12 ש׳): "שכרות", אטקסיה, הקאות, צמא ושתן מרובים. שלב מאוחר (12–72 ש׳): אי-ספיקת כליות חריפה (אוליגוריה/אנוריה), דיכאון, פרכוסים.',
      'Early (30 min–12 h): "drunkenness", ataxia, vomiting, marked thirst/urination. Late (12–72 h): acute kidney injury (oliguria/anuria), depression, seizures.',
    ),
    action: L(
      'חירום מיידי — אל תמתין/י לסימנים. אנטידוט (פומפיזול, או אתנול) יעיל רק מוקדם: עד ~3 שעות בחתול, ~8 שעות בכלב. נוזלים IV, תיקון חמצת, וניטור תפקוד כליות.',
      'Immediate emergency — do not wait for signs. The antidote (fomepizole, or ethanol) only works early: up to ~3 h in cats, ~8 h in dogs. IV fluids, correct acidosis, monitor renal function.',
    ),
    decon: L(
      'הספיגה מהירה מאוד (שיא בדם ~1–3 שעות), לכן הזמן קריטי. הקאה יזומה רק אם נאכל ממש לאחרונה; פחם פעיל קושר אתילן גליקול בצורה גרועה.',
      'Absorption is very rapid (peak ~1–3 h), so time is critical. Induce emesis only if very recent; activated charcoal binds ethylene glycol poorly.',
    ),
    context: L(
      'מינון קטלני מינימלי של EG טהור: כלב ~4.4, חתול ~1.5 מ"ל/ק"ג. נוזל קירור רכב מכיל ~95% EG. אפילו כמות קטנה מסוכנת — במיוחד לחתולים.',
      'Minimum lethal dose of pure EG: dog ~4.4, cat ~1.5 mL/kg. Automotive antifreeze is ~95% EG. Even a small amount is dangerous — especially to cats.',
    ),
    emergency: true,
    stats: [
      { label: L('EG טהור שנאכל', 'Pure EG ingested'), value: `${mlEg.toFixed(1)} mL` },
      { label: L('EG/ק"ג', 'EG/kg'), value: `${mlEgPerKg.toFixed(2)} mL/kg` },
      { label: L('אחוז ממנה קטלנית', '% of lethal dose'), value: `${(ratio * 100).toFixed(0)}%` },
    ],
    sources: SOURCES,
  };
}
