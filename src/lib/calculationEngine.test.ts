/**
 * Unit Tests for Calculation Engine
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
    expect(normalizeDoseToMg(1000, 'mcg/kg')).toBe(1);
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
    expect(calculateTotalDose(10, 0.2)).toBe(2);
  });

  it('should handle decimal weights', () => {
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
    expect(calculateVolume(2, 10)).toBe(0.2);
  });

  it('should handle small doses', () => {
    expect(calculateVolume(0.5, 5)).toBe(0.1);
  });

  it('should return 0 for zero concentration', () => {
    expect(calculateVolume(10, 0)).toBe(0);
  });

  it('should handle large doses', () => {
    expect(calculateVolume(500, 100)).toBe(5);
  });
});

describe('roundVolume', () => {
  it('should round to 0.01 mL precision', () => {
    expect(roundVolume(0.234, 0.01)).toBe(0.23);
    expect(roundVolume(0.235, 0.01)).toBe(0.24);
    expect(roundVolume(0.239, 0.01)).toBe(0.24);
  });

  it('should round to 0.05 mL precision', () => {
    expect(roundVolume(0.23, 0.05)).toBe(0.25);
    expect(roundVolume(0.11, 0.05)).toBe(0.1);
    expect(roundVolume(0.13, 0.05)).toBe(0.15);
  });

  it('should round to 0.1 mL precision', () => {
    expect(roundVolume(0.23, 0.1)).toBe(0.2);
    expect(roundVolume(0.26, 0.1)).toBe(0.3);
    expect(roundVolume(1.04, 0.1)).toBe(1);
  });

  it('should return 0 for zero or negative volume', () => {
    expect(roundVolume(0, 0.01)).toBe(0);
    expect(roundVolume(-1, 0.1)).toBe(0);
  });
});

describe('formatVolume', () => {
  it('should format to 2 decimals for fine precision', () => {
    expect(formatVolume(0.23, 0.01)).toBe('0.23');
    expect(formatVolume(1.5, 0.05)).toBe('1.50');
    expect(formatVolume(0.2, 0.01)).toBe('0.20');
  });

  it('should format to 1 decimal for 0.1 mL precision', () => {
    expect(formatVolume(0.2, 0.1)).toBe('0.2');
    expect(formatVolume(1, 0.1)).toBe('1.0');
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
    roundingPrecision: 0.01,
  };

  it('should calculate correctly for standard case', () => {
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

    const result = calculateDosage(catInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.08);
  });

  it('should handle mcg doses', () => {
    const mcgInput: CalculationInput = {
      ...baseInput,
      dosePerKg: 10,
      doseUnit: 'mcg/kg',
      concentration: 0.5,
      concentrationUnit: 'mg/mL',
    };

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

    const result = calculateDosage(insulinInput);

    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.03);
  });

  it('should generate warning for very small volumes', () => {
    const smallInput: CalculationInput = {
      ...baseInput,
      weightKg: 1,
      dosePerKg: 0.2,
      concentration: 10,
    };

    const result = calculateDosage(smallInput);

    expect(result.warnings.some(w => w.id === 'volume_very_small')).toBe(true);
  });

  it('should generate warning for large volumes', () => {
    const largeInput: CalculationInput = {
      ...baseInput,
      weightKg: 50,
      dosePerKg: 20,
      concentration: 10,
    };

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
      concentration: 0,
      concentrationUnit: 'mg/mL',
      route: 'IV',
      roundingPrecision: 0.01,
    };

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

describe('Edge Cases', () => {
  it('should handle very large weights', () => {
    const input: CalculationInput = {
      species: 'dog',
      weightKg: 500,
      drugName: 'Test Drug',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 100,
      concentrationUnit: 'mg/mL',
      route: 'IV',
      roundingPrecision: 0.01,
    };

    const result = calculateDosage(input);
    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(5);
  });

  it('should handle very small weights', () => {
    const input: CalculationInput = {
      species: 'cat',
      weightKg: 0.5,
      drugName: 'Test Drug',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC',
      roundingPrecision: 0.01,
    };

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

    const result = calculateDosage(input);
    expect(result.success).toBe(true);
    expect(result.volumeMl).toBe(0.19);
  });
});
