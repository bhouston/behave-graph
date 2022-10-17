import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';

export const BooleanNodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
    'math/boolean',
    'Logic',
    'Constant',
    (description, graph) =>
      new In1Out1FuncNode<boolean, boolean>(
        description,
        graph,
        'boolean',
        'boolean',
        (a) => a
      )
  ),

  And: new NodeDescription(
    'math/and/boolean',
    'Logic',
    'AND',
    (description, graph) =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        description,
        graph,
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a && b
      )
  ),
  Or: new NodeDescription(
    'math/or/boolean',
    'Logic',
    'OR',
    (description, graph) =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        description,
        graph,
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a || b
      )
  ),
  Not: new NodeDescription(
    'math/negate/boolean',
    'Logic',
    'NOT',
    (description, graph) =>
      new In1Out1FuncNode<boolean, boolean>(
        description,
        graph,
        'boolean',
        'boolean',
        (a) => !a
      )
  ),

  ToFloat: new NodeDescription(
    'math/toFloat/boolean',
    'Logic',
    'To Float',
    (description, graph) =>
      new In1Out1FuncNode<boolean, number>(
        description,
        graph,
        'boolean',
        'float',
        (a) => (a ? 1 : 0)
      )
  ),

  Equal: new NodeDescription(
    'math/equal/boolean',
    'Logic',
    '=',
    (description, graph) =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        description,
        graph,
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a === b
      )
  )
};
