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
 */

import type {
  CalculationInput,
  CalculationResult,
  CalculationBreakdown,
  CalculationWarning,
  DoseUnit,
  ConcentrationUnit,
} from '../types';

/**
 * Conversion factors for unit normalization
 * Base unit: mg for doses, mg/mL for concentrations
 */
const DOSE_CONVERSION_TO_MG: Record<DoseUnit, number> = {
  'mg/kg': 1,
  'mcg/kg': 0.001,
  'IU/kg': 1,
  'mL/kg': 1,
};

const CONCENTRATION_CONVERSION_TO_MG_ML: Record<ConcentrationUnit, number> = {
  'mg/mL': 1,
  'mcg/mL': 0.001,
  'IU/mL': 1,
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
 * Rounds volume to 2 decimal places (0.01 mL precision)
 */
export function roundVolume(volume: number): number {
  if (volume <= 0) {
    return 0;
  }
  return Math.round(volume * 100) / 100;
}

/**
 * Main calculation function - orchestrates the dosage calculation
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

  // Step 4: Round to 0.01 mL precision
  const roundedVolumeMl = roundVolume(rawVolumeMl);

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

  if (roundedVolume > 0 && roundedVolume < 0.05) {
    warnings.push({
      id: 'volume_very_small',
      severity: 'warning',
      message: 'Volume is very small and may be difficult to measure accurately',
      messageHe: 'הנפח קטן מאוד ועלול להיות קשה למדידה מדויקת',
    });
  }

  if (roundedVolume > 20) {
    warnings.push({
      id: 'volume_large',
      severity: 'warning',
      message: 'Volume exceeds 20 mL - consider dividing into multiple injections',
      messageHe: 'הנפח עולה על 20 מ"ל - יש לשקול חלוקה למספר הזרקות',
    });
  }

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
 */
export function areUnitsCompatible(
  doseUnit: DoseUnit,
  concentrationUnit: ConcentrationUnit
): boolean {
  if (doseUnit === 'mL/kg') {
    return true;
  }

  if (
    (doseUnit === 'mg/kg' || doseUnit === 'mcg/kg') &&
    (concentrationUnit === 'mg/mL' || concentrationUnit === 'mcg/mL')
  ) {
    return true;
  }

  if (doseUnit === 'IU/kg' && concentrationUnit === 'IU/mL') {
    return true;
  }

  return false;
}

/**
 * Formats volume for display (2 decimal places)
 */
export function formatVolume(volumeMl: number): string {
  return volumeMl.toFixed(2);
}
