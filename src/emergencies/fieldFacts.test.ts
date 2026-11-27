import { describe, it, expect } from 'vitest';
import {
  caterpillarFlushWindow,
  cholinergicTimeline,
  countViperRiskFactors,
  VIPER_MORTALITY_FACTORS,
  FIELD_TOPICS,
} from './fieldFacts';

describe('caterpillarFlushWindow — time from contact to first oral flushing (Pouzot-Nevoret 2017)', () => {
  it.each([
    [0.5, 'under-2h', 5],
    [2, '2-to-6h', 5],
    [6, '2-to-6h', 5],
    [6.5, 'over-6h', 45],
  ])('%s h → %s, tongue necrosis at admission in %s%%', (hours, group, necrosisPercent) => {
    const window = caterpillarFlushWindow(hours);
    expect(window.group).toBe(group);
    expect(window.necrosisAtAdmissionPercent).toBe(necrosisPercent);
  });

  it('rejects a negative time', () => {
    expect(() => caterpillarFlushWindow(-1)).toThrow(/-1/);
  });
});

describe('cholinergicTimeline — intermediate syndrome window, 7–96 h (Klainbart 2022)', () => {
  it.each([
    [3, 'before-window'],
    [7, 'in-window'],
    [96, 'in-window'],
    [97, 'after-window'],
  ])('%s h after the cholinergic crisis → %s', (hours, phase) => {
    expect(cholinergicTimeline(hours).phase).toBe(phase);
  });

  it('rejects a time that is not a number', () => {
    expect(() => cholinergicTimeline(Number.NaN)).toThrow(/NaN/);
  });
});

describe('countViperRiskFactors (Segev 2004)', () => {
  it('counts only the factors that are present', () => {
    expect(countViperRiskFactors(['weight_under_15kg', 'limb_bite'])).toEqual({ present: 2, total: VIPER_MORTALITY_FACTORS.length });
  });

  it('counts a repeated factor once', () => {
    expect(countViperRiskFactors(['limb_bite', 'limb_bite']).present).toBe(1);
  });

  it('rejects an unknown factor id', () => {
    expect(() => countViperRiskFactors(['full_moon'])).toThrow(/full_moon/);
  });
});

describe('field-emergency topics — every statement is traceable', () => {
  it('each fact cites a source that is listed in its topic', () => {
    for (const topic of FIELD_TOPICS) {
      const sourceKeys = new Set(Object.keys(topic.sources));
      for (const section of topic.sections) {
        for (const fact of section.facts) {
          expect(sourceKeys.has(fact.cite), `${topic.id}: fact cites "${fact.cite}" which is not in its sources`).toBe(true);
        }
      }
    }
  });

  it('draws on literature from more than one country for every topic', () => {
    for (const topic of FIELD_TOPICS) {
      expect(topic.regions.length, `${topic.id} cites a single region`).toBeGreaterThan(1);
    }
  });
});
