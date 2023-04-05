import { ValueType } from '../../../Values/ValueType';

export const IntegerValue: ValueType = {
  name: 'integer',
  creator: () => BigInt(0),
  deserialize: (value: string | number): bigint => BigInt(value),
  serialize: (value: bigint) =>
    Number.MIN_SAFE_INTEGER <= value && value <= Number.MAX_SAFE_INTEGER
      ? Number(value)
      : value.toString(), // prefer string to ensure full range is covered

  lerp: (start: bigint, end: bigint, t: number) =>
    BigInt(Number(start) * (1 - t) + Number(end) * t),
  equals: (a: bigint, b: bigint) => a === b,
  clone: (value: bigint) => value
};
