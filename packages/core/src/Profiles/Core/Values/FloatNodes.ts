import { makeInNOutFunctionDesc } from '../../../Nodes/FunctionNode.js';
import {
  degreesToRadians,
  equalsTolerance,
  radiansToDegrees
} from './Internal/Common.js';
// Unreal Engine Blueprint Float nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Float/

export const Constant = makeInNOutFunctionDesc({
  name: 'math/float',
  label: 'Float',
  in: ['float'],
  out: 'float',
  exec: (a: number) => a
});

export const Add = makeInNOutFunctionDesc({
  name: 'math/add/float',
  label: '+',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a + b
});

export const Subtract = makeInNOutFunctionDesc({
  name: 'math/subtract/float',
  label: '-',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a - b
});

export const Negate = makeInNOutFunctionDesc({
  name: 'math/negate/float',
  label: '-',
  in: ['float'],
  out: 'float',
  exec: (a: number) => -a
});

export const Multiply = makeInNOutFunctionDesc({
  name: 'math/multiply/float',
  label: '×',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a * b
});

export const Divide = makeInNOutFunctionDesc({
  name: 'math/divide/float',
  label: '÷',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a / b
});

export const Modulus = makeInNOutFunctionDesc({
  name: 'math/modulus/float',
  label: 'MOD',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => a % b
});

export const Power = makeInNOutFunctionDesc({
  name: 'math/pow/float',
  label: 'POW',
  in: ['float', 'float'],
  out: 'float',
  exec: Math.pow
});

export const SquareRoot = makeInNOutFunctionDesc({
  name: 'math/sqrt/float',
  label: '√',
  in: ['float'],
  out: 'float',
  exec: Math.sqrt
});

export const E = makeInNOutFunctionDesc({
  name: 'math/e/float',
  label: '𝑒',
  out: 'float',
  exec: () => Math.E
});

export const Exp = makeInNOutFunctionDesc({
  name: 'math/exp/float',
  label: 'EXP',
  in: ['float'],
  out: 'float',
  exec: Math.exp
});

export const Ln = makeInNOutFunctionDesc({
  name: 'math/ln/float',
  label: 'LN',
  in: ['float'],
  out: 'float',
  exec: Math.log
});

export const Log2 = makeInNOutFunctionDesc({
  name: 'math/log2/float',
  label: 'LOG2',
  in: ['float'],
  out: 'float',
  exec: Math.log2
});

export const Log10 = makeInNOutFunctionDesc({
  name: 'math/log10/float',
  label: 'LOG10',
  in: ['float'],
  out: 'float',
  exec: Math.log10
});

export const PI = makeInNOutFunctionDesc({
  name: 'math/pi/float',
  label: 'π',
  out: 'float',
  exec: () => Math.PI
});

export const Sin = makeInNOutFunctionDesc({
  name: 'math/sin/float',
  label: 'SIN',
  in: ['float'],
  out: 'float',
  exec: Math.sin
});

export const Asin = makeInNOutFunctionDesc({
  name: 'math/asin/float',
  label: 'ASIN',
  in: ['float'],
  out: 'float',
  exec: Math.asin
});

export const Cos = makeInNOutFunctionDesc({
  name: 'math/cos/float',
  label: 'COS',
  in: ['float'],
  out: 'float',
  exec: Math.cos
});

export const Acos = makeInNOutFunctionDesc({
  name: 'math/acos/float',
  label: 'ACOS',
  in: ['float'],
  out: 'float',
  exec: Math.acos
});

export const Tan = makeInNOutFunctionDesc({
  name: 'math/tan/float',
  label: 'TAN',
  in: ['float'],
  out: 'float',
  exec: Math.tan
});

export const RadiansToDegrees = makeInNOutFunctionDesc({
  name: 'math/radiansToDegrees/float',
  label: 'To Degrees',
  in: ['float'],
  out: 'float',
  exec: radiansToDegrees
});

export const DegreesToRadians = makeInNOutFunctionDesc({
  name: 'math/degreesToRadians/float',
  label: 'To Radians',
  in: ['float'],
  out: 'float',
  exec: degreesToRadians
});

