import { makeFunctionDesc } from '../../../Nodes/FunctionNode';

export const Constant = makeFunctionDesc({
  name: 'math/boolean',
  label: 'Boolean',
  in: ['boolean'],
  out: 'boolean',
  exec: (a: boolean) => a
});

export const And = makeFunctionDesc({
  name: 'math/and/boolean',
  label: '∧',
  in: ['boolean', 'boolean'],
  out: 'boolean',
  exec: (a: boolean, b: boolean) => a && b
});

export const Or = makeFunctionDesc({
  name: 'math/or/boolean',
  label: '∨',
  in: ['boolean', 'boolean'],
  out: 'boolean',
  exec: (a: boolean, b: boolean) => a || b
});

export const Not = makeFunctionDesc({
  name: 'math/negate/boolean',
  label: '¬',
  in: ['boolean'],
  out: 'boolean',
  exec: (a: boolean) => !a
});

export const ToFloat = makeFunctionDesc({
  name: 'math/toFloat/boolean',
  label: 'To Float',
  in: ['boolean'],
  out: 'float',
  exec: (a: boolean) => (a ? 1 : 0)
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/boolean',
  label: '=',
  in: ['boolean', 'boolean'],
  out: 'boolean',
  exec: (a: boolean, b: boolean) => a === b
});

export const toInteger = makeFunctionDesc({
  name: 'math/toInteger/boolean',
  label: 'To Integer',
  in: ['boolean'],
  out: 'integer',
  exec: (a: boolean) => (a ? 1n : 0n)
});
