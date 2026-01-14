/**
 * Main App Component
 *
 * Veterinary Drug Dosage Calculator
 * מחשבון מינון תרופות וטרינרי
 */

import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useCalculator } from './hooks/useCalculator';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Disclaimer } from './components/Disclaimer';
import { RefreshIcon } from './components/Icons';
import { t } from './utils/translations';

const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const {
    state,
    result,
    selectedDrug,
    validation,
    isValid,
    hasInput,
    updateField,
    calculate,
    reset,
  } = useCalculator();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        <form onSubmit={handleSubmit}>
          {/* Calculator Form */}
          <div className="card p-6 mb-6">
            <CalculatorForm
              state={state}
              selectedDrug={selectedDrug}
              updateField={updateField}
              validation={validation}
            />

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={!isValid}
                className="btn-primary flex-1 py-4 text-lg"
              >
                {t('calculate')}
              </button>

              {hasInput && (
                <button
                  type="button"
                  onClick={reset}
                  className="btn-secondary px-4"
                  title={t('reset')}
                >
                  <RefreshIcon size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Result display */}
          {result && (
            <ResultDisplay result={result} showBreakdown={true} />
          )}

          {/* Disclaimer */}
          <Disclaimer />
        </form>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
};

export default App;
