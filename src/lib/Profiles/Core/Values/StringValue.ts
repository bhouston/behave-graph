import { ValueType } from '../../../Values/ValueType.js';

export const StringValue = new ValueType(
  'string',
  () => '',
  (value: string) => value,
  (value: string) => value
);
