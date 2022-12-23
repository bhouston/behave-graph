import { FunctionDesc } from '../../../Nodes/FunctionNode';

export const Constant = new FunctionDesc({
  name: 'logic/string',
  label: 'String',
  in: ['string'],
  out: 'string',
  exec: (a: string) => a
});

export const Concat = new FunctionDesc({
  name: 'logic/concat/string',
  label: 'Concat',
  in: ['string', 'string'],
  out: 'string',
  exec: (a: string, b: string) => a.concat(b)
});

export const Includes = new FunctionDesc({
  name: 'logic/includes/string',
  label: 'Includes',
  in: ['string', 'string'],
  out: 'boolean',
  exec: (a: string, b: string) => a.includes(b)
});

export const Length = new FunctionDesc({
  name: 'logic/length/string',
  label: 'Length',
  in: ['string'],
  out: 'integer',
  exec: (a: string) => BigInt(a.length)
});

export const Equal = new FunctionDesc({
  name: 'math/equal/string',
  label: '=',
  in: ['string', 'string'],
  out: 'boolean',
  exec: (a: string, b: string) => a === b
});
