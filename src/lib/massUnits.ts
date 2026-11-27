/**
 * Mass-unit conversion for amounts typed into the toxin calculators.
 *
 * Owners enter how much was eaten in grams or (avoirdupois) ounces; every dose
 * is computed from grams. An amount that is empty, not a number, zero or
 * negative means "nothing entered yet" and converts to 0 g, which the
 * calculators treat as no result to show.
 */

/** Grams in one avoirdupois ounce. */
export const GRAMS_PER_OUNCE = 28.3495;

export type MassUnit = 'g' | 'oz';

/** Converts a typed amount in the chosen unit to grams (0 when not a positive number). */
export function gramsFrom(amount: string, unit: MassUnit): number {
  const parsedAmount = parseFloat(amount);
  if (!isFinite(parsedAmount) || parsedAmount <= 0) return 0;
  return unit === 'oz' ? parsedAmount * GRAMS_PER_OUNCE : parsedAmount;
}
