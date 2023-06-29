import { makeInNOutFunctionDesc } from '../../../Nodes/FunctionNode.js';
import {
  mat3ToEuler,
  mat4ToEuler,
  quatToEuler,
  Vec3,
  vec3Add,
  vec3Equals,
  vec3Mix,
  vec3MultiplyByScalar,
  vec3Negate,
  vec3Subtract
} from './Internal/Vec3.js';

export const Constant = makeInNOutFunctionDesc({
  name: 'math/euler',
  label: 'Euler',
  in: ['euler'],
  out: 'euler',
  exec: (a: Vec3) => a
});

export const Create = makeInNOutFunctionDesc({
  name: 'math/toEuler/float',
  label: 'Float to Euler',
  in: [{ x: 'float' }, { y: 'float' }, { z: 'float' }],
  out: 'euler',
  exec: (x: number, y: number, z: number) => new Vec3(x, y, z)
});

export const Elements = makeInNOutFunctionDesc({
  name: 'math/toFloat/euler',
  label: 'Euler to Float',
  in: ['euler'],
  out: [{ x: 'float' }, { y: 'float' }, { z: 'float' }],
  exec: (a: Vec3) => {
    return { x: a.x, y: a.y, z: a.z };
  }
});

export const Add = makeInNOutFunctionDesc({
  name: 'math/add/euler',
  label: '+',
  in: ['euler', 'euler'],
  out: 'euler',
  exec: vec3Add
});

export const Subtract = makeInNOutFunctionDesc({
  name: 'math/subtract/euler',
  label: '-',
  in: ['euler', 'euler'],
  out: 'euler',
  exec: vec3Subtract
});

export const Negate = makeInNOutFunctionDesc({
  name: 'math/negate/euler',
  label: '-',
  in: ['euler'],
  out: 'euler',
  exec: vec3Negate
});

export const Scale = makeInNOutFunctionDesc({
  name: 'math/scale/euler',
  label: '×',
  in: ['euler', 'float'],
  out: 'euler',
  exec: vec3MultiplyByScalar
});

export const Mix = makeInNOutFunctionDesc({
  name: 'math/mix/euler',
  label: '÷',
  in: [{ a: 'euler' }, { b: 'euler' }, { t: 'float' }],
  out: 'euler',
  exec: (a: Vec3, b: Vec3, t: number) => {
    console.warn('TODO: this is not shortest path');
    return vec3Mix(a, b, t);
  }
});

export const Mat3ToEuler = makeInNOutFunctionDesc({
  name: 'math/toEuler/mat3',
  label: 'To Euler',
  in: ['mat3'],
  out: 'euler',
  exec: mat3ToEuler
});

export const Mat4ToEuler = makeInNOutFunctionDesc({
  name: 'math/toEuler/mat4',
  label: 'To Euler',
  in: ['mat4'],
  out: 'euler',
  exec: mat4ToEuler
});

export const QuatToEuler = makeInNOutFunctionDesc({
  name: 'math/toEuler/quat',
  label: 'To Euler',
  in: ['quat'],
  out: 'euler',
  exec: quatToEuler
});

export const Equal = makeInNOutFunctionDesc({
  name: 'math/equal/euler',
  label: '=',
  in: [{ a: 'euler' }, { b: 'euler' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: vec3Equals
});
