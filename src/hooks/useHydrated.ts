/**
 * Tells a component whether it may show things only the browser knows.
 *
 * Returns false while a page is being prerendered and while React hydrates
 * that prerendered HTML, and true from the render immediately after. A
 * component rendered straight in the browser, with no prerendered HTML to
 * match, gets true from its first render.
 *
 * Use it for values that cannot be known at build time (a stored preference,
 * the browser language): render the prerendered default while this is false,
 * the visitor's own value once it is true. The first browser render then
 * equals the prerendered HTML, which is what hydration requires.
 */
import { useSyncExternalStore } from 'react';

/** Nothing ever changes after hydration, so there is nothing to listen to. */
const subscribeToNothing = (): (() => void) => () => {};
const readInBrowser = (): boolean => true;
const readWhilePrerendering = (): boolean => false;

export function useHydrated(): boolean {
  return useSyncExternalStore(subscribeToNothing, readInBrowser, readWhilePrerendering);
}
