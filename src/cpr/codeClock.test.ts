import { describe, it, expect } from 'vitest';
import {
  IDLE_CODE,
  startCode,
  beginPause,
  resumeCompressions,
  logEvent,
  endCode,
  readClock,
  vasopressorTiming,
  hasGiven,
  formatClock,
  metronomeIntervalMs,
  clampCompressionRate,
} from './codeClock';

const T0 = 1_000_000; // arbitrary wall-clock start, ms
const seconds = (count: number) => T0 + count * 1000;

describe('code clock — cycles', () => {
  it('starts in cycle 1 with the full 2 minutes remaining', () => {
    const clock = readClock(startCode(T0), T0);
    expect(clock.phase).toBe('compressing');
    expect(clock.cycleNumber).toBe(1);
    expect(clock.cycleRemainingMs).toBe(120_000);
    expect(clock.cycleComplete).toBe(false);
  });

  it('counts the cycle down and total time up', () => {
    const clock = readClock(startCode(T0), seconds(45));
    expect(clock.elapsedMs).toBe(45_000);
    expect(clock.cycleRemainingMs).toBe(75_000);
  });

  it('flags the cycle complete at 2 minutes and never shows negative time', () => {
    const clock = readClock(startCode(T0), seconds(131));
    expect(clock.cycleComplete).toBe(true);
    expect(clock.cycleRemainingMs).toBe(0);
  });

  it('a new cycle begins when compressions resume after the pause', () => {
    const paused = beginPause(startCode(T0), seconds(120));
    const resumed = resumeCompressions(paused, seconds(128));
    const clock = readClock(resumed, seconds(138));
    expect(clock.cycleNumber).toBe(2);
    expect(clock.cycleRemainingMs).toBe(110_000); // 10 s into cycle 2
    expect(clock.elapsedMs).toBe(138_000); // total time keeps running through the pause
  });
});

describe('code clock — pause & check', () => {
  it('measures the pause and warns once it exceeds 10 seconds', () => {
    const paused = beginPause(startCode(T0), seconds(120));
    expect(readClock(paused, seconds(129)).pauseOverLimit).toBe(false);
    const late = readClock(paused, seconds(131));
    expect(late.phase).toBe('paused');
    expect(late.pauseElapsedMs).toBe(11_000);
    expect(late.pauseOverLimit).toBe(true);
  });

  it('records the pause length in the log when compressions resume', () => {
    const resumed = resumeCompressions(beginPause(startCode(T0), seconds(120)), seconds(127));
    const resumeEvent = resumed.events.find((event) => event.kind === 'compressions-resumed');
    expect(resumeEvent?.atMs).toBe(127_000);
    expect(resumeEvent?.pauseMs).toBe(7_000);
  });
});

describe('code clock — event log', () => {
  it('stamps each event with time since the start and the current cycle', () => {
    const started = startCode(T0);
    const logged = logEvent(started, 'epinephrine', seconds(30));
    const event = logged.events.at(-1);
    expect(event).toMatchObject({ kind: 'epinephrine', atMs: 30_000, cycle: 1 });
  });

  it('keeps events in the order they happened', () => {
    let state = startCode(T0);
    state = logEvent(state, 'intubated', seconds(20));
    state = logEvent(state, 'shock', seconds(125), '20 J');
    expect(state.events.map((event) => event.kind)).toEqual(['code-started', 'intubated', 'shock']);
    expect(state.events[2].detail).toBe('20 J');
  });

  it('does not mutate the previous state', () => {
    const started = startCode(T0);
    logEvent(started, 'atropine', seconds(10));
    expect(started.events).toHaveLength(1);
  });

  it('knows whether a once-only drug was already given', () => {
    const state = logEvent(startCode(T0), 'atropine', seconds(15));
    expect(hasGiven(state, 'atropine')).toBe(true);
    expect(hasGiven(state, 'epinephrine')).toBe(false);
  });
});

describe('code clock — vasopressor interval (3–5 min, ALS-07)', () => {
  it('reports nothing given before the first dose', () => {
    expect(vasopressorTiming(startCode(T0), seconds(60)).status).toBe('none-given');
  });

  it.each([
    [60, 'recent'], // 1 min after the dose
    [181, 'in-window'], // just past 3 min
    [299, 'in-window'], // just under 5 min
    [301, 'past-window'], // just past 5 min
  ])('%s s after a dose → %s', (secondsAfter, status) => {
    const state = logEvent(startCode(T0), 'epinephrine', seconds(30));
    const timing = vasopressorTiming(state, seconds(30 + secondsAfter));
    expect(timing.status).toBe(status);
    expect(timing.sinceLastMs).toBe(secondsAfter * 1000);
  });

  it('counts from the most recent vasopressor, whichever drug it was', () => {
    let state = logEvent(startCode(T0), 'epinephrine', seconds(30));
    state = logEvent(state, 'vasopressin', seconds(240));
    expect(vasopressorTiming(state, seconds(300)).sinceLastMs).toBe(60_000);
  });
});

describe('code clock — ending', () => {
  it('freezes the clock at the end time and records the outcome', () => {
    const ended = endCode(startCode(T0), seconds(600), 'rosc');
    const clock = readClock(ended, seconds(900));
    expect(clock.phase).toBe('ended');
    expect(clock.elapsedMs).toBe(600_000);
    expect(ended.events.at(-1)).toMatchObject({ kind: 'rosc', atMs: 600_000 });
  });

  it('ignores further events once the code has ended', () => {
    const ended = endCode(startCode(T0), seconds(600), 'stopped');
    expect(logEvent(ended, 'epinephrine', seconds(610)).events).toHaveLength(ended.events.length);
  });
});

describe('code clock — misuse fails loudly', () => {
  it('refuses to log before the code has started', () => {
    expect(() => logEvent(IDLE_CODE, 'epinephrine', T0)).toThrow(/not started/i);
  });

  it('refuses to pause when compressions are not running', () => {
    const paused = beginPause(startCode(T0), seconds(120));
    expect(() => beginPause(paused, seconds(121))).toThrow(/paused/);
  });

  it('refuses to resume when not paused', () => {
    expect(() => resumeCompressions(startCode(T0), seconds(5))).toThrow(/compressing/);
  });
});

describe('formatClock', () => {
  it.each([
    [0, '00:00'],
    [59_999, '00:59'],
    [75_000, '01:15'],
    [3_600_000, '60:00'],
  ])('%s ms → %s', (ms, text) => {
    expect(formatClock(ms)).toBe(text);
  });
});

describe('metronome (100–120 compressions/min, BLS-07)', () => {
  it('120/min is one beat every 500 ms; 100/min every 600 ms', () => {
    expect(metronomeIntervalMs(120)).toBe(500);
    expect(metronomeIntervalMs(100)).toBe(600);
  });

  it('keeps the rate inside the guideline range', () => {
    expect(clampCompressionRate(80)).toBe(100);
    expect(clampCompressionRate(140)).toBe(120);
    expect(clampCompressionRate(110)).toBe(110);
  });
});
