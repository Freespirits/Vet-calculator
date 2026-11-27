/**
 * Code clock panel: start button, total time, 2-minute cycle countdown,
 * pause timer (turns red past the 10-second limit), time since the last
 * vasopressor, compression metronome, and the end/new-code controls.
 *
 * `useCodeClock` owns the clock state. Each action is ignored when it does
 * not apply to the current phase (e.g. a double tap on "Pause & check"), so a
 * stray tap can never throw during a code.
 */
import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { tr } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { ClockIcon, MinusIcon, PlusIcon } from '../../components/Icons';
import {
  IDLE_CODE,
  beginPause,
  clampCompressionRate,
  endCode,
  formatClock,
  logEvent,
  readClock,
  resumeCompressions,
  startCode,
  vasopressorTiming,
  type CodeClockState,
  type CodeEventKind,
  type CodeOutcome,
} from '../../cpr/codeClock';
import { CPR_TIMING } from '../../cpr/recoverGuideline';
import { CPR_TEXT } from './strings';
import { useMetronome, useNow, useScreenWakeLock } from './hooks';

const CYCLE_MS = CPR_TIMING.cycleSeconds * 1000;
const DEFAULT_RATE = 110;

function isRunning(state: CodeClockState): boolean {
  return state.phase === 'compressing' || state.phase === 'paused';
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCodeClock() {
  const [state, setState] = useState<CodeClockState>(IDLE_CODE);
  const running = isRunning(state);
  const nowMs = useNow(running);
  useScreenWakeLock(running);
  return {
    state,
    running,
    nowMs,
    reading: readClock(state, nowMs),
    start: () => setState(startCode(Date.now())),
    pause: () => setState((s) => (s.phase === 'compressing' ? beginPause(s, Date.now()) : s)),
    resume: () => setState((s) => (s.phase === 'paused' ? resumeCompressions(s, Date.now()) : s)),
    log: (kind: CodeEventKind, detail?: string) =>
      setState((s) => (isRunning(s) ? logEvent(s, kind, Date.now(), detail) : s)),
    end: (outcome: CodeOutcome) => setState((s) => (isRunning(s) ? endCode(s, Date.now(), outcome) : s)),
    reset: () => setState(IDLE_CODE),
  };
}

export type CodeClock = ReturnType<typeof useCodeClock>;

const BIG_BUTTON =
  'min-h-[56px] w-full rounded-2xl px-5 text-lg font-bold text-white transition-transform active:scale-[0.99]';

function vibrate(pattern: number[]): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') navigator.vibrate(pattern);
}

/** Buzzes the device once when the 2-minute cycle completes. */
function useCycleCompleteBuzz(cycleComplete: boolean): void {
  useEffect(() => {
    if (cycleComplete) vibrate([250, 120, 250]);
  }, [cycleComplete]);
}

function TimeReadout({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className="text-center">
      <div className={`tnum text-result font-bold ${alert ? 'text-rose' : 'text-ink'}`} dir="ltr">
        {value}
      </div>
      <div className={`text-xs ${alert ? 'font-semibold text-rose' : 'text-muted'}`}>{label}</div>
    </div>
  );
}

function CycleProgress({ remainingMs }: { remainingMs: number }) {
  const percent = Math.round(((CYCLE_MS - remainingMs) / CYCLE_MS) * 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
      <div className="h-full rounded-full bg-teal transition-[width] duration-200" style={{ width: `${percent}%` }} />
    </div>
  );
}

