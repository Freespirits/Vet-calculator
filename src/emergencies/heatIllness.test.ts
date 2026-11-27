import { describe, it, expect } from 'vitest';
import { gradeHeatIllness, HEAT_SIGNS } from './heatIllness';

/** Expected figures are copied by hand from Beard et al. 2026, Table 4 (2023 validation cohort, n = 422). */
describe('gradeHeatIllness — revised VetCompass criteria (2026)', () => {
  it('gives no grade when no sign is selected', () => {
    expect(gradeHeatIllness({ signIds: [] }).grade).toBeNull();
  });

  it.each([
    ['continuous_panting', 'mild'],
    ['lethargy', 'mild'],
    ['episodic_collapse', 'mild'],
    ['dyspnoea', 'moderate'],
    ['gastrointestinal', 'moderate'],
    ['single_seizure', 'moderate'],
    ['ataxia', 'severe'],
    ['multiple_seizures', 'severe'],
    ['profound_depression', 'severe'],
    ['unresponsive_or_coma', 'severe'],
    ['liver_or_kidney_dysfunction', 'severe'],
    ['gi_haemorrhage', 'severe'],
    ['petechiae_purpura', 'severe'],
  ])('%s alone is %s', (signId, grade) => {
    expect(gradeHeatIllness({ signIds: [signId] }).grade).toBe(grade);
  });

  it('takes the highest grade among the selected signs', () => {
    const result = gradeHeatIllness({ signIds: ['continuous_panting', 'gastrointestinal', 'ataxia'] });
    expect(result.grade).toBe('severe');
  });

  it('a mild sign that has not responded to cooling or fluids is graded moderate', () => {
    const result = gradeHeatIllness({ signIds: ['lethargy'], notRespondingToTreatment: true });
    expect(result.grade).toBe('moderate');
  });
});

describe('gradeHeatIllness — presenting temperature', () => {
  it('flags a critical temperature at 41.0 °C and above', () => {
    expect(gradeHeatIllness({ signIds: ['dyspnoea'], temperatureC: 41 }).criticalTemperature).toBe(true);
    expect(gradeHeatIllness({ signIds: ['dyspnoea'], temperatureC: 40.9 }).criticalTemperature).toBe(false);
  });

  it('leaves the temperature flag undefined when no temperature was taken', () => {
    expect(gradeHeatIllness({ signIds: ['dyspnoea'] }).criticalTemperature).toBeUndefined();
  });

  it('rejects an impossible temperature with a descriptive error', () => {
    expect(() => gradeHeatIllness({ signIds: ['dyspnoea'], temperatureC: 410 })).toThrow(/410/);
  });
});

describe('gradeHeatIllness — fatality observed in the validation cohort', () => {
  it('mild: 1 of 66 died (1.52%)', () => {
    const [figure] = gradeHeatIllness({ signIds: ['lethargy'], temperatureC: 39.5 }).cohort;
    expect(figure).toMatchObject({ cases: 66, deathsAllCauses: 1, allCausePercent: 1.52 });
  });

  it('moderate below 41 °C: 10 of 126 (7.94%)', () => {
    const [figure] = gradeHeatIllness({ signIds: ['dyspnoea'], temperatureC: 40.2 }).cohort;
    expect(figure).toMatchObject({ cases: 126, deathsAllCauses: 10, allCausePercent: 7.94 });
  });

  it('moderate at 41 °C or above: 6 of 31 (19.35%)', () => {
    const [figure] = gradeHeatIllness({ signIds: ['dyspnoea'], temperatureC: 41.4 }).cohort;
    expect(figure).toMatchObject({ cases: 31, deathsAllCauses: 6, allCausePercent: 19.35 });
  });

  it('severe below 41 °C: 30 of 122 (24.59%); at 41 °C or above: 44 of 77 (57.14%)', () => {
    const below = gradeHeatIllness({ signIds: ['ataxia'], temperatureC: 39 }).cohort[0];
    const above = gradeHeatIllness({ signIds: ['ataxia'], temperatureC: 42 }).cohort[0];
    expect(below).toMatchObject({ cases: 122, deathsAllCauses: 30, allCausePercent: 24.59 });
    expect(above).toMatchObject({ cases: 77, deathsAllCauses: 44, allCausePercent: 57.14 });
  });

  it('reports both temperature sub-groups when no temperature was taken', () => {
    const { cohort } = gradeHeatIllness({ signIds: ['ataxia'] });
    expect(cohort.map((figure) => figure.cases)).toEqual([122, 77]);
  });

  it('reports nothing when there is no grade', () => {
    expect(gradeHeatIllness({ signIds: [] }).cohort).toEqual([]);
  });
});

describe('heat-illness sign list', () => {
  it('has unique ids', () => {
    const ids = HEAT_SIGNS.map((sign) => sign.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('rejects an unknown sign id rather than ignoring it', () => {
    expect(() => gradeHeatIllness({ signIds: ['sunburn'] })).toThrow(/sunburn/);
  });
});
