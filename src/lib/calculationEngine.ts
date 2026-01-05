/**
 * Veterinary Drug Dosage Calculation Engine
 *
 * Pure functions for calculating drug dosages.
 * All calculations are stateless and deterministic.
 *
 * Clinical Assumptions:
 * - Weight is in kilograms (kg)
 * - Doses are typically mg/kg, mcg/kg, or IU/kg
 * - Output volume is in milliliters (mL)
 * - Rounding is applied to make clinical measurement practical
 */

import type {
  CalculationInput,
  CalculationResult,
  CalculationBreakdown,
  CalculationWarning,
  RoundingPrecision,
  DoseUnit,
  ConcentrationUnit,
} from '../types';

/**
 * Conversion factors for unit normalization
 * Base unit: mg for doses, mg/mL for concentrations
 */
const DOSE_CONVERSION_TO_MG: Record<DoseUnit, number> = {
  'mg/kg': 1,
  'mcg/kg': 0.001,    // 1 mcg = 0.001 mg
  'IU/kg': 1,         // IU treated as-is (drug specific)
  'mL/kg': 1,         // Direct volume - special handling
};

const CONCENTRATION_CONVERSION_TO_MG_ML: Record<ConcentrationUnit, number> = {
  'mg/mL': 1,
  'mcg/mL': 0.001,    // 1 mcg = 0.001 mg
  'IU/mL': 1,         // IU treated as-is
};

/**
 * Normalizes dose to mg based on unit
 */
export function normalizeDoseToMg(dose: number, unit: DoseUnit): number {
  return dose * DOSE_CONVERSION_TO_MG[unit];
}

/**
 * Normalizes concentration to mg/mL based on unit
 */
export function normalizeConcentrationToMgMl(
  concentration: number,
  unit: ConcentrationUnit
): number {
  return concentration * CONCENTRATION_CONVERSION_TO_MG_ML[unit];
}

/**
 * Calculates total required dose based on weight and dose per kg
 *
 * Formula: total_dose = weight_kg × dose_per_kg
 */
export function calculateTotalDose(weightKg: number, dosePerKg: number): number {
  if (weightKg <= 0 || dosePerKg <= 0) {
    return 0;
  }
  return weightKg * dosePerKg;
}

/**
 * Converts total dose to volume based on concentration
 *
 * Formula: volume_mL = total_dose_mg / concentration_mg_per_mL
 */
export function calculateVolume(
  totalDoseMg: number,
  concentrationMgPerMl: number
): number {
  if (concentrationMgPerMl <= 0) {
    return 0;
  }
  return totalDoseMg / concentrationMgPerMl;
}

/**
 * Rounds volume to specified precision for practical clinical use
 *
 * Precision options:
 * - 0.01 mL: For insulin syringes, precise dosing
 * - 0.05 mL: Common syringe markings
 * - 0.1 mL: Standard syringe increments
 */
export function roundVolume(volume: number, precision: RoundingPrecision): number {
  if (volume <= 0) {
    return 0;
  }
  const factor = 1 / precision;
  return Math.round(volume * factor) / factor;
}

/**
 * Main calculation function - orchestrates the dosage calculation
 *
 * This is a pure function that takes input and returns a result
 * with no side effects.
 */
