import { ValueType } from '../../../Values/ValueType';
import { ColorJSON, Vec3, vec3Mix, vec3Parse } from './Internal/Vec3';

export const ColorValue = new ValueType(
  'color',
  () => new Vec3(),
  (value: string | ColorJSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value.r, value.g, value.b),
  (value) => ({ r: value.x, g: value.y, b: value.z } as ColorJSON),
  (start: Vec3, end: Vec3, t: number) => vec3Mix(start, end, t)
);
