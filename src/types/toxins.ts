/**
 * Shared types for the toxicity suite.
 * Each toxin module exposes meta (for the grid) + a pure calc() returning
 * a ToxinResult, which <ToxinResultView> renders into the shared layout.
 */
import type { ReactNode } from 'react';
import type { RiskLevel } from '../components/gauges';
import type { Lang } from '../i18n/languages';

export type ToxSpecies = 'dog' | 'cat';

/** Bilingual string. Use L(he, en) to build one. */
export interface LocalizedText {
  he: string;
  en: string;
}

export const L = (he: string, en: string): LocalizedText => ({ he, en });

/**
 * Resolve a bilingual value for the active UI language.
 *
 * Clinical data is authored in Hebrew + English only. Every other supported
 * language falls back to English (the canonical clinical text), so non-Hebrew
 * locales never show an empty field.
 */
export function tr(text: { he: string; en: string }, lang: Lang): string {
  return lang === 'he' ? text.he : text.en;
}

export interface ToxinResult {
  /** Severity band controlling gauge color + needle. */
  level: RiskLevel;
  /** 0..1 needle position; omit for idiosyncratic toxins. */
  fraction?: number;
  /** When true the gauge shows the "no safe threshold" alert state. */
  idiosyncratic?: boolean;
  /** Big central readout, language-neutral (e.g. "98.8 mg/kg"). */
  doseLabel?: string;
  /** What the dose represents (e.g. "total methylxanthine"). */
  doseSubLabel?: LocalizedText;
  /** Optional custom band label; defaults to t('risk.<level>'). */
  bandLabel?: LocalizedText;
  /** Expected clinical signs for this exposure. */
  signs: LocalizedText;
  /** Recommended action / triage step. */
  action: LocalizedText;
  /** Decontamination window note. */
  decon?: LocalizedText;
  /** Clinical context / case anchors / lethality reference. */
  context?: LocalizedText;
  /** Show the emergency hotline banner. */
  emergency: boolean;
  /** Extra labelled stats (e.g. theobromine vs caffeine breakdown). */
  stats?: { label: LocalizedText; value: string }[];
  /** Citations rendered in the collapsible source list. */
  sources: string[];
}

export interface ToxinMeta {
  id: string;
  name: LocalizedText;
  blurb: LocalizedText;
  species: ToxSpecies[];
  accent: string;
  Icon: (p: { size?: number; className?: string }) => ReactNode;
}
