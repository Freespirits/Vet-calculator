/**
 * Patient Session hook (web).
 *
 * Holds a single in-progress patient and the list of medications calculated
 * for them, persisting to localStorage so a session survives a page reload.
 * Mirrors the mobile app's multi-medication session + report format.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = '@vetcalc_web_patient_session';

export interface Patient {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  weightKg: number;
}

export interface PatientMedRecord {
  id: string;
  drugName: string;
  dosePerKg: number;
  doseUnit: string;
  route: string;
  volumeMl: number;
  concentration: number;
  concentrationUnit: string;
  frequency?: string;
}

export interface PatientSession {
  patient: Patient;
  medications: PatientMedRecord[];
}

/** Unique id — crypto.randomUUID() when available, otherwise a counter fallback. */
let idCounter = 0;
function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `med_${Date.now().toString(36)}_${idCounter}`;
}

function readInitialSession(): PatientSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PatientSession;
    // Basic shape guard — a malformed entry must not crash the app.
    if (!parsed || !parsed.patient || !Array.isArray(parsed.medications)) return null;
    return parsed;
  } catch {
    return null;
  }
}

const SPECIES_LABEL = {
  dog: { he: 'כלב', en: 'Dog' },
  cat: { he: 'חתול', en: 'Cat' },
} as const;

export function usePatientSession() {
  const [session, setSession] = useState<PatientSession | null>(readInitialSession);
  // Avoid writing back to storage on the very first render (no-op churn).
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      if (session) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [session]);

  const startSession = useCallback((patient: Patient) => {
    setSession({ patient, medications: [] });
  }, []);

  const endSession = useCallback(() => {
    setSession(null);
  }, []);

  const addMedication = useCallback((med: Omit<PatientMedRecord, 'id'>) => {
    setSession((prev) =>
      prev ? { ...prev, medications: [...prev.medications, { ...med, id: makeId() }] } : prev,
    );
  }, []);

  const removeMedication = useCallback((id: string) => {
    setSession((prev) =>
      prev ? { ...prev, medications: prev.medications.filter((m) => m.id !== id) } : prev,
    );
  }, []);

  const clearMedications = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, medications: [] } : prev));
  }, []);

  /** Clean bilingual plain-text report mirroring the mobile app's layout. */
  const generateReport = useCallback(
    (lang: 'he' | 'en'): string => {
      if (!session) return '';
      const { patient, medications } = session;
      const speciesLabel = SPECIES_LABEL[patient.species][lang];

      const lines: string[] = [];

      if (lang === 'he') {
        lines.push(`מטופל: ${patient.name} | ${speciesLabel} | ${patient.weightKg} ק"ג | ${medications.length} תרופות`);
        lines.push('');
        medications.forEach((m, i) => {
          lines.push(`${i + 1}. ${m.drugName} (${m.route})`);
          lines.push(`   מינון: ${m.dosePerKg} ${m.doseUnit}`);
          lines.push(`   לשאוב ${m.volumeMl.toFixed(2)} מ"ל מתוך ${m.concentration} ${m.concentrationUnit}`);
          if (m.frequency) lines.push(`   תדירות: ${m.frequency}`);
        });
        lines.push('');
        lines.push('Plumb\'s מהדורה 10 | לשימוש וטרינרי מורשה בלבד');
      } else {
        lines.push(`Patient: ${patient.name} | ${speciesLabel} | ${patient.weightKg} kg | ${medications.length} meds`);
        lines.push('');
        medications.forEach((m, i) => {
          lines.push(`${i + 1}. ${m.drugName} (${m.route})`);
          lines.push(`   Dose: ${m.dosePerKg} ${m.doseUnit}`);
          lines.push(`   Draw ${m.volumeMl.toFixed(2)} mL from ${m.concentration} ${m.concentrationUnit}`);
          if (m.frequency) lines.push(`   Frequency: ${m.frequency}`);
        });
        lines.push('');
        lines.push('Plumb\'s 10th Ed. | Licensed vet use only');
      }

      return lines.join('\n');
    },
    [session],
  );

  /**
   * Export the report: prefer the native share sheet, fall back to clipboard,
   * and always offer a downloadable .txt as a last resort. Fully guarded.
   */
  const exportReport = useCallback(
    async (lang: 'he' | 'en'): Promise<void> => {
      if (!session) return;
      const report = generateReport(lang);
      const title =
        lang === 'he'
          ? `דוח תרופות — ${session.patient.name}`
          : `Medication report — ${session.patient.name}`;

      // 1) Native share sheet (mobile / supporting browsers).
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
          await navigator.share({ title, text: report });
          return;
        }
      } catch {
        // User dismissed the share sheet, or share failed — fall through to copy.
      }

      // 2) Clipboard.
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(report);
        }
      } catch {
        /* clipboard blocked — fall through to download */
      }

      // 3) Download fallback (always offered when share is unavailable).
      try {
        if (typeof document !== 'undefined' && typeof URL !== 'undefined' && URL.createObjectURL) {
          const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const safeName = session.patient.name.replace(/[^\p{L}\p{N}_-]+/gu, '_') || 'patient';
          a.download = `${safeName}_meds.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } catch {
        /* download unavailable — clipboard copy (if it succeeded) is the result */
      }
    },
    [session, generateReport],
  );

  return {
    session,
    startSession,
    endSession,
    addMedication,
    removeMedication,
    clearMedications,
    generateReport,
    exportReport,
  };
}
