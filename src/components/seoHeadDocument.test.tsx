/**
 * The page theme has two writers: the theme hook, and the head manager, which
 * copies the attributes SeoHead gives it onto <html> — and does so late, after
 * the hook. When SeoHead hard-coded data-theme="dark", a visitor's saved light
 * theme was overwritten on reload: the toggle showed the light state while the
 * page stayed dark.
 *
 * The head manager is replaced here by a stand-in that behaves the same way at
 * this boundary (applies the <html> attributes after everything else), so the
 * assertion is on the real outcome: the attribute on the document.
 */
import { Children, isValidElement, useEffect, type ReactElement, type ReactNode } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageProvider';
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

function renderPage() {
  return render(
    <LanguageProvider initial="en">
      <SeoHead page="en" />
      <Header />
    </LanguageProvider>,
  );
}

const pageTheme = () => document.documentElement.getAttribute('data-theme');
/** Lets the deferred head update land before the outcome is read. */
const afterHeadUpdate = () => new Promise((resolve) => window.setTimeout(resolve, 20));

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});
afterEach(cleanup);

describe('page theme with the head manager present', () => {
  it('is dark for a first-time visitor', async () => {
    renderPage();
    await afterHeadUpdate();
    expect(pageTheme()).toBe('dark');
  });

  it('keeps a saved light theme after the head manager has run', async () => {
    window.localStorage.setItem('vh.theme', 'light');
    renderPage();
    await afterHeadUpdate();
    expect(pageTheme()).toBe('light');
  });

  it('follows the toggle, and the head manager does not undo it', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /toggle color theme/i }));
    await waitFor(() => expect(pageTheme()).toBe('light'));
    await afterHeadUpdate();
    expect(pageTheme()).toBe('light');
    expect(window.localStorage.getItem('vh.theme')).toBe('light');
  });
});
