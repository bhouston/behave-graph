import { makeFunctionDesc } from '../../../Nodes/FunctionNode';
import {
  degreesToRadians,
  equalsTolerance,
  radiansToDegrees
} from './Internal/Common';
// Unreal Engine Blueprint Float nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Float/

export const Constant = makeFunctionDesc({
  name: 'math/float',
  label: 'Float',
  in: ['float'],
  out: 'float',
  exec: (a: number) => a
});

export const Add = makeFunctionDesc({
  name: 'math/add/float',
  label: '+',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a + b
});

export const Subtract = makeFunctionDesc({
  name: 'math/subtract/float',
  label: '-',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a - b
});

export const Negate = makeFunctionDesc({
  name: 'math/negate/float',
  label: '-',
  in: ['float'],
  out: 'float',
  exec: (a: number) => -a
});

export const Multiply = makeFunctionDesc({
  name: 'math/multiply/float',
  label: '×',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a * b
});

export const Divide = makeFunctionDesc({
  name: 'math/divide/float',
  label: '÷',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a / b
});

export const Modulus = makeFunctionDesc({
  name: 'math/modulus/float',
  label: 'MOD',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a % b
});

export const Power = makeFunctionDesc({
  name: 'math/pow/float',
  label: 'POW',
  in: ['float', 'float'],
  out: 'float',
  exec: Math.pow
});

export const SquareRoot = makeFunctionDesc({
  name: 'math/sqrt/float',
  label: '√',
  in: ['float'],
  out: 'float',
  exec: Math.sqrt
});

export const E = makeFunctionDesc({
  name: 'math/e/float',
  label: '𝑒',
  out: 'float',
  exec: () => Math.E
});

export const Exp = makeFunctionDesc({
  name: 'math/exp/float',
  label: 'EXP',
  in: ['float'],
  out: 'float',
  exec: Math.exp
});

export const Ln = makeFunctionDesc({
  name: 'math/ln/float',
  label: 'LN',
  in: ['float'],
  out: 'float',
  exec: Math.log
});

export const Log2 = makeFunctionDesc({
  name: 'math/log2/float',
  label: 'LOG2',
  in: ['float'],
  out: 'float',
  exec: Math.log2
});

export const Log10 = makeFunctionDesc({
  name: 'math/log10/float',
  label: 'LOG10',
  in: ['float'],
  out: 'float',
  exec: Math.log10
});

export const PI = makeFunctionDesc({
  name: 'math/pi/float',
  label: 'π',
  out: 'float',
  exec: () => Math.PI
});

export const Sin = makeFunctionDesc({
  name: 'math/sin/float',
  label: 'SIN',
  in: ['float'],
  out: 'float',
  exec: Math.sin
});

export const Asin = makeFunctionDesc({
  name: 'math/asin/float',
  label: 'ASIN',
  in: ['float'],
  out: 'float',
  exec: Math.asin
});

export const Cos = makeFunctionDesc({
  name: 'math/cos/float',
  label: 'COS',
  in: ['float'],
  out: 'float',
  exec: Math.cos
});

export const Acos = makeFunctionDesc({
  name: 'math/acos/float',
  label: 'ACOS',
  in: ['float'],
  out: 'float',
  exec: Math.acos
});

export const Tan = makeFunctionDesc({
  name: 'math/tan/float',
  label: 'TAN',
  in: ['float'],
  out: 'float',
  exec: Math.tan
});

export const RadiansToDegrees = makeFunctionDesc({
  name: 'math/radiansToDegrees/float',
  label: 'To Degrees',
  in: ['float'],
  out: 'float',
  exec: radiansToDegrees
});

export const DegreesToRadians = makeFunctionDesc({
  name: 'math/degreesToRadians/float',
  label: 'To Radians',
  in: ['float'],
  out: 'float',
  exec: degreesToRadians
});

export const Atan = makeFunctionDesc({
  name: 'math/atan/float',
  label: 'ATAN',
  in: ['float'],
  out: 'float',
  exec: Math.atan
});

export const Mix = makeFunctionDesc({
  name: 'math/mix/float',
  label: 'MIX',
  in: ['float', 'float', 'float'],
  out: 'float',
  exec: (a: number, b: number, t: number) => {
    const s = 1 - t;
    return a * s + b * t;
  }
});

export const ToFloat = makeFunctionDesc({
  name: 'math/toFloat/float',
  label: 'To Float',
  in: ['float'],
  out: 'float',
  exec: (a: number) => Number(a)
});

export const Min = makeFunctionDesc({
  name: 'math/min/float',
  label: 'MIN',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => Math.min(a, b) // TODO: can I jsut pass in Math.min?
});

export const Max = makeFunctionDesc({
  name: 'math/max/float',
  label: 'MAX',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => Math.max(a, b) // TODO: can I jsut pass in Math.max?
});

export const Clamp = makeFunctionDesc({
  name: 'math/clamp/float',
  label: 'CLAMP',
  in: ['float', 'float', 'float'],
  out: 'float',
  exec: (value: number, min: number, max: number) =>
    value < min ? min : value > max ? max : value
});

export const Abs = makeFunctionDesc({
  name: 'math/abs/float',
  label: 'ABS',
  in: ['float'],
  out: 'float',
  exec: Math.abs
});

export const Sign = makeFunctionDesc({
  name: 'math/sign/float',
  label: 'SIGN',
  in: ['float'],
  out: 'float',
  exec: Math.sign
});

export const Floor = makeFunctionDesc({
  name: 'math/floor/float',
  label: 'FLOOR',
  in: ['float'],
  out: 'float',
  exec: Math.floor
});

export const Ceil = makeFunctionDesc({
  name: 'math/ceil/float',
  label: 'CEIL',
  in: ['float'],
  out: 'float',
  exec: Math.ceil
});

export const Round = makeFunctionDesc({
  name: 'math/round/float',
  label: 'ROUND',
  in: ['float'],
  out: 'float',
  exec: Math.round
});

export const Trunc = makeFunctionDesc({
  name: 'math/trunc/float',
  label: 'TRUNC',
  in: ['float'],
  out: 'float',
  exec: Math.trunc
});

export const Random = makeFunctionDesc({
  name: 'math/random/float',
  label: 'RANDOM',
  out: 'float',
  exec: Math.random
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/float',
  label: '=',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a === b
});

export const EqualTolerance = makeFunctionDesc({
  name: 'math/equalTolerance/float',
  label: '=',
  in: ['float', 'float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number, tolerance: number) =>
    equalsTolerance(a, b, tolerance)
});

export const GreaterThan = makeFunctionDesc({
  name: 'math/greaterThan/float',
  label: '>',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a > b
});

export const GreaterThanOrEqual = makeFunctionDesc({
  name: 'math/greaterThanOrEqual/float',
  label: '≥',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a >= b
});

export const LessThan = makeFunctionDesc({
  name: 'math/lessThan/float',
  label: '<',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a < b
});

export const LessThanOrEqual = makeFunctionDesc({
  name: 'math/lessThanOrEqual/float',
  label: '≤',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a <= b
});

export const IsNaN = makeFunctionDesc({
  name: 'math/isNaN/float',
  label: 'isNaN',
  in: ['float'],
  out: 'boolean',
  exec: Number.isNaN
});

export const IsInf = makeFunctionDesc({
  name: 'math/isInf/float',
  label: 'isInf',
  in: ['float'],
  out: 'boolean',
  exec: (a: number) => !Number.isFinite(a) && !Number.isNaN(a)
});
