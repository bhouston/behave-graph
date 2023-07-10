import { ValueType } from '../../../Values/ValueType.js';
import {
  Vec4,
  vec4Equals,
  Vec4JSON,
  vec4Mix,
  vec4Parse
} from './Internal/Vec4.js';

export const Vec4Value: ValueType = {
  name: 'vec4',
  creator: () => new Vec4(),
  deserialize: (value: string | Vec4JSON) =>
    typeof value === 'string'
      ? vec4Parse(value)
      : new Vec4(value[0], value[1], value[2], value[3]),
  serialize: (value) => [value.x, value.y, value.z, value.w] as Vec4JSON,
  lerp: (start: Vec4, end: Vec4, t: number) => vec4Mix(start, end, t),
  equals: (a: Vec4, b: Vec4) => vec4Equals(a, b),
  clone: (value: Vec4) => value.clone()
};
