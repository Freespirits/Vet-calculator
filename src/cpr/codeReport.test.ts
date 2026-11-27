import { describe, it, expect } from 'vitest';
import { buildCodeReport } from './codeReport';
import { startCode, logEvent, beginPause, resumeCompressions, endCode } from './codeClock';

const T0 = 5_000_000;
const seconds = (count: number) => T0 + count * 1000;

function sampleCode() {
  let state = startCode(T0);
  state = logEvent(state, 'epinephrine', seconds(30));
  state = beginPause(state, seconds(120));
  state = logEvent(state, 'shock', seconds(125), '20 J');
  state = resumeCompressions(state, seconds(127));
  return endCode(state, seconds(600), 'rosc');
}

const PATIENT = { name: 'Rex', species: 'dog', weightKg: 10 } as const;

describe('buildCodeReport (English)', () => {
  const report = buildCodeReport({ state: sampleCode(), patient: PATIENT, lang: 'en' });
  const lines = report.split('\n');

  it('heads the record with the patient, duration, cycles and outcome', () => {
    expect(lines[0]).toBe('CPR record — Rex | Dog | 10 kg');
    expect(lines[1]).toBe('Duration 10:00 | 2 cycles | Outcome: ROSC');
  });

  it('lists every event with its time since the start', () => {
    expect(lines).toContain('00:00  CPR started');
    expect(lines).toContain('00:30  Epinephrine');
    expect(lines).toContain('02:00  Pause & check (end of cycle 1)');
    expect(lines).toContain('02:05  Shock — 20 J');
    expect(lines).toContain('02:07  Compressions resumed — pause 7 s');
    expect(lines).toContain('10:00  ROSC');
  });

  it('credits the guideline by its full name and states what the record is not', () => {
    expect(report).toContain('The RECOVER Initiative');
    expect(report).toContain('https://recoverinitiative.org');
    expect(report).toMatch(/not a medical record/i);
  });
});

describe('buildCodeReport (Hebrew)', () => {
  it('uses Hebrew labels', () => {
    const report = buildCodeReport({ state: sampleCode(), patient: PATIENT, lang: 'he' });
    expect(report).toContain('00:30  אפינפרין');
    expect(report).toContain('כלב');
  });
});

describe('buildCodeReport without a named patient', () => {
  it('still produces a header from species and weight', () => {
    const report = buildCodeReport({
      state: sampleCode(),
      patient: { species: 'cat', weightKg: 4 },
      lang: 'en',
    });
    expect(report.split('\n')[0]).toBe('CPR record — Cat | 4 kg');
  });
});

describe('buildCodeReport for a code that was stopped', () => {
  it('reports the stopped outcome', () => {
    const stopped = endCode(startCode(T0), seconds(900), 'stopped');
    const report = buildCodeReport({ state: stopped, patient: PATIENT, lang: 'en' });
    expect(report.split('\n')[1]).toBe('Duration 15:00 | 1 cycle | Outcome: CPR stopped');
  });
});
