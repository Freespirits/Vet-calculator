import { describe, it, expect } from 'vitest';
import { buildCprSheet, defibrillationEnergies, formatAmount, type CprSheetRow } from './cprSheet';
import type { CrashCart } from './crashCart';

/** Every expected number below is worked by hand from RECOVER 2024, Table 2 / Table 1. */
function rowOf(rows: CprSheetRow[], id: string): CprSheetRow {
  const found = rows.find((row) => row.id === id);
  if (!found) throw new Error(`row "${id}" missing; got: ${rows.map((row) => row.id).join(', ')}`);
  return found;
}

const DOG_10KG = { species: 'dog', weightKg: 10 } as const;
const CAT_4KG = { species: 'cat', weightKg: 4 } as const;
const EMPTY_CART: CrashCart = {};

describe('buildCprSheet — total dose for the patient weight', () => {
  it.each([
    ['epinephrine', 0.1, undefined, 'mg'], // 0.01 mg/kg × 10
    ['vasopressin', 8, undefined, 'U'], // 0.8 U/kg × 10
    ['atropine', 0.4, 0.54, 'mg'], // 0.04–0.054 mg/kg × 10
    ['lidocaine', 20, undefined, 'mg'], // 2 mg/kg × 10
    ['esmolol', 5, undefined, 'mg'], // 0.5 mg/kg × 10
    ['naloxone', 0.4, undefined, 'mg'], // 0.04 mg/kg × 10
    ['atipamezole', 1000, undefined, 'µg'], // 100 µg/kg × 10
    ['flumazenil', 0.1, undefined, 'mg'], // 0.01 mg/kg × 10
    ['sodium_bicarbonate', 10, undefined, 'mEq'], // 1 mEq/kg × 10
    ['calcium_gluconate', 500, undefined, 'mg'], // 50 mg/kg × 10
    ['calcium_chloride', 150, undefined, 'mg'], // 15 mg/kg × 10
    ['fluid_bolus', 200, undefined, 'mL'], // dog 20 mL/kg × 10
    ['tidal_volume', 100, undefined, 'mL'], // 10 mL/kg × 10
  ])('10 kg dog: %s = %s–%s %s', (id, min, max, unit) => {
    const row = rowOf(buildCprSheet(DOG_10KG, EMPTY_CART), id);
    expect(row.total.min).toBeCloseTo(min, 6);
    if (max === undefined) expect(row.total.max).toBeUndefined();
    else expect(row.total.max).toBeCloseTo(max, 6);
    expect(row.total.unit).toBe(unit);
  });

  it('cat fluid bolus uses the feline 10–15 mL/kg range', () => {
    const row = rowOf(buildCprSheet(CAT_4KG, EMPTY_CART), 'fluid_bolus');
    expect(row.total).toMatchObject({ min: 40, max: 60, unit: 'mL' });
  });

  it('esmolol carries the follow-on infusion: 50 µg/kg/min = 30 mg/h at 10 kg', () => {
    const row = rowOf(buildCprSheet(DOG_10KG, EMPTY_CART), 'esmolol');
    expect(row.infusion?.microgramsPerMinute).toBeCloseTo(500, 6);
    expect(row.infusion?.milligramsPerHour).toBeCloseTo(30, 6);
  });
});

