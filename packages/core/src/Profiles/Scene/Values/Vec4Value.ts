import { ValueType } from '../../../Values/ValueType';
import { Vec4, Vec4JSON, vec4Mix, vec4Parse } from './Internal/Vec4';

export const Vec4Value = new ValueType(
  'vec4',
  () => new Vec4(),
  (value: string | Vec4JSON) =>
    typeof value === 'string'
      ? vec4Parse(value)
      : new Vec4(value[0], value[1], value[2], value[3]),
  (value) => [value.x, value.y, value.z, value.w] as Vec4JSON,
  (start: Vec4, end: Vec4, t: number) => vec4Mix(start, end, t)
);
