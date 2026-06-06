/**
 * Supported UI languages and their display metadata.
 *
 * Order here is the order shown in the language picker. `native` is the label
 * shown to users (autonym); `english` is for aria/search. `dir` drives the
 * document direction — Hebrew and Arabic are RTL.
 *
 * NOTE: this controls the *UI chrome* only. Clinical reference data (drug
 * notes, toxicity signs, plant symptoms) is bilingual he/en and resolves to
 * English for every non-Hebrew language.
 */
export type Lang =
  | 'he'
  | 'en'
  | 'ar'
  | 'es'
  | 'fr'
  | 'de'
  | 'ru'
  | 'pt'
  | 'it'
  | 'zh'
  | 'hi'
  | 'ja'
  | 'tr'
  | 'pl';

export type Dir = 'rtl' | 'ltr';

export interface LanguageMeta {
  code: Lang;
  /** Autonym shown in the picker, e.g. "Español". */
  native: string;
  /** English name for aria-labels and matching. */
  english: string;
  dir: Dir;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'he', native: 'עברית', english: 'Hebrew', dir: 'rtl' },
  { code: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
  { code: 'fr', native: 'Français', english: 'French', dir: 'ltr' },
  { code: 'de', native: 'Deutsch', english: 'German', dir: 'ltr' },
  { code: 'ru', native: 'Русский', english: 'Russian', dir: 'ltr' },
  { code: 'pt', native: 'Português', english: 'Portuguese', dir: 'ltr' },
  { code: 'it', native: 'Italiano', english: 'Italian', dir: 'ltr' },
  { code: 'zh', native: '中文', english: 'Chinese', dir: 'ltr' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
  { code: 'ja', native: '日本語', english: 'Japanese', dir: 'ltr' },
  { code: 'tr', native: 'Türkçe', english: 'Turkish', dir: 'ltr' },
  { code: 'pl', native: 'Polski', english: 'Polish', dir: 'ltr' },
];

export const SUPPORTED_LANGS: Lang[] = LANGUAGES.map((l) => l.code);

const DIR_BY_LANG: Record<Lang, Dir> = LANGUAGES.reduce(
  (acc, l) => {
    acc[l.code] = l.dir;
    return acc;
  },
  {} as Record<Lang, Dir>,
);

export function dirOf(lang: Lang): Dir {
  return DIR_BY_LANG[lang] ?? 'ltr';
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (SUPPORTED_LANGS as string[]).includes(value);
}
