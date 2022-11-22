import { ValueType } from '../../../Values/ValueType';

export const IntegerValue = new ValueType(
  'integer',
  () => BigInt(0),
  (value: string | number): bigint => BigInt(value),
  (value: bigint) =>
    Number.MIN_SAFE_INTEGER <= value && value <= Number.MAX_SAFE_INTEGER
      ? Number(value)
      : value.toString() // prefer string to ensure full range is covered
);
