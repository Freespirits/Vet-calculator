/**
 * The toxin calculators let the owner enter an eaten amount in grams or
 * ounces. Everything downstream (mg/kg, risk bands) is computed from grams, so
 * a wrong conversion here would shift every dose in five calculators.
 */
import { describe, expect, it } from 'vitest';
import { GRAMS_PER_OUNCE, gramsFrom } from './massUnits';

describe('gramsFrom', () => {
  it('returns grams unchanged', () => {
    expect(gramsFrom('50', 'g')).toBe(50);
    expect(gramsFrom('12.5', 'g')).toBe(12.5);
  });

  it('converts avoirdupois ounces to grams', () => {
    expect(GRAMS_PER_OUNCE).toBe(28.3495);
    expect(gramsFrom('1', 'oz')).toBeCloseTo(28.3495, 4);
    expect(gramsFrom('3.5', 'oz')).toBeCloseTo(99.22325, 4);
  });

  it('treats an empty, non-numeric, zero or negative amount as nothing eaten', () => {
    for (const amount of ['', 'abc', '0', '-4', 'Infinity']) {
      expect(gramsFrom(amount, 'g'), `amount "${amount}"`).toBe(0);
      expect(gramsFrom(amount, 'oz'), `amount "${amount}" oz`).toBe(0);
    }
  });
});
