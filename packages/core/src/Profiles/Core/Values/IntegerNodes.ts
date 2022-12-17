import { FunctionNodeDesc } from '../../../Nodes/FunctionNode';

// Unreal Engine Integer Blueprints API: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Integer/

export const Constant = new FunctionNodeDesc({
  name: 'math/integer',
  label: 'Integer',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => a
});

export const Add = new FunctionNodeDesc({
  name: 'math/add/integer',
  label: '+',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a + b
});

export const Subtract = new FunctionNodeDesc({
  name: 'math/subtract/integer',
  label: '-',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a - b
});

export const Negate = new FunctionNodeDesc({
  name: 'math/negate/integer',
  label: '-',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => -a
});

export const Multiply = new FunctionNodeDesc({
  name: 'math/multiply/integer',
  label: '×',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a * b
});

export const Divide = new FunctionNodeDesc({
  name: 'math/divide/integer',
  label: '÷',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a / b
});

export const Modulus = new FunctionNodeDesc({
  name: 'math/modulus/integer',
  label: 'MOD',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a % b
});

export const ToFloat = new FunctionNodeDesc({
  name: 'math/toFloat/integer',
  label: 'To Float',
  in: ['integer'],
  out: 'float',
  exec: (a: bigint) => Number(a)
});

export const Min = new FunctionNodeDesc({
  name: 'math/min/integer',
  label: 'MIN',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => (a > b ? b : a)
});

export const Max = new FunctionNodeDesc({
  name: 'math/max/integer',
  label: 'MAX',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => (a > b ? a : b)
});

export const Clamp = new FunctionNodeDesc({
  name: 'math/clamp/integer',
  label: 'CLAMP',
  in: { value: 'integer', min: 'integer', max: 'integer' },
  out: 'integer',
  exec: (value: bigint, min: bigint, max: bigint) =>
    value < min ? min : value > max ? max : value
});

export const Abs = new FunctionNodeDesc({
  name: 'math/abs/integer',
  label: 'ABS',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => (a < BigInt(0) ? -a : a)
});

export const Sign = new FunctionNodeDesc({
  name: 'math/sign/integer',
  label: 'SIGN',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => BigInt(a < 0 ? -1 : a > 0 ? 1 : 0)
});

export const Equal = new FunctionNodeDesc({
  name: 'math/equal/integer',
  label: '=',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a === b
});

export const GreaterThan = new FunctionNodeDesc({
  name: 'math/greaterThan/integer',
  label: '>',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a > b
});

export const GreaterThanOrEqual = new FunctionNodeDesc({
  name: 'math/greaterThanOrEqual/integer',
  label: '≥',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a >= b
});

export const LessThan = new FunctionNodeDesc({
  name: 'math/lessThan/integer',
  label: '<',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a < b
});

export const LessThanOrEqual = new FunctionNodeDesc({
  name: 'math/lessThanOrEqual/integer',
  label: '≤',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a <= b
});

export const toBoolean = new FunctionNodeDesc({
  name: 'math/toBoolean/integer',
  label: 'To Boolean',
  in: ['integer'],
  out: 'boolean',
  exec: (a: bigint) => a !== 0n
});
