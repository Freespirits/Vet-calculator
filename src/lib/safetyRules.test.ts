/**
 * Unit Tests for Safety Rules
 */

import { describe, it, expect } from 'vitest';
import {
  validateInput,
  generateSpeciesWarnings,
  generateRouteWarnings,
} from './safetyRules';
import type { CalculationInput } from '../types';

describe('validateInput', () => {
  it('should pass validation for complete valid input', () => {
    const input = {
      species: 'dog' as const,
      weightKg: 10,
      drugName: 'Meloxicam',
      dosePerKg: 0.2,
      doseUnit: 'mg/kg' as const,
      concentration: 5,
      concentrationUnit: 'mg/mL' as const,
      route: 'SC' as const,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation for missing weight', () => {
    const input = {
      species: 'dog' as const,
      drugName: 'Test',
      dosePerKg: 1,
      concentration: 10,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'weightKg')).toBe(true);
  });

  it('should fail validation for zero weight', () => {
    const input = {
      species: 'dog' as const,
      weightKg: 0,
      drugName: 'Test',
      dosePerKg: 1,
      concentration: 10,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'weightKg')).toBe(true);
  });

  it('should fail validation for negative dose', () => {
    const input = {
      species: 'dog' as const,
      weightKg: 10,
      drugName: 'Test',
      dosePerKg: -1,
      concentration: 10,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'dosePerKg')).toBe(true);
  });

  it('should fail validation for missing drug name', () => {
    const input = {
      species: 'dog' as const,
      weightKg: 10,
      drugName: '',
      dosePerKg: 1,
      concentration: 10,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'drugName')).toBe(true);
  });

  it('should not require concentration for mL/kg dosing', () => {
    const input = {
      species: 'dog' as const,
      weightKg: 10,
      drugName: 'Fluid',
      dosePerKg: 10,
      doseUnit: 'mL/kg' as const,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(true);
  });

  it('should fail for very low weight', () => {
    const input = {
      species: 'cat' as const,
      weightKg: 0.05,
      drugName: 'Test',
      dosePerKg: 1,
      concentration: 10,
    };

    const result = validateInput(input);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'weightKg')).toBe(true);
  });
});

describe('generateSpeciesWarnings', () => {
  it('should warn for excessive dog weight', () => {
    const input: CalculationInput = {
      species: 'dog',
      weightKg: 120,
      drugName: 'Test',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC',
    };

    const warnings = generateSpeciesWarnings(input);
    expect(warnings.some(w => w.id === 'weight_exceeds_typical')).toBe(true);
  });

  it('should warn for excessive cat weight', () => {
    const input: CalculationInput = {
      species: 'cat',
      weightKg: 20,
      drugName: 'Test',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC',
    };

    const warnings = generateSpeciesWarnings(input);
    expect(warnings.some(w => w.id === 'weight_exceeds_typical')).toBe(true);
  });

  it('should not warn for normal dog weight', () => {
    const input: CalculationInput = {
      species: 'dog',
      weightKg: 25,
      drugName: 'Test',
      dosePerKg: 1,
      doseUnit: 'mg/kg',
      concentration: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC',
    };

    const warnings = generateSpeciesWarnings(input);
    expect(warnings.some(w => w.id === 'weight_exceeds_typical')).toBe(false);
  });
});

describe('generateRouteWarnings', () => {
  it('should warn for large SC volume', () => {
    const warnings = generateRouteWarnings('SC', 15);
    expect(warnings.some(w => w.id === 'sc_volume_high')).toBe(true);
  });

  it('should not warn for small SC volume', () => {
    const warnings = generateRouteWarnings('SC', 2);
    expect(warnings.some(w => w.id === 'sc_volume_high')).toBe(false);
  });

  it('should warn for large IM volume', () => {
    const warnings = generateRouteWarnings('IM', 8);
    expect(warnings.some(w => w.id === 'im_volume_high')).toBe(true);
  });

  it('should not warn for small IM volume', () => {
    const warnings = generateRouteWarnings('IM', 2);
    expect(warnings.some(w => w.id === 'im_volume_high')).toBe(false);
  });

  it('should not warn for IV regardless of volume', () => {
    const warnings = generateRouteWarnings('IV', 100);
    expect(warnings.some(w => w.id.includes('_volume_high'))).toBe(false);
  });
});
