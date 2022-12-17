import { FunctionDesc } from '../../../Nodes/FunctionNode';

export const Constant = new FunctionDesc({
  name: 'math/boolean',
  label: 'Boolean',
  in: ['boolean'],
  out: 'boolean',
  exec: (a: boolean) => a
});

export const And = new FunctionDesc({
  name: 'math/and/boolean',
  label: '∧',
  in: ['boolean', 'boolean'],
  out: 'boolean',
  exec: (a: boolean, b: boolean) => a && b
});

export const Or = new FunctionDesc({
  name: 'math/or/boolean',
  label: '∨',
  in: ['boolean', 'boolean'],
  out: 'boolean',
  exec: (a: boolean, b: boolean) => a || b
});

export const Not = new FunctionDesc({
  name: 'math/negate/boolean',
  label: '¬',
  in: ['boolean'],
  out: 'boolean',
  exec: (a: boolean) => !a
});

export const ToFloat = new FunctionDesc({
  name: 'math/toFloat/boolean',
  label: 'To Float',
  in: ['boolean'],
  out: 'float',
  exec: (a: boolean) => (a ? 1 : 0)
});

export const Equal = new FunctionDesc({
  name: 'math/equal/boolean',
  label: '=',
  in: ['boolean', 'boolean'],
  out: 'boolean',
  exec: (a: boolean, b: boolean) => a === b
});

export const toInteger = new FunctionDesc({
  name: 'math/toInteger/boolean',
  label: 'To Integer',
  in: ['boolean'],
  out: 'integer',
  exec: (a: boolean) => (a ? 1n : 0n)
});
