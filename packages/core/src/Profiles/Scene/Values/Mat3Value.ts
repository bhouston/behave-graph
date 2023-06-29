import { ValueType } from '../../../Values/ValueType.js';
import { Mat3, Mat3JSON, mat3Mix, mat3Parse } from './Internal/Mat3.js';

export const Mat3Value = new ValueType(
  'mat3',
  () => new Mat3(),
  (value: string | Mat3JSON) =>
    typeof value === 'string' ? mat3Parse(value) : new Mat3(value),
  (value) => value.elements as Mat3JSON,
  (start: Mat3, end: Mat3, t: number) => mat3Mix(start, end, t)
);
