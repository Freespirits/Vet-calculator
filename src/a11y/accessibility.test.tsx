import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { AccessibilityProvider } from './AccessibilityProvider';
import { AccessibilityWidget } from './AccessibilityWidget';
import { AccessibilityStatement } from './AccessibilityStatement';
import { a11yStrings } from './strings';

function setup() {
  return render(
    <LanguageProvider>
      <AccessibilityProvider>
        <AccessibilityWidget />
        <AccessibilityStatement />
      </AccessibilityProvider>
    </LanguageProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  // LanguageProvider defaults to Hebrew when nothing is stored; pin English so
  // the assertions below read against the canonical labels.
  window.localStorage.setItem('vh.lang', 'en');
});

afterEach(() => {
  cleanup();
  // Reset anything the provider wrote onto <html> between tests.
  const el = document.documentElement;
  for (const attr of [...el.attributes].map((a) => a.name)) {
    if (attr.startsWith('data-a11y')) el.removeAttribute(attr);
  }
  el.style.removeProperty('--a11y-font-scale');
});

describe('a11yStrings', () => {
  it('returns the canonical English labels', () => {
    expect(a11yStrings('en').statement).toBe('Accessibility statement');
  });

  it('localizes for supported languages', () => {
    expect(a11yStrings('he').title).toBe('נגישות');
    expect(a11yStrings('fr').title).toBe('Accessibilité');
    expect(a11yStrings('ar').close).toBe('إغلاق');
  });
});

describe('AccessibilityWidget', () => {
  it('opens the menu and exposes a dialog', async () => {
    setup();
    const trigger = screen.getByRole('button', { name: 'Open accessibility menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('dialog', { name: 'Accessibility menu' })).toBeInTheDocument();
  });

  it('high contrast toggle reflects onto <html> and aria-pressed', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open accessibility menu' }));
    const contrast = screen.getByRole('button', { name: 'High contrast' });
    expect(contrast).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(contrast);
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-a11y-contrast')).toBe('on');
    });
    expect(contrast).toHaveAttribute('aria-pressed', 'true');
  });

  it('increasing text size sets the font-scale custom property', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open accessibility menu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Increase text size' }));
    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--a11y-font-scale')).toBe('1.1');
    });
    expect(screen.getByText('110%')).toBeInTheDocument();
  });

  it('reset clears applied settings', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open accessibility menu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Stop animations' }));
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-a11y-motion')).toBe('off');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Reset settings' }));
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-a11y-motion')).toBeNull();
    });
  });

  it('persists settings to localStorage', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open accessibility menu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monochrome' }));
    await waitFor(() => {
      const raw = window.localStorage.getItem('vh.a11y');
      expect(raw).toBeTruthy();
      expect(JSON.parse(raw as string).grayscale).toBe(true);
    });
  });
});

describe('AccessibilityStatement', () => {
  it('opens from the menu and names the conformance standard', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open accessibility menu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Accessibility statement' }));
    const dialog = await screen.findByRole('dialog', { name: 'Accessibility statement' });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/IS 5568/);
    expect(dialog).toHaveTextContent(/WCAG 2\.0/);
    expect(dialog).toHaveTextContent('admin@hack-tech.org');
  });
});
