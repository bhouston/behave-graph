import { ValueType } from '../../../Values/ValueType.js';

export const IntegerValue = new ValueType(
  'integer',
  () => 0n,
  (value: string | number): bigint => BigInt(value),
  (value: bigint) =>
    Number.MIN_SAFE_INTEGER <= value && value <= Number.MAX_SAFE_INTEGER
      ? Number(value)
      : value.toString() // prefer string to ensure full range is covered
);
