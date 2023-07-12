import { ValueType } from '@behave-graph/core';

import {
  Vec3,
  vec3Equals,
  Vec3JSON,
  vec3Mix,
  vec3Parse
} from './Internal/Vec3.js';

export const Vec3Value: ValueType = {
  name: 'vec3',
  creator: () => new Vec3(),
  deserialize: (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value[0], value[1], value[2]),
  serialize: (value) => [value.x, value.y, value.z] as Vec3JSON,
  lerp: (start: Vec3, end: Vec3, t: number) => vec3Mix(start, end, t),
  equals: (a: Vec3, b: Vec3) => vec3Equals(a, b),
  clone: (value: Vec3) => value.clone()
};
