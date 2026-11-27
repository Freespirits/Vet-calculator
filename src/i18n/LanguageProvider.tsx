/**
 * LanguageProvider — which of the fourteen languages the interface is in.
 *
 * The root page (/) is prerendered in Hebrew and leaves the language unpinned.
 * In the browser it shows, right after hydration, the language the visitor
 * used last (localStorage `vh.lang`); failing that the first browser language
 * the site supports; failing that Hebrew. Every /<code>/ page is pinned to its
 * language through `initial`, and the pinned language wins over the remembered
 * one. The picker changes the language for this tab only.
 *
 * Whatever language is in use is remembered and mirrored on <html lang dir>.
 *
 * Hydration: the first browser render must equal the prerendered HTML, so the
 * visitor's own language is only used once `useHydrated` reports true. It is
 * read once, when the provider first renders — before the provider starts
 * writing the language in use to the same storage key.
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
import { useHydrated } from '../hooks/useHydrated';
import { he, type TKey } from './he';
import { en } from './en';
import { ar } from './ar';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { ru } from './ru';
import { pt } from './pt';
import { it } from './it';
import { zh } from './zh';
import { hi } from './hi';
import { ja } from './ja';
import { tr } from './tr';
import { pl } from './pl';
import { dirOf, isLang, LANGUAGES, type Dir, type Lang } from './languages';

export type { Lang, Dir } from './languages';

const DICTS: Record<Lang, Record<TKey, string>> = {
  he,
  en,
  ar,
  es,
  fr,
  de,
  ru,
  pt,
  it,
  zh,
  hi,
  ja,
  tr,
  pl,
};
const STORAGE_KEY = 'vh.lang';

interface LanguageContextValue {
  lang: Lang;
  dir: Dir;
  setLang: (lang: Lang) => void;
  /** Cycle to the next language in the picker order (kept for convenience). */
  toggleLang: () => void;
  /** Translate a key, with optional {placeholder} interpolation. */
  t: (key: TKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectBrowserLang(): Lang | null {
  if (typeof navigator === 'undefined') return null;
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const raw of candidates) {
    const base = raw.toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return null;
}

function readPreferredLang(): Lang {
  if (typeof window === 'undefined') return 'he';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  // First visit: honour the browser language if we support it, else Hebrew.
  return detectBrowserLang() ?? 'he';
}

/** The language after `current` in the picker order, wrapping around. */
function nextLanguageAfter(current: Lang): Lang {
  const position = LANGUAGES.findIndex((language) => language.code === current);
  return LANGUAGES[(position + 1) % LANGUAGES.length].code;
}

/**
 * The language in use: what the visitor picked in this tab, else the pinned
 * page language, else (once hydrated) the visitor's remembered or browser
 * language, else the prerendered Hebrew.
 */
function useActiveLanguage(pinned: Lang | undefined) {
  const hydrated = useHydrated();
  const [preferredAtLoad] = useState(readPreferredLang);
  const [picked, setPicked] = useState<Lang | null>(null);
  const unpicked: Lang = pinned ?? (hydrated ? preferredAtLoad : 'he');

  const setLang = useCallback((next: Lang) => setPicked(next), []);
  const toggleLang = useCallback(
    () => setPicked((previous) => nextLanguageAfter(previous ?? unpicked)),
    [unpicked],
  );
  return { lang: picked ?? unpicked, hydrated, setLang, toggleLang };
}

export function LanguageProvider({
  children,
  initial,
}: {
  children: ReactNode;
  /** Pin the language (used by the prerendered /<code>/ pages). */
  initial?: Lang;
}) {
  const { lang, hydrated, setLang, toggleLang } = useActiveLanguage(initial);
  const dir: Dir = dirOf(lang);

  // Remember and announce the language in use — but not during hydration,
  // when `lang` is still the prerendered one rather than the visitor's.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir, hydrated]);

  const t = useCallback(
    (key: TKey, vars?: Record<string, string | number>) => {
      // English is the canonical fallback; the key itself is the last resort.
      let str = DICTS[lang]?.[key] ?? en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }
      return str;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, dir, setLang, toggleLang, t }),
    [lang, dir, setLang, toggleLang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within <LanguageProvider>');
  return ctx;
}
