import { makeInNOutFunctionDesc } from '../../../Nodes/FunctionNode';
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

export const Constant = new makeInNOutFunctionDesc({
  name: 'math/vec2',
  label: 'Vec2',
  in: ['vec2'],
  out: 'vec2',
  exec: (a: Vec2) => a
});

export const Create = new makeInNOutFunctionDesc({
  name: 'math/toVec2/float',
  label: 'Float to Vec2',
  in: [{ x: 'float' }, { y: 'float' }],
  out: 'vec2',
  exec: (x: number, y: number) => new Vec2(x, y)
});

export const Elements = new makeInNOutFunctionDesc({
  name: 'math/toFloat/vec2',
  label: 'Vec2 To Float',
  in: ['vec2'],
  out: [{ x: 'float' }, { y: 'float' }],
  exec: vec2ToArray
});

export const Add = new makeInNOutFunctionDesc({
  name: 'math/add/vec2',
  label: '+',
  in: ['vec2', 'vec2'],
  out: 'vec2',
  exec: vec2Add
});

export const Subtract = new makeInNOutFunctionDesc({
  name: 'math/subtract/vec2',
  label: '-',
  in: ['vec2', 'vec2'],
  out: 'vec2',
  exec: vec2Subtract
});

export const Negate = new makeInNOutFunctionDesc({
  name: 'math/negate/vec2',
  label: '-',
  in: ['vec2'],
  out: 'vec2',
  exec: vec2Negate
});

export const Scale = new makeInNOutFunctionDesc({
  name: 'math/scale/vec2',
  label: '×',
  in: ['vec2', 'float'],
  out: 'vec2',
  exec: vec2MultiplyByScalar
});

export const Length = new makeInNOutFunctionDesc({
  name: 'math/length/vec2',
  label: 'Length',
  in: ['vec2'],
  out: 'float',
  exec: vec2Length
});

export const Normalize = new makeInNOutFunctionDesc({
  name: 'math/normalize/vec2',
  label: 'Normalize',
  in: ['vec2'],
  out: 'vec2',
  exec: vec2Normalize
});

export const Dot = new makeInNOutFunctionDesc({
  name: 'math/dot/vec2',
  label: 'Dot Product',
  in: ['vec2', 'vec2'],
  out: 'float',
  exec: vec2Dot
});

export const Mix = new makeInNOutFunctionDesc({
  name: 'math/mix/vec2',
  label: '÷',
  in: [{ a: 'vec2' }, { b: 'vec2' }, { t: 'float' }],
  out: 'vec2',
  exec: vec2Mix
});

export const Equal = new makeInNOutFunctionDesc({
  name: 'math/equal/vec2',
  label: '=',
  in: [{ a: 'vec2' }, { b: 'vec2' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: vec2Equals
});