export function calculateDosage(input: CalculationInput): CalculationResult {
  const warnings: CalculationWarning[] = [];

  // Step 1: Normalize units to base units
  const normalizedDose = normalizeDoseToMg(input.dosePerKg, input.doseUnit);
  const normalizedConcentration = normalizeConcentrationToMgMl(
    input.concentration,
    input.concentrationUnit
  );

  // Step 2: Calculate total dose
  const totalDose = calculateTotalDose(input.weightKg, normalizedDose);

  // Step 3: Handle special case for mL/kg (direct volume dosing)
  let rawVolumeMl: number;
  if (input.doseUnit === 'mL/kg') {
    rawVolumeMl = input.weightKg * input.dosePerKg;
  } else {
    rawVolumeMl = calculateVolume(totalDose, normalizedConcentration);
  }

  // Step 4: Round to clinical precision
  const roundedVolumeMl = roundVolume(rawVolumeMl, input.roundingPrecision);

  // Step 5: Generate warnings
  warnings.push(...generateVolumeWarnings(rawVolumeMl, roundedVolumeMl));
  warnings.push(...generateDoseWarnings(input.dosePerKg, input.doseUnit, input.species));

  // Build calculation breakdown for transparency
  const breakdown: CalculationBreakdown = {
    weightKg: input.weightKg,
    dosePerKg: input.dosePerKg,
    doseUnit: input.doseUnit,
    totalDose: totalDose,
    concentration: input.concentration,
    concentrationUnit: input.concentrationUnit,
    rawVolumeMl: rawVolumeMl,
    roundedVolumeMl: roundedVolumeMl,
    roundingPrecision: input.roundingPrecision,
  };

  return {
    success: true,
    volumeMl: roundedVolumeMl,
    totalDose: totalDose,
    totalDoseUnit: input.doseUnit.replace('/kg', ''),
    dosePerKg: input.dosePerKg,
    doseUnit: input.doseUnit,
    warnings,
    calculationBreakdown: breakdown,
  };
}

/**
 * Generates warnings related to calculated volume
 */
function generateVolumeWarnings(
  rawVolume: number,
  roundedVolume: number
): CalculationWarning[] {
  const warnings: CalculationWarning[] = [];

  // Warn if volume is very small (may be difficult to measure accurately)
  if (roundedVolume > 0 && roundedVolume < 0.05) {
    warnings.push({
      id: 'volume_very_small',
      severity: 'warning',
      message: 'Volume is very small and may be difficult to measure accurately',
      messageHe: 'הנפח קטן מאוד ועלול להיות קשה למדידה מדויקת',
    });
  }

  // Warn if volume is impractically large
  if (roundedVolume > 20) {
    warnings.push({
      id: 'volume_large',
      severity: 'warning',
      message: 'Volume exceeds 20 mL - consider dividing into multiple injections',
      messageHe: 'הנפח עולה על 20 מ"ל - יש לשקול חלוקה למספר הזרקות',
    });
  }

  // Warn if rounding caused significant change
  const roundingDifference = Math.abs(rawVolume - roundedVolume);
  const roundingPercentage = rawVolume > 0 ? (roundingDifference / rawVolume) * 100 : 0;

  if (roundingPercentage > 10 && roundedVolume > 0) {
    warnings.push({
      id: 'significant_rounding',
      severity: 'info',
      message: `Rounding adjusted volume by ${roundingPercentage.toFixed(1)}%`,
      messageHe: `העיגול שינה את הנפח ב-${roundingPercentage.toFixed(1)}%`,
    });
  }

  return warnings;
}

/**
 * Generates warnings related to dose values
 */
function generateDoseWarnings(
  dosePerKg: number,
  doseUnit: DoseUnit,
  _species: string
): CalculationWarning[] {
  const warnings: CalculationWarning[] = [];

  // Generic high dose warning (drug-specific limits should come from drug database)
  if (doseUnit === 'mg/kg' && dosePerKg > 50) {
    warnings.push({
      id: 'high_dose_generic',
      severity: 'warning',
      message: 'Dose appears high - please verify prescription',
      messageHe: 'המינון נראה גבוה - יש לאמת את המרשם',
    });
  }

  return warnings;
}

/**
 * Validates that units are compatible for calculation
 * Returns true if the units can be used together
 */
export function areUnitsCompatible(
  doseUnit: DoseUnit,
  concentrationUnit: ConcentrationUnit
): boolean {
  // mL/kg doesn't need concentration
  if (doseUnit === 'mL/kg') {
    return true;
  }

  // mg-based units work together
  if (
    (doseUnit === 'mg/kg' || doseUnit === 'mcg/kg') &&
    (concentrationUnit === 'mg/mL' || concentrationUnit === 'mcg/mL')
  ) {
    return true;
  }

  // IU units work together
  if (doseUnit === 'IU/kg' && concentrationUnit === 'IU/mL') {
    return true;
  }

  return false;
}

/**
 * Formats volume for display with appropriate decimal places
 */
export function formatVolume(volumeMl: number, precision: RoundingPrecision): string {
  const decimals = precision === 0.01 ? 2 : precision === 0.05 ? 2 : 1;
  return volumeMl.toFixed(decimals);
}
