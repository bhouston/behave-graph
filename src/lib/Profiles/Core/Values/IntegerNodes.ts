import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';

export const IntegerNodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
    'math/integer',
    'Logic',
    'Constant',
    (description, graph) =>
      new In1Out1FuncNode<bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        (a) => a
      )
  ),

  Add: new NodeDescription(
    'math/add/integer',
    'Logic',
    '+',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => a + b
      )
  ),
  Subtract: new NodeDescription(
    'math/subtract/integer',
    'Logic',
    '-',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => a - b
      )
  ),
  Negate: new NodeDescription(
    'math/negate/integer',
    'Logic',
    '-',
    (description, graph) =>
      new In1Out1FuncNode<bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        (a) => -a
      )
  ),

  Multiply: new NodeDescription(
    'math/multiply/integer',
    'Logic',
    '×',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => a * b
      )
  ),
  Divide: new NodeDescription(
    'math/divide/integer',
    'Logic',
    '÷',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => a / b
      )
  ),
  Modulus: new NodeDescription(
    'math/modulus/integer',
    'Logic',
    'MOD',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => a % b
      )
  ),

  ToFloat: new NodeDescription(
    'math/toFloat/integer',
    'Logic',
    'To Float',
    (description, graph) =>
      new In1Out1FuncNode<bigint, number>(
        description,
        graph,
        'integer',
        'float',
        (a) => Number(a)
      )
  ),

  Min: new NodeDescription(
    'math/min/integer',
    'Logic',
    'MIN',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? b : a)
      )
  ),
  Max: new NodeDescription(
    'math/max/integer',
    'Logic',
    'MAX',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? a : b)
      )
  ),

  Abs: new NodeDescription(
    'math/abs/integer',
    'Logic',
    'ABS',
    (description, graph) =>
      new In1Out1FuncNode<bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        (a) => (a < 0n ? -a : a)
      )
  ),
  Sign: new NodeDescription(
    'math/sign/integer',
    'Logic',
    'SIGN',
    (description, graph) =>
      new In1Out1FuncNode<bigint, bigint>(
        description,
        graph,
        'integer',
        'integer',
        (a) => (a < 0n ? -1n : a > 0n ? 1n : 0n)
      )
  ),

  Equal: new NodeDescription(
    'math/equal/integer',
    'Logic',
    '=',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        description,
        graph,
        'integer',
        'integer',
        'boolean',
        (a, b) => a === b
      )
  ),
  GreaterThan: new NodeDescription(
    'math/greaterThan/integer',
    'Logic',
    '>',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        description,
        graph,
        'integer',
        'integer',
        'boolean',
        (a, b) => a > b
      )
  ),
  GreaterThanOrEqual: new NodeDescription(
    'math/greaterThanOrEqual/integer',
    'Logic',
    '≥',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        description,
        graph,
        'integer',
        'integer',
        'boolean',
        (a, b) => a >= b
      )
  ),
  LessThan: new NodeDescription(
    'math/lessThan/integer',
    'Logic',
    '<',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        description,
        graph,
        'integer',
        'integer',
        'boolean',
        (a, b) => a < b
      )
  ),
  IntegerLessThanOrEqual: new NodeDescription(
    'math/lessThanOrEqual/integer',
    'Logic',
    '≤',
    (description, graph) =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        description,
        graph,
        'integer',
        'integer',
        'boolean',
        (a, b) => a <= b
      )
  )
};
