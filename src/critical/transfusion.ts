/**
 * Transfusion volume for a desired rise in packed cell volume (PCV).
 *
 * Dogs, packed red blood cells — Short JL, Diehl S, Seshadri R, Serrano S.
 * "Accuracy of formulas used to predict post-transfusion packed cell volume
 * rise in anemic dogs." J Vet Emerg Crit Care. 2012;22(4):428–434.
 * doi:10.1111/j.1476-4431.2012.00773.x. Of four published formulas tested in
 * 31 dogs, two predicted the actual rise well:
 *     volume (mL) = 1.5 × desired PCV rise (%) × body weight (kg)
 *     volume (mL) = 90 × body weight (kg) × (desired − recipient PCV) ÷ donor PCV
 * The first is always reported; the second is added when the donor PCV is given.
 *
 * Cats, whole blood — Reed N, Espadas I, Lalor SM, Kisielewicz C. "Assessment
 * of five formulae to predict post-transfusion packed cell volume in cats."
 * J Feline Med Surg. 2014;16(8):651–656. doi:10.1177/1098612X13517254. The
 * best-performing formula in 40 cats was
 *     PCV rise (%) = volume (mL) ÷ (2 × body weight in kg)
 * rearranged here to volume = 2 × desired rise × kg. The authors stress that
 * no formula was highly accurate in cats, and the result says so.
 *
 * The calculator sizes a volume only. It does not address blood typing,
 * cross-matching, rate, or whether a transfusion is indicated.
 */
import type { Species } from '../types';
import { assertInRange, assertPositive } from './validation';

export const TRANSFUSION_SOURCES = {
  dog: 'Short JL, Diehl S, Seshadri R, Serrano S. Accuracy of formulas used to predict post-transfusion packed cell volume rise in anemic dogs. J Vet Emerg Crit Care. 2012;22(4):428–434. doi:10.1111/j.1476-4431.2012.00773.x',
  cat: 'Reed N, Espadas I, Lalor SM, Kisielewicz C. Assessment of five formulae to predict post-transfusion packed cell volume in cats. J Feline Med Surg. 2014;16(8):651–656. doi:10.1177/1098612X13517254',
} as const;

const ML_PER_PERCENT_PER_KG: Record<Species, number> = { dog: 1.5, cat: 2 };
const CANINE_BLOOD_VOLUME_ML_PER_KG = 90;

export interface TransfusionInput {
  species: Species;
  weightKg: number;
  currentPcv: number;
  targetPcv: number;
  /** Donor unit PCV, %; used only for the canine donor-PCV formula. */
  donorPcv?: number;
}

export interface TransfusionResult {
  pcvRise: number;
  volumeMl: number;
  /** Dogs only, when the donor PCV is given. */
  donorFormulaVolumeMl?: number;
}

function assertTransfusionInput(input: TransfusionInput): void {
  const context = 'Transfusion volume';
  assertPositive(input.weightKg, 'body weight (kg)', context);
  assertInRange(input.currentPcv, 1, 80, 'current PCV (%)', context);
  assertInRange(input.targetPcv, 1, 80, 'target PCV (%)', context);
  if (input.targetPcv <= input.currentPcv) {
    throw new RangeError(`${context}: target PCV (${input.targetPcv}%) must be above the current PCV (${input.currentPcv}%).`);
  }
  if (input.donorPcv !== undefined) assertInRange(input.donorPcv, 10, 90, 'donor PCV (%)', context);
}

export function transfusionVolume(input: TransfusionInput): TransfusionResult {
  assertTransfusionInput(input);
  const pcvRise = input.targetPcv - input.currentPcv;
  const volumeMl = ML_PER_PERCENT_PER_KG[input.species] * pcvRise * input.weightKg;
  const useDonorFormula = input.species === 'dog' && input.donorPcv !== undefined;
  return {
    pcvRise,
    volumeMl,
    ...(useDonorFormula
      ? { donorFormulaVolumeMl: (CANINE_BLOOD_VOLUME_ML_PER_KG * input.weightKg * pcvRise) / (input.donorPcv as number) }
      : {}),
  };
}
