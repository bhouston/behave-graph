import { ValueType } from '../../../Values/ValueType.js';
import { Vec2, Vec2JSON, vec2Mix, vec2Parse } from './Internal/Vec2.js';

export const Vec2Value: ValueType = {
  name: 'vec2',
  creator: () => new Vec2(),
  deserialize: (value: string | Vec2JSON) =>
    typeof value === 'string' ? vec2Parse(value) : new Vec2(value[0], value[1]),
  serialize: (value) => [value.x, value.y] as Vec2JSON,
  lerp: (start: Vec2, end: Vec2, t: number) => vec2Mix(start, end, t),
  equals: (a: Vec2, b: Vec2) => a.x === b.x && a.y === b.y,
  clone: (value: Vec2) => value.clone()
};
