import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageProvider';
import { Tools } from './Tools';

function renderTools() {
  return render(
    <LanguageProvider initial="en">
      <Tools />
    </LanguageProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  window.location.hash = '';
});
afterEach(cleanup);

describe('Tools — Code Blue entry', () => {
  it('opens Code Blue from the emergency button and updates the link', async () => {
    renderTools();
    fireEvent.click(screen.getByRole('button', { name: /code blue/i }));
    expect(await screen.findByRole('button', { name: /open code blue/i })).toBeInTheDocument();
    expect(window.location.hash).toBe('#/cpr');
  });

  it('keeps the ordinary calculators one tap away', async () => {
    renderTools();
    fireEvent.click(screen.getByRole('button', { name: /code blue/i }));
    await screen.findByRole('button', { name: /open code blue/i });
    fireEvent.click(screen.getByRole('tab', { name: /toxins/i }));
    expect(await screen.findByRole('heading', { name: /toxic/i })).toBeInTheDocument();
  });
});
