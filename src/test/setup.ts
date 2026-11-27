import '@testing-library/jest-dom';

// jsdom has no IntersectionObserver; framer-motion's in-view tracking (hero,
// scroll reveals) needs one to mount. Nothing is ever reported as in view.
class InertIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: number[] = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
if (typeof window !== 'undefined') {
  // TypeScript's DOM types say the observer always exists; in jsdom it does not.
  const browserGlobals = window as unknown as { IntersectionObserver?: typeof IntersectionObserver };
  browserGlobals.IntersectionObserver ??= InertIntersectionObserver as unknown as typeof IntersectionObserver;
}

// jsdom does not implement scrolling; deep-link landing calls scrollIntoView.
if (typeof Element !== 'undefined' && typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom has no matchMedia; components using useReducedMotion/useTheme need it.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
