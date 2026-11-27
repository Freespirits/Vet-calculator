import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { useState } from 'react';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import { parseHash, hashFor } from '../../hooks/useHashRoute';
import { EmergencySuite } from './EmergencySuite';

/** Hosts the suite with local selection state, as the hash router does in the app. */
function Host({ initial = null }: { initial?: string | null }) {
  const [selectedId, setSelectedId] = useState<string | null>(initial);
  return (
    <LanguageProvider initial="en">
      <EmergencySuite selectedId={selectedId} onSelect={setSelectedId} />
    </LanguageProvider>
  );
}

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe('emergency suite — navigation', () => {
  it('is deep-linkable per topic', () => {
    expect(parseHash('#/er/heat')).toEqual({ tool: 'er', sub: 'heat' });
    expect(hashFor('er', 'snake')).toBe('#/er/snake');
  });

  it('lists the four field emergencies and opens one', async () => {
    render(<Host />);
    for (const name of [/heat-related illness/i, /snake envenomation/i, /processionary/i, /organophosphate/i]) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
    fireEvent.click(screen.getByRole('button', { name: /snake envenomation/i }));
    expect(await screen.findByRole('heading', { name: /snake envenomation/i })).toBeInTheDocument();
  });
});

describe('heat-related illness', () => {
  it('grades from the ticked signs and reports the cohort outcome for the temperature group', () => {
    render(<Host initial="heat" />);
    fireEvent.click(screen.getByRole('checkbox', { name: /ataxia/i }));
    fireEvent.change(screen.getByLabelText(/temperature/i), { target: { value: '41.5' } });
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent(/severe/i);
    expect(result).toHaveTextContent(/44 of 77/);
  });

  it('shows both temperature groups when no temperature is entered', () => {
    render(<Host initial="heat" />);
    fireEvent.click(screen.getByRole('checkbox', { name: /dyspnoea/i }));
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent(/10 of 126/);
    expect(result).toHaveTextContent(/6 of 31/);
  });

  it('says the figures are cohort observations, not a prediction', () => {
    render(<Host initial="heat" />);
    fireEvent.click(screen.getByRole('checkbox', { name: /lethargy/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/not a prediction/i);
  });
});

describe('snake envenomation', () => {
  it('counts the ticked risk factors without calling it a score', () => {
    render(<Host initial="snake" />);
    fireEvent.click(screen.getByRole('checkbox', { name: /below 15 kg/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /limb/i }));
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent(/2 of 11/);
    expect(result).toHaveTextContent(/count, not a score/i);
  });
});

describe('processionary caterpillar', () => {
  it('reports the tongue-necrosis frequencies for the time-to-flushing group', () => {
    render(<Host initial="caterpillar" />);
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: '7' } });
    expect(screen.getByRole('status')).toHaveTextContent(/45%/);
  });
});

describe('organophosphate / carbamate poisoning', () => {
  it('places the elapsed time against the intermediate-syndrome window', () => {
    render(<Host initial="anticholinesterase" />);
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: '24' } });
    expect(screen.getByRole('status')).toHaveTextContent(/inside the 7–96 hour window/i);
  });
});

describe('every topic shows its sources and its limits', () => {
  it.each(['heat', 'snake', 'caterpillar', 'anticholinesterase'])('%s', (topicId) => {
    render(<Host initial={topicId} />);
    expect(screen.getByText(/not a treatment protocol/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /sources/i }));
    const sources = screen.getByRole('list', { name: /sources/i });
    expect(within(sources).getAllByRole('listitem').length).toBeGreaterThan(2);
  });

  it('prints the study key beside each statement', () => {
    render(<Host initial="snake" />);
    expect(screen.getAllByText('Segev 2004').length).toBeGreaterThan(1);
  });
});

describe('right-to-left safety', () => {
  it('never prints a comparison symbol in Hebrew, where the browser would mirror it', () => {
    render(
      <LanguageProvider initial="he">
        <EmergencySuite selectedId="heat" onSelect={() => {}} />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getAllByRole('checkbox')[3]); // dyspnoea → moderate, both temperature groups listed
    const result = screen.getByRole('status');
    expect(result.textContent).not.toMatch(/[<>≤≥]/);
    expect(result).toHaveTextContent('41°C ומעלה');
    expect(result).toHaveTextContent('מתחת ל-41°C');
  });
});
