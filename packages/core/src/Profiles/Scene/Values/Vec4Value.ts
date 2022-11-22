import { ValueType } from '../../../Values/ValueType';
import { Vec4, Vec4JSON, vec4Parse } from './Internal/Vec4';

export const Vec4Value = new ValueType(
  'vec4',
  () => new Vec4(),
  (value: string | Vec4JSON) =>
    typeof value === 'string'
      ? vec4Parse(value)
      : new Vec4(value.x, value.y, value.z, value.w),
  (value) => ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
);
