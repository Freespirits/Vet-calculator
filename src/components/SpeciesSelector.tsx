/**
 * Species Selector Component
 *
 * Button group for selecting animal species
 */

import React from 'react';
import type { Species } from '../types';
import { DogIcon, CatIcon, PawIcon } from './Icons';
import { t } from '../utils/translations';

interface SpeciesSelectorProps {
  value: Species;
  onChange: (value: Species) => void;
}

const speciesOptions: { value: Species; icon: React.FC<{ className?: string; size?: number }>; labelKey: 'dog' | 'cat' | 'other' }[] = [
  { value: 'dog', icon: DogIcon, labelKey: 'dog' },
  { value: 'cat', icon: CatIcon, labelKey: 'cat' },
  { value: 'other', icon: PawIcon, labelKey: 'other' },
];

export const SpeciesSelector: React.FC<SpeciesSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {t('species')}
      </label>

      <div className="grid grid-cols-3 gap-2">
        {speciesOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200
                ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              <Icon size={28} className={isSelected ? 'text-white' : ''} />
              <span className="text-sm font-medium">{t(option.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
