import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import { PatientSessionProvider } from '../patient/PatientSessionContext';
import { CodeBlue } from './CodeBlue';

function renderCodeBlue() {
  return render(
    <LanguageProvider initial="en">
      <PatientSessionProvider>
        <CodeBlue />
      </PatientSessionProvider>
    </LanguageProvider>,
  );
}

function acknowledge() {
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(screen.getByRole('button', { name: /open code blue/i }));
}

function enterPatient(species: 'Dog' | 'Cat', weightKg: string) {
  fireEvent.click(screen.getByRole('tab', { name: species }));
  fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: weightKg } });
}

function doseRow(drugName: RegExp): HTMLElement {
  return screen.getByRole('row', { name: drugName });
}

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe('Code Blue — professional-use acknowledgment', () => {
  it('shows no doses or clock until the acknowledgment is accepted', () => {
    renderCodeBlue();
    expect(screen.queryByRole('button', { name: /start cpr clock/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/epinephrine/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open code blue/i })).toBeDisabled();
  });

  it('opens once the box is ticked and the button pressed', () => {
    renderCodeBlue();
    acknowledge();
    expect(screen.getByRole('button', { name: /start cpr clock/i })).toBeInTheDocument();
  });

  it('is not asked again on the same device', () => {
    renderCodeBlue();
    acknowledge();
    cleanup();
    renderCodeBlue();
    expect(screen.getByRole('button', { name: /start cpr clock/i })).toBeInTheDocument();
  });

  it('says who stays responsible and that the tool is independent of RECOVER', () => {
    renderCodeBlue();
    expect(screen.getByText(/attending veterinarian remains responsible/i)).toBeInTheDocument();
    expect(screen.getByText(/not affiliated with, endorsed or certified by/i)).toBeInTheDocument();
  });
});

describe('Code Blue — dose sheet', () => {
  beforeEach(() => {
    renderCodeBlue();
    acknowledge();
  });

  it('asks for a weight before showing any dose', () => {
    expect(screen.queryByRole('row', { name: /epinephrine/i })).not.toBeInTheDocument();
  });

  it('shows the dose in mg and withholds mL until a vial strength is entered', () => {
    enterPatient('Dog', '10');
    const epinephrine = doseRow(/epinephrine/i);
    expect(within(epinephrine).getByText('0.1 mg')).toBeInTheDocument();
    expect(within(epinephrine).queryByText(/mL/)).not.toBeInTheDocument();
  });

  it('shows mL once the clinic enters its own vial strength', () => {
    enterPatient('Dog', '10');
    fireEvent.click(screen.getByRole('button', { name: /crash cart/i }));
    fireEvent.change(screen.getByLabelText(/epinephrine.*mg\/mL/i), { target: { value: '1' } });
    expect(within(doseRow(/epinephrine/i)).getByText('0.1 mL')).toBeInTheDocument();
  });

  it('marks lidocaine as not suggested for a cat', () => {
    enterPatient('Cat', '4');
    expect(within(doseRow(/lidocaine/i)).getByText(/not suggested for cats/i)).toBeInTheDocument();
  });

  it('shows where each figure comes from', () => {
    enterPatient('Dog', '10');
    expect(within(doseRow(/epinephrine/i)).getByText(/ALS-06/)).toBeInTheDocument();
  });

  it('computes the first and subsequent biphasic shock energy', () => {
    enterPatient('Dog', '10');
    const defibrillation = screen.getByRole('region', { name: /defibrillation/i });
    expect(within(defibrillation).getByText('20 J')).toBeInTheDocument();
    expect(within(defibrillation).getByText('40 J')).toBeInTheDocument();
  });
});

describe('Code Blue — clock and log', () => {
  beforeEach(() => {
    renderCodeBlue();
    acknowledge();
    enterPatient('Dog', '10');
  });

  it('starts in cycle 1 and offers the pause', () => {
    fireEvent.click(screen.getByRole('button', { name: /start cpr clock/i }));
    expect(screen.getByText(/cycle 1/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pause & check/i })).toBeInTheDocument();
  });

  it('moves to cycle 2 after pause and resume', () => {
    fireEvent.click(screen.getByRole('button', { name: /start cpr clock/i }));
    fireEvent.click(screen.getByRole('button', { name: /pause & check/i }));
    fireEvent.click(screen.getByRole('button', { name: /resume compressions/i }));
    expect(screen.getByText(/cycle 2/i)).toBeInTheDocument();
  });

  it('adds a logged drug to the event log', () => {
    fireEvent.click(screen.getByRole('button', { name: /start cpr clock/i }));
    fireEvent.click(within(doseRow(/epinephrine/i)).getByRole('button', { name: /log/i }));
    const log = screen.getByRole('region', { name: /event log/i });
    expect(within(log).getByText(/epinephrine/i)).toBeInTheDocument();
  });

  it('cannot log a drug before the clock is started', () => {
    expect(within(doseRow(/epinephrine/i)).queryByRole('button', { name: /log/i })).not.toBeInTheDocument();
  });
});

describe('Code Blue — attribution', () => {
  it('names The RECOVER Initiative in full and links to it', () => {
    renderCodeBlue();
    acknowledge();
    const link = screen.getByRole('link', { name: /the recover initiative/i });
    expect(link).toHaveAttribute('href', 'https://recoverinitiative.org');
  });
});
