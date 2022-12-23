import { FunctionDesc } from '../../../Nodes/FunctionNode';
import {
  degreesToRadians,
  equalsTolerance,
  radiansToDegrees
} from './Internal/Common';

// Unreal Engine Blueprint Float nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Float/

export const Constant = new FunctionDesc({
  name: 'math/float',
  label: 'Float',
  in: ['float'],
  out: 'float',
  exec: (a: number) => a
});

export const Add = new FunctionDesc({
  name: 'math/add/float',
  label: '+',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a + b
});

export const Subtract = new FunctionDesc({
  name: 'math/subtract/float',
  label: '-',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a - b
});

export const Negate = new FunctionDesc({
  name: 'math/negate/float',
  label: '-',
  in: ['float'],
  out: 'float',
  exec: (a: number) => -a
});

export const Multiply = new FunctionDesc({
  name: 'math/multiply/float',
  label: '×',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a * b
});

export const Divide = new FunctionDesc({
  name: 'math/divide/float',
  label: '÷',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a / b
});

export const Modulus = new FunctionDesc({
  name: 'math/modulus/float',
  label: 'MOD',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a % b
});

export const Power = new FunctionDesc({
  name: 'math/pow/float',
  label: 'POW',
  in: ['float', 'float'],
  out: 'float',
  exec: Math.pow
});

export const SquareRoot = new FunctionDesc({
  name: 'math/sqrt/float',
  label: '√',
  in: ['float'],
  out: 'float',
  exec: Math.sqrt
});

export const E = new FunctionDesc({
  name: 'math/e/float',
  label: '𝑒',
  out: 'float',
  exec: () => Math.E
});

export const Exp = new FunctionDesc({
  name: 'math/exp/float',
  label: 'EXP',
  in: ['float'],
  out: 'float',
  exec: Math.exp
});

export const Ln = new FunctionDesc({
  name: 'math/ln/float',
  label: 'LN',
  in: ['float'],
  out: 'float',
  exec: Math.log
});

export const Log2 = new FunctionDesc({
  name: 'math/log2/float',
  label: 'LOG2',
  in: ['float'],
  out: 'float',
  exec: Math.log2
});

export const Log10 = new FunctionDesc({
  name: 'math/log10/float',
  label: 'LOG10',
  in: ['float'],
  out: 'float',
  exec: Math.log10
});

export const PI = new FunctionDesc({
  name: 'math/pi/float',
  label: 'π',
  out: 'float',
  exec: () => Math.PI
});

export const Sin = new FunctionDesc({
  name: 'math/sin/float',
  label: 'SIN',
  in: ['float'],
  out: 'float',
  exec: Math.sin
});

export const Asin = new FunctionDesc({
  name: 'math/asin/float',
  label: 'ASIN',
  in: ['float'],
  out: 'float',
  exec: Math.asin
});

export const Cos = new FunctionDesc({
  name: 'math/cos/float',
  label: 'COS',
  in: ['float'],
  out: 'float',
  exec: Math.cos
});

export const Acos = new FunctionDesc({
  name: 'math/acos/float',
  label: 'ACOS',
  in: ['float'],
  out: 'float',
  exec: Math.acos
});

export const Tan = new FunctionDesc({
  name: 'math/tan/float',
  label: 'TAN',
  in: ['float'],
  out: 'float',
  exec: Math.tan
});

export const RadiansToDegrees = new FunctionDesc({
  name: 'math/radiansToDegrees/float',
  label: 'To Degrees',
  in: ['float'],
  out: 'float',
  exec: radiansToDegrees
});

export const DegreesToRadians = new FunctionDesc({
  name: 'math/degreesToRadians/float',
  label: 'To Radians',
  in: ['float'],
  out: 'float',
  exec: degreesToRadians
});

export const Atan = new FunctionDesc({
  name: 'math/atan/float',
  label: 'ATAN',
  in: ['float'],
  out: 'float',
  exec: Math.atan
});

export const Mix = new FunctionDesc({
  name: 'math/mix/float',
  label: 'MIX',
  in: ['float', 'float', 'float'],
  out: 'float',
  exec: (a: number, b: number, t: number) => {
    const s = 1 - t;
    return a * s + b * t;
  }
});

export const ToFloat = new FunctionDesc({
  name: 'math/toFloat/float',
  label: 'To Float',
  in: ['float'],
  out: 'float',
  exec: (a: number) => Number(a)
});

export const Min = new FunctionDesc({
  name: 'math/min/float',
  label: 'MIN',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => Math.min(a, b) // TODO: can I jsut pass in Math.min?
});

export const Max = new FunctionDesc({
  name: 'math/max/float',
  label: 'MAX',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => Math.max(a, b) // TODO: can I jsut pass in Math.max?
});

export const Clamp = new FunctionDesc({
  name: 'math/clamp/float',
  label: 'CLAMP',
  in: ['float', 'float', 'float'],
  out: 'float',
  exec: (value: number, min: number, max: number) =>
    value < min ? min : value > max ? max : value
});

export const Abs = new FunctionDesc({
  name: 'math/abs/float',
  label: 'ABS',
  in: ['float'],
  out: 'float',
  exec: Math.abs
});

export const Sign = new FunctionDesc({
  name: 'math/sign/float',
  label: 'SIGN',
  in: ['float'],
  out: 'float',
  exec: Math.sign
});

export const Floor = new FunctionDesc({
  name: 'math/floor/float',
  label: 'FLOOR',
  in: ['float'],
  out: 'float',
  exec: Math.floor
});

export const Ceil = new FunctionDesc({
  name: 'math/ceil/float',
  label: 'CEIL',
  in: ['float'],
  out: 'float',
  exec: Math.ceil
});

export const Round = new FunctionDesc({
  name: 'math/round/float',
  label: 'ROUND',
  in: ['float'],
  out: 'float',
  exec: Math.round
});

export const Trunc = new FunctionDesc({
  name: 'math/trunc/float',
  label: 'TRUNC',
  in: ['float'],
  out: 'float',
  exec: Math.trunc
});

export const Random = new FunctionDesc({
  name: 'math/random/float',
  label: 'RANDOM',
  out: 'float',
  exec: Math.random
});

export const Equal = new FunctionDesc({
  name: 'math/equal/float',
  label: '=',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a === b
});

export const EqualTolerance = new FunctionDesc({
  name: 'math/equalTolerance/float',
  label: '=',
  in: ['float', 'float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number, tolerance: number) =>
    equalsTolerance(a, b, tolerance)
});

export const GreaterThan = new FunctionDesc({
  name: 'math/greaterThan/float',
  label: '>',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a > b
});

export const GreaterThanOrEqual = new FunctionDesc({
  name: 'math/greaterThanOrEqual/float',
  label: '≥',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a >= b
});

export const LessThan = new FunctionDesc({
  name: 'math/lessThan/float',
  label: '<',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a < b
});

export const LessThanOrEqual = new FunctionDesc({
  name: 'math/lessThanOrEqual/float',
  label: '≤',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a <= b
});

export const IsNaN = new FunctionDesc({
  name: 'math/isNaN/float',
  label: 'isNaN',
  in: ['float'],
  out: 'boolean',
  exec: Number.isNaN
});

export const IsInf = new FunctionDesc({
  name: 'math/isInf/float',
  label: 'isInf',
  in: ['float'],
  out: 'boolean',
  exec: (a: number) => !Number.isFinite(a) && !Number.isNaN(a)
});
