/**
 * Constant-rate infusion — unit arithmetic only.
 *
 *     drug per hour (mg/h) = dose rate × body weight, converted to mg and hours
 *     pump rate (mL/h)     = drug per hour ÷ concentration in the syringe or bag (mg/mL)
 *
 * This module deliberately contains no clinical figure: no drug list, no dose
 * range and no dilution recipe. The clinician supplies the dose rate from
 * their own formulary and the concentration they have actually prepared, and
 * the function converts units. Every input must be a positive number.
 */
import { assertPositive } from './validation';

export type InfusionDoseUnit = 'µg/kg/min' | 'µg/kg/h' | 'mg/kg/h';

export const INFUSION_DOSE_UNITS: InfusionDoseUnit[] = ['µg/kg/min', 'µg/kg/h', 'mg/kg/h'];

/** Multiplier that turns one unit of the dose rate into mg per kg per hour. */
const TO_MG_PER_KG_PER_HOUR: Record<InfusionDoseUnit, number> = {
  'µg/kg/min': 60 / 1000,
  'µg/kg/h': 1 / 1000,
  'mg/kg/h': 1,
};

export interface InfusionInput {
  dose: number;
  doseUnit: InfusionDoseUnit;
  weightKg: number;
  concentrationMgPerMl: number;
}

export interface InfusionResult {
  milligramsPerHour: number;
  millilitersPerHour: number;
}

export function infusionRate(input: InfusionInput): InfusionResult {
  const context = 'Infusion rate';
  assertPositive(input.dose, `dose rate (${input.doseUnit})`, context);
  assertPositive(input.weightKg, 'body weight (kg)', context);
  assertPositive(input.concentrationMgPerMl, 'concentration (mg/mL)', context);
  const milligramsPerHour = input.dose * TO_MG_PER_KG_PER_HOUR[input.doseUnit] * input.weightKg;
  return { milligramsPerHour, millilitersPerHour: milligramsPerHour / input.concentrationMgPerMl };
}
