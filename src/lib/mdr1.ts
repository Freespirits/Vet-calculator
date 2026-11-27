/**
 * MDR1 check — turns the published evidence in `data/mdr1.ts` into one
 * assessment for a patient + drug.
 *
 * `assessMdr1` returns null when there is no species-specific published
 * evidence for the drug. Otherwise it returns the matching rule plus a level:
 *
 *   genotype      avoid     reduce    dose-dependent  monitor   studied-safe
 *   two copies    danger    danger    danger          warning   info
 *   one copy      danger    warning   warning         warning   info
 *   normal        none      none      none            none      info
 *   unknown       warning if the breed is on the published at-risk list,
 *                 otherwise info (studied-safe stays info)
 *
 * A starting dose reduction (25% with one copy, 50% with two — Mealey et al.
 * 2023) is reported ONLY for `reduce` drugs and ONLY when the genotype is
 * known; it is never inferred from breed alone.
 *
 * `pgpCoAdministration` lists the P-glycoprotein substrates in a medication
 * list when there are two or more different ones (competitive inhibition can
 * cause acquired dysfunction in any dog).
 */
import type { Species } from '../types';
import {
  MDR1_BREEDS,
  MDR1_DRUG_RULES,
  PGP_SUBSTRATE_DRUG_IDS,
  type Mdr1Breed,
  type Mdr1DrugRule,
  type Mdr1Genotype,
  type Mdr1Guidance,
} from '../data/mdr1';

export interface Mdr1Query {
  species: Species;
  drugId: string | null;
  /** Id in MDR1_BREEDS, or null when not specified / not on the list. */
  breedId: string | null;
  genotype: Mdr1Genotype;
}

export type Mdr1Level = 'none' | 'info' | 'warning' | 'danger';

export interface Mdr1Assessment {
  level: Mdr1Level;
  rule: Mdr1DrugRule;
  genotype: Mdr1Genotype;
  /** Present only for a listed breed. */
  breed?: Mdr1Breed;
  /** Starting dose reduction; only for `reduce` drugs with a known mutant genotype. */
  reductionPercent?: 25 | 50;
}

const LEVEL_BY_COPIES: Record<'one-copy' | 'two-copies', Record<Mdr1Guidance, Mdr1Level>> = {
  'two-copies': { avoid: 'danger', reduce: 'danger', 'dose-dependent': 'danger', monitor: 'warning', 'studied-safe': 'info' },
  'one-copy': { avoid: 'danger', reduce: 'warning', 'dose-dependent': 'warning', monitor: 'warning', 'studied-safe': 'info' },
};

function findBreed(breedId: string | null): Mdr1Breed | undefined {
  if (breedId === null) return undefined;
  const breed = MDR1_BREEDS.find((candidate) => candidate.id === breedId);
  if (!breed) {
    const known = MDR1_BREEDS.map((candidate) => candidate.id).join(', ');
    throw new Error(`MDR1 check: unknown breed id "${breedId}". Known ids: ${known}.`);
  }
  return breed;
}

function levelFor(guidance: Mdr1Guidance, genotype: Mdr1Genotype, breed: Mdr1Breed | undefined): Mdr1Level {
  if (guidance === 'studied-safe') return 'info';
  if (genotype === 'normal') return 'none';
  if (genotype === 'unknown') return breed ? 'warning' : 'info';
  return LEVEL_BY_COPIES[genotype][guidance];
}

function reductionFor(guidance: Mdr1Guidance, genotype: Mdr1Genotype): 25 | 50 | undefined {
  if (guidance !== 'reduce') return undefined;
  if (genotype === 'one-copy') return 25;
  if (genotype === 'two-copies') return 50;
  return undefined;
}

export function assessMdr1(query: Mdr1Query): Mdr1Assessment | null {
  const rule = MDR1_DRUG_RULES.find(
    (candidate) => candidate.drugId === query.drugId && candidate.species === query.species,
  );
  if (!rule) return null;
  const breed = query.species === 'dog' ? findBreed(query.breedId) : undefined;
  const reductionPercent = reductionFor(rule.guidance, query.genotype);
  return {
    level: levelFor(rule.guidance, query.genotype, breed),
    rule,
    genotype: query.genotype,
    ...(breed ? { breed } : {}),
    ...(reductionPercent ? { reductionPercent } : {}),
  };
}

/** The distinct P-glycoprotein substrates in a medication list — empty unless there are at least two. */
export function pgpCoAdministration(drugIds: string[]): string[] {
  const substrates = [...new Set(drugIds)].filter((drugId) =>
    (PGP_SUBSTRATE_DRUG_IDS as readonly string[]).includes(drugId),
  );
  return substrates.length >= 2 ? substrates : [];
}
