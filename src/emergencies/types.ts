/**
 * Shared shapes for the field-emergency pack.
 *
 * A topic is a set of short statements, each tied to the study it came from.
 * `cite` is a key into the topic's own `sources` map, so a statement can never
 * be shown without its full reference (a test enforces this). Statements are
 * our own summaries of the cited papers in Hebrew + English; other UI
 * languages fall back to English, as for all clinical text in the app.
 */
import type { LocalizedText } from '../types/toxins';

export interface CitedFact {
  text: LocalizedText;
  /** Key in the owning topic's `sources`. */
  cite: string;
}

export interface FactSection {
  title: LocalizedText;
  facts: CitedFact[];
}

export type FieldTopicId = 'heat' | 'snake' | 'caterpillar' | 'anticholinesterase';

export interface FieldTopic {
  id: FieldTopicId;
  name: LocalizedText;
  blurb: LocalizedText;
  /** Hex accent used for the topic's tile. */
  accent: string;
  /** Countries the cited studies were carried out in. */
  regions: string[];
  sections: FactSection[];
  /** Short cite key → full reference. */
  sources: Record<string, string>;
}
