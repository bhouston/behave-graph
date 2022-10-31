import { ValueType } from '../../../Values/ValueType.js';
import { Vec2, Vec2JSON, vec2Parse } from './Internal/Vec2.js';

export const Vec2Value = new ValueType(
  'vec2',
  () => new Vec2(),
  (value: string | Vec2JSON) =>
    typeof value === 'string' ? vec2Parse(value) : new Vec2(value.x, value.y),
  (value) => ({ x: value.x, y: value.y } as Vec2JSON)
);
