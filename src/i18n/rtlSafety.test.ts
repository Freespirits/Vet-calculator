/**
 * Right-to-left safety.
 *
 * Inside Hebrew (or Arabic) text the browser mirrors and repositions the
 * characters < > ≤ ≥. A threshold written "≥2 mg/kg" was seen on screen as
 * "2≤", which a reader can take for the opposite. Hebrew clinical text must
 * therefore spell comparisons out in words ("מעל", "ומעלה", "מתחת ל-"), or
 * wrap the left-to-right fragment in isolate marks (U+2066 … U+2069).
 *
 * Two layers of protection:
 *  1. the three calculators where the problem was found are checked through
 *     their real output, and for the wording that replaced each symbol;
 *  2. a sweep over every source file fails on any Hebrew string literal that
 *     still carries a bare comparison symbol, so the hazard cannot return in
 *     text nobody thought to test.
 */
import { describe, it, expect } from 'vitest';
import { computeAcetaminophen } from '../toxins/acetaminophen/calc';
import { computeCholecalciferol } from '../toxins/cholecalciferol/calc';
import { computeThc } from '../toxins/thc/calc';

const COMPARISON_SYMBOL = /[<>≤≥]/;
const HEBREW_LETTER = /[֐-׿]/;

describe('Hebrew result text spells comparisons out', () => {
  it('acetaminophen (dog): thresholds read "above 100" and "above 200"', () => {
    const hebrew = computeAcetaminophen({ species: 'dog', weightKg: 10, mg: 500 }).context?.he ?? '';
    expect(hebrew).not.toMatch(COMPARISON_SYMBOL);
    expect(hebrew).toContain('הפטוטוקסיות מעל 100');
    expect(hebrew).toContain('מתמוגלובינמיה מעל 200');
  });

  it('cholecalciferol: thresholds read "above 0.1" and "2 and above"', () => {
    const hebrew = computeCholecalciferol({ weightKg: 10, mg: 1 }).context?.he ?? '';
    expect(hebrew).not.toMatch(COMPARISON_SYMBOL);
    expect(hebrew).toContain('מעל 0.1 מ"ג/ק"ג');
    expect(hebrew).toContain('2 מ"ג/ק"ג ומעלה');
  });

  it('THC: the minimum lethal dose reads "above 3 g/kg"', () => {
    const hebrew = computeThc({ species: 'dog', weightKg: 10, mgThc: 15 }).context?.he ?? '';
    expect(hebrew).not.toMatch(COMPARISON_SYMBOL);
    expect(hebrew).toContain('מעל 3 גרם/ק"ג');
  });

  it('leaves the English text, where the symbols read correctly, unchanged', () => {
    expect(computeAcetaminophen({ species: 'dog', weightKg: 10, mg: 500 }).context?.en).toContain('hepatotoxicity >100');
    expect(computeCholecalciferol({ weightKg: 10, mg: 1 }).context?.en).toContain('≥2 mg/kg');
    expect(computeThc({ species: 'dog', weightKg: 10, mgThc: 15 }).context?.en).toContain('(>3 g/kg)');
  });
});

/**
 * Text of every non-test source file under src/, keyed by its path relative
 * to this folder. Loaded through the bundler's glob import so the test needs
 * no Node file-system types.
 */
const SOURCE_FILES = import.meta.glob<string>(['../**/*.{ts,tsx}', '!../**/*.test.{ts,tsx}'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** String literals ('…', "…" or `…`) found in a source file, with their line numbers. */
function stringLiterals(source: string): { text: string; line: number }[] {
  const literal = /(['"`])((?:(?!\1)[^\\\n]|\\.)*)\1/g;
  return [...source.matchAll(literal)].map((match) => ({
    text: match[2],
    line: source.slice(0, match.index).split('\n').length,
  }));
}

/** Drops fragments already protected by isolate marks, written as escapes in source. */
function withoutIsolatedFragments(text: string): string {
  return text.replace(/\\u2066.*?\\u2069/g, '');
}

describe('no Hebrew string anywhere in the source carries a bare comparison symbol', () => {
  it('finds the source files to sweep', () => {
    const paths = Object.keys(SOURCE_FILES);
    expect(paths).toContain('../toxins/acetaminophen/calc.ts');
    expect(paths.some((path) => path.includes('.test.'))).toBe(false);
  });

  it('sweeps src/', () => {
    const offenders = Object.entries(SOURCE_FILES).flatMap(([path, source]) =>
      stringLiterals(source)
        .filter(({ text }) => HEBREW_LETTER.test(text) && COMPARISON_SYMBOL.test(withoutIsolatedFragments(text)))
        .map(({ text, line }) => `${path.replace('../', 'src/')}:${line}  ${text.slice(0, 70)}`),
    );
    expect(offenders, `Hebrew text with a symbol the browser will mirror:\n${offenders.join('\n')}`).toEqual([]);
  });
});
