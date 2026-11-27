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
 *
 * Hydration: the pages are prerendered without a hash, so the browser's first
 * render must also behave as if there were none — otherwise React finds the
 * linked tool where the prerendered HTML has the default one, discards the
 * server HTML and logs error #418. The hash is therefore read through
 * `useSyncExternalStore`: while hydrating React uses the server snapshot (no
 * hash), and immediately afterwards re-renders with the real one. On a normal
 * client render the real hash is used from the first render.
 */
import { useCallback, useMemo, useSyncExternalStore } from 'react';

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

function subscribeToHash(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

const readBrowserHash = (): string => window.location.hash;
/** What the prerendered HTML was built with: no hash. */
const readPrerenderedHash = (): string => '';

export function useHashRoute() {
  const hash = useSyncExternalStore(subscribeToHash, readBrowserHash, readPrerenderedHash);
  const route = useMemo(() => parseHash(hash), [hash]);

  /** Push a new route; the hook re-reads the hash on the hashchange event. */
  const navigate = useCallback((tool: ToolId, sub?: string | null) => {
    const next = hashFor(tool, sub);
    if (window.location.hash !== next) window.location.hash = next;
  }, []);

  return { ...route, navigate };
}
