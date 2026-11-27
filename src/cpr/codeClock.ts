/**
 * Code clock — the timekeeping and scribe half of Code Blue.
 *
 * It is a pure state machine (no timers, no Date.now): every function takes
 * the current wall-clock time in milliseconds, so the UI can tick it and the
 * tests can drive it with literal times.
 *
 * How it is meant to work
 *  - `startCode` begins cycle 1. A cycle is the 2-minute block of uninterrupted
 *    chest compressions (RECOVER 2024, BLS-08/BLS-15).
 *  - `beginPause` marks the pause between cycles; `readClock` reports how long
 *    the pause has lasted and whether it has passed the 10-second limit
 *    (BLS-16). `resumeCompressions` starts the next cycle and writes the pause
 *    length into the log.
 *  - `logEvent` appends a time-stamped entry (drug, shock, airway, access…).
 *    The clock only RECORDS what the team did — it never decides or prompts
 *    which treatment comes next; that stays with the attending veterinarian.
 *  - `vasopressorTiming` reports the time since the last epinephrine or
 *    vasopressin against the guideline's 3–5 minute interval (ALS-07).
 *  - `endCode` freezes the clock with an outcome; later events are ignored.
 *
 * Calling a transition from the wrong phase throws an error naming the phase.
 */
import { CPR_TIMING } from './recoverGuideline';

export type CodePhase = 'idle' | 'compressing' | 'paused' | 'ended';
export type CodeOutcome = 'rosc' | 'stopped';

export type CodeEventKind =
  | 'code-started'
  | 'pause-check'
  | 'compressions-resumed'
  | 'epinephrine'
  | 'vasopressin'
  | 'atropine'
  | 'lidocaine'
  | 'amiodarone'
  | 'esmolol'
  | 'reversal'
  | 'shock'
  | 'intubated'
  | 'iv-access'
  | 'io-access'
  | 'note'
  | CodeOutcome;

export interface CodeEvent {
  kind: CodeEventKind;
  /** Milliseconds since the code started. */
  atMs: number;
  /** Compression cycle in progress when it happened. */
  cycle: number;
  detail?: string;
  /** Length of the pause that just ended (compressions-resumed only). */
  pauseMs?: number;
}

export interface CodeClockState {
  phase: CodePhase;
  startedAtMs: number | null;
  cycleStartedAtMs: number | null;
  pauseStartedAtMs: number | null;
  endedAtMs: number | null;
  cycleNumber: number;
  events: CodeEvent[];
}

export interface ClockReading {
  phase: CodePhase;
  elapsedMs: number;
  cycleNumber: number;
  cycleRemainingMs: number;
  cycleComplete: boolean;
  pauseElapsedMs: number;
  pauseOverLimit: boolean;
}

export const IDLE_CODE: CodeClockState = {
  phase: 'idle',
  startedAtMs: null,
  cycleStartedAtMs: null,
  pauseStartedAtMs: null,
  endedAtMs: null,
  cycleNumber: 0,
  events: [],
};

const CYCLE_MS = CPR_TIMING.cycleSeconds * 1000;
const MAX_PAUSE_MS = CPR_TIMING.maxPauseSeconds * 1000;
const VASOPRESSOR_KINDS: CodeEventKind[] = ['epinephrine', 'vasopressin'];

function requirePhase(state: CodeClockState, expected: CodePhase, action: string): void {
  if (state.phase !== expected) {
    throw new Error(`Code clock: cannot ${action} — clock is ${state.phase}, expected ${expected}.`);
  }
}

function startedAt(state: CodeClockState, action: string): number {
  if (state.startedAtMs === null) {
    throw new Error(`Code clock not started: cannot ${action} (phase: ${state.phase}).`);
  }
  return state.startedAtMs;
}

function withEvent(state: CodeClockState, event: Omit<CodeEvent, 'cycle'>): CodeClockState {
  return { ...state, events: [...state.events, { ...event, cycle: state.cycleNumber }] };
}

export function startCode(nowMs: number): CodeClockState {
  const started: CodeClockState = {
    ...IDLE_CODE,
    phase: 'compressing',
    startedAtMs: nowMs,
    cycleStartedAtMs: nowMs,
    cycleNumber: 1,
  };
  return withEvent(started, { kind: 'code-started', atMs: 0 });
}

