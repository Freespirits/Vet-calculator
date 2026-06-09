/**
 * Tracks whether motion should be reduced, reactively.
 *
 * True when EITHER the OS `prefers-reduced-motion` setting is on, OR the user
 * has chosen "Stop animations" in the accessibility menu (which sets
 * data-a11y-motion="off" on <html> and emits an `a11y:motion` event).
 *
 * Used to disable the WebGL animation loop, count-ups and transitions.
 */
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function compute(): boolean {
  if (typeof window === 'undefined') return false;
  const osPref = window.matchMedia(QUERY).matches;
  const userPref = document.documentElement.getAttribute('data-a11y-motion') === 'off';
  return osPref || userPref;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(compute);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setReduced(compute());
    mq.addEventListener('change', update);
    // Emitted by the accessibility menu when "Stop animations" is toggled.
    window.addEventListener('a11y:motion', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('a11y:motion', update);
    };
  }, []);

  return reduced;
}
