import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';

export const StringNodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
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
  ),

  Concat: new NodeDescription(
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
  ),
  Includes: new NodeDescription(
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
  ),
  Length: new NodeDescription(
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
  ),

  Multiply: new NodeDescription(
    'math/multiply/string',
    'Logic',
    '×',
    (description, graph) =>
      new In2Out1FuncNode<string, string, string>(
        description,
        graph,
        'string',
        'string',
        'string',
        (a, b) => a * b
      )
  ),
  Divide: new NodeDescription(
    'math/divide/string',
    'Logic',
    '÷',
    (description, graph) =>
      new In2Out1FuncNode<string, string, string>(
        description,
        graph,
        'string',
        'string',
        'string',
        (a, b) => a / b
      )
  ),
  Modulus: new NodeDescription(
    'math/modulus/string',
    'Logic',
    'MOD',
    (description, graph) =>
      new In2Out1FuncNode<string, string, string>(
        description,
        graph,
        'string',
        'string',
        'string',
        (a, b) => a % b
      )
  ),

  ToFloat: new NodeDescription(
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
  ),

  Min: new NodeDescription(
    'math/min/string',
    'Logic',
    'MIN',
    (description, graph) =>
      new In2Out1FuncNode<string, string, string>(
        description,
        graph,
        'string',
        'string',
        'string',
        (a, b) => (a > b ? b : a)
      )
  ),
  Max: new NodeDescription(
    'math/max/string',
    'Logic',
    'MAX',
    (description, graph) =>
      new In2Out1FuncNode<string, string, string>(
        description,
        graph,
        'string',
        'string',
        'string',
        (a, b) => (a > b ? a : b)
      )
  ),

  Abs: new NodeDescription(
    'math/abs/string',
    'Logic',
    'ABS',
    (description, graph) =>
      new In1Out1FuncNode<string, string>(
        description,
        graph,
        'string',
        'string',
        (a) => (a < 0n ? -a : a)
      )
  ),
  Sign: new NodeDescription(
    'math/sign/string',
    'Logic',
    'SIGN',
    (description, graph) =>
      new In1Out1FuncNode<string, string>(
        description,
        graph,
        'string',
        'string',
        (a) => (a < 0n ? -1n : a > 0n ? 1n : 0n)
      )
  ),

  Equal: new NodeDescription(
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
  ),
  GreaterThan: new NodeDescription(
    'math/greaterThan/string',
    'Logic',
    '>',
    (description, graph) =>
      new In2Out1FuncNode<string, string, boolean>(
        description,
        graph,
        'string',
        'string',
        'boolean',
        (a, b) => a > b
      )
  ),
  GreaterThanOrEqual: new NodeDescription(
    'math/greaterThanOrEqual/string',
    'Logic',
    '≥',
    (description, graph) =>
      new In2Out1FuncNode<string, string, boolean>(
        description,
        graph,
        'string',
        'string',
        'boolean',
        (a, b) => a >= b
      )
  ),
  LessThan: new NodeDescription(
    'math/lessThan/string',
    'Logic',
    '<',
    (description, graph) =>
      new In2Out1FuncNode<string, string, boolean>(
        description,
        graph,
        'string',
        'string',
        'boolean',
        (a, b) => a < b
      )
  ),
  LessThanOrEqual: new NodeDescription(
    'math/lessThanOrEqual/string',
    'Logic',
    '≤',
    (description, graph) =>
      new In2Out1FuncNode<string, string, boolean>(
        description,
        graph,
        'string',
        'string',
        'boolean',
        (a, b) => a <= b
      )
  )
};
