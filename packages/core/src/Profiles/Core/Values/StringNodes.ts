import { makeInNOutFunctionDesc } from '../../../Nodes/FunctionNode';
export const Constant = makeInNOutFunctionDesc({
  name: 'logic/string',
  label: 'String',
  in: ['string'],
  out: 'string',
  exec: (a: string) => a
});

export const Concat = makeInNOutFunctionDesc({
  name: 'logic/concat/string',
  label: 'Concat',
  in: ['string', 'string'],
  out: 'string',
  exec: (a: string, b: string) => a.concat(b)
});

export const Includes = makeInNOutFunctionDesc({
  name: 'logic/includes/string',
  label: 'Includes',
  in: ['string', 'string'],
  out: 'boolean',
  exec: (a: string, b: string) => a.includes(b)
});

export const Length = makeInNOutFunctionDesc({
  name: 'logic/length/string',
  label: 'Length',
  in: ['string'],
  out: 'integer',
  exec: (a: string) => BigInt(a.length)
});

export const Equal = makeInNOutFunctionDesc({
  name: 'math/equal/string',
  label: '=',
  in: ['string', 'string'],
  out: 'boolean',
  exec: (a: string, b: string) => a === b
});
