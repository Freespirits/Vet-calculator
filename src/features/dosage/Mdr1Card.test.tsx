import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import { PatientSessionProvider } from '../patient/PatientSessionContext';
import { PatientSession } from '../patient/PatientSession';
import { TreatNowPanel } from '../../components/TreatNowPanel';
import { Mdr1Card } from './Mdr1Card';
import type { Species } from '../../types';

const SESSION_KEY = '@vetcalc_web_patient_session';

function renderCard(species: Species, drugId: string | null) {
  return render(
    <LanguageProvider initial="en">
      <PatientSessionProvider>
        <Mdr1Card species={species} drugId={drugId} />
      </PatientSessionProvider>
    </LanguageProvider>,
  );
}

function seedSession(medicationNames: string[]) {
  const medications = medicationNames.map((drugName, index) => ({
    id: `med-${index}`,
    drugName,
    dosePerKg: 1,
    doseUnit: 'mg/kg',
    route: 'PO',
    volumeMl: 1,
    concentration: 10,
    concentrationUnit: 'mg/mL',
  }));
  const patient = { id: 'p1', name: 'Rex', species: 'dog', weightKg: 20 };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ patient, medications }));
}

const choose = (label: RegExp, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe('Mdr1Card', () => {
  it('stays hidden for a drug with no published MDR1 evidence', () => {
    renderCard('dog', 'amoxicillin');
    expect(screen.queryByText(/MDR1/)).not.toBeInTheDocument();
  });

  it('shows the published breed frequency and the Israeli figure for a Collie', () => {
    renderCard('dog', 'loperamide');
    choose(/breed/i, 'collie');
    expect(screen.getByText(/70%/)).toBeInTheDocument();
    expect(screen.getByText(/Israel.*28%/)).toBeInTheDocument();
  });

  it('advises an alternative, not a reduced dose, for loperamide with two copies', () => {
    renderCard('dog', 'loperamide');
    choose(/genotype/i, 'two-copies');
    expect(screen.getByText(/alternative drug/i)).toBeInTheDocument();
    expect(screen.queryByText(/reduce the dose by/i)).not.toBeInTheDocument();
  });

  it('gives the 25% starting reduction for acepromazine with one copy', () => {
    renderCard('dog', 'acepromazine');
    choose(/genotype/i, 'one-copy');
    expect(screen.getByText(/reduce the dose by 25%/i)).toBeInTheDocument();
  });

  it('clears the concern for a normal genotype', () => {
    renderCard('dog', 'acepromazine');
    choose(/genotype/i, 'normal');
    expect(screen.getByText(/no MDR1-related change/i)).toBeInTheDocument();
  });

  it('offers no breed list for a cat and cites the feline estimate', () => {
    renderCard('cat', 'ivermectin');
    expect(screen.queryByLabelText(/breed/i)).not.toBeInTheDocument();
    expect(screen.getByText(/4% of cats/i)).toBeInTheDocument();
  });

  it('lists the papers behind the advice', () => {
    renderCard('dog', 'loperamide');
    fireEvent.click(screen.getByRole('button', { name: /sources/i }));
    expect(screen.getByText(/Mealey KL, Owens JG, Freeman E/)).toBeInTheDocument();
  });

  it('remembers breed and genotype on the active patient', () => {
    seedSession([]);
    renderCard('dog', 'loperamide');
    choose(/breed/i, 'collie');
    choose(/genotype/i, 'one-copy');
    cleanup();
    renderCard('dog', 'acepromazine');
    expect(screen.getByLabelText(/breed/i)).toHaveValue('collie');
    expect(screen.getByLabelText(/genotype/i)).toHaveValue('one-copy');
  });
});

describe('P-glycoprotein co-administration notice on the patient list', () => {
  function renderPatientTab() {
    return render(
      <LanguageProvider initial="en">
        <PatientSessionProvider>
          <PatientSession onAddMedication={() => {}} />
        </PatientSessionProvider>
      </LanguageProvider>,
    );
  }

  it('appears when two substrate drugs are on the list, naming both', () => {
    seedSession(['Ketoconazole', 'Ivermectin', 'Amoxicillin']);
    renderPatientTab();
    const notice = screen.getByRole('note', { name: /P-glycoprotein/i });
    expect(notice).toHaveTextContent(/Ketoconazole/);
    expect(notice).toHaveTextContent(/Ivermectin/);
    expect(notice).not.toHaveTextContent(/Amoxicillin/);
  });

  it('is absent with only one substrate drug', () => {
    seedSession(['Ivermectin', 'Amoxicillin']);
    renderPatientTab();
    expect(screen.queryByRole('note', { name: /P-glycoprotein/i })).not.toBeInTheDocument();
  });
});

describe('apomorphine row in "Treat now"', () => {
  it('carries the MDR1 caution', () => {
    render(
      <LanguageProvider initial="en">
        <TreatNowPanel toxinId="chocolate" weightKg={10} emergency />
      </LanguageProvider>,
    );
    expect(screen.getByText(/MDR1 mutation.*alternative/i)).toBeInTheDocument();
  });
});
