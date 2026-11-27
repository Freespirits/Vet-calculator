/**
 * Which language a visitor gets, and what is remembered.
 *
 * How it is supposed to work:
 *  - The root page (/) is prerendered in Hebrew and leaves the language
 *    unpinned. In the browser it adopts, right after hydration, the language
 *    the visitor used last (localStorage `vh.lang`); failing that the first
 *    browser language the site supports; failing that Hebrew.
 *  - Every /<code>/ page is pinned to its language. The pinned language wins
 *    over the remembered one.
 *  - Whatever language is in use is remembered and mirrored on <html lang dir>.
 *  - The picker (setLang) and toggleLang change it for this tab and remember it.
 *  - Hydration must be clean: the first browser render equals the prerendered
 *    HTML whatever the visitor has stored, and the stored language must survive
 *    it (the provider writes to the same key it reads).
 */
import { StrictMode, type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider, useI18n } from './LanguageProvider';
import { LANGUAGES, type Lang } from './languages';

const STORAGE_KEY = 'vh.lang';

function Probe() {
  const { lang, dir, setLang, toggleLang, t } = useI18n();
  return (
    <div>
      <output data-testid="lang">{lang}</output>
      <output data-testid="dir">{dir}</output>
      <output data-testid="label">{t('tab.dosage')}</output>
      <button onClick={() => setLang('de')}>pick German</button>
      <button onClick={toggleLang}>next language</button>
    </div>
  );
}

const page = (pinned?: Lang, Wrapper: (props: { children: ReactNode }) => ReactNode = ({ children }) => children) => (
  <Wrapper>
    <LanguageProvider initial={pinned}>
      <Probe />
    </LanguageProvider>
  </Wrapper>
);

function setBrowserLanguages(languages: string[]) {
  vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(languages);
}

const shownLang = () => screen.getByTestId('lang').textContent;
const storedLang = () => window.localStorage.getItem(STORAGE_KEY);
const documentLang = () => `${document.documentElement.lang}/${document.documentElement.dir}`;

let hydratedRoots: { root: Root; container: HTMLElement }[] = [];

/** Prerenders with nothing stored (as the build does), applies `prepare`, then hydrates. */
async function hydrate(element: () => ReactNode, prepare: () => void): Promise<string[]> {
  window.localStorage.clear();
  const container = document.createElement('div');
  container.innerHTML = renderToString(element());
  document.body.appendChild(container);
  prepare();
  const recoverableErrors: string[] = [];
  await act(async () => {
    const root = hydrateRoot(container, element(), {
      onRecoverableError: (error) => recoverableErrors.push(String((error as Error).message ?? error).split('\n')[0]),
    });
    hydratedRoots.push({ root, container });
  });
  return recoverableErrors;
}

beforeEach(() => {
  window.localStorage.clear();
  setBrowserLanguages(['xx-XX']);
});

afterEach(async () => {
  cleanup();
  for (const { root, container } of hydratedRoots) {
    await act(async () => root.unmount());
    container.remove();
  }
  hydratedRoots = [];
  vi.restoreAllMocks();
});

describe('language on the unpinned root page', () => {
  it('uses the first browser language the site supports, ignoring the region, and remembers it', async () => {
    setBrowserLanguages(['xx-XX', 'pt-BR', 'en-US']);
    render(page());
    await waitFor(() => expect(shownLang()).toBe('pt'));
    expect(storedLang()).toBe('pt');
    expect(documentLang()).toBe('pt/ltr');
  });

  it('prefers the remembered language over the browser language', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'ar');
    setBrowserLanguages(['en-US']);
    render(page());
    await waitFor(() => expect(shownLang()).toBe('ar'));
    expect(screen.getByTestId('dir').textContent).toBe('rtl');
    expect(storedLang()).toBe('ar');
    expect(documentLang()).toBe('ar/rtl');
  });

  it('falls back to Hebrew when neither a remembered nor a supported browser language exists', async () => {
    render(page());
    await waitFor(() => expect(storedLang()).toBe('he'));
    expect(shownLang()).toBe('he');
    expect(documentLang()).toBe('he/rtl');
  });

  it('ignores a remembered value that is not a supported language', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'klingon');
    setBrowserLanguages(['fr-FR']);
    render(page());
    await waitFor(() => expect(shownLang()).toBe('fr'));
    expect(storedLang()).toBe('fr');
  });

  it('keeps the remembered language inside StrictMode, where effects run twice in development', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'fr');
    render(page(undefined, StrictMode));
    await waitFor(() => expect(storedLang()).toBe('fr'));
    expect(shownLang()).toBe('fr');
  });
});

describe('language on a pinned /<code>/ page', () => {
  it('shows the page language even when another one is remembered, and remembers the page language', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'he');
    setBrowserLanguages(['fr-FR']);
    render(page('en'));
    expect(shownLang()).toBe('en');
    await waitFor(() => expect(storedLang()).toBe('en'));
    expect(shownLang()).toBe('en');
    expect(documentLang()).toBe('en/ltr');
  });
});

describe('changing language', () => {
  it('switches to the picked language, translates with it and remembers it', async () => {
    render(page('en'));
    expect(screen.getByTestId('label').textContent).toBe('Dosage');
    fireEvent.click(screen.getByRole('button', { name: 'pick German' }));
    await waitFor(() => expect(shownLang()).toBe('de'));
    expect(screen.getByTestId('label').textContent).not.toBe('Dosage');
    expect(storedLang()).toBe('de');
    expect(documentLang()).toBe('de/ltr');
  });

  it('toggleLang steps through the picker order and wraps around', async () => {
    const lastLanguage = LANGUAGES[LANGUAGES.length - 1].code;
    render(page(lastLanguage));
    fireEvent.click(screen.getByRole('button', { name: 'next language' }));
    await waitFor(() => expect(shownLang()).toBe(LANGUAGES[0].code));
    fireEvent.click(screen.getByRole('button', { name: 'next language' }));
    await waitFor(() => expect(shownLang()).toBe(LANGUAGES[1].code));
    expect(storedLang()).toBe(LANGUAGES[1].code);
  });
});

describe('hydration of the prerendered language', () => {
  it('hydrates the Hebrew root page cleanly and then adopts the remembered language without losing it', async () => {
    const errors = await hydrate(
      () => page(),
      () => window.localStorage.setItem(STORAGE_KEY, 'fr'),
    );
    expect(errors).toEqual([]);
    await waitFor(() => expect(shownLang()).toBe('fr'));
    expect(storedLang()).toBe('fr');
    expect(documentLang()).toBe('fr/ltr');
  });

  it('does the same inside StrictMode, as the real page shell is', async () => {
    const errors = await hydrate(
      () => page(undefined, StrictMode),
      () => window.localStorage.setItem(STORAGE_KEY, 'fr'),
    );
    expect(errors).toEqual([]);
    await waitFor(() => expect(storedLang()).toBe('fr'));
    expect(shownLang()).toBe('fr');
  });

  it('hydrates a pinned page cleanly and keeps its language over the remembered one', async () => {
    const errors = await hydrate(
      () => page('en'),
      () => window.localStorage.setItem(STORAGE_KEY, 'he'),
    );
    expect(errors).toEqual([]);
    await waitFor(() => expect(storedLang()).toBe('en'));
    expect(shownLang()).toBe('en');
  });
});