describe('buildCprSheet — volume is never invented', () => {
  it('shows no volume when the clinic has not entered a vial strength', () => {
    const row = rowOf(buildCprSheet(DOG_10KG, EMPTY_CART), 'epinephrine');
    expect(row.volumeMl).toBeUndefined();
    expect(row.concentration).toBeUndefined();
  });

  it('computes volume from the clinic-entered vial strength', () => {
    const cart: CrashCart = { epinephrine: 1, vasopressin: 20 };
    const rows = buildCprSheet(DOG_10KG, cart);
    expect(rowOf(rows, 'epinephrine').volumeMl?.min).toBeCloseTo(0.1, 6); // 0.1 mg ÷ 1 mg/mL
    expect(rowOf(rows, 'vasopressin').volumeMl?.min).toBeCloseTo(0.4, 6); // 8 U ÷ 20 U/mL
    expect(rowOf(rows, 'epinephrine').concentration?.origin).toBe('crash-cart');
  });

  it('carries a dose range through to a volume range', () => {
    const row = rowOf(buildCprSheet(DOG_10KG, { atropine: 0.54 }), 'atropine');
    expect(row.volumeMl?.min).toBeCloseTo(0.7407, 3); // 0.4 mg ÷ 0.54 mg/mL
    expect(row.volumeMl?.max).toBeCloseTo(1.0, 6); // 0.54 mg ÷ 0.54 mg/mL
  });

  it('converts a µg dose against a mg/mL vial', () => {
    const row = rowOf(buildCprSheet(DOG_10KG, { atipamezole: 5 }), 'atipamezole');
    expect(row.volumeMl?.min).toBeCloseTo(0.2, 6); // 1000 µg = 1 mg ÷ 5 mg/mL
  });

  it('uses the strength the guideline itself states for 10% calcium salts', () => {
    const rows = buildCprSheet(DOG_10KG, EMPTY_CART);
    expect(rowOf(rows, 'calcium_gluconate').volumeMl?.min).toBeCloseTo(5, 6); // 500 mg ÷ 100 mg/mL
    expect(rowOf(rows, 'calcium_chloride').volumeMl?.min).toBeCloseTo(1.5, 6); // 150 mg ÷ 100 mg/mL
    expect(rowOf(rows, 'calcium_gluconate').concentration?.origin).toBe('guideline');
  });

  it('computes the esmolol infusion in mL/h once a vial strength is known', () => {
    const row = rowOf(buildCprSheet(DOG_10KG, { esmolol: 10 }), 'esmolol');
    expect(row.infusion?.millilitersPerHour).toBeCloseTo(3, 6); // 30 mg/h ÷ 10 mg/mL
  });
});

describe('buildCprSheet — species differences (ALS-01, ALS-02)', () => {
  it('lidocaine is suggested for dogs and not suggested for cats', () => {
    expect(rowOf(buildCprSheet(DOG_10KG, EMPTY_CART), 'lidocaine').applicability).toBe('applies');
    expect(rowOf(buildCprSheet(CAT_4KG, EMPTY_CART), 'lidocaine').applicability).toBe('not-suggested');
  });

  it('amiodarone is the cat antiarrhythmic and only an alternative in dogs', () => {
    const cat = rowOf(buildCprSheet(CAT_4KG, EMPTY_CART), 'amiodarone');
    expect(cat.applicability).toBe('applies');
    expect(cat.total.min).toBeCloseTo(20, 6); // 5 mg/kg × 4
    expect(rowOf(buildCprSheet(DOG_10KG, EMPTY_CART), 'amiodarone').applicability).toBe('alternative');
  });
});

describe('buildCprSheet — every figure is traceable', () => {
  it('each row names the guideline recommendation it came from', () => {
    for (const row of buildCprSheet(DOG_10KG, EMPTY_CART)) {
      expect(row.references.length, `row ${row.id} has no reference`).toBeGreaterThan(0);
    }
  });
});

describe('buildCprSheet — invalid input fails loudly', () => {
  it.each([0, -3, Number.NaN, Number.POSITIVE_INFINITY])('rejects weight %s', (weightKg) => {
    expect(() => buildCprSheet({ species: 'dog', weightKg }, EMPTY_CART)).toThrow(/weight/i);
  });

  it('names the offending value and species in the error', () => {
    expect(() => buildCprSheet({ species: 'cat', weightKg: -2 }, EMPTY_CART)).toThrow(/-2.*cat|cat.*-2/);
  });
});

describe('defibrillationEnergies', () => {
  it('biphasic external: 2 J/kg first shock, doubled to 4 J/kg afterwards (ALS-12)', () => {
    const energy = defibrillationEnergies(10);
    expect(energy.biphasic.externalFirstJ).toBe(20);
    expect(energy.biphasic.externalSubsequentJ).toBe(40);
  });

  it('reports the Table 2 ranges for the other paddle/waveform combinations', () => {
    const energy = defibrillationEnergies(10);
    expect(energy.biphasic.internalJ).toEqual({ min: 2, max: 4 }); // 0.2–0.4 J/kg
    expect(energy.monophasic.externalJ).toEqual({ min: 40, max: 60 }); // 4–6 J/kg
    expect(energy.monophasic.internalJ).toEqual({ min: 5, max: 10 }); // 0.5–1 J/kg
  });

  it('rejects a non-positive weight', () => {
    expect(() => defibrillationEnergies(0)).toThrow(/weight/i);
  });
});

describe('formatAmount', () => {
  it.each([
    [0.1, '0.1'],
    [0.7407, '0.741'],
    [0.03, '0.03'],
    [1.5, '1.5'],
    [12.34, '12.3'],
    [20, '20'],
    [150.4, '150'],
  ])('%s → %s', (value, text) => {
    expect(formatAmount(value)).toBe(text);
  });
});
