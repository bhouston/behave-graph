import { FunctionDesc } from '../../../Nodes/FunctionNode';
import {
  column4ToMat4,
  eulerToMat4,
  mat3ToMat4,
  Mat4,
  mat4Add,
  mat4Adjoint,
  mat4Determinant,
  mat4Equals,
  mat4Inverse,
  mat4LookAt,
  mat4Mix,
  mat4Multiply,
  mat4MultiplyByScalar,
  mat4Negate,
  mat4Orthogonal,
  mat4OrthogonalSimple,
  mat4Perspective,
  mat4PerspectiveFov,
  mat4RotateByEuler,
  mat4RotateByQuat,
  mat4Scale,
  mat4SetColumn4,
  mat4SetRow4,
  mat4Subtract,
  mat4TransformNormal3,
  mat4TransformPoint3,
  mat4Translate,
  mat4Transpose,
  quatToMat4,
  scale3ToMat4,
  translation3ToMat4
} from './Internal/Mat4';

export const Constant = new FunctionDesc({
  name: 'math/mat4',
  label: 'Mat4',
  in: ['mat4'],
  out: 'mat4',
  exec: (a: Mat4) => a
});

export const Column4ToMat4 = new FunctionDesc({
  name: 'math/toMat4/column4',
  label: 'Columns to Mat4',
  in: ['vec4', 'vec4', 'vec4', 'vec4'],
  out: 'mat4',
  exec: column4ToMat4
});

export const SetColumn = new FunctionDesc({
  name: 'math/setColumn/mat4',
  label: 'Set Column',
  in: ['mat4', 'integer', 'vec4'],
  out: 'mat4',
  exec: mat4SetColumn4
});

export const SetRow = new FunctionDesc({
  name: 'math/setRow/mat4',
  label: 'Set Row',
  in: ['mat4', 'integer', 'vec4'],
  out: 'mat4',
  exec: mat4SetRow4
});

export const Elements = new FunctionDesc({
  name: 'math/toVec4/mat4',
  label: 'Mat4 To Vec4',
  in: ['mat4'],
  out: { x: 'vec4', y: 'vec4', z: 'vec4', w: 'vec4' },
  exec: () => {
    throw new Error('not implemented');
  }
});

export const Add = new FunctionDesc({
  name: 'math/add/mat4',
  label: '+',
  in: ['mat4', 'mat4'],
  out: 'mat4',
  exec: mat4Add
});

export const Subtract = new FunctionDesc({
  name: 'math/subtract/mat4',
  label: '-',
  in: ['mat4', 'mat4'],
  out: 'mat4',
  exec: mat4Subtract
});

export const Negate = new FunctionDesc({
  name: 'math/negate/mat4',
  label: '-',
  in: ['mat4'],
  out: 'mat4',
  exec: mat4Negate
});

export const MultiplyByScalar = new FunctionDesc({
  name: 'math/multiplyByScalar/mat4',
  label: '×',
  in: ['mat4', 'float'],
  out: 'mat4',
  exec: mat4MultiplyByScalar
});

export const Determinant = new FunctionDesc({
  name: 'math/determinant/mat4',
  label: 'Determinant',
  in: ['mat4'],
  out: 'float',
  exec: mat4Determinant
});

export const Adjoint = new FunctionDesc({
  name: 'math/adjoint/mat4',
  label: 'Adjoint',
  in: ['mat4'],
  out: 'mat4',
  exec: mat4Adjoint
});

export const Inverse = new FunctionDesc({
  name: 'math/inverse/mat4',
  label: 'Inverse',
  in: ['mat4'],
  out: 'mat4',
  exec: mat4Inverse
});

export const Transpose = new FunctionDesc({
  name: 'math/transpose/mat4',
  label: 'Transpose',
  in: ['mat4'],
  out: 'mat4',
  exec: mat4Transpose
});

export const Mat3ToMat4 = new FunctionDesc({
  name: 'math/toMat4/mat3',
  label: 'Mat3 To Mat4',
  in: ['mat3'],
  out: 'mat4',
  exec: mat3ToMat4
});

export const Scale3ToMat4 = new FunctionDesc({
  name: 'math/toMat4/scale3',
  label: 'Scale3 To Mat4',
  in: ['vec3'],
  out: 'mat4',
  exec: scale3ToMat4
});

