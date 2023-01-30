import { makeFunctionDesc } from '../../../Nodes/FunctionNode';
import {
  Vec3,
  vec3Add,
  vec3Cross,
  vec3Dot,
  vec3Equals,
  vec3Length,
  vec3Mix,
  vec3MultiplyByScalar,
  vec3Negate,
  vec3Normalize,
  vec3Subtract
} from './Internal/Vec3';

export const Constant = makeFunctionDesc({
  name: 'math/vec3',
  label: 'Vec3',
  in: ['vec3'],
  out: 'vec3',
  exec: (a: Vec3) => a
});

export const Create = makeFunctionDesc({
  name: 'math/toVec3/float',
  aliases: ['math/combine3'],
  label: 'Float to Vec3',
  in: [{ x: 'float' }, { y: 'float' }, { z: 'float' }],
  out: 'vec3',
  exec: (x: number, y: number, z: number) => new Vec3(x, y, z)
});

export const Elements = makeFunctionDesc({
  name: 'math/toFloat/vec3',
  aliases: ['math/extract3'],
  label: 'Vec3 To Float',
  in: ['vec3'],
  out: [{ x: 'float' }, { y: 'float' }, { z: 'float' }],
  exec: () => {
    throw new Error('not implemented');
  }
});

export const Add = makeFunctionDesc({
  name: 'math/add/vec3',
  label: '+',
  in: ['vec3', 'vec3'],
  out: 'vec3',
  exec: vec3Add
});

export const Subtract = makeFunctionDesc({
  name: 'math/subtract/vec3',
  label: '-',
  in: ['vec3', 'vec3'],
  out: 'vec3',
  exec: vec3Subtract
});

export const Negate = makeFunctionDesc({
  name: 'math/negate/vec3',
  label: '-',
  in: ['vec3'],
  out: 'vec3',
  exec: vec3Negate
});

export const Scale = makeFunctionDesc({
  name: 'math/scale/vec3',
  label: '×',
  in: ['vec3', 'float'],
  out: 'vec3',
  exec: vec3MultiplyByScalar
});

export const Length = makeFunctionDesc({
  name: 'math/length/vec3',
  label: 'Length',
  in: ['vec3'],
  out: 'float',
  exec: vec3Length
});

export const Normalize = makeFunctionDesc({
  name: 'math/normalize/vec3',
  label: 'Normalize',
  in: ['vec3'],
  out: 'vec3',
  exec: vec3Normalize
});

export const Cross = makeFunctionDesc({
  name: 'math/cross/vec3',
  label: 'Cross',
  in: ['vec3', 'vec3'],
  out: 'vec3',
  exec: vec3Cross
});

export const Dot = makeFunctionDesc({
  name: 'math/dot/vec3',
  label: 'Dot',
  in: ['vec3', 'vec3'],
  out: 'float',
  exec: vec3Dot
});

export const Mix = makeFunctionDesc({
  name: 'math/mix/vec3',
  label: '÷',
  in: [{ a: 'vec3' }, { b: 'vec3' }, { t: 'float' }],
  out: 'vec3',
  exec: vec3Mix
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/vec3',
  label: '=',
  in: [{ a: 'vec3' }, { b: 'vec3' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: vec3Equals
});
