import { describe, it, expect } from 'vitest';
import { computeChocolate, chocolateTmPerG, OZ_TO_G } from './calc';

describe('chocolate / methylxanthine (VIN monograph)', () => {
  it('dark chocolate % cacao uses (%/100 × 14.11) mg/g', () => {
    expect(chocolateTmPerG('dark', 70)).toBeCloseTo(9.877, 2);
    expect(chocolateTmPerG('dark', 86)).toBeCloseTo(12.13, 2);
  });

  it('100 g of 70% dark in a 10 kg dog ≈ 98.8 mg/kg → severe band', () => {
    const r = computeChocolate({ species: 'dog', weightKg: 10, grams: 100, typeId: 'dark', darkPercent: 70 });
    expect(r.doseLabel).toBe('98.8 mg/kg');
    expect(r.level).toBe('severe');
    expect(r.emergency).toBe(true);
    // theobromine = TM / 1.1
    expect(r.stats?.[0].value).toBe('89.8 mg/kg');
  });

  it('50 g milk chocolate in a 10 kg dog is minimal (<20 mg/kg)', () => {
    const r = computeChocolate({ species: 'dog', weightKg: 10, grams: 50, typeId: 'milk', darkPercent: 0 });
    expect(r.level).toBe('minimal');
    expect(r.emergency).toBe(false);
  });

  it('cats hit higher severity at the same dose (lower thresholds)', () => {
    // 33 g × 5.29 / 5 kg ≈ 34.9 mg/kg → dog mild (20–40), cat moderate (30–50)
    const dog = computeChocolate({ species: 'dog', weightKg: 5, grams: 33, typeId: 'semisweet', darkPercent: 0 });
    const cat = computeChocolate({ species: 'cat', weightKg: 5, grams: 33, typeId: 'semisweet', darkPercent: 0 });
    expect(dog.level).toBe('mild');
    expect(cat.level).toBe('moderate');
  });

  it('ounce conversion constant is correct', () => {
    expect(OZ_TO_G).toBeCloseTo(28.3495, 3);
  });
});
