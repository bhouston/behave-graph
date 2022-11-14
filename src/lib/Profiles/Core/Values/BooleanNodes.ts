import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';

export const Constant = new NodeDescription(
  'math/boolean',
  'Logic',
  'Boolean',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['boolean'],
      'boolean',
      (a: boolean) => a
    )
);
export const And = new NodeDescription(
  'math/and/boolean',
  'Logic',
  '∧',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['boolean', 'boolean'],
      'boolean',
      (a: boolean, b: boolean) => a && b
    )
);
export const Or = new NodeDescription(
  'math/or/boolean',
  'Logic',
  '∨',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['boolean', 'boolean'],
      'boolean',
      (a: boolean, b: boolean) => a || b
    )
);
export const Not = new NodeDescription(
  'math/negate/boolean',
  'Logic',
  '¬',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['boolean'],
      'boolean',
      (a: boolean) => !a
    )
);
export const ToFloat = new NodeDescription(
  'math/toFloat/boolean',
  'Logic',
  'To Float',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['boolean'],
      'float',
      (a: boolean) => (a ? 1 : 0)
    )
);
export const Equal = new NodeDescription(
  'math/equal/boolean',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['boolean', 'boolean'],
      'boolean',
      (a: boolean, b: boolean) => a === b
    )
);
