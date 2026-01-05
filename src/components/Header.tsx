/**
 * Header Component
 *
 * App header with title and theme toggle
 */

import React from 'react';
import { t } from '../utils/translations';
import { SunIcon, MoonIcon, PawIcon } from './Icons';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-600 rounded-xl text-white">
            <PawIcon size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('appTitle')}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={t('toggleDarkMode')}
        >
          {isDark ? (
            <SunIcon size={20} className="text-yellow-500" />
          ) : (
            <MoonIcon size={20} className="text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};
