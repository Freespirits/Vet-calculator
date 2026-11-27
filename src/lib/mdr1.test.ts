import { describe, it, expect } from 'vitest';
import { assessMdr1, pgpCoAdministration, type Mdr1Query } from './mdr1';
import { MDR1_BREEDS, MDR1_DRUG_RULES } from '../data/mdr1';
import { DRUG_DATABASE } from '../data/drugDatabase';

const dog = (overrides: Partial<Mdr1Query>): Mdr1Query => ({
  species: 'dog',
  drugId: 'loperamide',
  breedId: null,
  genotype: 'unknown',
  ...overrides,
});

describe('assessMdr1 — which drugs it speaks about', () => {
  it('says nothing for a drug with no published MDR1 evidence', () => {
    expect(assessMdr1(dog({ drugId: 'amoxicillin' }))).toBeNull();
    expect(assessMdr1(dog({ drugId: null }))).toBeNull();
  });

  it('does not carry canine evidence over to cats', () => {
    expect(assessMdr1({ species: 'cat', drugId: 'loperamide', breedId: null, genotype: 'unknown' })).toBeNull();
  });
});

describe('assessMdr1 — genotype known', () => {
  it('loperamide with two copies: danger, use an alternative, no reduced dose offered', () => {
    const result = assessMdr1(dog({ genotype: 'two-copies' }));
    expect(result?.level).toBe('danger');
    expect(result?.rule.guidance).toBe('avoid');
    expect(result?.reductionPercent).toBeUndefined();
  });

  it('apomorphine with one copy is still "use an alternative"', () => {
    const result = assessMdr1(dog({ drugId: 'apomorphine', genotype: 'one-copy' }));
    expect(result?.level).toBe('danger');
    expect(result?.rule.guidance).toBe('avoid');
  });

  it('acepromazine: 25% starting reduction with one copy, 50% with two', () => {
    const oneCopy = assessMdr1(dog({ drugId: 'acepromazine', genotype: 'one-copy' }));
    const twoCopies = assessMdr1(dog({ drugId: 'acepromazine', genotype: 'two-copies' }));
    expect(oneCopy).toMatchObject({ level: 'warning', reductionPercent: 25 });
    expect(twoCopies).toMatchObject({ level: 'danger', reductionPercent: 50 });
  });

  it('a normal/normal genotype clears the MDR1 concern', () => {
    const result = assessMdr1(dog({ genotype: 'normal', breedId: 'collie' }));
    expect(result?.level).toBe('none');
    expect(result?.reductionPercent).toBeUndefined();
  });

  it('a drug supported only by a case report asks for monitoring, not a dose rule', () => {
    const result = assessMdr1(dog({ drugId: 'digoxin', genotype: 'two-copies' }));
    expect(result).toMatchObject({ level: 'warning' });
    expect(result?.rule.guidance).toBe('monitor');
    expect(result?.reductionPercent).toBeUndefined();
  });
});

describe('assessMdr1 — genotype unknown', () => {
  it('warns for an at-risk breed and reports its published frequency', () => {
    const result = assessMdr1(dog({ breedId: 'collie' }));
    expect(result?.level).toBe('warning');
    expect(result?.breed?.frequencyText).toBe('70%');
  });

  it('adds the Israeli allele frequency where one was published', () => {
    expect(assessMdr1(dog({ breedId: 'australian_shepherd' }))?.breed?.israelAllelePercent).toBe(31);
    expect(assessMdr1(dog({ breedId: 'collie' }))?.breed?.israelAllelePercent).toBe(28);
  });

  it('is only informational when no breed is given', () => {
    expect(assessMdr1(dog({ breedId: null }))?.level).toBe('info');
  });

  it('never offers a dose reduction without a genotype', () => {
    expect(assessMdr1(dog({ drugId: 'acepromazine', breedId: 'collie' }))?.reductionPercent).toBeUndefined();
  });

  it('throws a descriptive error for a breed id that does not exist', () => {
    expect(() => assessMdr1(dog({ breedId: 'unicorn' }))).toThrow(/unicorn/);
  });
});

describe('assessMdr1 — reassuring evidence', () => {
  it('fluralaner is reported as studied without adverse events, whatever the genotype', () => {
    const result = assessMdr1(dog({ drugId: 'fluralaner', genotype: 'two-copies' }));
    expect(result?.level).toBe('info');
    expect(result?.rule.guidance).toBe('studied-safe');
  });
});

describe('assessMdr1 — cats', () => {
  it('ivermectin in a cat of unknown genotype is informational', () => {
    const result = assessMdr1({ species: 'cat', drugId: 'ivermectin', breedId: null, genotype: 'unknown' });
    expect(result?.level).toBe('info');
  });

  it('ivermectin in a cat with two copies is a warning (case reports only, no published "avoid" guidance)', () => {
    const result = assessMdr1({ species: 'cat', drugId: 'ivermectin', breedId: null, genotype: 'two-copies' });
    expect(result?.level).toBe('warning');
    expect(result?.rule.guidance).toBe('monitor');
  });

  it('ignores a dog breed id when the patient is a cat', () => {
    const result = assessMdr1({ species: 'cat', drugId: 'ivermectin', breedId: 'collie', genotype: 'unknown' });
    expect(result?.breed).toBeUndefined();
    expect(result?.level).toBe('info');
  });
});

describe('pgpCoAdministration', () => {
  it('flags two P-glycoprotein substrates given together', () => {
    expect(pgpCoAdministration(['ketoconazole', 'ivermectin', 'amoxicillin'])).toEqual(['ketoconazole', 'ivermectin']);
  });

  it('is silent for a single substrate or a repeated one', () => {
    expect(pgpCoAdministration(['ivermectin', 'amoxicillin'])).toEqual([]);
    expect(pgpCoAdministration(['ivermectin', 'ivermectin'])).toEqual([]);
  });
});

describe('MDR1 data integrity', () => {
  it('every rule points at a drug that exists in the drug database', () => {
    const knownIds = new Set(DRUG_DATABASE.map((drug) => drug.id));
    for (const rule of MDR1_DRUG_RULES) {
      expect(knownIds.has(rule.drugId), `unknown drug id "${rule.drugId}"`).toBe(true);
    }
  });

  it('every rule cites at least one source', () => {
    for (const rule of MDR1_DRUG_RULES) {
      expect(rule.sources.length, `rule ${rule.drugId} has no source`).toBeGreaterThan(0);
    }
  });

  it('breed ids are unique', () => {
    const ids = MDR1_BREEDS.map((breed) => breed.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
