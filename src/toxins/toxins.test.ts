import { describe, it, expect } from 'vitest';
import { computeXylitol } from './xylitol/calc';
import { computeAllium } from './allium/calc';
import { computeMacadamia } from './macadamia/calc';
import { computeAcetaminophen } from './acetaminophen/calc';
import { computeIbuprofen } from './ibuprofen/calc';
import { computeGrapes } from './grapes/calc';
import { computeLily } from './lily/calc';
import { computeCaffeine } from './caffeine/calc';
import { computeEthyleneGlycol } from './ethyleneGlycol/calc';
import { computeThc } from './thc/calc';
import { computeCholecalciferol } from './cholecalciferol/calc';
import { computeAnticoagulant } from './anticoagulantRodenticide/calc';
import { computeBromethalin } from './bromethalin/calc';

describe('xylitol (dog)', () => {
  it('bands: <100 minimal, 100–500 severe, >500 critical', () => {
    expect(computeXylitol({ weightKg: 10, xylitolMg: 900 }).level).toBe('minimal');
    expect(computeXylitol({ weightKg: 10, xylitolMg: 2000 }).level).toBe('severe');
    expect(computeXylitol({ weightKg: 10, xylitolMg: 6000 }).level).toBe('critical');
    expect(computeXylitol({ weightKg: 10, xylitolMg: 2000 }).emergency).toBe(true);
  });
});

describe('allium', () => {
  it('garlic potency (×4) pushes a dog into the severe band', () => {
    const r = computeAllium({ species: 'dog', weightKg: 10, grams: 100, formId: 'garlic' });
    expect(r.doseLabel).toBe('40.0 g/kg'); // 10 g/kg × 4
    expect(r.level).toBe('severe');
  });
  it('cats are more sensitive than dogs at the same onion dose', () => {
    const dog = computeAllium({ species: 'dog', weightKg: 10, grams: 100, formId: 'onion' });
    const cat = computeAllium({ species: 'cat', weightKg: 10, grams: 100, formId: 'onion' });
    expect(dog.level).toBe('mild'); // 10 g/kg → dog 5–15
    expect(cat.level).toBe('moderate'); // 10 g/kg → cat 5–15
  });
});

describe('macadamia (dog)', () => {
  it('signs from 2.4 g/kg', () => {
    expect(computeMacadamia({ weightKg: 10, grams: 5 }).level).toBe('minimal'); // 0.5 g/kg
    expect(computeMacadamia({ weightKg: 10, grams: 24 }).level).toBe('moderate'); // 2.4 g/kg
    expect(computeMacadamia({ weightKg: 10, grams: 24 }).emergency).toBe(false);
  });
});

describe('acetaminophen', () => {
  it('one 325 mg tablet in a 4 kg cat is critical + emergency', () => {
    const r = computeAcetaminophen({ species: 'cat', weightKg: 4, mg: 325 });
    expect(r.doseLabel).toBe('81 mg/kg');
    expect(r.level).toBe('critical');
    expect(r.emergency).toBe(true);
  });
  it('dog hepatotoxic threshold at 100 mg/kg', () => {
    expect(computeAcetaminophen({ species: 'dog', weightKg: 10, mg: 500 }).level).toBe('minimal'); // 50
    expect(computeAcetaminophen({ species: 'dog', weightKg: 10, mg: 1500 }).level).toBe('moderate'); // 150
  });
});

describe('ibuprofen', () => {
  it('dog renal-risk band above 175 mg/kg', () => {
    expect(computeIbuprofen({ species: 'dog', weightKg: 10, mg: 200 }).level).toBe('minimal'); // 20
    expect(computeIbuprofen({ species: 'dog', weightKg: 10, mg: 2000 }).level).toBe('severe'); // 200
  });
  it('cats reach severe at half the dog dose', () => {
    // 100 mg/kg: dog mild, cat severe (>87.5)
    expect(computeIbuprofen({ species: 'dog', weightKg: 10, mg: 1000 }).level).toBe('mild');
    expect(computeIbuprofen({ species: 'cat', weightKg: 10, mg: 1000 }).level).toBe('severe');
  });
});

describe('caffeine', () => {
  it('dog bands: <20 minimal, 20–40 mild, ≥60 severe', () => {
    expect(computeCaffeine({ species: 'dog', weightKg: 10, mg: 150 }).level).toBe('minimal'); // 15
    expect(computeCaffeine({ species: 'dog', weightKg: 10, mg: 300 }).level).toBe('mild'); // 30
    expect(computeCaffeine({ species: 'dog', weightKg: 10, mg: 700 }).level).toBe('severe'); // 70
    expect(computeCaffeine({ species: 'dog', weightKg: 10, mg: 700 }).emergency).toBe(true);
  });
  it('cats reach a band at a lower dose than dogs', () => {
    // 18 mg/kg: dog minimal (<20), cat mild (>15)
    expect(computeCaffeine({ species: 'dog', weightKg: 10, mg: 180 }).level).toBe('minimal');
    expect(computeCaffeine({ species: 'cat', weightKg: 10, mg: 180 }).level).toBe('mild');
  });
});

