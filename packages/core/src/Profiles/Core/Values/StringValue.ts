import { ValueType } from '../../../Values/ValueType';

export const StringValue = new ValueType(
  'string',
  () => '',
  (value: string) => value,
  (value: string) => value
);
