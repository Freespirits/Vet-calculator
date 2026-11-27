/**
 * Tiny hash router for per-tool deep links — every calculator and plant
 * becomes individually linkable/shareable:
 *
 *   #/dosage          drug-dosage calculator
 *   #/patient         patient session
 *   #/tox             toxicity suite grid
 *   #/tox/chocolate   a specific toxin calculator
 *   #/plants          plant library grid
 *   #/plants/lily     a specific plant detail
 *   #/cpr             Code Blue (CPR clock, weight-based doses, event log)
 *   #/er              emergency & critical-care grid
 *   #/er/heat         a specific emergency topic or bedside tool
 *
 * Unknown or absent hashes resolve to the default tool with no selection.
 */
import { useCallback, useEffect, useState } from 'react';

export type ToolId = 'dosage' | 'patient' | 'toxins' | 'plants' | 'er' | 'cpr';

const TOOL_TO_SEG: Record<ToolId, string> = {
  dosage: 'dosage',
  patient: 'patient',
  toxins: 'tox',
  plants: 'plants',
  er: 'er',
  cpr: 'cpr',
};
const SEG_TO_TOOL: Record<string, ToolId> = {
  dosage: 'dosage',
  patient: 'patient',
  tox: 'toxins',
  toxins: 'toxins',
  plants: 'plants',
  er: 'er',
  cpr: 'cpr',
};

export interface HashRoute {
  /** null = no recognized route in the URL (virgin visit). */
  tool: ToolId | null;
  /** Second segment: toxin id, plant id or emergency-topic id. */
  sub: string | null;
}

export function parseHash(hash: string): HashRoute {
  const m = hash.replace(/^#\/?/, '').split('/');
  const tool = SEG_TO_TOOL[m[0] ?? ''] ?? null;
  return { tool, sub: tool && m[1] ? decodeURIComponent(m[1]) : null };
}

export function hashFor(tool: ToolId, sub?: string | null): string {
  return `#/${TOOL_TO_SEG[tool]}${sub ? `/${encodeURIComponent(sub)}` : ''}`;
}

export function useHashRoute() {
  const [route, setRoute] = useState<HashRoute>(() =>
    typeof window === 'undefined' ? { tool: null, sub: null } : parseHash(window.location.hash),
  );

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /** Push a new route; state updates via the hashchange event. */
  const navigate = useCallback((tool: ToolId, sub?: string | null) => {
    const next = hashFor(tool, sub);
    if (window.location.hash !== next) window.location.hash = next;
  }, []);

  return { ...route, navigate };
}
