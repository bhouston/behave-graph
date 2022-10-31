import { ValueType } from '../../../Values/ValueType.js';
import { Vec3, Vec3JSON, vec3Parse } from './Internal/Vec3.js';

export const Vec3Value = new ValueType(
  'vec3',
  () => new Vec3(),
  (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value.x, value.y, value.z),
  (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
);
