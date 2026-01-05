/**
 * Number Input Component
 *
 * Styled number input with unit selector
 */

import React from 'react';
import { ChevronDownIcon } from './Icons';

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  units?: { value: string; label: string }[];
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
  placeholder?: string;
  error?: string;
  step?: string;
  min?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  unit,
  units,
  selectedUnit,
  onUnitChange,
  placeholder = '0',
  error,
  step = 'any',
  min = '0',
}) => {
  const hasUnitSelector = units && units.length > 0 && onUnitChange;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      <div className="relative flex">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          step={step}
          min={min}
          className={`
            input-field flex-1 text-lg font-semibold
            ${hasUnitSelector ? 'rounded-l-xl rounded-r-none border-l-0' : ''}
            ${unit && !hasUnitSelector ? 'pr-16' : ''}
            ${error ? 'border-danger-500 focus:border-danger-500' : ''}
          `}
        />

        {/* Static unit display */}
        {unit && !hasUnitSelector && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
            {unit}
          </span>
        )}

        {/* Unit selector */}
        {hasUnitSelector && (
          <div className="relative">
            <select
              value={selectedUnit}
              onChange={(e) => onUnitChange(e.target.value)}
              className="h-full px-3 pr-8 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 border-r-0 rounded-r-xl text-gray-700 dark:text-gray-300 font-medium appearance-none cursor-pointer focus:outline-none focus:border-primary-500"
            >
              {units.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
};
