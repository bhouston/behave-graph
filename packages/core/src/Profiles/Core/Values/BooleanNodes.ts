import { FunctionNodeDesc } from 'packages/core/src/Nodes/FunctionNode';

export const Constant = new FunctionNodeDesc({
  name: 'math/boolean',
  label: 'Boolean',
  in: { a: 'boolean' },
  out: { result: 'boolean' },
  exec: (a: boolean) => a
});

export const And = new FunctionNodeDesc({
  name: 'math/and/boolean',
  label: '∧',
  in: { a: 'boolean', b: 'boolean' },
  out: { result: 'boolean' },
  exec: (a: boolean, b: boolean) => a && b
});

export const Or = new FunctionNodeDesc({
  name: 'math/or/boolean',
  label: '∨',
  in: { a: 'boolean', b: 'boolean' },
  out: { result: 'boolean' },
  exec: (a: boolean, b: boolean) => a || b
});

export const Not = new FunctionNodeDesc({
  name: 'math/negate/boolean',
  label: '¬',
  in: { a: 'boolean' },
  out: { result: 'boolean' },
  exec: (a: boolean) => !a
});

export const ToFloat = new FunctionNodeDesc({
  name: 'math/toFloat/boolean',
  label: 'To Float',
  in: { a: 'boolean' },
  out: { result: 'float' },
  exec: (a: boolean) => (a ? 1 : 0)
});

export const Equal = new FunctionNodeDesc({
  name: 'math/equal/boolean',
  label: '=',
  in: { a: 'boolean', b: 'boolean' },
  out: { result: 'boolean' },
  exec: (a: boolean, b: boolean) => a === b
});

export const toInteger = new FunctionNodeDesc({
  name: 'math/toInteger/boolean',
  label: 'To Integer',
  in: { a: 'boolean' },
  out: { result: 'integer' },
  exec: (a: boolean) => (a ? 1n : 0n)
});
