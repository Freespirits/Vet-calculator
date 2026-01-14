/**
 * Calculator Hook
 *
 * Manages calculator state and orchestrates calculation logic
 */

import { useState, useCallback, useMemo } from 'react';
import type {
  CalculationInput,
  CalculationResult,
  Species,
  DoseUnit,
  ConcentrationUnit,
  AdministrationRoute,
  RoundingPrecision,
  DrugInfo,
} from '../types';
import { calculateDosage } from '../lib/calculationEngine';
import { validateInput, runAllSafetyChecks } from '../lib/safetyRules';
import { getDrugByName } from '../data/drugDatabase';

interface CalculatorState {
  species: Species;
  weightKg: string;
  drugName: string;
  dosePerKg: string;
  doseUnit: DoseUnit;
  concentration: string;
  concentrationUnit: ConcentrationUnit;
  route: AdministrationRoute;
  roundingPrecision: RoundingPrecision;
  frequency: string;
  duration: string;
}

const initialState: CalculatorState = {
  species: 'dog',
  weightKg: '',
  drugName: '',
  dosePerKg: '',
  doseUnit: 'mg/kg',
  concentration: '',
  concentrationUnit: 'mg/mL',
  route: 'SC',
  roundingPrecision: 0.1,
  frequency: '',
  duration: '',
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null);

  // Update a single field
  const updateField = useCallback(
    <K extends keyof CalculatorState>(field: K, value: CalculatorState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }));

      // If drug name changes, find matching drug for reference only (no auto-fill)
      if (field === 'drugName') {
        const drug = getDrugByName(value as string);
        setSelectedDrug(drug);
      }

      // Clear result when input changes
      setResult(null);
    },
    []
  );

  // Build input object from state
  const buildInput = useCallback((): Partial<CalculationInput> => {
    return {
      species: state.species,
      weightKg: state.weightKg ? parseFloat(state.weightKg) : undefined,
      drugName: state.drugName,
      dosePerKg: state.dosePerKg ? parseFloat(state.dosePerKg) : undefined,
      doseUnit: state.doseUnit,
      concentration: state.concentration ? parseFloat(state.concentration) : undefined,
      concentrationUnit: state.concentrationUnit,
      route: state.route,
      roundingPrecision: state.roundingPrecision,
      frequency: state.frequency || undefined,
      duration: state.duration || undefined,
    };
  }, [state]);

  // Validation
  const validation = useMemo(() => {
    return validateInput(buildInput());
  }, [buildInput]);

  // Perform calculation
  const calculate = useCallback(() => {
    const input = buildInput();

    // Validate first
    const validationResult = validateInput(input);
    if (!validationResult.isValid) {
      return;
    }

    // Perform calculation
    const calculationResult = calculateDosage(input as CalculationInput);

    // Run safety checks and add to warnings
    const safetyWarnings = runAllSafetyChecks(
      input as CalculationInput,
      selectedDrug,
      calculationResult.volumeMl
    );

    calculationResult.warnings = [
      ...calculationResult.warnings,
      ...safetyWarnings,
    ];

    setResult(calculationResult);
  }, [buildInput, selectedDrug]);

  // Reset calculator
  const reset = useCallback(() => {
    setState(initialState);
    setResult(null);
    setSelectedDrug(null);
  }, []);

  // Check if form is valid
  const isValid = validation.isValid;

  // Check if form has any input
  const hasInput = Boolean(
    state.weightKg || state.drugName || state.dosePerKg || state.concentration
  );

  return {
    state,
    result,
    selectedDrug,
    validation,
    isValid,
    hasInput,
    updateField,
    calculate,
    reset,
  };
}
