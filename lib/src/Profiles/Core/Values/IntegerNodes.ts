import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';

// Unreal Engine Integer Blueprints API: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Integer/

export const Constant = new NodeDescription(
  'math/integer',
  'Logic',
  'Integer',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['integer'],
      'integer',
      (a: bigint) => a
    )
);

export const Add = new NodeDescription(
  'math/add/integer',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => a + b
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/integer',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => a - b
    )
);
export const Negate = new NodeDescription(
  'math/negate/integer',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['integer'],
      'integer',
      (a: bigint) => -a
    )
);

export const Multiply = new NodeDescription(
  'math/multiply/integer',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => a * b
    )
);
export const Divide = new NodeDescription(
  'math/divide/integer',
  'Logic',
  '÷',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => a / b
    )
);
export const Modulus = new NodeDescription(
  'math/modulus/integer',
  'Logic',
  'MOD',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => a % b
    )
);

export const ToFloat = new NodeDescription(
  'math/toFloat/integer',
  'Logic',
  'To Float',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['integer'], 'float', (a: bigint) =>
      Number(a)
    )
);

export const Min = new NodeDescription(
  'math/min/integer',
  'Logic',
  'MIN',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => (a > b ? b : a)
    )
);
export const Max = new NodeDescription(
  'math/max/integer',
  'Logic',
  'MAX',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'integer',
      (a: bigint, b: bigint) => (a > b ? a : b)
    )
);
export const Clamp = new NodeDescription(
  'math/clamp/integer',
  'Logic',
  'CLAMP',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['integer', 'integer', 'integer'],
      'integer',
      (value: bigint, min: bigint, max: bigint) =>
        value < min ? min : value > max ? max : value,
      ['value', 'min', 'max']
    )
);

export const Abs = new NodeDescription(
  'math/abs/integer',
  'Logic',
  'ABS',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['integer'],
      'integer',
      (a: bigint) => (a < BigInt(0) ? -a : a)
    )
);
export const Sign = new NodeDescription(
  'math/sign/integer',
  'Logic',
  'SIGN',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['integer'],
      'integer',
      (a: bigint) => BigInt(a < 0 ? -1 : a > 0 ? 1 : 0)
    )
);

export const Equal = new NodeDescription(
  'math/equal/integer',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'boolean',
      (a: bigint, b: bigint) => a === b
    )
);
export const GreaterThan = new NodeDescription(
  'math/greaterThan/integer',
  'Logic',
  '>',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'boolean',
      (a: bigint, b: bigint) => a > b
    )
);
export const GreaterThanOrEqual = new NodeDescription(
  'math/greaterThanOrEqual/integer',
  'Logic',
  '≥',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'boolean',
      (a: bigint, b: bigint) => a >= b
    )
);
export const LessThan = new NodeDescription(
  'math/lessThan/integer',
  'Logic',
  '<',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'boolean',
      (a: bigint, b: bigint) => a < b
    )
);
export const LessThanOrEqual = new NodeDescription(
  'math/lessThanOrEqual/integer',
  'Logic',
  '≤',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['integer', 'integer'],
      'boolean',
      (a: bigint, b: bigint) => a <= b
    )
);
