/**
 * Shock index for dogs: heart rate ÷ systolic blood pressure.
 *
 * Source: Porter AE, Rozanski EA, Sharp CR, Dixon KL, Price LL, Shaw SP.
 * "Evaluation of the shock index in dogs presenting as emergencies."
 * J Vet Emerg Crit Care. 2013;23(5):538–544. doi:10.1111/vec.12076
 *
 * What the study found (68 healthy dogs, 18 emergency dogs judged to be in
 * shock, 19 judged not to be): median index 1.37 in shock, 0.73 in emergency
 * dogs not in shock and 0.78 in healthy dogs. A cut-off of 1.0 separated
 * shock from healthy dogs with 90% sensitivity and 89% specificity, and shock
 * from non-shock emergencies with 89% sensitivity and 95% specificity.
 *
 * The function reports the index and whether it is below, at or above 1.0.
 * The abstract does not say which side the value 1.0 itself belongs to, so it
 * is reported as "at" rather than guessed. Dogs only: no feline data are cited.
 */
import { assertInRange } from './validation';

export const SHOCK_INDEX_CUTOFF = 1;

export const SHOCK_INDEX_SOURCE =
  'Porter AE, Rozanski EA, Sharp CR, Dixon KL, Price LL, Shaw SP. Evaluation of the shock index in dogs presenting as emergencies. J Vet Emerg Crit Care. 2013;23(5):538–544. doi:10.1111/vec.12076';

export interface ShockIndexResult {
  index: number;
  position: 'below' | 'at' | 'above';
}

export function shockIndex(input: { heartRatePerMinute: number; systolicMmHg: number }): ShockIndexResult {
  assertInRange(input.heartRatePerMinute, 20, 400, 'heart rate (per minute)', 'Shock index');
  assertInRange(input.systolicMmHg, 20, 350, 'systolic pressure (mm Hg)', 'Shock index');
  const index = input.heartRatePerMinute / input.systolicMmHg;
  const position = index > SHOCK_INDEX_CUTOFF ? 'above' : index < SHOCK_INDEX_CUTOFF ? 'below' : 'at';
  return { index, position };
}
