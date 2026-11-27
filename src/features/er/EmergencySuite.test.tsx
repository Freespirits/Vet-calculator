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

describe('bedside calculators', () => {
  const type = (label: RegExp, value: string) =>
    fireEvent.change(screen.getByLabelText(label), { target: { value } });

  it('are listed in the grid alongside the field emergencies', () => {
    render(<Host />);
    for (const name of [/shock index/i, /feline grimace scale/i, /transfusion volume/i, /infusion rate/i]) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
  });

  it('shock index: 140 ÷ 100 = 1.4, above the published cut-off', () => {
    render(<Host initial="shock-index" />);
    type(/heart rate/i, '140');
    type(/systolic/i, '100');
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent('1.40');
    expect(result).toHaveTextContent(/above the cut-off of 1\.0/i);
  });

  it('shock index: an impossible value is explained, not computed', () => {
    render(<Host initial="shock-index" />);
    type(/heart rate/i, '900');
    type(/systolic/i, '100');
    expect(screen.getByRole('status')).toHaveTextContent(/heart rate.*between 20 and 400/i);
  });

  it('feline grimace scale: 4 of 10 is 0.40 and above the analgesia cut-off', () => {
    render(<Host initial="feline-grimace" />);
    const pick = (unit: RegExp, value: string) => fireEvent.change(screen.getByLabelText(unit), { target: { value } });
    pick(/ear position/i, '2');
    pick(/orbital tightening/i, '2');
    pick(/muzzle tension/i, '0');
    pick(/whiskers position/i, '0');
    pick(/head position/i, '0');
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent('0.40');
    expect(result).toHaveTextContent(/above the cut-off of 0\.39/i);
  });

  it('feline grimace scale: gives no score until all five units are answered', () => {
    render(<Host initial="feline-grimace" />);
    fireEvent.change(screen.getByLabelText(/ear position/i), { target: { value: '2' } });
    expect(screen.getByRole('status')).toHaveTextContent(/answer all five/i);
  });

  it('transfusion: 10 kg dog from 12% to 25% needs 195 mL of packed cells', () => {
    render(<Host initial="transfusion" />);
    type(/body weight/i, '10');
    type(/current pcv/i, '12');
    type(/target pcv/i, '25');
    expect(screen.getByRole('status')).toHaveTextContent('195 mL');
  });

  it('infusion: 50 µg/kg/min for 10 kg at 10 mg/mL is 3 mL/h', () => {
    render(<Host initial="infusion" />);
    type(/dose rate/i, '50');
    type(/body weight/i, '10');
    type(/concentration/i, '10');
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent('3 mL/h');
    expect(result).toHaveTextContent('30 mg/h');
  });

  it('infusion: states that it holds no drug doses', () => {
    render(<Host initial="infusion" />);
    expect(screen.getByText(/contains no drug doses/i)).toBeInTheDocument();
  });
});
