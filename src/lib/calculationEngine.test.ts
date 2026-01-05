/**
 * Unit Tests for Calculation Engine
 *
 * Tests cover:
 * - Unit normalization
 * - Total dose calculation
 * - Volume calculation
 * - Rounding behavior
 * - Edge cases
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeDoseToMg,
  normalizeConcentrationToMgMl,
  calculateTotalDose,
  calculateVolume,
  roundVolume,
  calculateDosage,
  areUnitsCompatible,
  formatVolume,
} from './calculationEngine';
import type { CalculationInput } from '../types';

describe('normalizeDoseToMg', () => {
  it('should return same value for mg/kg', () => {
    expect(normalizeDoseToMg(10, 'mg/kg')).toBe(10);
  });

  it('should convert mcg/kg to mg/kg', () => {
    expect(normalizeDoseToMg(1000, 'mcg/kg')).toBe(1); // 1000 mcg = 1 mg
  });

  it('should handle IU/kg as-is', () => {
    expect(normalizeDoseToMg(100, 'IU/kg')).toBe(100);
  });

  it('should handle mL/kg as-is', () => {
    expect(normalizeDoseToMg(5, 'mL/kg')).toBe(5);
  });
});

describe('normalizeConcentrationToMgMl', () => {
  it('should return same value for mg/mL', () => {
    expect(normalizeConcentrationToMgMl(10, 'mg/mL')).toBe(10);
  });

  it('should convert mcg/mL to mg/mL', () => {
    expect(normalizeConcentrationToMgMl(1000, 'mcg/mL')).toBe(1);
  });

  it('should handle IU/mL as-is', () => {
    expect(normalizeConcentrationToMgMl(100, 'IU/mL')).toBe(100);
  });
});

describe('calculateTotalDose', () => {
  it('should calculate total dose correctly', () => {
    // 10 kg dog, 0.2 mg/kg dose = 2 mg total
    expect(calculateTotalDose(10, 0.2)).toBe(2);
  });

  it('should handle decimal weights', () => {
    // 5.5 kg cat, 1 mg/kg = 5.5 mg
    expect(calculateTotalDose(5.5, 1)).toBe(5.5);
  });

  it('should return 0 for zero weight', () => {
    expect(calculateTotalDose(0, 10)).toBe(0);
  });

  it('should return 0 for zero dose', () => {
    expect(calculateTotalDose(10, 0)).toBe(0);
  });

  it('should return 0 for negative values', () => {
    expect(calculateTotalDose(-5, 10)).toBe(0);
    expect(calculateTotalDose(5, -10)).toBe(0);
  });
});

describe('calculateVolume', () => {
  it('should calculate volume correctly', () => {
    // 2 mg total dose, 10 mg/mL concentration = 0.2 mL
    expect(calculateVolume(2, 10)).toBe(0.2);
  });

  it('should handle small doses', () => {
    // 0.5 mg total, 5 mg/mL = 0.1 mL
    expect(calculateVolume(0.5, 5)).toBe(0.1);
  });

  it('should return 0 for zero concentration', () => {
    expect(calculateVolume(10, 0)).toBe(0);
  });

  it('should handle large doses', () => {
    // 500 mg total, 100 mg/mL = 5 mL
    expect(calculateVolume(500, 100)).toBe(5);
  });
});

describe('roundVolume', () => {
  it('should round to 0.1 mL precision', () => {
    expect(roundVolume(0.23, 0.1)).toBe(0.2);
    expect(roundVolume(0.27, 0.1)).toBe(0.3);
    expect(roundVolume(0.25, 0.1)).toBe(0.3); // Rounding up at 0.05
  });

  it('should round to 0.05 mL precision', () => {
    expect(roundVolume(0.23, 0.05)).toBe(0.25);
    expect(roundVolume(0.27, 0.05)).toBe(0.25);
    expect(roundVolume(0.33, 0.05)).toBe(0.35);
  });

  it('should round to 0.01 mL precision', () => {
    expect(roundVolume(0.234, 0.01)).toBe(0.23);
    expect(roundVolume(0.235, 0.01)).toBe(0.24);
    expect(roundVolume(0.239, 0.01)).toBe(0.24);
  });

  it('should return 0 for zero or negative volume', () => {
    expect(roundVolume(0, 0.1)).toBe(0);
    expect(roundVolume(-1, 0.1)).toBe(0);
  });
});

describe('calculateDosage - integration tests', () => {
  const baseInput: CalculationInput = {
    species: 'dog',
    weightKg: 10,
    drugName: 'Meloxicam',
    dosePerKg: 0.2,
    doseUnit: 'mg/kg',
    concentration: 5,
    concentrationUnit: 'mg/mL',
    route: 'SC',
    roundingPrecision: 0.1,
  };

  it('should calculate correctly for standard case', () => {
    // 10 kg dog, 0.2 mg/kg Meloxicam, 5 mg/mL
    // Total dose: 10 * 0.2 = 2 mg
    // Volume: 2 / 5 = 0.4 mL
    const result = calculateDosage(baseInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.4);
    expect(result.totalDose).toBe(2);
  });

  it('should handle small cat doses', () => {
    const catInput: CalculationInput = {
      ...baseInput,
      species: 'cat',
      weightKg: 4,
      dosePerKg: 0.1,
    };

    // 4 kg cat, 0.1 mg/kg = 0.4 mg
    // Volume: 0.4 / 5 = 0.08 mL -> rounds to 0.1 mL
    const result = calculateDosage(catInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.1);
  });

  it('should handle mcg doses', () => {
    const mcgInput: CalculationInput = {
      ...baseInput,
      dosePerKg: 10,
      doseUnit: 'mcg/kg',
      concentration: 0.5,
      concentrationUnit: 'mg/mL',
    };

    // 10 kg * 10 mcg/kg = 100 mcg = 0.1 mg
    // Volume: 0.1 / 0.5 = 0.2 mL
    const result = calculateDosage(mcgInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.2);
  });

  it('should handle IU doses (insulin)', () => {
    const insulinInput: CalculationInput = {
      species: 'dog',
      weightKg: 10,
      drugName: 'Insulin',
      dosePerKg: 0.25,
      doseUnit: 'IU/kg',
      concentration: 100,
      concentrationUnit: 'IU/mL',
      route: 'SC',
      roundingPrecision: 0.01,
    };

    // 10 kg * 0.25 IU/kg = 2.5 IU
    // Volume: 2.5 / 100 = 0.025 mL
    const result = calculateDosage(insulinInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.03); // Rounded to 0.01 precision
  });

  it('should generate warning for very small volumes', () => {
    // Use values that produce a small but non-zero result
    const smallInput: CalculationInput = {
      ...baseInput,
      weightKg: 1,
      dosePerKg: 0.2,
      concentration: 10,
      roundingPrecision: 0.01,
    };

    // 1 kg * 0.2 = 0.2 mg
    // 0.2 / 10 = 0.02 mL (which is < 0.05)
    const result = calculateDosage(smallInput);

    // Should have warning about small volume
    expect(result.warnings.some(w => w.id === 'volume_very_small')).toBe(true);
  });

  it('should generate warning for large volumes', () => {
    const largeInput: CalculationInput = {
      ...baseInput,
      weightKg: 50,
      dosePerKg: 20,
      concentration: 10,
    };

    // 50 * 20 = 1000 mg
    // 1000 / 10 = 100 mL
    const result = calculateDosage(largeInput);

    expect(result.warnings.some(w => w.id === 'volume_large')).toBe(true);
  });

  it('should handle mL/kg dosing (no concentration needed)', () => {
    const fluidInput: CalculationInput = {
      species: 'dog',
      weightKg: 10,
      drugName: 'Crystalloid Fluid',
      dosePerKg: 10,
      doseUnit: 'mL/kg',
      concentration: 0, // Not used
      concentrationUnit: 'mg/mL',
      route: 'IV',
      roundingPrecision: 0.1,
    };

    // 10 kg * 10 mL/kg = 100 mL
    const result = calculateDosage(fluidInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(100);
  });
});

describe('areUnitsCompatible', () => {
  it('should allow mg/kg with mg/mL', () => {
    expect(areUnitsCompatible('mg/kg', 'mg/mL')).toBe(true);
  });

  it('should allow mcg/kg with mcg/mL', () => {
    expect(areUnitsCompatible('mcg/kg', 'mcg/mL')).toBe(true);
  });

  it('should allow mg/kg with mcg/mL (cross conversion)', () => {
    expect(areUnitsCompatible('mg/kg', 'mcg/mL')).toBe(true);
  });

  it('should allow IU/kg with IU/mL', () => {
    expect(areUnitsCompatible('IU/kg', 'IU/mL')).toBe(true);
  });

  it('should allow mL/kg with any concentration', () => {
    expect(areUnitsCompatible('mL/kg', 'mg/mL')).toBe(true);
    expect(areUnitsCompatible('mL/kg', 'IU/mL')).toBe(true);
  });

  it('should not allow incompatible units', () => {
    expect(areUnitsCompatible('IU/kg', 'mg/mL')).toBe(false);
    expect(areUnitsCompatible('mg/kg', 'IU/mL')).toBe(false);
  });
});

describe('formatVolume', () => {
  it('should format to 2 decimals for 0.01 precision', () => {
    expect(formatVolume(0.23, 0.01)).toBe('0.23');
    expect(formatVolume(1.5, 0.01)).toBe('1.50');
  });

  it('should format to 2 decimals for 0.05 precision', () => {
    expect(formatVolume(0.25, 0.05)).toBe('0.25');
    expect(formatVolume(1.15, 0.05)).toBe('1.15');
  });

  it('should format to 1 decimal for 0.1 precision', () => {
    expect(formatVolume(0.2, 0.1)).toBe('0.2');
    expect(formatVolume(1.5, 0.1)).toBe('1.5');
  });
});

describe('Edge Cases', () => {
  it('should handle very large weights', () => {
    const input: CalculationInput = {
      species: 'other',
      weightKg: 500, // Horse
      drugName: 'Test Drug',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 100,
      concentrationUnit: 'mg/mL',
      route: 'IV',
      roundingPrecision: 0.1,
    };

    const result = calculateDosage(input);
    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(5);
  });

  it('should handle very small weights', () => {
    const input: CalculationInput = {
      species: 'cat',
      weightKg: 0.5, // Very small kitten
      drugName: 'Test Drug',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC',
      roundingPrecision: 0.01,
    };

    // 0.5 * 1 = 0.5 mg
    // 0.5 / 10 = 0.05 mL
    const result = calculateDosage(input);
    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.05);
  });

  it('should handle high precision calculations', () => {
    const input: CalculationInput = {
      species: 'cat',
      weightKg: 3.75,
      drugName: 'Buprenorphine',
      dosePerKg: 0.015,
      doseUnit: 'mg/kg',
      concentration: 0.3,
      concentrationUnit: 'mg/mL',
      route: 'IM',
      roundingPrecision: 0.01,
    };

    // 3.75 * 0.015 = 0.05625 mg
    // 0.05625 / 0.3 = 0.1875 mL
    // Rounded to 0.01: 0.19 mL
    const result = calculateDosage(input);
    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.19);
  });
});
