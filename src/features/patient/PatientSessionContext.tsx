/**
 * Shares one patient session across the Dosage and Patient tabs so a dose
 * calculated on the Dosage tab can be added to the active patient's list and
 * appear immediately on the Patient tab.
 */
import { createContext, useContext, type ReactNode } from 'react';
import { usePatientSession } from '../../hooks/usePatientSession';

type PatientSessionValue = ReturnType<typeof usePatientSession>;

const PatientSessionCtx = createContext<PatientSessionValue | null>(null);

export function PatientSessionProvider({ children }: { children: ReactNode }) {
  const value = usePatientSession();
  return <PatientSessionCtx.Provider value={value}>{children}</PatientSessionCtx.Provider>;
}

export function usePatientSessionContext(): PatientSessionValue {
  const ctx = useContext(PatientSessionCtx);
  if (!ctx) {
    throw new Error('usePatientSessionContext must be used within a PatientSessionProvider');
  }
  return ctx;
}
