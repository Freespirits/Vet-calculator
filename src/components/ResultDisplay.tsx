/**
 * Result Display Component
 *
 * Shows the calculated volume with breakdown and warnings
 */

import React, { useState } from 'react';
import type { CalculationResult } from '../types';
import { t } from '../utils/translations';
import { formatVolume } from '../lib/calculationEngine';
import {
  SyringeIcon,
  CopyIcon,
  ShareIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  InfoIcon,
} from './Icons';

interface ResultDisplayProps {
  result: CalculationResult;
  showBreakdown?: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  showBreakdown = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${t('withdrawVolume')} ${formatVolume(result.volumeMl, result.calculationBreakdown.roundingPrecision)} ${t('ml')}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('appTitle'),
          text: `${t('withdrawVolume')} ${formatVolume(result.volumeMl, result.calculationBreakdown.roundingPrecision)} ${t('ml')}`,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  const getWarningIcon = (severity: string) => {
    switch (severity) {
      case 'danger':
        return <AlertCircleIcon size={18} className="text-danger-500" />;
      case 'warning':
        return <AlertTriangleIcon size={18} className="text-warning-500" />;
      default:
        return <InfoIcon size={18} className="text-primary-500" />;
    }
  };

  const getWarningClass = (severity: string) => {
    switch (severity) {
      case 'danger':
        return 'danger-badge';
      case 'warning':
        return 'warning-badge';
      default:
        return 'success-badge';
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Main result card */}
      <div className="card p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <SyringeIcon size={24} />
            </div>
            <span className="text-lg font-medium opacity-90">
              {t('withdrawVolume')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={t('copyResult')}
            >
              {copied ? (
                <CheckCircleIcon size={20} />
              ) : (
                <CopyIcon size={20} />
              )}
            </button>
            {'share' in navigator && (
              <button
                onClick={handleShare}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={t('shareResult')}
              >
                <ShareIcon size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="text-center py-4">
          <span className="text-6xl font-bold tracking-tight">
            {formatVolume(result.volumeMl, result.calculationBreakdown.roundingPrecision)}
          </span>
          <span className="text-3xl font-medium mr-2">{t('ml')}</span>
        </div>

        <p className="text-center text-white/80 text-sm">
          {t('fromVial')}
        </p>
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <AlertTriangleIcon size={16} />
            {t('warnings')}
          </h3>
          {result.warnings.map((warning) => (
            <div
              key={warning.id}
              className={`${getWarningClass(warning.severity)} w-full justify-start`}
            >
              {getWarningIcon(warning.severity)}
              <span>{warning.messageHe}</span>
            </div>
          ))}
        </div>
      )}

      {/* Calculation breakdown */}
      {showBreakdown && (
        <div className="mt-4 card p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('calculationBreakdown')}
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                {t('bodyWeight')}:
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.calculationBreakdown.weightKg} {t('weightUnit')}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                {t('doseGiven')}:
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.calculationBreakdown.dosePerKg} {result.calculationBreakdown.doseUnit}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                {t('totalDose')}:
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.calculationBreakdown.totalDose.toFixed(2)} {result.totalDoseUnit}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                {t('drugConcentration')}:
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.calculationBreakdown.concentration} {result.calculationBreakdown.concentrationUnit}
              </span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  {t('rawVolume')}:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {result.calculationBreakdown.rawVolumeMl.toFixed(4)} {t('ml')}
                </span>
              </div>

              <div className="flex justify-between text-primary-600 dark:text-primary-400">
                <span className="font-medium">
                  {t('roundedVolume')} ({result.calculationBreakdown.roundingPrecision} {t('ml')}):
                </span>
                <span className="font-bold">
                  {formatVolume(result.volumeMl, result.calculationBreakdown.roundingPrecision)} {t('ml')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
