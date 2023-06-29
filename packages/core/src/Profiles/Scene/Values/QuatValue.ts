import { ValueType } from '../../../Values/ValueType.js';
import { quatSlerp, Vec4, Vec4JSON, vec4Parse } from './Internal/Vec4.js';

export const QuatValue = new ValueType(
  'quat',
  () => new Vec4(),
  (value: string | Vec4JSON) =>
    typeof value === 'string'
      ? vec4Parse(value)
      : new Vec4(value[0], value[1], value[2], value[3]),
  (value) => [value.x, value.y, value.z, value.w] as Vec4JSON,
  (start: Vec4, end: Vec4, t: number) => quatSlerp(start, end, t)
);
