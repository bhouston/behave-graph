import { ValueType } from '../../../Values/ValueType.js';
import { Vec4, Vec4JSON, vec4Parse } from './Internal/Vec4.js';

export const QuatValue = new ValueType(
  'quat',
  () => new Vec4(),
  (value: string | Vec4JSON) =>
    typeof value === 'string'
      ? vec4Parse(value)
      : new Vec4(value.x, value.y, value.z, value.w),
  (value) => ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
);
