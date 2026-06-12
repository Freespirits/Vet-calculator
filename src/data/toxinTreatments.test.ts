/**
 * Guards on the "Treat now" clinical registry: complete coverage of the
 * toxin suite, sane dose ranges, and a source on every row — the panel
 * must never render an uncited or impossible dose.
 */
import { describe, expect, it } from 'vitest';
import { TOXIN_TREATMENTS, EMESIS_DOG, EMESIS_CAT, CHARCOAL_ROW } from './toxinTreatments';
import { TOXIN_REGISTRY } from '../toxins/registry';

describe('toxinTreatments registry', () => {
  it('covers every toxin in the suite', () => {
    for (const entry of TOXIN_REGISTRY) {
      expect(TOXIN_TREATMENTS[entry.meta.id], `missing treatment plan for ${entry.meta.id}`).toBeDefined();
    }
  });

  it('has no orphan treatment entries', () => {
    const ids = new Set(TOXIN_REGISTRY.map((e) => e.meta.id));
    for (const key of Object.keys(TOXIN_TREATMENTS)) {
      expect(ids.has(key), `treatment entry "${key}" has no matching toxin`).toBe(true);
    }
  });

  it('every numeric dose is positive with max >= min, and every row is cited', () => {
    const rows = [
      EMESIS_DOG,
      EMESIS_CAT,
      CHARCOAL_ROW,
      ...Object.values(TOXIN_TREATMENTS).flatMap((p) => p.rows),
    ];
    for (const row of rows) {
      expect(row.source.length, `uncited row: ${row.name.en}`).toBeGreaterThan(10);
      expect(row.dose || row.doseText, `row without any dose info: ${row.name.en}`).toBeTruthy();
      if (row.dose) {
        expect(row.dose.min).toBeGreaterThan(0);
        if (row.dose.max !== undefined) expect(row.dose.max).toBeGreaterThanOrEqual(row.dose.min);
      }
      if (row.concMgMl !== undefined) expect(row.concMgMl).toBeGreaterThan(0);
    }
  });

  it('xylitol and ethylene glycol must not recommend charcoal (poor binding)', () => {
    expect(TOXIN_TREATMENTS.xylitol.charcoal).toBe('no');
    expect(TOXIN_TREATMENTS.ethylene_glycol.charcoal).toBe('no');
  });

  it('THC must not plainly indicate emesis (antiemetic + aspiration risk)', () => {
    expect(TOXIN_TREATMENTS.thc.emesis).not.toBe('indicated');
  });

  it('every plan carries bilingual decon notes, monitoring and sources', () => {
    for (const [id, plan] of Object.entries(TOXIN_TREATMENTS)) {
      expect(plan.emesisNote.he.length, `${id} emesisNote.he`).toBeGreaterThan(4);
      expect(plan.emesisNote.en.length, `${id} emesisNote.en`).toBeGreaterThan(4);
      expect(plan.charcoalNote.he.length, `${id} charcoalNote.he`).toBeGreaterThan(4);
      expect(plan.monitoring.en.length, `${id} monitoring`).toBeGreaterThan(10);
      expect(plan.sources.length, `${id} sources`).toBeGreaterThan(0);
      expect(plan.rows.length, `${id} rows`).toBeGreaterThan(0);
    }
  });
});
