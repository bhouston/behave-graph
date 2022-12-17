import { FunctionDesc } from '../../../Nodes/FunctionNode';

// Unreal Engine Integer Blueprints API: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Integer/

export const Constant = new FunctionDesc({
  name: 'math/integer',
  label: 'Integer',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => a
});

export const Add = new FunctionDesc({
  name: 'math/add/integer',
  label: '+',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a + b
});

export const Subtract = new FunctionDesc({
  name: 'math/subtract/integer',
  label: '-',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a - b
});

export const Negate = new FunctionDesc({
  name: 'math/negate/integer',
  label: '-',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => -a
});

export const Multiply = new FunctionDesc({
  name: 'math/multiply/integer',
  label: '×',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a * b
});

export const Divide = new FunctionDesc({
  name: 'math/divide/integer',
  label: '÷',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a / b
});

export const Modulus = new FunctionDesc({
  name: 'math/modulus/integer',
  label: 'MOD',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => a % b
});

export const ToFloat = new FunctionDesc({
  name: 'math/toFloat/integer',
  label: 'To Float',
  in: ['integer'],
  out: 'float',
  exec: (a: bigint) => Number(a)
});

export const Min = new FunctionDesc({
  name: 'math/min/integer',
  label: 'MIN',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => (a > b ? b : a)
});

export const Max = new FunctionDesc({
  name: 'math/max/integer',
  label: 'MAX',
  in: ['integer', 'integer'],
  out: 'integer',
  exec: (a: bigint, b: bigint) => (a > b ? a : b)
});

export const Clamp = new FunctionDesc({
  name: 'math/clamp/integer',
  label: 'CLAMP',
  in: { value: 'integer', min: 'integer', max: 'integer' },
  out: 'integer',
  exec: (value: bigint, min: bigint, max: bigint) =>
    value < min ? min : value > max ? max : value
});

export const Abs = new FunctionDesc({
  name: 'math/abs/integer',
  label: 'ABS',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => (a < BigInt(0) ? -a : a)
});

export const Sign = new FunctionDesc({
  name: 'math/sign/integer',
  label: 'SIGN',
  in: ['integer'],
  out: 'integer',
  exec: (a: bigint) => BigInt(a < 0 ? -1 : a > 0 ? 1 : 0)
});

export const Equal = new FunctionDesc({
  name: 'math/equal/integer',
  label: '=',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a === b
});

export const GreaterThan = new FunctionDesc({
  name: 'math/greaterThan/integer',
  label: '>',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a > b
});

export const GreaterThanOrEqual = new FunctionDesc({
  name: 'math/greaterThanOrEqual/integer',
  label: '≥',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a >= b
});

export const LessThan = new FunctionDesc({
  name: 'math/lessThan/integer',
  label: '<',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a < b
});

export const LessThanOrEqual = new FunctionDesc({
  name: 'math/lessThanOrEqual/integer',
  label: '≤',
  in: ['integer', 'integer'],
  out: 'boolean',
  exec: (a: bigint, b: bigint) => a <= b
});

export const toBoolean = new FunctionDesc({
  name: 'math/toBoolean/integer',
  label: 'To Boolean',
  in: ['integer'],
  out: 'boolean',
  exec: (a: bigint) => a !== 0n
});
