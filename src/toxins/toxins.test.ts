import { describe, it, expect } from 'vitest';
import { computeXylitol } from './xylitol/calc';
import { computeAllium } from './allium/calc';
import { computeMacadamia } from './macadamia/calc';
import { computeAcetaminophen } from './acetaminophen/calc';
import { computeIbuprofen } from './ibuprofen/calc';
import { computeGrapes } from './grapes/calc';
import { computeLily } from './lily/calc';

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
