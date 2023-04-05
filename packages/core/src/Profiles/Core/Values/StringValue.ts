import { ValueType } from '../../../Values/ValueType';

export const StringValue: ValueType = {
  name: 'string',
  creator: () => '',
  deserialize: (value: string) => value,
  serialize: (value: string) => value,
  lerp: (start: string, end: string, t: number) => (t < 0.5 ? start : end),
  equals: (a: string, b: string) => a === b,
  clone: (value: string) => value
};
