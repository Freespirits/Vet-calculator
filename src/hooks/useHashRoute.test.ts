import { describe, it, expect } from 'vitest';
import { parseHash, hashFor } from './useHashRoute';

describe('hash routes', () => {
  it('still resolves the existing tools', () => {
    expect(parseHash('#/tox/chocolate')).toEqual({ tool: 'toxins', sub: 'chocolate' });
    expect(parseHash('#/dosage')).toEqual({ tool: 'dosage', sub: null });
  });

  it('treats an unknown hash as "no route"', () => {
    expect(parseHash('#/nonsense')).toEqual({ tool: null, sub: null });
  });

  it('makes Code Blue deep-linkable at #/cpr', () => {
    expect(parseHash('#/cpr')).toEqual({ tool: 'cpr', sub: null });
    expect(hashFor('cpr')).toBe('#/cpr');
  });
});
