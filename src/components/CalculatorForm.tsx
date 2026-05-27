/**
 * Calculator Form Component
 *
 * Main form for inputting calculation parameters
 */

import React from 'react';
import type { DoseUnit, ConcentrationUnit, DrugInfo } from '../types';
import { SpeciesSelector } from './SpeciesSelector';
import { DrugSearch } from './DrugSearch';
import { RouteSelector } from './RouteSelector';
import { NumberInput } from './NumberInput';
import { t } from '../utils/translations';

interface CalculatorState {
  species: 'dog' | 'cat' | 'other';
  weightKg: string;
  drugName: string;
  dosePerKg: string;
  doseUnit: DoseUnit;
  concentration: string;
  concentrationUnit: ConcentrationUnit;
  route: 'IV' | 'IM' | 'SC' | 'PO';
  frequency: string;
  duration: string;
}

interface CalculatorFormProps {
  state: CalculatorState;
  selectedDrug: DrugInfo | null;
  updateField: <K extends keyof CalculatorState>(field: K, value: CalculatorState[K]) => void;
  validation: {
    isValid: boolean;
    errors: { field: string; messageHe: string }[];
  };
}

const doseUnits: { value: DoseUnit; label: string }[] = [
  { value: 'mg/kg', label: 'מ"ג/ק"ג' },
  { value: 'mcg/kg', label: 'מק"ג/ק"ג' },
  { value: 'IU/kg', label: 'IU/ק"ג' },
  { value: 'mL/kg', label: 'מ"ל/ק"ג' },
];

const concentrationUnits: { value: ConcentrationUnit; label: string }[] = [
  { value: 'mg/mL', label: 'מ"ג/מ"ל' },
  { value: 'mcg/mL', label: 'מק"ג/מ"ל' },
  { value: 'IU/mL', label: 'IU/מ"ל' },
];

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  state,
  selectedDrug,
  updateField,
  validation,
}) => {
  const getError = (field: string) => {
    return validation.errors.find((e) => e.field === field)?.messageHe;
  };

  return (
    <div className="space-y-6">
      {/* Species selector */}
      <SpeciesSelector
        value={state.species}
        onChange={(value) => updateField('species', value)}
      />

      {/* Weight input */}
      <NumberInput
        label={t('weight')}
        value={state.weightKg}
        onChange={(value) => updateField('weightKg', value)}
        unit={t('weightUnit')}
        placeholder="0.0"
        error={getError('weightKg')}
        step="0.01"
        min="0"
      />

      {/* Drug search */}
      <DrugSearch
        value={state.drugName}
        onChange={(value) => updateField('drugName', value)}
        selectedDrug={selectedDrug}
      />

      {/* Dose input with unit selector */}
      <NumberInput
        label={t('dosePerKg')}
        value={state.dosePerKg}
        onChange={(value) => updateField('dosePerKg', value)}
        units={doseUnits}
        selectedUnit={state.doseUnit}
        onUnitChange={(value) => updateField('doseUnit', value as DoseUnit)}
        placeholder="0.0"
        error={getError('dosePerKg')}
        step="0.001"
        min="0"
      />

      {/* Concentration input - hidden for mL/kg dosing */}
      {state.doseUnit !== 'mL/kg' && (
        <NumberInput
          label={t('concentration')}
          value={state.concentration}
          onChange={(value) => updateField('concentration', value)}
          units={concentrationUnits}
          selectedUnit={state.concentrationUnit}
          onUnitChange={(value) => updateField('concentrationUnit', value as ConcentrationUnit)}
          placeholder="0.0"
          error={getError('concentration')}
          step="0.01"
          min="0"
        />
      )}

      {/* Route selector */}
      <RouteSelector
        value={state.route}
        onChange={(value) => updateField('route', value)}
      />

      {/* Optional fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('frequency')}
            <span className="text-gray-400 mr-1 text-xs">({t('optional')})</span>
          </label>
          <input
            type="text"
            value={state.frequency}
            onChange={(e) => updateField('frequency', e.target.value)}
            placeholder={t('frequencyPlaceholder')}
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('duration')}
            <span className="text-gray-400 mr-1 text-xs">({t('optional')})</span>
          </label>
          <input
            type="text"
            value={state.duration}
            onChange={(e) => updateField('duration', e.target.value)}
            placeholder={t('durationPlaceholder')}
            className="input-field text-sm"
          />
        </div>
      </div>
    </div>
  );
};
