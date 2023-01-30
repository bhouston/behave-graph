import { makeFunctionDesc } from '../../../Nodes/FunctionNode';
// Unreal Engine Integer Blueprints API: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Integer/

export const Constant = makeFunctionDesc({
  name: 'math/integer',
  label: 'Integer',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => a
});

export const Add = makeFunctionDesc({
  name: 'math/add/integer',
  label: '+',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a + b
});

export const Subtract = makeFunctionDesc({
  name: 'math/subtract/integer',
  label: '-',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a - b
});

export const Negate = makeFunctionDesc({
  name: 'math/negate/integer',
  label: '-',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => -a
});

export const Multiply = makeFunctionDesc({
  name: 'math/multiply/integer',
  label: '×',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a * b
});

export const Divide = makeFunctionDesc({
  name: 'math/divide/integer',
  label: '÷',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a / b
});

export const Modulus = makeFunctionDesc({
  name: 'math/modulus/integer',
  label: 'MOD',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a % b
});

export const ToFloat = makeFunctionDesc({
  name: 'math/toFloat/integer',
  label: 'To Float',
  in: ['integer'],
  out: 'float',
  exec: (a: bigint) => Number(a)
});

export const Min = makeFunctionDesc({
  name: 'math/min/integer',
  label: 'MIN',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => (a > b ? b : a)
});

export const Max = makeFunctionDesc({
  name: 'math/max/integer',
  label: 'MAX',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => (a > b ? a : b)
});

export const Clamp = makeFunctionDesc({
  name: 'math/clamp/integer',
  label: 'CLAMP',
  in: [{ value: 'integer' }, { min: 'integer' }, { max: 'integer' }],
  out: 'integer',
  exec: (value: bigint, min: bigint, max: bigint) =>
    value < min ? min : value > max ? max : value
});

export const Abs = makeFunctionDesc({
  name: 'math/abs/integer',
  label: 'ABS',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => (a < BigInt(0) ? -a : a)
});

export const Sign = makeFunctionDesc({
  name: 'math/sign/integer',
  label: 'SIGN',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => BigInt(a < 0 ? -1 : a > 0 ? 1 : 0)
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/integer',
  label: '=',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a === b
});

export const GreaterThan = makeFunctionDesc({
  name: 'math/greaterThan/integer',
  label: '>',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a > b
});

export const GreaterThanOrEqual = makeFunctionDesc({
  name: 'math/greaterThanOrEqual/integer',
  label: '≥',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a >= b
});

export const LessThan = makeFunctionDesc({
  name: 'math/lessThan/integer',
  label: '<',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a < b
});

export const LessThanOrEqual = makeFunctionDesc({
  name: 'math/lessThanOrEqual/integer',
  label: '≤',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a <= b
});

export const toBoolean = makeFunctionDesc({
  name: 'math/toBoolean/integer',
  label: 'To Boolean',
  in: ['integer'],
  out: 'boolean',
  exec: (a: bigint) => a !== 0n
});
