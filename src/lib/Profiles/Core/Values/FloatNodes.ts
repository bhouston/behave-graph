import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { In0Out1FuncNode } from '../../../Nodes/Templates/In0Out1FuncNode.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';

// Unreal Engine Blueprint Float nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Float/

export const Constant = new NodeDescription(
  'math/float',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['float'],
      'float',
      (a: number) => a
    )
);

export const Add = new NodeDescription(
  'math/add/float',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => a + b
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/float',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => a - b
    )
);
export const Negate = new NodeDescription(
  'math/negate/float',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['float'],
      'float',
      (a: number) => -a
    )
);

export const Multiply = new NodeDescription(
  'math/multiply/float',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => a * b
    )
);
export const Divide = new NodeDescription(
  'math/divide/float',
  'Logic',
  '÷',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => a / b
    )
);
export const Modulus = new NodeDescription(
  'math/modulus/float',
  'Logic',
  'MOD',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => a % b
    )
);

export const Power = new NodeDescription(
  'math/pow/float',
  'Logic',
  'POW',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      Math.pow
    )
);
export const SquareRoot = new NodeDescription(
  'math/sqrt/float',
  'Logic',
  'SQRT',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.sqrt)
);

export const E = new NodeDescription(
  'math/e/float',
  'Logic',
  'e',
  (description, graph) =>
    new In0Out1FuncNode(description, graph, 'float', () => Math.E)
);
export const Exp = new NodeDescription(
  'math/exp/float',
  'Logic',
  'EXP',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.exp)
);
export const Ln = new NodeDescription(
  'math/ln/float',
  'Logic',
  'LN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.log)
);
export const Log2 = new NodeDescription(
  'math/log2/float',
  'Logic',
  'LOG2',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.log2)
);
export const Log10 = new NodeDescription(
  'math/log10/float',
  'Logic',
  'LOG10',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.log10)
);

export const PI = new NodeDescription(
  'math/pi/float',
  'Logic',
  'π',
  (description, graph) =>
    new In0Out1FuncNode(description, graph, 'float', () => Math.PI)
);
export const Sin = new NodeDescription(
  'math/sin/float',
  'Logic',
  'SIN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.sin)
);
export const Asin = new NodeDescription(
  'math/asin/float',
  'Logic',
  'ASIN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.asin)
);
export const Cos = new NodeDescription(
  'math/cos/float',
  'Logic',
  'COS',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.cos)
);
export const Acos = new NodeDescription(
  'math/acos/float',
  'Logic',
  'ACOS',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.acos)
);
export const Tan = new NodeDescription(
  'math/tan/float',
  'Logic',
  'TAN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.tan)
);
export const Atan = new NodeDescription(
  'math/atan/float',
  'Logic',
  'ATAN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.atan)
);

export const Mix = new NodeDescription(
  'math/mix/float',
  'Logic',
  'MIX',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float'],
      'float',
      (a: number, b: number, t: number) => {
        const s = 1 - t;
        return a * s + b * t;
      },
      ['a', 'b', 't']
    )
);

export const ToFloat = new NodeDescription(
  'math/toFloat/float',
  'Logic',
  'To Float',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', (a: number) =>
      Number(a)
    )
);

export const Min = new NodeDescription(
  'math/min/float',
  'Logic',
  'MIN',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => Math.min(a, b) // TODO: can I jsut pass in Math.min?
    )
);
export const Max = new NodeDescription(
  'math/max/float',
  'Logic',
  'MAX',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'float',
      (a: number, b: number) => Math.max(a, b) // TODO: can I jsut pass in Math.max?
    )
);
export const Clamp = new NodeDescription(
  'math/clamp/float',
  'Logic',
  'CLAMP',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float'],
      'float',
      (value: number, min: number, max: number) =>
        value < min ? min : value > max ? max : value,
      ['value', 'min', 'max']
    )
);

export const Abs = new NodeDescription(
  'math/abs/float',
  'Logic',
  'ABS',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.abs)
);
export const Sign = new NodeDescription(
  'math/sign/float',
  'Logic',
  'SIGN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.sign)
);

export const Floor = new NodeDescription(
  'math/floor/float',
  'Logic',
  'FLOOR',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.floor)
);
export const Ceil = new NodeDescription(
  'math/ceil/float',
  'Logic',
  'CEIL',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.ceil)
);
export const Round = new NodeDescription(
  'math/round/float',
  'Logic',
  'ROUND',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.round)
);
export const Trunc = new NodeDescription(
  'math/trunc/float',
  'Logic',
  'TRUNC',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'float', Math.trunc)
);

export const Random = new NodeDescription(
  'math/random/float',
  'Logic',
  'RANDOM',
  (description, graph) =>
    new In0Out1FuncNode(description, graph, 'float', Math.random)
);

export const Equal = new NodeDescription(
  'math/equal/float',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'boolean',
      (a: number, b: number) => a === b
    )
);
export const GreaterThan = new NodeDescription(
  'math/greaterThan/float',
  'Logic',
  '>',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'boolean',
      (a: number, b: number) => a > b
    )
);
export const GreaterThanOrEqual = new NodeDescription(
  'math/greaterThanOrEqual/float',
  'Logic',
  '≥',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'boolean',
      (a: number, b: number) => a >= b
    )
);
export const LessThan = new NodeDescription(
  'math/lessThan/float',
  'Logic',
  '<',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'boolean',
      (a: number, b: number) => a < b
    )
);
export const LessThanOrEqual = new NodeDescription(
  'math/lessThanOrEqual/float',
  'Logic',
  '≤',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'boolean',
      (a: number, b: number) => a <= b
    )
);

export const IsNaN = new NodeDescription(
  'math/isNaN/float',
  'Logic',
  'isNaN',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'boolean', Number.isNaN)
);
export const IsInf = new NodeDescription(
  'math/isInf/float',
  'Logic',
  'isInf',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['float'],
      'boolean',
      (a: number) => !Number.isFinite(a) && !Number.isNaN(a)
    )
);
