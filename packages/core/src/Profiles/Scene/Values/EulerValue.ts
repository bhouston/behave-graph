import { ValueType } from '../../../Values/ValueType';
import { Vec3, Vec3JSON, vec3Parse } from './Internal/Vec3';

export const EulerValue = new ValueType(
  'euler',
  () => new Vec3(),
  (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value.x, value.y, value.z),
  (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
);
