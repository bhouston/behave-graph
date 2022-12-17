import { FunctionNodeDesc } from '../../../Nodes/FunctionNode';

export const Constant = new FunctionNodeDesc({
  name: 'logic/string',
  label: 'String',
  in: ['string'],
  out: 'string',
  exec: (a: string) => a
});

export const Concat = new FunctionNodeDesc({
  name: 'logic/concat/string',
  label: 'Concat',
  in: ['string', 'string'],
  out: 'string',
  exec: (a: string, b: string) => a.concat(b)
});

export const Includes = new FunctionNodeDesc({
  name: 'logic/includes/string',
  label: 'Includes',
  in: ['string', 'string'],
  out: 'boolean',
  exec: (a: string, b: string) => a.includes(b)
});

export const Length = new FunctionNodeDesc({
  name: 'logic/length/string',
  label: 'Length',
  in: ['string'],
  out: 'integer',
  exec: (a: string) => BigInt(a.length)
});

export const Equal = new FunctionNodeDesc({
  name: 'math/equal/string',
  label: '=',
  in: ['string', 'string'],
  out: 'boolean',
  exec: (a: string, b: string) => a === b
});
