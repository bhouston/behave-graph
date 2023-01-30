import { makeFunctionDesc } from '../../../Nodes/FunctionNode';
import {
  Vec2,
  vec2Add,
  vec2Dot,
  vec2Equals,
  vec2Length,
  vec2Mix,
  vec2MultiplyByScalar,
  vec2Negate,
  vec2Normalize,
  vec2Subtract,
  vec2ToArray
} from './Internal/Vec2';

export const Constant = makeFunctionDesc({
  name: 'math/vec2',
  label: 'Vec2',
  in: ['vec2'],
  out: 'vec2',
  exec: (a: Vec2) => a
});

export const Create = makeFunctionDesc({
  name: 'math/toVec2/float',
  aliases: ['math/combine2'],
  label: 'Float to Vec2',
  in: [{ x: 'float' }, { y: 'float' }],
  out: 'vec2',
  exec: (x: number, y: number) => new Vec2(x, y)
});

export const Elements = makeFunctionDesc({
  name: 'math/toFloat/vec2',
  aliases: ['math/extract2'],
  label: 'Vec2 To Float',
  in: ['vec2'],
  out: [{ x: 'float' }, { y: 'float' }],
  exec: vec2ToArray
});

export const Add = makeFunctionDesc({
  name: 'math/add/vec2',
  label: '+',
  in: ['vec2', 'vec2'],
  out: 'vec2',
  exec: vec2Add
});

export const Subtract = makeFunctionDesc({
  name: 'math/subtract/vec2',
  label: '-',
  in: ['vec2', 'vec2'],
  out: 'vec2',
  exec: vec2Subtract
});

export const Negate = makeFunctionDesc({
  name: 'math/negate/vec2',
  label: '-',
  in: ['vec2'],
  out: 'vec2',
  exec: vec2Negate
});

export const Scale = makeFunctionDesc({
  name: 'math/scale/vec2',
  label: '×',
  in: ['vec2', 'float'],
  out: 'vec2',
  exec: vec2MultiplyByScalar
});

export const Length = makeFunctionDesc({
  name: 'math/length/vec2',
  label: 'Length',
  in: ['vec2'],
  out: 'float',
  exec: vec2Length
});

export const Normalize = makeFunctionDesc({
  name: 'math/normalize/vec2',
  label: 'Normalize',
  in: ['vec2'],
  out: 'vec2',
  exec: vec2Normalize
});

export const Dot = makeFunctionDesc({
  name: 'math/dot/vec2',
  label: 'Dot Product',
  in: ['vec2', 'vec2'],
  out: 'float',
  exec: vec2Dot
});

export const Mix = makeFunctionDesc({
  name: 'math/mix/vec2',
  label: '÷',
  in: [{ a: 'vec2' }, { b: 'vec2' }, { t: 'float' }],
  out: 'vec2',
  exec: vec2Mix
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/vec2',
  label: '=',
  in: [{ a: 'vec2' }, { b: 'vec2' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: vec2Equals
});
