/**
 * Theme hook — drives [data-theme] on <html>.
 * Dark "Aurora Clinic" is the default; light "Clinic Day" is opt-in and is
 * remembered in localStorage once the visitor chooses it.
 *
 * Hydration: the pages are prerendered with the dark theme. A returning
 * visitor's saved light theme must not change the browser's FIRST render, or
 * the header draws the other toggle icon than the prerendered HTML holds and
 * React logs error #418 and rebuilds the page. The saved theme is therefore
 * read through `useSyncExternalStore`: while hydrating React uses the server
 * snapshot ("dark"), and immediately afterwards re-renders with the saved one.
 *
 * The saved value is the single source of truth: choosing a theme writes it
 * and notifies every component using the hook (and other tabs, through the
 * browser's `storage` event). Nothing is written until the visitor chooses.
 */
import { useCallback, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'vh.theme';
const DEFAULT_THEME: Theme = 'dark';

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function readSavedTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME;
}

/** What the prerendered HTML was built with. */
const readPrerenderedTheme = (): Theme => DEFAULT_THEME;

function saveTheme(theme: Theme): void {
  window.localStorage.setItem(STORAGE_KEY, theme);
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readSavedTheme, readPrerenderedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#070B14' : '#F4F7FB');
  }, [theme]);

  const setTheme = useCallback((next: Theme) => saveTheme(next), []);
  const toggleTheme = useCallback(() => saveTheme(readSavedTheme() === 'dark' ? 'light' : 'dark'), []);

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
