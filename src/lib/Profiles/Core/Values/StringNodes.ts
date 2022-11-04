import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';

export const Constant = new NodeDescription(
  'logic/string',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['string'],
      'string',
      (a: string) => a
    )
);

export const Concat = new NodeDescription(
  'logic/concat/string',
  'Logic',
  'CONCAT',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['string', 'string'],
      'string',
      (a: string, b: string) => a.concat(b)
    )
);
export const Includes = new NodeDescription(
  'logic/includes/string',
  'Logic',
  'INCLUDES',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['string', 'string'],
      'boolean',
      (a: string, b: string) => a.includes(b)
    )
);
export const Length = new NodeDescription(
  'logic/length/string',
  'Logic',
  'LENGTH',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['string'],
      'integer',
      (a: string) => BigInt(a.length)
    )
);

export const Equal = new NodeDescription(
  'math/equal/string',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['string', 'string'],
      'boolean',
      (a: string, b: string) => a === b
    )
);