export const Atan = makeInNOutFunctionDesc({
  name: 'math/atan/float',
  label: 'ATAN',
  in: ['float'],
  out: 'float',
  exec: Math.atan
});

export const Mix = makeInNOutFunctionDesc({
  name: 'math/mix/float',
  label: 'MIX',
  in: ['float', 'float', 'float'],
  out: 'float',
  exec: (a: number, b: number, t: number) => {
    const s = 1 - t;
    return a * s + b * t;
  }
});

export const ToFloat = makeInNOutFunctionDesc({
  name: 'math/toFloat/float',
  label: 'To Float',
  in: ['float'],
  out: 'float',
  exec: (a: number) => Number(a)
});

export const Min = makeInNOutFunctionDesc({
  name: 'math/min/float',
  label: 'MIN',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => Math.min(a, b) // TODO: can I jsut pass in Math.min?
});

export const Max = makeInNOutFunctionDesc({
  name: 'math/max/float',
  label: 'MAX',
  in: ['float', 'float'],
  out: 'float',
  exec: (a: number, b: number) => Math.max(a, b) // TODO: can I jsut pass in Math.max?
});

export const Clamp = makeInNOutFunctionDesc({
  name: 'math/clamp/float',
  label: 'CLAMP',
  in: ['float', 'float', 'float'],
  out: 'float',
  exec: (value: number, min: number, max: number) =>
    value < min ? min : value > max ? max : value
});

export const Abs = makeInNOutFunctionDesc({
  name: 'math/abs/float',
  label: 'ABS',
  in: ['float'],
  out: 'float',
  exec: Math.abs
});

export const Sign = makeInNOutFunctionDesc({
  name: 'math/sign/float',
  label: 'SIGN',
  in: ['float'],
  out: 'float',
  exec: Math.sign
});

export const Floor = makeInNOutFunctionDesc({
  name: 'math/floor/float',
  label: 'FLOOR',
  in: ['float'],
  out: 'float',
  exec: Math.floor
});

export const Ceil = makeInNOutFunctionDesc({
  name: 'math/ceil/float',
  label: 'CEIL',
  in: ['float'],
  out: 'float',
  exec: Math.ceil
});

export const Round = makeInNOutFunctionDesc({
  name: 'math/round/float',
  label: 'ROUND',
  in: ['float'],
  out: 'float',
  exec: Math.round
});

export const Trunc = makeInNOutFunctionDesc({
  name: 'math/trunc/float',
  label: 'TRUNC',
  in: ['float'],
  out: 'float',
  exec: Math.trunc
});

export const Random = makeInNOutFunctionDesc({
  name: 'math/random/float',
  label: 'RANDOM',
  out: 'float',
  exec: Math.random
});

export const Equal = makeInNOutFunctionDesc({
  name: 'math/equal/float',
  label: '=',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a === b
});

export const EqualTolerance = makeInNOutFunctionDesc({
  name: 'math/equalTolerance/float',
  label: '=',
  in: ['float', 'float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number, tolerance: number) =>
    equalsTolerance(a, b, tolerance)
});

export const GreaterThan = makeInNOutFunctionDesc({
  name: 'math/greaterThan/float',
  label: '>',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a > b
});

export const GreaterThanOrEqual = makeInNOutFunctionDesc({
  name: 'math/greaterThanOrEqual/float',
  label: '≥',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a >= b
});

export const LessThan = makeInNOutFunctionDesc({
  name: 'math/lessThan/float',
  label: '<',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a < b
});

export const LessThanOrEqual = makeInNOutFunctionDesc({
  name: 'math/lessThanOrEqual/float',
  label: '≤',
  in: ['float', 'float'],
  out: 'boolean',
  exec: (a: number, b: number) => a <= b
});

export const IsNaN = makeInNOutFunctionDesc({
  name: 'math/isNaN/float',
  label: 'isNaN',
  in: ['float'],
  out: 'boolean',
  exec: Number.isNaN
});

export const IsInf = makeInNOutFunctionDesc({
  name: 'math/isInf/float',
  label: 'isInf',
  in: ['float'],
  out: 'boolean',
  exec: (a: number) => !Number.isFinite(a) && !Number.isNaN(a)
});
