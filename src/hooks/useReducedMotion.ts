/**
 * Tracks whether motion should be reduced, reactively.
 *
 * True when EITHER the OS `prefers-reduced-motion` setting is on, OR the user
 * has chosen "Stop animations" in the accessibility menu (which sets
 * data-a11y-motion="off" on <html> and emits an `a11y:motion` event).
 *
 * Used to disable the WebGL animation loop, count-ups and transitions.
 *
 * Hydration: the pages are prerendered with motion enabled. A visitor whose
 * OS asks for reduced motion must not change the browser's FIRST render, or
 * the hero draws its static background where the prerendered HTML has the
 * animated one and React logs error #418 and rebuilds the page. The setting is
 * therefore read through `useSyncExternalStore`: while hydrating React uses
 * the server snapshot (motion enabled), and immediately afterwards re-renders
 * with the visitor's real setting.
 */
import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener('change', onChange);
  // Emitted by the accessibility menu when "Stop animations" is toggled.
  window.addEventListener('a11y:motion', onChange);
  return () => {
    mediaQuery.removeEventListener('change', onChange);
    window.removeEventListener('a11y:motion', onChange);
  };
}

function readReducedMotion(): boolean {
  const osPreference = window.matchMedia(QUERY).matches;
  const userPreference = document.documentElement.getAttribute('data-a11y-motion') === 'off';
  return osPreference || userPreference;
}

/** What the prerendered HTML was built with: motion enabled. */
const readPrerenderedReducedMotion = (): boolean => false;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, readReducedMotion, readPrerenderedReducedMotion);
}
