/**
 * Core type definitions for the Veterinary Drug Dosage Calculator
 * All types are designed to be type-safe and self-documenting
 */

// Species supported by the calculator
export type Species = 'dog' | 'cat';

// Route of administration
export type AdministrationRoute = 'IV' | 'IM' | 'SC' | 'PO';

// Dose units
export type DoseUnit = 'mg/kg' | 'mcg/kg' | 'IU/kg' | 'mL/kg';

// Concentration units
export type ConcentrationUnit = 'mg/mL' | 'mcg/mL' | 'IU/mL';

// Volume rounding precision (mL) for practical syringe measurement
export type RoundingPrecision = 0.01 | 0.05 | 0.1;

// Warning severity levels
export type WarningSeverity = 'info' | 'warning' | 'danger';

// User input for calculation
export interface CalculationInput {
  species: Species;
  weightKg: number;
  drugName: string;
  dosePerKg: number;
  doseUnit: DoseUnit;
  concentration: number;
  concentrationUnit: ConcentrationUnit;
  route: AdministrationRoute;
  roundingPrecision: RoundingPrecision;
  frequency?: string;
  duration?: string;
}

// Warning message structure
export interface CalculationWarning {
  id: string;
  severity: WarningSeverity;
  message: string;
  messageHe: string;
}

// Calculation result
export interface CalculationResult {
  success: boolean;
  volumeMl: number;
  totalDose: number;
  totalDoseUnit: string;
  dosePerKg: number;
  doseUnit: DoseUnit;
  warnings: CalculationWarning[];
  calculationBreakdown: CalculationBreakdown;
}

// Detailed breakdown of the calculation
export interface CalculationBreakdown {
  weightKg: number;
  dosePerKg: number;
  doseUnit: string;
  totalDose: number;
  concentration: number;
  concentrationUnit: string;
  rawVolumeMl: number;
  roundedVolumeMl: number;
  roundingPrecision: RoundingPrecision;
}

// Plumb's standard dosing information
export interface PlumbsDosing {
  species: Species;
  route: AdministrationRoute;
  minDose: number;
  maxDose: number;
  unit: DoseUnit;
  frequency?: string;
  notes?: string;
  notesHe?: string;
}

// Drug information from database
export interface DrugInfo {
  id: string;
  name: string;
  nameHe: string;
  genericName: string;
  genericNameHe: string;
  brandNames?: string[];
  category: string;
  categoryHe: string;
  plumbsDosing: PlumbsDosing[];
  isHighRisk: boolean;
  isControlled?: boolean;
  warnings?: string[];
  warningsHe?: string[];
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  messageHe: string;
}

// App settings
export interface AppSettings {
  darkMode: boolean;
  showCalculationBreakdown: boolean;
  language: 'he' | 'en';
}

// Hebrew translations for UI
export interface Translations {
  [key: string]: string;
}