export const Translate3ToMat4 = new FunctionDesc({
  name: 'math/toMat4/translate3',
  label: 'Translate3 To Mat4',
  in: ['vec3'],
  out: 'mat4',
  exec: translation3ToMat4
});

export const QuatToMat4 = new FunctionDesc({
  name: 'math/toMat4/quat',
  label: 'Quat To Mat4',
  in: ['quat'],
  out: 'mat4',
  exec: quatToMat4
});

export const EulerToMat4 = new FunctionDesc({
  name: 'math/toMat4/euler',
  label: 'Euler To Mat4',
  in: ['euler'],
  out: 'mat4',
  exec: eulerToMat4
});

export const Translate = new FunctionDesc({
  name: 'math/translate/mat4',
  label: 'Translate',
  in: ['mat4', 'vec3'],
  out: 'mat4',
  exec: mat4Translate
});

export const Scale = new FunctionDesc({
  name: 'math/scale/mat4',
  label: 'Scale',
  in: ['mat4', 'vec3'],
  out: 'mat4',
  exec: mat4Scale
});

export const RotateByQuat = new FunctionDesc({
  name: 'math/rotateByQuat/mat4',
  label: 'Rotate',
  in: ['mat4', 'quat'],
  out: 'mat4',
  exec: mat4RotateByQuat
});

export const RotateByEuler = new FunctionDesc({
  name: 'math/rotateByEuler/mat4',
  label: 'Rotate',
  in: ['mat4', 'euler'],
  out: 'mat4',
  exec: mat4RotateByEuler
});

export const Multiply = new FunctionDesc({
  name: 'math/multiply/mat4',
  label: 'Cross',
  in: ['mat4', 'mat4'],
  out: 'mat4',
  exec: mat4Multiply
});

export const Mix = new FunctionDesc({
  name: 'math/mix/mat4',
  label: '÷',
  in: { a: 'mat4', b: 'mat4', t: 'float' },
  out: 'mat4',
  exec: mat4Mix
});

export const Equal = new FunctionDesc({
  name: 'math/equal/mat4',
  label: '=',
  in: { a: 'mat4', b: 'mat4', tolerance: 'float' },
  out: 'boolean',
  exec: mat4Equals
});

export const TransformPoint3 = new FunctionDesc({
  name: 'math/transformPoint3/mat4',
  label: 'Transform Point3',
  in: ['mat4', 'vec3'],
  out: 'vec3',
  exec: mat4TransformPoint3
});

export const TransformNormal3 = new FunctionDesc({
  name: 'math/transformNormal3/mat4',
  label: 'Transform Normal',
  in: ['mat4', 'vec3'],
  out: 'vec3',
  exec: mat4TransformNormal3
});

export const Perspective = new FunctionDesc({
  name: 'math/perspective/mat4',
  label: 'Perspective',
  in: {
    left: 'float',
    right: 'float',
    top: 'float',
    bottom: 'float',
    near: 'float',
    far: 'float'
  },
  out: 'mat4',
  exec: mat4Perspective
});

export const PerspectiveFov = new FunctionDesc({
  name: 'math/perspectiveFov/mat4',
  label: 'Perspective FOV',
  in: {
    verticalFov: 'float',
    near: 'float',
    far: 'float',
    zoom: 'float',
    aspectRatio: 'float'
  },
  out: 'mat4',
  exec: mat4PerspectiveFov
});

export const Orthographic = new FunctionDesc({
  name: 'math/orthographic/mat4',
  label: 'Orthographic',
  in: {
    left: 'float',
    right: 'float',
    top: 'float',
    bottom: 'float',
    near: 'float',
    far: 'float'
  },
  out: 'mat4',
  exec: mat4Orthogonal
});

export const OrthographicSimple = new FunctionDesc({
  name: 'math/orthographicSimple/mat4',
  label: 'Orthographic Simple',
  in: {
    height: 'float',
    center: 'vec2',
    near: 'float',
    far: 'float',
    zoom: 'float',
    aspectRatio: 'float'
  },
  out: 'mat4',
  exec: mat4OrthogonalSimple
});

export const LookAt = new FunctionDesc({
  name: 'math/lookAt/mat4',
  label: 'Look At',
  in: { eye: 'vec3', target: 'vec3', up: 'vec3' },
  out: 'mat4',
  exec: mat4LookAt
});
