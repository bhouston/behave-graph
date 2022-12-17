import { FunctionDesc } from '../../../Nodes/FunctionNode';
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

export const Constant = new FunctionDesc({
  name: 'math/vec2',
  label: 'Vec2',
  in: ['vec2'],
  out: 'vec2',
  exec: (a: Vec2) => a
});

export const Create = new FunctionDesc({
  name: 'math/toVec2/float',
  label: 'Float to Vec2',
  in: { x: 'float', y: 'float' },
  out: 'vec2',
  exec: (x: number, y: number) => new Vec2(x, y)
});

export const Elements = new FunctionDesc({
  name: 'math/toFloat/vec2',
  label: 'Vec2 To Float',
  in: ['vec2'],
  out: { x: 'float', y: 'float', z: 'float' },
  exec: vec2ToArray
});

export const Add = new FunctionDesc({
  name: 'math/add/vec2',
  label: '+',
  in: ['vec2', 'vec2'],
  out: 'vec2',
  exec: vec2Add
});

export const Subtract = new FunctionDesc({
  name: 'math/subtract/vec2',
  label: '-',
  in: ['vec2', 'vec2'],
  out: 'vec2',
  exec: vec2Subtract
});

export const Negate = new FunctionDesc({
  name: 'math/negate/vec2',
  label: '-',
  in: ['vec2'],
  out: 'vec2',
  exec: vec2Negate
});

export const Scale = new FunctionDesc({
  name: 'math/scale/vec2',
  label: '×',
  in: ['vec2', 'float'],
  out: 'vec2',
  exec: vec2MultiplyByScalar
});

export const Length = new FunctionDesc({
  name: 'math/length/vec2',
  label: 'Length',
  in: ['vec2'],
  out: 'float',
  exec: vec2Length
});

export const Normalize = new FunctionDesc({
  name: 'math/normalize/vec2',
  label: 'Normalize',
  in: ['vec2'],
  out: 'vec2',
  exec: vec2Normalize
});

export const Dot = new FunctionDesc({
  name: 'math/dot/vec2',
  label: 'Dot Product',
  in: ['vec2', 'vec2'],
  out: 'float',
  exec: vec2Dot
});

export const Mix = new FunctionDesc({
  name: 'math/mix/vec2',
  label: '÷',
  in: { a: 'vec2', b: 'vec2', t: 'float' },
  out: 'vec2',
  exec: vec2Mix
});

export const Equal = new FunctionDesc({
  name: 'math/equal/vec2',
  label: '=',
  in: { a: 'vec2', b: 'vec2', tolerance: 'float' },
  out: 'boolean',
  exec: vec2Equals
});
