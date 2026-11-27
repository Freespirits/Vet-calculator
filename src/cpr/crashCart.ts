/**
 * "Crash cart" — the vial strengths a clinic actually stocks.
 *
 * Draw-up volumes in Code Blue are computed ONLY from strengths the clinic
 * typed in here (once; kept in this browser's localStorage). Nothing is
 * pre-filled: vial strengths differ between countries and manufacturers, and
 * the RECOVER guideline lists doses, not concentrations. Until a strength is
 * entered, the sheet shows the dose in mg / U / mEq and no mL.
 *
 * Saved data is validated on the way back in: unknown drugs and strengths
 * that are not positive numbers are dropped, and corrupt data yields an empty
 * cart plus a console warning (never a crash in the middle of a code).
 */
import { CPR_INTERVENTIONS, type CartUnit, type CprInterventionId } from './recoverGuideline';

/** Strength per drug, expressed in that drug's `cartUnit`. */
export type CrashCart = Partial<Record<CprInterventionId, number>>;

export type { CartUnit };

export const CRASH_CART_STORAGE_KEY = 'vh.cpr.crashCart';

/** Drugs whose draw-up volume depends on a clinic-entered vial strength. */
export const CART_DRUG_IDS: CprInterventionId[] = CPR_INTERVENTIONS.filter(
  (intervention) => intervention.cartUnit !== undefined,
).map((intervention) => intervention.id);

function isUsableStrength(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function warnCorruptCart(reason: string, raw: string): void {
  console.warn(`Crash cart: saved vial strengths ignored (${reason}). Saved value: ${raw.slice(0, 120)}`);
}

export function parseCrashCart(raw: string | null): CrashCart {
  if (raw === null) return {};
  let saved: unknown;
  try {
    saved = JSON.parse(raw);
  } catch (error) {
    warnCorruptCart(`not valid JSON: ${(error as Error).message}`, raw);
    return {};
  }
  if (typeof saved !== 'object' || saved === null || Array.isArray(saved)) {
    warnCorruptCart('expected an object of drug → strength', raw);
    return {};
  }
  return pickUsableStrengths(saved as Record<string, unknown>);
}

function pickUsableStrengths(saved: Record<string, unknown>): CrashCart {
  const cart: CrashCart = {};
  for (const drugId of CART_DRUG_IDS) {
    const strength = saved[drugId];
    if (isUsableStrength(strength)) cart[drugId] = strength;
  }
  return cart;
}

/** New cart with the strength set; an empty, zero or invalid strength clears the entry. */
export function withCartStrength(
  cart: CrashCart,
  drugId: CprInterventionId,
  strength: number | undefined,
): CrashCart {
  const next: CrashCart = { ...cart };
  if (isUsableStrength(strength)) next[drugId] = strength;
  else delete next[drugId];
  return next;
}

export function loadCrashCart(storage: Storage): CrashCart {
  return parseCrashCart(storage.getItem(CRASH_CART_STORAGE_KEY));
}

export function saveCrashCart(storage: Storage, cart: CrashCart): void {
  if (Object.keys(cart).length === 0) storage.removeItem(CRASH_CART_STORAGE_KEY);
  else storage.setItem(CRASH_CART_STORAGE_KEY, JSON.stringify(cart));
}
