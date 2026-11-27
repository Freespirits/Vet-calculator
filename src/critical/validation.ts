/**
 * Input guards for the bedside calculators. Each throws a RangeError that
 * names the field, the value it received and the accepted range, so a bad
 * entry is reported in words instead of producing a silently wrong number.
 */
export function assertInRange(value: number, minimum: number, maximum: number, field: string, context: string): void {
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    throw new RangeError(`${context}: ${field} must be between ${minimum} and ${maximum}, got ${value}.`);
  }
}

export function assertPositive(value: number, field: string, context: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${context}: ${field} must be a positive number, got ${value}.`);
  }
}
