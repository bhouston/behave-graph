import { parseSafeFloat } from '../../../parseFloats.js';
import { ValueType } from '../../../Values/ValueType.js';

export const FloatValue = new ValueType(
  'float',
  () => 0,
  (value: string | number) =>
    typeof value === 'string' ? parseSafeFloat(value, 0) : value,
  (value: number) => value,
  (start: number, end: number, t: number) => start * (1 - t) + end * t
);
