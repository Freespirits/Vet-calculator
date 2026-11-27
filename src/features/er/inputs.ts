/**
 * Small input helpers shared by the emergency-suite cards.
 */

/** Toggle membership of an id in a list — the state update behind every checklist. */
export function toggleId(ids: string[], id: string, present: boolean): string[] {
  return present ? [...new Set([...ids, id])] : ids.filter((existing) => existing !== id);
}

/** A typed number field as a number, or null when it is empty or not a finite number. */
export function parseNumber(text: string): number | null {
  const value = Number(text);
  return text.trim() !== '' && Number.isFinite(value) ? value : null;
}
