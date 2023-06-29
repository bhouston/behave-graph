import { ValueType } from '../../../Values/ValueType.js';

export const StringValue = new ValueType(
  'string',
  () => '',
  (value: string) => value,
  (value: string) => value,
  (start: string, end: string, t: number) => (t < 0.5 ? start : end)
);
