import { makeInNOutFunctionDesc } from '../../../Nodes/FunctionNode';
import {
  Vec4,
  vec4Add,
  vec4Dot,
  vec4Equals,
  vec4Length,
  vec4Mix,
  vec4MultiplyByScalar,
  vec4Negate,
  vec4Normalize,
  vec4Subtract
} from './Internal/Vec4';

export const Constant = new makeInNOutFunctionDesc({
  name: 'math/vec4',
  label: 'Vec4',
  in: ['vec4'],
  out: 'vec4',
  exec: (a) => a
});

export const Create = new makeInNOutFunctionDesc({
  name: 'math/toVec4/float',
  label: 'Float to Vec4',
  in: [{ x: 'float' }, { y: 'float' }, { z: 'float' }, { w: 'float' }],
  out: 'vec4',
  exec: (x: number, y: number, z: number, w: number) => new Vec4(x, y, z, w)
});

export const Elements = new makeInNOutFunctionDesc({
  name: 'math/toFloat/vec4',
  label: 'Vec4 to Float',
  in: ['vec4'],
  out: [{ x: 'float' }, { y: 'float' }, { z: 'float' }, { w: 'float' }],
  exec: (a: Vec4) => {
    return { x: a.x, y: a.y, z: a.z, w: a.z };
  }
});

export const Add = new makeInNOutFunctionDesc({
  name: 'math/add/vec4',
  label: '+',
  in: ['vec4', 'vec4'],
  out: 'vec4',
  exec: vec4Add
});

export const Subtract = new makeInNOutFunctionDesc({
  name: 'math/subtract/vec4',
  label: '-',
  in: ['vec4', 'vec4'],
  out: 'vec4',
  exec: vec4Subtract
});

export const Negate = new makeInNOutFunctionDesc({
  name: 'math/negate/vec4',
  label: '-',
  in: ['vec4'],
  out: 'vec4',
  exec: vec4Negate
});

export const Scale = new makeInNOutFunctionDesc({
  name: 'math/scale/vec4',
  label: '×',
  in: ['vec4', 'float'],
  out: 'vec4',
  exec: vec4MultiplyByScalar
});

export const Length = new makeInNOutFunctionDesc({
  name: 'math/length/vec4',
  label: 'Length',
  in: ['vec4'],
  out: 'float',
  exec: vec4Length
});

export const Normalize = new makeInNOutFunctionDesc({
  name: 'math/normalize/vec4',
  label: 'Normalize',
  in: ['vec4'],
  out: 'vec4',
  exec: vec4Normalize
});

export const Dot = new makeInNOutFunctionDesc({
  name: 'math/dot/vec4',
  label: 'Dot Product',
  in: ['vec4', 'vec4'],
  out: 'float',
  exec: vec4Dot
});

export const Mix = new makeInNOutFunctionDesc({
  name: 'math/mix/vec4',
  label: '÷',
  in: [{ a: 'vec4' }, { b: 'vec4' }, { t: 'float' }],
  out: 'vec4',
  exec: vec4Mix
});

export const Equal = new makeInNOutFunctionDesc({
  name: 'math/equal/vec4',
  label: '=',
  in: [{ a: 'vec4' }, { b: 'vec4' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: vec4Equals
});
