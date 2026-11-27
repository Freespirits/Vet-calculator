import { describe, it, expect } from 'vitest';
import { shockIndex } from './shockIndex';
import { scoreFelineGrimace, FGS_ACTION_UNITS } from './felineGrimace';
import { transfusionVolume } from './transfusion';
import { infusionRate } from './infusion';

describe('shockIndex — heart rate ÷ systolic pressure, cut-off 1.0 (Porter 2013, dogs)', () => {
  it.each([
    [140, 100, 1.4, 'above'],
    [90, 120, 0.75, 'below'],
    [100, 100, 1, 'at'],
  ])('HR %s / SBP %s = %s → %s the cut-off', (heartRate, systolic, index, position) => {
    const result = shockIndex({ heartRatePerMinute: heartRate, systolicMmHg: systolic });
    expect(result.index).toBeCloseTo(index, 6);
    expect(result.position).toBe(position);
  });

  it.each([
    [0, 100],
    [120, 0],
    [Number.NaN, 100],
    [900, 100],
  ])('rejects heart rate %s with systolic %s', (heartRate, systolic) => {
    expect(() => shockIndex({ heartRatePerMinute: heartRate, systolicMmHg: systolic })).toThrow(/heart rate|systolic/i);
  });
});

describe('scoreFelineGrimace — sum ÷ maximum possible, cut-off above 0.39 (Evangelista 2019)', () => {
  const all = (value: 0 | 1 | 2) => Object.fromEntries(FGS_ACTION_UNITS.map((unit) => [unit.id, value]));

  it('a relaxed face scores 0', () => {
    expect(scoreFelineGrimace(all(0))).toMatchObject({ scorable: true, score: 0, aboveCutoff: false });
  });

  it('the paper’s own example, 4 out of 10, is 0.4 and above the cut-off', () => {
    const result = scoreFelineGrimace({ ...all(0), ears: 2, eyes: 2 });
    expect(result.score).toBeCloseTo(0.4, 6);
    expect(result.aboveCutoff).toBe(true);
  });

  it('leaves a unit that cannot be scored out of the maximum', () => {
    // ears 1 + eyes 1 + muzzle 1 + head 0 = 3 out of 8 (whiskers not visible)
    const result = scoreFelineGrimace({ ears: 1, eyes: 1, muzzle: 1, whiskers: null, head: 0 });
    expect(result.score).toBeCloseTo(0.375, 6);
    expect(result.aboveCutoff).toBe(false);
  });

  it('refuses to give a score when more than two units cannot be scored', () => {
    const result = scoreFelineGrimace({ ears: 2, eyes: 2, muzzle: null, whiskers: null, head: null });
    expect(result.scorable).toBe(false);
    expect(result.score).toBeUndefined();
  });

  it('is not scorable until every unit has been answered', () => {
    expect(scoreFelineGrimace({ ears: 2 }).scorable).toBe(false);
  });
});

describe('transfusionVolume — dogs, packed red cells (Short 2012)', () => {
  it('1.5 mL × desired PCV rise × kg', () => {
    const result = transfusionVolume({ species: 'dog', weightKg: 10, currentPcv: 12, targetPcv: 25 });
    expect(result.volumeMl).toBeCloseTo(195, 6); // 1.5 × 13 × 10
  });

  it('adds the donor-PCV formula when the donor PCV is known', () => {
    const result = transfusionVolume({ species: 'dog', weightKg: 10, currentPcv: 12, targetPcv: 25, donorPcv: 70 });
    expect(result.donorFormulaVolumeMl).toBeCloseTo(167.14, 2); // 90 × 10 × 13 ÷ 70
  });
});

describe('transfusionVolume — cats, whole blood (Reed 2014)', () => {
  it('2 mL × desired PCV rise × kg, and no donor-PCV formula', () => {
    const result = transfusionVolume({ species: 'cat', weightKg: 4, currentPcv: 10, targetPcv: 20, donorPcv: 40 });
    expect(result.volumeMl).toBeCloseTo(80, 6); // 2 × 10 × 4
    expect(result.donorFormulaVolumeMl).toBeUndefined();
  });
});

describe('transfusionVolume — invalid input', () => {
  it('rejects a target that is not above the current PCV', () => {
    expect(() => transfusionVolume({ species: 'dog', weightKg: 10, currentPcv: 25, targetPcv: 20 })).toThrow(/target/i);
  });

  it('rejects an impossible PCV, naming the value', () => {
    expect(() => transfusionVolume({ species: 'dog', weightKg: 10, currentPcv: 12, targetPcv: 140 })).toThrow(/140/);
  });
});

describe('infusionRate — unit arithmetic only', () => {
  it('50 µg/kg/min for 10 kg at 10 mg/mL = 30 mg/h = 3 mL/h', () => {
    const result = infusionRate({ dose: 50, doseUnit: 'µg/kg/min', weightKg: 10, concentrationMgPerMl: 10 });
    expect(result.milligramsPerHour).toBeCloseTo(30, 6);
    expect(result.millilitersPerHour).toBeCloseTo(3, 6);
  });

  it('2 mg/kg/h for 20 kg at 20 mg/mL = 40 mg/h = 2 mL/h', () => {
    const result = infusionRate({ dose: 2, doseUnit: 'mg/kg/h', weightKg: 20, concentrationMgPerMl: 20 });
    expect(result.milligramsPerHour).toBeCloseTo(40, 6);
    expect(result.millilitersPerHour).toBeCloseTo(2, 6);
  });

  it('3 µg/kg/h for 5 kg at 0.05 mg/mL = 0.015 mg/h = 0.3 mL/h', () => {
    const result = infusionRate({ dose: 3, doseUnit: 'µg/kg/h', weightKg: 5, concentrationMgPerMl: 0.05 });
    expect(result.milligramsPerHour).toBeCloseTo(0.015, 9);
    expect(result.millilitersPerHour).toBeCloseTo(0.3, 6);
  });

  it('rejects a zero concentration, naming the field', () => {
    expect(() => infusionRate({ dose: 2, doseUnit: 'mg/kg/h', weightKg: 20, concentrationMgPerMl: 0 })).toThrow(/concentration/i);
  });
});
