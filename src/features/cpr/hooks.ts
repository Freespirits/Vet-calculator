/**
 * Browser-side helpers for Code Blue. Each wraps an API that may be missing
 * (older browsers, the test environment) and degrades to "feature off" with a
 * console warning rather than throwing in the middle of a code.
 */
import { useEffect, useRef, useState } from 'react';
import { metronomeIntervalMs } from '../../cpr/codeClock';

/**
 * Current wall-clock time, refreshed while `active` (4× per second). The value
 * may lag real time by up to one tick; the code clock clamps every reading at
 * zero, so a just-started cycle never shows a negative time.
 */
export function useNow(active: boolean): number {
  const [nowMs, setNowMs] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setNowMs(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [active]);
  return nowMs;
}

type AudioContextClass = typeof AudioContext;

function audioContextClass(): AudioContextClass | undefined {
  if (typeof window === 'undefined') return undefined;
  const legacy = window as unknown as { webkitAudioContext?: AudioContextClass };
  return window.AudioContext ?? legacy.webkitAudioContext;
}

/** One short click. Creates the audio context lazily (browsers require a user gesture first). */
function playClick(contextRef: { current: AudioContext | null }): void {
  const ContextClass = audioContextClass();
  if (!ContextClass) return;
  const context = (contextRef.current ??= new ContextClass());
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = 880;
  gain.gain.setValueAtTime(0.25, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.06);
}

/**
 * Compression metronome. Returns a beat counter that increments once per
 * compression (for the visual pulse) and, when `audible`, plays a click.
 * The rate is held inside the guideline's 100–120/min by `metronomeIntervalMs`.
 */
export function useMetronome(running: boolean, ratePerMinute: number, audible: boolean): number {
  const [beat, setBeat] = useState(0);
  const contextRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setBeat((count) => count + 1);
      if (audible) playClick(contextRef);
    }, metronomeIntervalMs(ratePerMinute));
    return () => window.clearInterval(timer);
  }, [running, ratePerMinute, audible]);
  return beat;
}

interface WakeLockSentinelLike {
  release: () => Promise<void>;
}

/** Keeps the screen awake while a code is running, where the browser supports it. */
export function useScreenWakeLock(active: boolean): void {
  useEffect(() => {
    const wakeLock = (navigator as Navigator & {
      wakeLock?: { request: (type: 'screen') => Promise<WakeLockSentinelLike> };
    }).wakeLock;
    if (!active || !wakeLock) return;
    let sentinel: WakeLockSentinelLike | null = null;
    let cancelled = false;
    wakeLock
      .request('screen')
      .then((lock) => (cancelled ? lock.release() : void (sentinel = lock)))
      .catch((error: Error) => console.warn(`Code Blue: screen wake lock unavailable (${error.message}).`));
    return () => {
      cancelled = true;
      void sentinel?.release();
    };
  }, [active]);
}
