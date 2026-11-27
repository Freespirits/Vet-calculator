/**
 * Hydration contract for the prerendered pages.
 *
 * The site is built to static HTML and then "hydrated" in the browser. React
 * requires the browser's FIRST render to produce exactly the prerendered
 * markup; if it differs, React discards the server HTML, logs error #418 and
 * rebuilds the page on the client.
 *
 * Three things a visitor can bring that the build cannot know about once
 * broke that rule, each on the live site:
 *   - a deep link (#/tox/chocolate) — the first render drew a different tab;
 *   - a saved light theme — the header drew the other toggle icon;
 *   - the OS "reduce motion" setting — the hero drew the static background.
 *
 * Each test prerenders the page the way the build does (no hash, no saved
 * state, no media preference), then applies the visitor's state and hydrates.
 * It asserts (1) React reports no recoverable error and (2) the visitor's
 * state is still honoured once hydration has finished — fixing the mismatch
 * must not mean ignoring the deep link, the theme or the motion setting.
 *
 * The WebGL background is replaced by a stub: it needs a GPU, and it is the
 * hero's choice between it and the static gradient that is under test.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { act, waitFor, within } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { AccessibilityProvider } from './a11y/AccessibilityProvider';
import type { Lang } from './i18n/languages';

vi.mock('./webgl/AuroraBackground', () => ({
  default: () => <div data-testid="webgl-aurora" />,
}));

const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function page(pinned?: Lang) {
  return (
    <LanguageProvider initial={pinned}>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

function setReducedMotion(reduced: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduced && query === REDUCE_MOTION_QUERY,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/** The state the build renders with: nothing a real visitor would bring. */
function resetVisitorState() {
  window.localStorage.clear();
  window.location.hash = '';
  setReducedMotion(false);
  delete document.documentElement.dataset.theme;
}

/**
 * Prerenders the page as the build does. The build waits for lazily loaded
 * parts (the hero background) before writing the HTML; `renderToString` cannot
 * wait, so the lazy module is loaded first with a throwaway render. If a
 * Suspense boundary is still unfinished the helper fails loudly, because the
 * HTML would then not be what the build produces.
 */
async function prerender(pinned?: Lang): Promise<string> {
  resetVisitorState();
  renderToString(page(pinned));
  await import('./webgl/AuroraBackground');
  await Promise.resolve();
  const html = renderToString(page(pinned));
  if (html.includes('<!--$!-->')) {
    throw new Error('Prerender left a Suspense boundary unfinished; the test HTML would not match the build output.');
  }
  return html;
}

interface Hydrated {
  container: HTMLElement;
  /** Messages of the recoverable errors React reported while hydrating. */
  errors: string[];
}

let mounted: { root: Root; container: HTMLElement }[] = [];

async function hydrate(html: string, pinned?: Lang): Promise<Hydrated> {
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  const errors: string[] = [];
  await act(async () => {
    const root = hydrateRoot(container, page(pinned), {
      onRecoverableError: (error) => errors.push(String((error as Error).message ?? error).split('\n')[0]),
    });
    mounted.push({ root, container });
  });
  return { container, errors };
}

const selectedTool = (container: HTMLElement) =>
  within(container.querySelector('#tools') as HTMLElement)
    .getAllByRole('tab', { selected: true })
    .map((tab) => tab.textContent);

beforeEach(resetVisitorState);

afterEach(async () => {
  for (const { root, container } of mounted) {
    await act(async () => root.unmount());
    container.remove();
  }
  mounted = [];
  resetVisitorState();
  vi.restoreAllMocks();
});

describe('hydration of the prerendered page', () => {
  it('is clean for a first-time visitor with no saved state', async () => {
    const { errors } = await hydrate(await prerender());
    expect(errors).toEqual([]);
  });

  it('is clean on a deep link, and then opens the linked tool', async () => {
    const html = await prerender();
    window.localStorage.setItem('vh.lang', 'he'); // keep the Hebrew labels this test reads
    window.location.hash = '#/tox/chocolate';
    const { container, errors } = await hydrate(html);
    expect(errors).toEqual([]);
    await waitFor(() => expect(selectedTool(container)).toContain('רעלים'));
  });

  it('still scrolls the tools into view when arriving on a deep link, and only then', async () => {
    const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    await hydrate(await prerender());
    expect(scrollIntoView).not.toHaveBeenCalled();

    const html = await prerender();
    window.location.hash = '#/plants';
    await hydrate(html);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    expect((scrollIntoView.mock.contexts[0] as Element).id).toBe('tools');
  });

  it('is clean on a deep link into the English page', async () => {
    const html = await prerender('en');
    window.location.hash = '#/plants';
    const { container, errors } = await hydrate(html, 'en');
    expect(errors).toEqual([]);
    await waitFor(() => expect(selectedTool(container)).toContain('Plants'));
  });

  it('is clean with a saved light theme, and then applies and keeps it', async () => {
    const html = await prerender();
    window.localStorage.setItem('vh.theme', 'light');
    const { errors } = await hydrate(html);
    expect(errors).toEqual([]);
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'));
    expect(window.localStorage.getItem('vh.theme')).toBe('light');
  });

  it('is clean with the OS reduce-motion setting, and then shows the static background', async () => {
    const html = await prerender();
    setReducedMotion(true);
    const { container, errors } = await hydrate(html);
    expect(errors).toEqual([]);
    await waitFor(() => expect(container.querySelector('#top > .aurora-fallback')).not.toBeNull());
    expect(within(container).queryByTestId('webgl-aurora')).toBeNull();
  });
});
