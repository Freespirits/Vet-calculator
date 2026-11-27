/**
 * <html lang dir data-theme> has two writers: the app's own hooks (language
 * provider, theme hook) and the head manager, which copies the attributes
 * SeoHead gives it onto <html> — late, on an animation frame, so in practice it
 * often writes last.
 *
 * SeoHead used to hand the head manager constants: data-theme="dark" and the
 * ROUTE language. Whenever the head manager won the race,
 *   - a visitor's saved light theme was overwritten on reload (the toggle
 *     showed the light state while the page stayed dark), and
 *   - a visitor reading the root page in their own language (remembered, or
 *     taken from the browser) got lang="he" dir="rtl" back: an English or
 *     French interface laid out right-to-left. Measured on the live site in
 *     about 1 load in 18; in about half the loads when served locally.
 *
 * How it is supposed to work: the attributes on <html> always describe what is
 * on screen — the live theme and the live interface language — whichever of the
 * two writers runs last.
 *
 * The head manager is replaced by a stand-in that behaves the same way at this
 * boundary (applies the <html> attributes after everything else), so the
 * assertions are on the real outcome: the attributes on the document.
 */
import { Children, isValidElement, useEffect, type ReactElement, type ReactNode } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { LanguageProvider, useI18n } from '../i18n/LanguageProvider';
import type { Lang } from '../i18n/languages';
import { Header } from './Header';
import { SeoHead } from './SeoHead';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }: { children: ReactNode }) => {
    const htmlElement = Children.toArray(children).find(
      (child): child is ReactElement<Record<string, string>> => isValidElement(child) && child.type === 'html',
    );
    useEffect(() => {
      // Deferred, like the real head manager: it is the last writer.
      const timer = window.setTimeout(() => {
        for (const [name, value] of Object.entries(htmlElement?.props ?? {})) {
          document.documentElement.setAttribute(name, value);
        }
      }, 0);
      return () => window.clearTimeout(timer);
    });
    return null;
  },
}));

function PickGerman() {
  const { setLang } = useI18n();
  return <button onClick={() => setLang('de')}>pick German</button>;
}

/** One language page: `route` is its URL language; only non-Hebrew routes pin the language. */
function renderPage(route: Lang) {
  return render(
    <LanguageProvider initial={route === 'he' ? undefined : route}>
      <SeoHead page={route} />
      <Header />
      <PickGerman />
    </LanguageProvider>,
  );
}

const pageTheme = () => document.documentElement.getAttribute('data-theme');
const pageLanguage = () => `${document.documentElement.getAttribute('lang')}/${document.documentElement.getAttribute('dir')}`;
/** Lets the deferred head update land before the outcome is read. */
const afterHeadUpdate = () => new Promise((resolve) => window.setTimeout(resolve, 20));

beforeEach(() => {
  window.localStorage.clear();
  for (const attribute of ['data-theme', 'lang', 'dir']) document.documentElement.removeAttribute(attribute);
  vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['xx-XX']);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('page theme with the head manager present', () => {
  it('is dark for a first-time visitor', async () => {
    renderPage('en');
    await afterHeadUpdate();
    expect(pageTheme()).toBe('dark');
  });

  it('keeps a saved light theme after the head manager has run', async () => {
    window.localStorage.setItem('vh.theme', 'light');
    renderPage('en');
    await afterHeadUpdate();
    expect(pageTheme()).toBe('light');
  });

  it('follows the toggle, and the head manager does not undo it', async () => {
    renderPage('en');
    fireEvent.click(screen.getByRole('button', { name: /toggle color theme/i }));
    await waitFor(() => expect(pageTheme()).toBe('light'));
    await afterHeadUpdate();
    expect(pageTheme()).toBe('light');
    expect(window.localStorage.getItem('vh.theme')).toBe('light');
  });
});

describe('page language and direction with the head manager present', () => {
  it('is Hebrew, right-to-left on the root page for a visitor with no other language', async () => {
    renderPage('he');
    await afterHeadUpdate();
    expect(pageLanguage()).toBe('he/rtl');
  });

  it('keeps the remembered language on the root page after the head manager has run', async () => {
    window.localStorage.setItem('vh.lang', 'fr');
    renderPage('he');
    await afterHeadUpdate();
    expect(pageLanguage()).toBe('fr/ltr');
  });

  it('keeps the browser language on the root page after the head manager has run', async () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['en-US']);
    renderPage('he');
    await afterHeadUpdate();
    expect(pageLanguage()).toBe('en/ltr');
  });

  it('is the page language on a pinned page, whatever is remembered', async () => {
    window.localStorage.setItem('vh.lang', 'he');
    renderPage('ar');
    await afterHeadUpdate();
    expect(pageLanguage()).toBe('ar/rtl');
  });

  it('follows the language picker, and the head manager does not undo it', async () => {
    renderPage('ar');
    await afterHeadUpdate();
    fireEvent.click(screen.getByRole('button', { name: 'pick German' }));
    await waitFor(() => expect(pageLanguage()).toBe('de/ltr'));
    await afterHeadUpdate();
    expect(pageLanguage()).toBe('de/ltr');
  });
});
