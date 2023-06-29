import { ValueType } from '../../../Values/ValueType.js';
import { Vec2, Vec2JSON, vec2Mix, vec2Parse } from './Internal/Vec2.js';

export const Vec2Value = new ValueType(
  'vec2',
  () => new Vec2(),
  (value: string | Vec2JSON) =>
    typeof value === 'string' ? vec2Parse(value) : new Vec2(value[0], value[1]),
  (value) => [value.x, value.y] as Vec2JSON,
  (start: Vec2, end: Vec2, t: number) => vec2Mix(start, end, t)
);
