/**
 * Disclaimer Component
 *
 * Medical disclaimer shown at the bottom of the calculator
 */

import React from 'react';
import { t } from '../utils/translations';
import { AlertCircleIcon } from './Icons';

export const Disclaimer: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <AlertCircleIcon
          size={20}
          className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('disclaimer')}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('disclaimerText')}
          </p>
        </div>
      </div>
    </div>
  );
};
