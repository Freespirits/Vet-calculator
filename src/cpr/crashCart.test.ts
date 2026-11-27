import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  CART_DRUG_IDS,
  parseCrashCart,
  withCartStrength,
  loadCrashCart,
  saveCrashCart,
  CRASH_CART_STORAGE_KEY,
} from './crashCart';

/** Minimal in-memory Storage so the persistence contract is tested without the browser. */
function memoryStorage(initial: Record<string, string> = {}): Storage {
  const entries = new Map(Object.entries(initial));
  return {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => void entries.set(key, value),
    removeItem: (key) => void entries.delete(key),
    clear: () => entries.clear(),
    key: () => null,
    get length() {
      return entries.size;
    },
  };
}

afterEach(() => vi.restoreAllMocks());

describe('crash cart drugs', () => {
  it('lists drugs drawn from a vial, and not fluids, ventilation or fixed-strength calcium', () => {
    expect(CART_DRUG_IDS).toContain('epinephrine');
    expect(CART_DRUG_IDS).toContain('sodium_bicarbonate');
    expect(CART_DRUG_IDS).not.toContain('fluid_bolus');
    expect(CART_DRUG_IDS).not.toContain('tidal_volume');
    expect(CART_DRUG_IDS).not.toContain('calcium_gluconate');
  });
});

describe('parseCrashCart', () => {
  it('is empty when nothing was saved', () => {
    expect(parseCrashCart(null)).toEqual({});
  });

  it('keeps positive strengths for known vial drugs', () => {
    expect(parseCrashCart('{"epinephrine":1,"vasopressin":20}')).toEqual({ epinephrine: 1, vasopressin: 20 });
  });

  it('drops unknown drugs and unusable strengths', () => {
    const raw = '{"epinephrine":0,"atropine":-1,"lidocaine":"20","mystery":5,"naloxone":0.4}';
    expect(parseCrashCart(raw)).toEqual({ naloxone: 0.4 });
  });

  it('returns an empty cart and reports the problem when the saved data is corrupt', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(parseCrashCart('{not json')).toEqual({});
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0][0])).toMatch(/crash cart/i);
  });

  it('returns an empty cart and reports when the saved value is not an object', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(parseCrashCart('[1,2]')).toEqual({});
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe('withCartStrength', () => {
  it('sets a strength without touching the original cart', () => {
    const original = { epinephrine: 1 };
    expect(withCartStrength(original, 'atropine', 0.54)).toEqual({ epinephrine: 1, atropine: 0.54 });
    expect(original).toEqual({ epinephrine: 1 });
  });

  it.each([undefined, 0, -2, Number.NaN])('clears the entry for %s', (value) => {
    expect(withCartStrength({ epinephrine: 1, atropine: 0.5 }, 'atropine', value)).toEqual({ epinephrine: 1 });
  });
});

describe('load / save', () => {
  it('round-trips a cart through storage', () => {
    const storage = memoryStorage();
    saveCrashCart(storage, { epinephrine: 1, lidocaine: 20 });
    expect(loadCrashCart(storage)).toEqual({ epinephrine: 1, lidocaine: 20 });
  });

  it('removes the saved entry when the cart is emptied', () => {
    const storage = memoryStorage({ [CRASH_CART_STORAGE_KEY]: '{"epinephrine":1}' });
    saveCrashCart(storage, {});
    expect(storage.getItem(CRASH_CART_STORAGE_KEY)).toBeNull();
  });
});
