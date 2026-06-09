/**
 * AccessibilityProvider — the engine behind the IS 5568 accessibility menu.
 *
 * Holds the user's display preferences (text scale, high contrast, monochrome,
 * highlight links/headings, readable font, large cursor, stop animations),
 * persists them to localStorage, and reflects them onto <html> as data-*
 * attributes + a CSS custom property. The actual visual changes are pure CSS
 * (see a11y.css); this module only manages state and the DOM hooks.
 *
 * "Stop animations" cooperates with useReducedMotion so framer-motion and the
 * WebGL loop also settle — it sets data-a11y-motion="off" and emits an
 * `a11y:motion` event the hook listens for.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface A11ySettings {
  /** Root font multiplier, 1.0–1.6 in 0.1 steps. */
  fontScale: number;
  contrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  reduceMotion: boolean;
}

/** The boolean toggles (everything except the numeric font scale). */
export type A11yToggleKey = Exclude<keyof A11ySettings, 'fontScale'>;

export const FONT_MIN = 1;
export const FONT_MAX = 1.6;
export const FONT_STEP = 0.1;

const DEFAULTS: A11ySettings = {
  fontScale: 1,
  contrast: false,
  grayscale: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  bigCursor: false,
  reduceMotion: false,
};

const STORAGE_KEY = 'vh.a11y';

/** Round to one decimal so 1.0999999 never leaks into the UI / storage. */
function clampScale(n: number): number {
  return Math.round(Math.min(FONT_MAX, Math.max(FONT_MIN, n)) * 10) / 10;
}

function readInitial(): A11ySettings {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<A11ySettings>;
    return {
      ...DEFAULTS,
      ...parsed,
      fontScale: clampScale(Number(parsed.fontScale) || 1),
    };
  } catch {
    return DEFAULTS;
  }
}

/** Reflect the settings onto <html>. CSS in a11y.css does the rest. */
function applyToDocument(s: A11ySettings): void {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  const set = (key: string, on: boolean) => {
    if (on) el.setAttribute(key, 'on');
    else el.removeAttribute(key);
  };

  if (s.fontScale !== 1) {
    el.setAttribute('data-a11y-font', 'on');
    el.style.setProperty('--a11y-font-scale', String(s.fontScale));
  } else {
    el.removeAttribute('data-a11y-font');
    el.style.removeProperty('--a11y-font-scale');
  }

  set('data-a11y-contrast', s.contrast);
  set('data-a11y-grayscale', s.grayscale);
  set('data-a11y-links', s.highlightLinks);
  set('data-a11y-headings', s.highlightHeadings);
  set('data-a11y-readable', s.readableFont);
  set('data-a11y-cursor', s.bigCursor);

  if (s.reduceMotion) el.setAttribute('data-a11y-motion', 'off');
  else el.removeAttribute('data-a11y-motion');
  // Let useReducedMotion re-evaluate (covers JS-driven motion + the WebGL loop).
  window.dispatchEvent(new Event('a11y:motion'));
}

interface A11yContextValue {
  settings: A11ySettings;
  toggle: (key: A11yToggleKey) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  /** Font scale as a whole-number percentage, e.g. 110. */
  fontPercent: number;
  canIncrease: boolean;
  canDecrease: boolean;
  reset: () => void;
  /** True when nothing differs from defaults (used to disable Reset). */
  isPristine: boolean;
  statementOpen: boolean;
  openStatement: () => void;
  closeStatement: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(readInitial);
  const [statementOpen, setStatementOpen] = useState(false);

  useEffect(() => {
    applyToDocument(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage may be unavailable (private mode) — settings still apply live */
    }
  }, [settings]);

  const toggle = useCallback((key: A11yToggleKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const increaseFont = useCallback(() => {
    setSettings((prev) => ({ ...prev, fontScale: clampScale(prev.fontScale + FONT_STEP) }));
  }, []);

  const decreaseFont = useCallback(() => {
    setSettings((prev) => ({ ...prev, fontScale: clampScale(prev.fontScale - FONT_STEP) }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);
  const openStatement = useCallback(() => setStatementOpen(true), []);
  const closeStatement = useCallback(() => setStatementOpen(false), []);

  const value = useMemo<A11yContextValue>(() => {
    const isPristine = (Object.keys(DEFAULTS) as (keyof A11ySettings)[]).every(
      (k) => settings[k] === DEFAULTS[k],
    );
    return {
      settings,
      toggle,
      increaseFont,
      decreaseFont,
      fontPercent: Math.round(settings.fontScale * 100),
      canIncrease: settings.fontScale < FONT_MAX,
      canDecrease: settings.fontScale > FONT_MIN,
      reset,
      isPristine,
      statementOpen,
      openStatement,
      closeStatement,
    };
  }, [settings, toggle, increaseFont, decreaseFont, reset, statementOpen, openStatement, closeStatement]);

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useA11y(): A11yContextValue {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error('useA11y must be used within <AccessibilityProvider>');
  return ctx;
}
