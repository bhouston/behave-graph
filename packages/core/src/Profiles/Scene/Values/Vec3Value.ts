import { ValueType } from '../../../Values/ValueType';
import {
  Vec3,
  vec3Equals,
  Vec3JSON,
  vec3Mix,
  vec3Parse
} from './Internal/Vec3';

export const Vec3Value = new ValueType(
  'vec3',
  () => new Vec3(),
  (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value[0], value[1], value[2]),
  (value) => [value.x, value.y, value.z] as Vec3JSON,
  (start: Vec3, end: Vec3, t: number) => vec3Mix(start, end, t),
  (a: Vec3, b: Vec3) => vec3Equals(a, b),
  (value: Vec3) => value.clone()
);
