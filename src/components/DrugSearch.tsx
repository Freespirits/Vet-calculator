/**
 * Drug Search Component
 *
 * Searchable dropdown for drug selection with Hebrew support
 */

import React, { useState, useRef, useEffect } from 'react';
import { searchDrugs } from '../data/drugDatabase';
import type { DrugInfo } from '../types';
import { SearchIcon, XIcon, AlertTriangleIcon } from './Icons';
import { t } from '../utils/translations';

interface DrugSearchProps {
  value: string;
  onChange: (value: string) => void;
  selectedDrug: DrugInfo | null;
}

export const DrugSearch: React.FC<DrugSearchProps> = ({
  value,
  onChange,
  selectedDrug,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<DrugInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim()) {
      setSearchResults(searchDrugs(value));
    } else {
      setSearchResults(searchDrugs(''));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (drug: DrugInfo) => {
    onChange(drug.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {t('drugName')}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={t('drugNamePlaceholder')}
          className="input-field pr-20"
          autoComplete="off"
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <SearchIcon size={18} className="text-gray-400" />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label={t('clearInput')}
            >
              <XIcon size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Selected drug info */}
      {selectedDrug && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedDrug.genericNameHe}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({selectedDrug.genericName})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
              {selectedDrug.categoryHe}
            </span>
            {selectedDrug.isHighRisk && (
              <span className="danger-badge text-xs">
                {t('highRiskMedication')}
              </span>
            )}
            {selectedDrug.isControlled && (
              <span className="warning-badge text-xs">
                {t('controlledSubstance')}
              </span>
            )}
          </div>

          {selectedDrug.brandNames && selectedDrug.brandNames.length > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('brandNames')}: {selectedDrug.brandNames.join(', ')}
            </div>
          )}

          {/* Plumb's warning */}
          <div className="mt-3 p-2 bg-warning-50 dark:bg-warning-500/10 rounded-lg border border-warning-200 dark:border-warning-500/30">
            <div className="flex items-start gap-2">
              <AlertTriangleIcon size={16} className="text-warning-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-warning-700 dark:text-warning-400">
                {t('plumbsWarningText')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto animate-fade-in">
          {searchResults.map((drug) => (
            <button
              key={drug.id}
              type="button"
              onClick={() => handleSelect(drug)}
              className="w-full px-4 py-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {drug.nameHe}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {drug.genericName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {drug.categoryHe}
                </span>
                {drug.isControlled && (
                  <span className="w-2 h-2 bg-warning-500 rounded-full" title={t('controlledSubstance')} />
                )}
                {drug.isHighRisk && (
                  <span className="w-2 h-2 bg-danger-500 rounded-full" title={t('highRiskMedication')} />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
