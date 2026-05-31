import { describe, it, expect } from 'vitest';
import { getDrugByName } from './drugDatabase';

describe('getDrugByName', () => {
  // Canonical names must keep working (regression guard).
  it('resolves the English name', () => {
    expect(getDrugByName('Carprofen')?.id).toBe('carprofen');
  });

  it('resolves the Hebrew name', () => {
    expect(getDrugByName('קרפרופן')?.id).toBe('carprofen');
  });

  // The reported bug: a brand / commercial ("given") name must resolve to its
  // drug so the Plumb's reference (ייחוס) panel can render.
  it('resolves an English brand name (Rimadyl → Carprofen)', () => {
    expect(getDrugByName('Rimadyl')?.id).toBe('carprofen');
  });

  it('resolves a Hebrew brand name (רימדיל → Carprofen)', () => {
    expect(getDrugByName('רימדיל')?.id).toBe('carprofen');
  });

  it('matches brand names case-insensitively (rimadyl → Carprofen)', () => {
    expect(getDrugByName('rimadyl')?.id).toBe('carprofen');
  });

  // The Hebrew generic name is a distinct field that was also unsearchable.
  it('resolves the Hebrew generic name (genericNameHe)', () => {
    expect(getDrugByName('אמוקסיצילין-חומצה קלבולנית')?.id).toBe('amoxicillin_clavulanate');
  });

  it('returns null for an unknown name', () => {
    expect(getDrugByName('NotARealDrug')).toBeNull();
  });

  // An empty / whitespace query must NOT match the first drug in the list.
  it('returns null for an empty query', () => {
    expect(getDrugByName('')).toBeNull();
    expect(getDrugByName('   ')).toBeNull();
  });
});
