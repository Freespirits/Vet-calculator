/**
 * CountUp shows the volume to draw up in the dosage calculator, so what it
 * finally displays is a clinical number.
 *
 * How it is supposed to work:
 *  - motion allowed: the number counts up from the previously shown value (0 at
 *    first) to the new one over `duration` seconds, and ends on exactly the new
 *    value; on the way it never leaves the range between the two — in
 *    particular a volume never reads as negative;
 *  - motion reduced (OS setting, or "Stop animations" in the accessibility
 *    menu): the value is shown at once, with no intermediate numbers, and that
 *    also applies the moment the visitor switches animations off mid-count.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { CountUp } from './primitives';

const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const originalMatchMedia = window.matchMedia;

function setOsReducedMotion(reduced: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduced && query === REDUCE_MOTION_QUERY,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/** What the accessibility menu does when "Stop animations" is toggled. */
function setStopAnimations(stopped: boolean) {
  if (stopped) document.documentElement.setAttribute('data-a11y-motion', 'off');
  else document.documentElement.removeAttribute('data-a11y-motion');
  window.dispatchEvent(new Event('a11y:motion'));
}

const advance = (milliseconds: number) => act(() => vi.advanceTimersByTime(milliseconds));
const shownNumber = (container: HTMLElement) => Number(container.textContent);

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
  setOsReducedMotion(false);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.matchMedia = originalMatchMedia;
  document.documentElement.removeAttribute('data-a11y-motion');
});

describe('CountUp with motion allowed', () => {
  it('starts at zero and ends on exactly the value, formatted to the requested decimals', () => {
    const { container } = render(<CountUp value={1.25} decimals={2} duration={0.9} />);
    expect(container.textContent).toBe('0.00');
    advance(450);
    expect(shownNumber(container)).toBeGreaterThan(0);
    expect(shownNumber(container)).toBeLessThan(1.25);
    advance(600);
    expect(container.textContent).toBe('1.25');
  });

  it('counts from the value already shown when the value changes, not from zero again', () => {
    const { container, rerender } = render(<CountUp value={10} decimals={1} duration={0.9} />);
    advance(1000);
    expect(container.textContent).toBe('10.0');

    rerender(<CountUp value={20} decimals={1} duration={0.9} />);
    advance(300);
    expect(shownNumber(container)).toBeGreaterThan(10);
    expect(shownNumber(container)).toBeLessThan(20);
    advance(700);
    expect(container.textContent).toBe('20.0');
  });

  it('ends on the latest value when the value changes mid-count', () => {
    const { container, rerender } = render(<CountUp value={10} decimals={1} duration={0.9} />);
    advance(300);
    rerender(<CountUp value={4} decimals={1} duration={0.9} />);
    advance(1000);
    expect(container.textContent).toBe('4.0');
  });
});

describe('CountUp with motion reduced', () => {
  it('shows the value at once when the OS asks for reduced motion', () => {
    setOsReducedMotion(true);
    const { container } = render(<CountUp value={1.25} decimals={2} />);
    expect(container.textContent).toBe('1.25');
    advance(1000);
    expect(container.textContent).toBe('1.25');
  });

  it('follows a changed value at once, with no intermediate numbers', () => {
    setOsReducedMotion(true);
    const { container, rerender } = render(<CountUp value={10} decimals={1} />);
    rerender(<CountUp value={20} decimals={1} />);
    expect(container.textContent).toBe('20.0');
    advance(16);
    expect(container.textContent).toBe('20.0');
  });

  it('jumps to the value the moment "Stop animations" is switched on mid-count', () => {
    const { container } = render(<CountUp value={8} decimals={1} duration={0.9} />);
    advance(300);
    expect(shownNumber(container)).toBeLessThan(8);

    act(() => setStopAnimations(true));
    expect(container.textContent).toBe('8.0');
    advance(1000);
    expect(container.textContent).toBe('8.0');
  });

  it('still ends on the value after animations are switched back on', () => {
    setOsReducedMotion(true);
    const { container } = render(<CountUp value={8} decimals={1} duration={0.9} />);
    setOsReducedMotion(false);
    act(() => setStopAnimations(false));
    advance(1000);
    expect(container.textContent).toBe('8.0');
  });
});

describe('CountUp when the first animation frame is stamped before the count started', () => {
  // Browsers stamp a frame with the time the frame began, which is a little
  // earlier than a clock reading taken while that frame's work was running. The
  // elapsed time of the first step is then negative; it once produced "-0.0".
  it('does not show a negative number', () => {
    vi.useRealTimers();
    const frameCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frameCallbacks.push(callback));
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { container } = render(<CountUp value={0.4} decimals={1} duration={0.9} />);
    const frameStartedBeforeTheCount = performance.now() - 8;
    act(() => frameCallbacks[0](frameStartedBeforeTheCount));

    expect(container.textContent).toBe('0.0');
    vi.restoreAllMocks();
  });

  it('shows the value on the first frame when the duration is zero', () => {
    vi.useRealTimers();
    const frameCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frameCallbacks.push(callback));
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { container } = render(<CountUp value={0.4} decimals={1} duration={0} />);
    act(() => frameCallbacks[0](performance.now() - 8));

    expect(container.textContent).toBe('0.4');
    vi.restoreAllMocks();
  });
});
