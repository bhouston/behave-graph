import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';

export const Constant = new NodeDescription(
  'logic/string',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode<string, string>(
      description,
      graph,
      'string',
      'string',
      (a) => a
    )
);

export const Concat = new NodeDescription(
  'logic/concat/string',
  'Logic',
  'CONCAT',
  (description, graph) =>
    new In2Out1FuncNode<string, string, string>(
      description,
      graph,
      'string',
      'string',
      'string',
      (a, b) => a.concat(b)
    )
);
export const Includes = new NodeDescription(
  'logic/includes/string',
  'Logic',
  'INCLUDES',
  (description, graph) =>
    new In2Out1FuncNode<string, string, boolean>(
      description,
      graph,
      'string',
      'string',
      'boolean',
      (a, b) => a.includes(b)
    )
);
export const Length = new NodeDescription(
  'logic/length/string',
  'Logic',
  'LENGTH',
  (description, graph) =>
    new In1Out1FuncNode<string, bigint>(
      description,
      graph,
      'string',
      'integer',
      (a) => BigInt(a.length)
    )
);

export const ToFloat = new NodeDescription(
  'math/toFloat/string',
  'Logic',
  'To Float',
  (description, graph) =>
    new In1Out1FuncNode<string, number>(
      description,
      graph,
      'string',
      'float',
      (a) => Number(a)
    )
);

export const Equal = new NodeDescription(
  'math/equal/string',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode<string, string, boolean>(
      description,
      graph,
      'string',
      'string',
      'boolean',
      (a, b) => a === b
    )
);