function CompressingView({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  const { reading } = code;
  useCycleCompleteBuzz(reading.cycleComplete);
  const label = reading.cycleComplete ? tr(CPR_TEXT.cycleComplete, lang) : tr(CPR_TEXT.cycleRemaining, lang);
  return (
    <>
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-teal">
        {tr(CPR_TEXT.cycle, lang)} {reading.cycleNumber}
      </p>
      <div role="status" aria-live={reading.cycleComplete ? 'assertive' : 'off'}>
        <TimeReadout label={label} value={formatClock(reading.cycleRemainingMs)} alert={reading.cycleComplete} />
      </div>
      <CycleProgress remainingMs={reading.cycleRemainingMs} />
      <button
        type="button"
        onClick={code.pause}
        className={`${BIG_BUTTON} ${reading.cycleComplete ? 'animate-pulse-ring bg-rose' : 'bg-white/15'}`}
      >
        {tr(CPR_TEXT.pauseAndCheck, lang)}
      </button>
    </>
  );
}

function PausedView({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  const { reading } = code;
  const label = reading.pauseOverLimit
    ? `${tr(CPR_TEXT.pauseRunning, lang)} — ${tr(CPR_TEXT.pauseOverLimit, lang)}`
    : tr(CPR_TEXT.pauseRunning, lang);
  return (
    <>
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-amber">
        {tr(CPR_TEXT.cycle, lang)} {reading.cycleNumber} · {tr(CPR_TEXT.pauseAndCheck, lang)}
      </p>
      <TimeReadout label={label} value={formatClock(reading.pauseElapsedMs)} alert={reading.pauseOverLimit} />
      <button type="button" onClick={code.resume} className={`${BIG_BUTTON} bg-emerald`}>
        {tr(CPR_TEXT.resume, lang)}
      </button>
    </>
  );
}

function EndControls({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  const small = 'min-h-[44px] flex-1 rounded-xl px-3 text-sm font-semibold';
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => code.end('rosc')} className={`${small} bg-emerald/20 text-emerald`}>
        {tr(CPR_TEXT.endRosc, lang)}
      </button>
      <button type="button" onClick={() => code.end('stopped')} className={`${small} bg-white/8 text-muted`}>
        {tr(CPR_TEXT.endStopped, lang)}
      </button>
    </div>
  );
}

function VasopressorTimer({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  const timing = vasopressorTiming(code.state, code.nowMs);
  const tone = { 'none-given': 'text-muted', recent: 'text-ink', 'in-window': 'text-amber', 'past-window': 'text-rose' }[
    timing.status
  ];
  const given = timing.sinceLastMs !== undefined;
  const value = given ? formatClock(timing.sinceLastMs ?? 0) : tr(CPR_TEXT.vasopressorNone, lang);
  return (
    <div className="rounded-2xl bg-white/4 px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs text-muted">{tr(CPR_TEXT.vasopressorSince, lang)}</span>
        <span className={`tnum shrink-0 font-semibold ${given ? 'text-lg' : 'text-xs'} ${tone}`} dir={given ? 'ltr' : undefined}>
          {value}
        </span>
      </div>
      <p className="mt-0.5 text-[11px] text-muted/80">{tr(CPR_TEXT.vasopressorInterval, lang)}</p>
    </div>
  );
}

function MetronomeControl({ running }: { running: boolean }) {
  const { lang } = useI18n();
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [audible, setAudible] = useState(true);
  const beat = useMetronome(running, rate, audible);
  const step = (delta: number) => setRate((current) => clampCompressionRate(current + delta));
  const stepButton = 'grid h-11 w-11 place-items-center rounded-xl bg-white/8 text-ink';
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/4 px-4 py-3">
      <span
        aria-hidden
        className={`h-4 w-4 shrink-0 rounded-full ${running && beat % 2 === 0 ? 'bg-teal' : 'bg-white/20'}`}
      />
      <span className="flex-1 text-sm text-muted">
        {tr(CPR_TEXT.metronome, lang)}{' '}
        <span className="tnum font-semibold text-ink" dir="ltr">
          {rate}
        </span>
        {tr(CPR_TEXT.perMinute, lang)} <span className="text-[11px]">(BLS-07)</span>
      </span>
      <button type="button" onClick={() => step(-5)} className={stepButton} aria-label={`${tr(CPR_TEXT.metronome, lang)} −5`}>
        <MinusIcon size={18} />
      </button>
      <button type="button" onClick={() => step(5)} className={stepButton} aria-label={`${tr(CPR_TEXT.metronome, lang)} +5`}>
        <PlusIcon size={18} />
      </button>
      <button
        type="button"
        onClick={() => setAudible((on) => !on)}
        aria-pressed={audible}
        className="min-h-[44px] rounded-xl bg-white/8 px-3 text-xs font-semibold text-ink"
      >
        {tr(audible ? CPR_TEXT.metronomeOn : CPR_TEXT.metronomeOff, lang)}
      </button>
    </div>
  );
}

function IdleView({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  return (
    <button type="button" onClick={code.start} className={`${BIG_BUTTON} bg-rose shadow-glow-rose`}>
      {tr(CPR_TEXT.startClock, lang)}
    </button>
  );
}

function EndedView({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  return (
    <>
      <TimeReadout label={tr(CPR_TEXT.codeEnded, lang)} value={formatClock(code.reading.elapsedMs)} />
      <button type="button" onClick={code.reset} className={`${BIG_BUTTON} bg-white/15`}>
        {tr(CPR_TEXT.newCode, lang)}
      </button>
    </>
  );
}

function TotalTime({ code }: { code: CodeClock }) {
  const { lang } = useI18n();
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted">
      <ClockIcon size={16} />
      {tr(CPR_TEXT.totalTime, lang)}
      <span className="tnum text-base font-semibold text-ink" dir="ltr">
        {formatClock(code.reading.elapsedMs)}
      </span>
    </div>
  );
}

export function CodeClockPanel({ code }: { code: CodeClock }) {
  const { phase } = code.state;
  return (
    <GlassCard className="flex flex-col gap-4 p-5">
      {phase === 'idle' && <IdleView code={code} />}
      {code.running && <TotalTime code={code} />}
      {phase === 'compressing' && <CompressingView code={code} />}
      {phase === 'paused' && <PausedView code={code} />}
      {phase === 'ended' && <EndedView code={code} />}
      {code.running && (
        <>
          <VasopressorTimer code={code} />
          <MetronomeControl running={phase === 'compressing'} />
          <EndControls code={code} />
        </>
      )}
    </GlassCard>
  );
}