describe('ethylene glycol', () => {
  it('is always an emergency, even at a fraction of the lethal dose', () => {
    // 4 kg cat, 1 mL of 95% antifreeze → 0.95 mL EG → 0.2375 mL/kg (~16% of 1.5 MLD)
    const r = computeEthyleneGlycol({ species: 'cat', weightKg: 4, mlProduct: 1, percentEg: 95 });
    expect(r.emergency).toBe(true);
    expect(r.level).toBe('moderate');
  });
  it('cats cross into critical at a much smaller volume than dogs', () => {
    const cat = computeEthyleneGlycol({ species: 'cat', weightKg: 4, mlProduct: 5, percentEg: 95 });
    const dog = computeEthyleneGlycol({ species: 'dog', weightKg: 4, mlProduct: 5, percentEg: 95 });
    expect(cat.level).toBe('critical'); // 1.19 mL/kg ≈ 0.79× cat MLD
    expect(dog.level).toBe('severe'); // 1.19 mL/kg ≈ 0.27× dog MLD
  });
});

describe('THC', () => {
  it('signs band begins ~0.5 mg/kg; high dose is severe + emergency', () => {
    expect(computeThc({ species: 'dog', weightKg: 10, mgThc: 4 }).level).toBe('minimal'); // 0.4
    expect(computeThc({ species: 'dog', weightKg: 10, mgThc: 15 }).level).toBe('mild'); // 1.5
    expect(computeThc({ species: 'dog', weightKg: 10, mgThc: 100 }).level).toBe('severe'); // 10
    expect(computeThc({ species: 'dog', weightKg: 10, mgThc: 100 }).emergency).toBe(true);
  });
});

describe('cholecalciferol', () => {
  it('toxic from 0.1 mg/kg (emergency); ≥2 mg/kg critical', () => {
    expect(computeCholecalciferol({ weightKg: 10, mg: 0.5 }).level).toBe('minimal'); // 0.05
    expect(computeCholecalciferol({ weightKg: 10, mg: 0.5 }).emergency).toBe(false);
    expect(computeCholecalciferol({ weightKg: 10, mg: 2 }).level).toBe('moderate'); // 0.2
    expect(computeCholecalciferol({ weightKg: 10, mg: 2 }).emergency).toBe(true);
    expect(computeCholecalciferol({ weightKg: 10, mg: 25 }).level).toBe('critical'); // 2.5
  });
});

describe('anticoagulant rodenticide', () => {
  it('bands scale to the chosen agent threshold', () => {
    // brodifacoum threshold 0.2 mg/kg. 10 kg dog, 1 mg active → 0.1 mg/kg = 0.5× → moderate
    expect(
      computeAnticoagulant({ species: 'dog', weightKg: 10, mgActive: 1, thresholdMgPerKg: 0.2 }).level,
    ).toBe('moderate');
    // 0.05 mg/kg = 0.25× → minimal
    expect(
      computeAnticoagulant({ species: 'dog', weightKg: 10, mgActive: 0.5, thresholdMgPerKg: 0.2 }).level,
    ).toBe('minimal');
    // 2 mg/kg = 10× → critical + emergency
    const hi = computeAnticoagulant({ species: 'dog', weightKg: 10, mgActive: 20, thresholdMgPerKg: 0.2 });
    expect(hi.level).toBe('critical');
    expect(hi.emergency).toBe(true);
  });
});

describe('bromethalin', () => {
  it('cats cross treatment threshold at ~1/5 the dog dose', () => {
    // 0.05 mg/kg: dog minimal (<0.1), cat moderate (>0.022)
    expect(computeBromethalin({ species: 'dog', weightKg: 10, mg: 0.5 }).level).toBe('minimal');
    expect(computeBromethalin({ species: 'cat', weightKg: 10, mg: 0.5 }).level).toBe('moderate');
    // 0.2 mg/kg: still minimal for a dog, but critical (≥0.165) for a cat
    expect(computeBromethalin({ species: 'dog', weightKg: 10, mg: 2 }).level).toBe('moderate');
    expect(computeBromethalin({ species: 'cat', weightKg: 10, mg: 2 }).level).toBe('critical');
    expect(computeBromethalin({ species: 'cat', weightKg: 10, mg: 2 }).emergency).toBe(true);
  });
});

describe('idiosyncratic toxins never read "safe"', () => {
  it('grapes are always idiosyncratic + emergency', () => {
    const r = computeGrapes({ typeId: 'raisins', weightKg: 10, grams: 5 });
    expect(r.idiosyncratic).toBe(true);
    expect(r.emergency).toBe(true);
    expect(r.level).toBe('critical');
  });
  it('true lily is an emergency; imposter lily is not', () => {
    expect(computeLily('nephrotoxic').emergency).toBe(true);
    expect(computeLily('nephrotoxic').idiosyncratic).toBe(true);
    expect(computeLily('oxalate').emergency).toBe(false);
    expect(computeLily('oxalate').level).toBe('mild');
  });
});
