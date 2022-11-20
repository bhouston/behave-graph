import { ValueType } from '../../../Values/ValueType.js';
import { ColorJSON, Vec3, vec3Parse } from './Internal/Vec3.js';

export const ColorValue = new ValueType(
  'color',
  () => new Vec3(),
  (value: string | ColorJSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value.r, value.g, value.b),
  (value) => ({ r: value.x, g: value.y, b: value.z } as ColorJSON)
);
