import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
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

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'he';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  // First visit: honour the browser language if we support it, else Hebrew.
  return detectBrowserLang() ?? 'he';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);
  const dir: Dir = dirOf(lang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(
    () =>
      setLangState((prev) => {
        const i = LANGUAGES.findIndex((l) => l.code === prev);
        return LANGUAGES[(i + 1) % LANGUAGES.length].code;
      }),
    [],
  );

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