export function beginPause(state: CodeClockState, nowMs: number): CodeClockState {
  requirePhase(state, 'compressing', 'pause for a rhythm/pulse check');
  const paused: CodeClockState = { ...state, phase: 'paused', pauseStartedAtMs: nowMs };
  return withEvent(paused, { kind: 'pause-check', atMs: nowMs - startedAt(state, 'pause') });
}

export function resumeCompressions(state: CodeClockState, nowMs: number): CodeClockState {
  requirePhase(state, 'paused', 'resume compressions');
  const pauseMs = nowMs - (state.pauseStartedAtMs ?? nowMs);
  const resumed: CodeClockState = {
    ...state,
    phase: 'compressing',
    cycleStartedAtMs: nowMs,
    pauseStartedAtMs: null,
    cycleNumber: state.cycleNumber + 1,
  };
  const atMs = nowMs - startedAt(state, 'resume compressions');
  return withEvent(resumed, { kind: 'compressions-resumed', atMs, pauseMs });
}

export function logEvent(
  state: CodeClockState,
  kind: CodeEventKind,
  nowMs: number,
  detail?: string,
): CodeClockState {
  const start = startedAt(state, `log "${kind}"`);
  if (state.phase === 'ended') return state;
  return withEvent(state, { kind, atMs: nowMs - start, ...(detail ? { detail } : {}) });
}

export function endCode(state: CodeClockState, nowMs: number, outcome: CodeOutcome): CodeClockState {
  const logged = logEvent(state, outcome, nowMs);
  return { ...logged, phase: 'ended', endedAtMs: nowMs };
}

/** The moment the clock should be read at: frozen once the code has ended. */
function effectiveNow(state: CodeClockState, nowMs: number): number {
  return state.endedAtMs ?? nowMs;
}

function cycleElapsedMs(state: CodeClockState, nowMs: number): number {
  if (state.cycleStartedAtMs === null) return 0;
  const cycleEnd = state.pauseStartedAtMs ?? effectiveNow(state, nowMs);
  return Math.max(0, cycleEnd - state.cycleStartedAtMs);
}

export function readClock(state: CodeClockState, nowMs: number): ClockReading {
  const now = effectiveNow(state, nowMs);
  const cycleElapsed = cycleElapsedMs(state, nowMs);
  const pauseElapsedMs = state.pauseStartedAtMs === null ? 0 : Math.max(0, now - state.pauseStartedAtMs);
  return {
    phase: state.phase,
    elapsedMs: state.startedAtMs === null ? 0 : Math.max(0, now - state.startedAtMs),
    cycleNumber: state.cycleNumber,
    cycleRemainingMs: Math.max(0, CYCLE_MS - cycleElapsed),
    cycleComplete: state.phase === 'compressing' && cycleElapsed >= CYCLE_MS,
    pauseElapsedMs,
    pauseOverLimit: pauseElapsedMs > MAX_PAUSE_MS,
  };
}

export type VasopressorStatus = 'none-given' | 'recent' | 'in-window' | 'past-window';

export interface VasopressorTiming {
  status: VasopressorStatus;
  sinceLastMs?: number;
}

/** Time since the last epinephrine/vasopressin against the 3–5 minute interval (ALS-07). */
export function vasopressorTiming(state: CodeClockState, nowMs: number): VasopressorTiming {
  const last = [...state.events].reverse().find((event) => VASOPRESSOR_KINDS.includes(event.kind));
  if (!last || state.startedAtMs === null) return { status: 'none-given' };
  const sinceLastMs = effectiveNow(state, nowMs) - state.startedAtMs - last.atMs;
  const { min, max } = CPR_TIMING.vasopressorIntervalMinutes;
  const minutes = sinceLastMs / 60_000;
  const status = minutes < min ? 'recent' : minutes <= max ? 'in-window' : 'past-window';
  return { status, sinceLastMs };
}

export function hasGiven(state: CodeClockState, kind: CodeEventKind): boolean {
  return state.events.some((event) => event.kind === kind);
}

/** mm:ss, minutes not capped at 59 so a long code still reads correctly. */
export function formatClock(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const secondsPart = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`;
}

export function clampCompressionRate(perMinute: number): number {
  const { min, max } = CPR_TIMING.compressionRatePerMinute;
  return Math.min(max, Math.max(min, perMinute));
}

/** Milliseconds between metronome beats for a compression rate inside 100–120/min. */
export function metronomeIntervalMs(perMinute: number): number {
  return 60_000 / clampCompressionRate(perMinute);
}
