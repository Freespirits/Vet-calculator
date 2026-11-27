/**
 * Weight-based CPR sheet.
 *
 * `buildCprSheet` multiplies each cited per-kg figure in `recoverGuideline.ts`
 * by the patient's weight and returns one row per intervention:
 *   - `total`       dose for this patient (mg, U, µg, mEq or mL);
 *   - `volumeMl`    draw-up volume — present ONLY when a strength is known,
 *                   either typed into the clinic's crash cart or stated by the
 *                   guideline itself (10% calcium salts). Never guessed;
 *   - `infusion`    follow-on infusion rate (esmolol);
 *   - `applicability` whether the guideline suggests the drug for the species
 *                   (lidocaine: dogs; amiodarone: cats, alternative in dogs);
 *   - `references`  the recommendation ids it was taken from.
 *
 * `defibrillationEnergies` does the same for shock energy in joules.
 * Both throw a descriptive error for a weight that is not a positive number.
 */
import type { LocalizedText } from '../types/toxins';
import type { Species } from '../types';
import type { CrashCart } from './crashCart';
import {
  CPR_INTERVENTIONS,
  DEFIBRILLATION_J_PER_KG,
  type Applicability,
  type CprDoseUnit,
  type CprGroup,
  type CprIntervention,
  type CprInterventionId,
  type PerKgDose,
} from './recoverGuideline';

export interface CprPatient {
  species: Species;
  weightKg: number;
}

export type TotalUnit = 'mg' | 'U' | 'µg' | 'mEq' | 'mL';

export interface AmountRange {
  min: number;
  max?: number;
}

export interface CprInfusion {
  microgramsPerMinute: number;
  milligramsPerHour: number;
  millilitersPerHour?: number;
}

export interface CprSheetRow {
  id: CprInterventionId;
  group: CprGroup;
  name: LocalizedText;
  dosePerKg: PerKgDose;
  total: AmountRange & { unit: TotalUnit };
  volumeMl?: AmountRange;
  concentration?: { value: number; unit: string; origin: 'crash-cart' | 'guideline' };
  infusion?: CprInfusion;
  applicability: Applicability;
  timing: LocalizedText;
  note?: LocalizedText;
  references: string[];
}

const TOTAL_UNIT: Record<CprDoseUnit, TotalUnit> = {
  'mg/kg': 'mg',
  'U/kg': 'U',
  'µg/kg': 'µg',
  'mEq/kg': 'mEq',
  'mL/kg': 'mL',
};

/** Throws when the weight cannot be dosed against; the message names the value and the species. */
function assertDosableWeight(weightKg: number, context: string): void {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new RangeError(
      `CPR sheet: weight must be a positive number of kilograms, got ${weightKg} (${context}).`,
    );
  }
}

function scaleRange(range: AmountRange, factor: number): AmountRange {
  return {
    min: range.min * factor,
    ...(range.max === undefined ? {} : { max: range.max * factor }),
  };
}

function knownConcentration(intervention: CprIntervention, cart: CrashCart): CprSheetRow['concentration'] {
  if (intervention.guidelineConcentrationMgPerMl !== undefined) {
    return { value: intervention.guidelineConcentrationMgPerMl, unit: 'mg/mL', origin: 'guideline' };
  }
  const entered = cart[intervention.id];
  if (!intervention.cartUnit || entered === undefined || !(entered > 0)) return undefined;
  return { value: entered, unit: intervention.cartUnit, origin: 'crash-cart' };
}

/** A µg dose is drawn from a mg/mL vial, so express it in mg before dividing. */
function amountInVialUnits(total: AmountRange, unit: TotalUnit): AmountRange {
  return unit === 'µg' ? scaleRange(total, 1 / 1000) : total;
}

function infusionFor(
  intervention: CprIntervention,
  weightKg: number,
  concentrationMgPerMl: number | undefined,
): CprInfusion | undefined {
  const perKgPerMinute = intervention.infusionMicrogramsPerKgPerMinute;
  if (perKgPerMinute === undefined) return undefined;
  const microgramsPerMinute = perKgPerMinute * weightKg;
  const milligramsPerHour = (microgramsPerMinute * 60) / 1000;
  return {
    microgramsPerMinute,
    milligramsPerHour,
    ...(concentrationMgPerMl ? { millilitersPerHour: milligramsPerHour / concentrationMgPerMl } : {}),
  };
}

/** Draw-up volume for a total dose, or undefined when no vial strength is known. */
function volumeFor(
  total: AmountRange,
  unit: TotalUnit,
  concentration: CprSheetRow['concentration'],
): AmountRange | undefined {
  return concentration ? scaleRange(amountInVialUnits(total, unit), 1 / concentration.value) : undefined;
}

function rowFor(intervention: CprIntervention, patient: CprPatient, cart: CrashCart): CprSheetRow {
  const dosePerKg = intervention.doseBySpecies?.[patient.species] ?? intervention.dose;
  const unit = TOTAL_UNIT[dosePerKg.unit];
  const total = scaleRange(dosePerKg, patient.weightKg);
  const concentration = knownConcentration(intervention, cart);
  const volumeMl = volumeFor(total, unit, concentration);
  const { id, group, name, timing, note, references } = intervention;
  return {
    ...{ id, group, name, timing, note, references },
    dosePerKg,
    total: { ...total, unit },
    ...(volumeMl ? { volumeMl, concentration } : {}),
    infusion: infusionFor(intervention, patient.weightKg, concentration?.value),
    applicability: intervention.applicability?.[patient.species] ?? 'applies',
  };
}

export function buildCprSheet(patient: CprPatient, cart: CrashCart): CprSheetRow[] {
  assertDosableWeight(patient.weightKg, `species: ${patient.species}`);
  return CPR_INTERVENTIONS.map((intervention) => rowFor(intervention, patient, cart));
}

export interface DefibrillationEnergies {
  biphasic: { externalFirstJ: number; externalSubsequentJ: number; internalJ: Required<AmountRange> };
  monophasic: { externalJ: Required<AmountRange>; internalJ: Required<AmountRange> };
  references: readonly string[];
}

export function defibrillationEnergies(weightKg: number): DefibrillationEnergies {
  assertDosableWeight(weightKg, 'defibrillation energy');
  const { biphasic, monophasic, references } = DEFIBRILLATION_J_PER_KG;
  const perKg = (range: { min: number; max: number }) =>
    ({ min: roundJoules(range.min * weightKg), max: roundJoules(range.max * weightKg) });
  return {
    biphasic: {
      externalFirstJ: roundJoules(biphasic.externalFirst * weightKg),
      externalSubsequentJ: roundJoules(biphasic.externalSubsequent * weightKg),
      internalJ: perKg(biphasic.internal),
    },
    monophasic: { externalJ: perKg(monophasic.external), internalJ: perKg(monophasic.internal) },
    references,
  };
}

/** Joules to one decimal — removes binary floating-point noise (0.2 × 10 = 2.0000000000000004). */
function roundJoules(joules: number): number {
  return Math.round(joules * 10) / 10;
}

/**
 * Human-readable amount: whole numbers from 100 up, one decimal from 10,
 * two decimals from 1, three below 1; trailing zeros dropped.
 */
export function formatAmount(value: number): string {
  const decimals = value >= 100 ? 0 : value >= 10 ? 1 : value >= 1 ? 2 : 3;
  return String(Number(value.toFixed(decimals)));
}
