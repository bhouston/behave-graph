import { ValueType } from '../../../Values/ValueType';
import {
  Mat4,
  mat4Equals,
  Mat4JSON,
  mat4Mix,
  mat4Parse
} from './Internal/Mat4';

export const Mat4Value = new ValueType(
  'mat4',
  () => new Mat4(),
  (value: string | Mat4JSON) =>
    typeof value === 'string' ? mat4Parse(value) : new Mat4(value),
  (value) => value.elements as Mat4JSON,
  (start: Mat4, end: Mat4, t: number) => mat4Mix(start, end, t),
  (a: Mat4, b: Mat4) => mat4Equals(a, b),
  (value: Mat4) => value.clone()
);
