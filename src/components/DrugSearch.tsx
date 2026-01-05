/**
 * Drug Search Component
 *
 * Searchable dropdown for drug selection with Hebrew support
 */

import React, { useState, useRef, useEffect } from 'react';
import { searchDrugs } from '../data/drugDatabase';
import type { DrugInfo } from '../types';
import { SearchIcon, XIcon } from './Icons';
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

  // Update search results when value changes
  useEffect(() => {
    if (value.trim()) {
      setSearchResults(searchDrugs(value));
    } else {
      setSearchResults(searchDrugs(''));
    }
  }, [value]);

  // Close dropdown when clicking outside
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

      {/* Selected drug info badge */}
      {selectedDrug && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedDrug.categoryHe}
          </span>
          {selectedDrug.isHighRisk && (
            <span className="danger-badge text-xs">
              {t('highRiskMedication')}
            </span>
          )}
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
                  {drug.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {drug.categoryHe}
                </span>
                {drug.isHighRisk && (
                  <span className="w-2 h-2 bg-danger-500 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
