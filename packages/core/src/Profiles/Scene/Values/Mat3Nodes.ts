import { makeFunctionDesc } from '../../../Nodes/FunctionNode';
import {
  column3ToMat3,
  eulerToMat3,
  Mat3,
  mat3Add,
  mat3Determinant,
  mat3Equals,
  mat3Inverse,
  mat3Mix,
  mat3Multiply,
  mat3MultiplyByScalar,
  mat3Negate,
  mat3SetColumn3,
  mat3SetRow3,
  mat3Subtract,
  mat3ToScale2,
  mat3ToTranslation2,
  mat3Transpose,
  mat4ToMat3,
  scale2ToMat3,
  translation2ToMat3
} from './Internal/Mat3';

export const Constant = makeFunctionDesc({
  name: 'math/mat3',
  label: 'Mat3',
  in: ['mat3'],
  out: 'mat3',
  exec: (a: Mat3) => a
});

export const Column3ToMat3 = makeFunctionDesc({
  name: 'math/toMat3/column3',
  label: 'Columns to Mat3',
  in: ['vec3', 'vec3', 'vec3'],
  out: 'mat3',
  exec: column3ToMat3
});

export const SetColumn = makeFunctionDesc({
  name: 'math/setColumn/mat3',
  label: 'Set Column',
  in: ['mat3', 'integer', 'vec3'],
  out: 'mat3',
  exec: mat3SetColumn3
});

export const SetRow = makeFunctionDesc({
  name: 'math/setRow/mat3',
  label: 'Set Row',
  in: ['mat3', 'integer', 'vec3'],
  out: 'mat3',
  exec: mat3SetRow3
});

export const Elements = makeFunctionDesc({
  name: 'math/toVec3/mat3',
  label: 'Mat3 To Vec3',
  in: ['mat3'],
  out: [{ x: 'vec3' }, { y: 'vec3' }, { z: 'vec3' }],
  exec: (a: Mat3) => {
    throw new Error('not implemented');
  }
});

export const Add = makeFunctionDesc({
  name: 'math/add/mat3',
  label: '+',
  in: ['mat3', 'mat3'],
  out: 'mat3',
  exec: mat3Add
});

export const Subtract = makeFunctionDesc({
  name: 'math/subtract/mat3',
  label: '-',
  in: ['mat3', 'mat3'],
  out: 'mat3',
  exec: mat3Subtract
});

export const Negate = makeFunctionDesc({
  name: 'math/negate/mat3',
  label: '-',
  in: ['mat3'],
  out: 'mat3',
  exec: mat3Negate
});

export const Scale = makeFunctionDesc({
  name: 'math/scale/mat3',
  label: '×',
  in: ['mat3', 'float'],
  out: 'mat3',
  exec: mat3MultiplyByScalar
});

export const Determinant = makeFunctionDesc({
  name: 'math/determinant/mat3',
  label: 'Determinant',
  in: ['mat3'],
  out: 'float',
  exec: mat3Determinant
});

export const Inverse = makeFunctionDesc({
  name: 'math/inverse/mat3',
  label: 'Inverse',
  in: ['mat3'],
  out: 'mat3',
  exec: mat3Inverse
});

export const Mat4ToMat3 = makeFunctionDesc({
  name: 'math/toMat3/mat4',
  label: 'Mat4 To Mat3',
  in: ['mat4'],
  out: 'mat3',
  exec: mat4ToMat3
});

export const Transpose = makeFunctionDesc({
  name: 'math/transpose/mat3',
  label: 'Transpose',
  in: ['mat3'],
  out: 'mat3',
  exec: mat3Transpose
});

export const Multiply = makeFunctionDesc({
  name: 'math/multiply/mat3',
  label: 'Cross',
  in: ['mat3', 'mat3'],
  out: 'mat3',
  exec: mat3Multiply
});

export const Mix = makeFunctionDesc({
  name: 'math/mix/mat3',
  label: '÷',
  in: [{ a: 'mat3' }, { b: 'mat3' }, { t: 'float' }],
  out: 'mat3',
  exec: mat3Mix
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/mat3',
  label: '=',
  in: [{ a: 'mat3' }, { b: 'mat3' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: mat3Equals
});

export const EulerToMat3 = makeFunctionDesc({
  name: 'math/toMat3/euler',
  label: 'To Mat3',
  in: ['euler'],
  out: 'mat3',
  exec: eulerToMat3
});

export const QuatToMat3 = makeFunctionDesc({
  name: 'math/toMat3/quat',
  label: 'To Mat3',
  in: ['quat'],
  out: 'mat3',
  exec: eulerToMat3
});

export const Scale2ToMat3 = makeFunctionDesc({
  name: 'math/toMat3/scale2',
  label: 'Scale2 To Mat3',
  in: ['vec2'],
  out: 'mat3',
  exec: scale2ToMat3
});

export const Mat3ToScale2 = makeFunctionDesc({
  name: 'math/toScale2/mat3',
  label: 'Mat3 to Scale2',
  in: ['mat3'],
  out: 'vec2',
  exec: mat3ToScale2
});

export const Translation2ToMat3 = makeFunctionDesc({
  name: 'math/toMat3/translation2',
  label: 'Translation2 To Mat3',
  in: ['vec2'],
  out: 'mat3',
  exec: translation2ToMat3
});

export const Mat3ToTranslation3 = makeFunctionDesc({
  name: 'math/toTranslation2/mat3',
  label: 'Mat3 to Translation2',
  in: ['mat3'],
  out: 'vec2',
  exec: mat3ToTranslation2
});
