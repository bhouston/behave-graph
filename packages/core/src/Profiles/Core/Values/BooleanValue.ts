import { ValueType } from '../../../Values/ValueType.js';

export const BooleanValue: ValueType = {
  name: 'boolean',
  creator: () => false,
  deserialize: (value: string | boolean) =>
    typeof value === 'string' ? value.toLowerCase() === 'true' : value,
  serialize: (value: boolean) => value,
  lerp: (start: boolean, end: boolean, t: number) => (t < 0.5 ? start : end),
  equals: (a: boolean, b: boolean) => a === b,
  clone: (value: boolean) => value
};
