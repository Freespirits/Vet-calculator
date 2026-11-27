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

// The hook shares this file's private context object with the provider above, so the two
// are exported together (same arrangement as useI18n in LanguageProvider).
// eslint-disable-next-line react-refresh/only-export-components
export function usePatientSessionContext(): PatientSessionValue {
  const ctx = useContext(PatientSessionCtx);
  if (!ctx) {
    throw new Error('usePatientSessionContext must be used within a PatientSessionProvider');
  }
  return ctx;
}
