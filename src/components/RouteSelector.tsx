/**
 * Route Selector Component
 *
 * Radio button group for selecting administration route
 */

import React from 'react';
import type { AdministrationRoute } from '../types';
import { t } from '../utils/translations';

interface RouteSelectorProps {
  value: AdministrationRoute;
  onChange: (value: AdministrationRoute) => void;
}

const routes: { value: AdministrationRoute; labelKey: 'routeIV' | 'routeIM' | 'routeSC' | 'routePO' }[] = [
  { value: 'IV', labelKey: 'routeIV' },
  { value: 'IM', labelKey: 'routeIM' },
  { value: 'SC', labelKey: 'routeSC' },
  { value: 'PO', labelKey: 'routePO' },
];

export const RouteSelector: React.FC<RouteSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {t('route')}
      </label>

      <div className="grid grid-cols-2 gap-2">
        {routes.map((route) => {
          const isSelected = value === route.value;

          return (
            <button
              key={route.value}
              type="button"
              onClick={() => onChange(route.value)}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {t(route.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
