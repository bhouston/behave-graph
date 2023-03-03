import { ValueType } from '@oveddan-behave-graph/core';

import { Vec3, Vec3JSON, vec3Mix, vec3Parse } from './Internal/Vec3';

export const ColorValue = new ValueType(
  'color',
  () => new Vec3(),
  (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value[0], value[1], value[2]),
  (value) => [value.x, value.y, value.z] as Vec3JSON,
  (start: Vec3, end: Vec3, t: number) => vec3Mix(start, end, t)
);
