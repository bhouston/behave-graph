import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In0Out1FuncNode } from '../../../Nodes/Templates/In0Out1FuncNode.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';

// Unreal Engine Blueprint Float nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Float/

export const FloatNodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
    'math/float',
    'Logic',
    'Constant',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => a
      )
  ),

  Add: new NodeDescription(
    'math/add/float',
    'Logic',
    '+',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => a + b
      )
  ),
  Subtract: new NodeDescription(
    'math/subtract/float',
    'Logic',
    '-',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => a - b
      )
  ),
  Negate: new NodeDescription(
    'math/negate/float',
    'Logic',
    '-',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => -a
      )
  ),

  Multiply: new NodeDescription(
    'math/multiply/float',
    'Logic',
    '×',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => a * b
      )
  ),
  Divide: new NodeDescription(
    'math/divide/float',
    'Logic',
    '÷',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => a / b
      )
  ),
  Modulus: new NodeDescription(
    'math/modulus/float',
    'Logic',
    'MOD',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => a % b
      )
  ),

  Power: new NodeDescription(
    'math/pow/float',
    'Logic',
    'POW',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => a ** b
      )
  ),
  SquareRoot: new NodeDescription(
    'math/sqrt/float',
    'Logic',
    'SQRT',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.sqrt(a)
      )
  ),

  E: new NodeDescription(
    'math/e/float',
    'Logic',
    'e',
    (description, graph) =>
      new In0Out1FuncNode<number>(description, graph, 'float', () => Math.E)
  ),
  Exp: new NodeDescription(
    'math/exp/float',
    'Logic',
    'EXP',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.exp(a)
      )
  ),
  Ln: new NodeDescription(
    'math/ln/float',
    'Logic',
    'LN',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.log(a)
      )
  ),
  Log2: new NodeDescription(
    'math/log2/float',
    'Logic',
    'LOG2',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.log2(a)
      )
  ),
  Log10: new NodeDescription(
    'math/log10/float',
    'Logic',
    'LOG10',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.log10(a)
      )
  ),

  PI: new NodeDescription(
    'math/pi/float',
    'Logic',
    'π',
    (description, graph) =>
      new In0Out1FuncNode<number>(description, graph, 'float', () => Math.PI)
  ),
  Sin: new NodeDescription(
    'math/sin/float',
    'Logic',
    'SIN',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.sin(a)
      )
  ),
  Asin: new NodeDescription(
    'math/asin/float',
    'Logic',
    'ASIN',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.asin(a)
      )
  ),
  Cos: new NodeDescription(
    'math/cos/float',
    'Logic',
    'COS',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.cos(a)
      )
  ),
  Acos: new NodeDescription(
    'math/acos/float',
    'Logic',
    'ACOS',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.acos(a)
      )
  ),
  Tan: new NodeDescription(
    'math/tan/float',
    'Logic',
    'TAN',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.tan(a)
      )
  ),
  Atan: new NodeDescription(
    'math/atan/float',
    'Logic',
    'ATAN',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.atan(a)
      )
  ),

  Mix: new NodeDescription(
    'math/mix/float',
    'Logic',
    'MIX',
    (description, graph) =>
      new In3Out1FuncNode<number, number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        'float',
        (a, b, t) => {
          const s = 1 - t;
          return a * s + b * t;
        },
        ['a', 'b', 't']
      )
  ),

  ToFloat: new NodeDescription(
    'math/toFloat/float',
    'Logic',
    'To Float',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Number(a)
      )
  ),

  Min: new NodeDescription(
    'math/min/float',
    'Logic',
    'MIN',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => Math.min(a, b)
      )
  ),
  Max: new NodeDescription(
    'math/max/float',
    'Logic',
    'MAX',
    (description, graph) =>
      new In2Out1FuncNode<number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        (a, b) => Math.max(a, b)
      )
  ),
  Clamp: new NodeDescription(
    'math/clamp/float',
    'Logic',
    'CLAMP',
    (description, graph) =>
      new In3Out1FuncNode<number, number, number, number>(
        description,
        graph,
        'float',
        'float',
        'float',
        'float',
        (value, min, max) => (value < min ? min : value > max ? max : value),
        ['value', 'min', 'max']
      )
  ),

  Abs: new NodeDescription(
    'math/abs/float',
    'Logic',
    'ABS',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.abs(a)
      )
  ),
  Sign: new NodeDescription(
    'math/sign/float',
    'Logic',
    'SIGN',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.sign(a)
      )
  ),

  Floor: new NodeDescription(
    'math/floor/float',
    'Logic',
    'FLOOR',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.floor(a)
      )
  ),
  Ceil: new NodeDescription(
    'math/ceil/float',
    'Logic',
    'CEIL',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.ceil(a)
      )
  ),
  Round: new NodeDescription(
    'math/round/float',
    'Logic',
    'ROUND',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.round(a)
      )
  ),
  Trunc: new NodeDescription(
    'math/trunc/float',
    'Logic',
    'TRUNC',
    (description, graph) =>
      new In1Out1FuncNode<number, number>(
        description,
        graph,
        'float',
        'float',
        (a) => Math.trunc(a)
      )
  ),

  Random: new NodeDescription(
    'math/random/float',
    'Logic',
    'RANDOM',
    (description, graph) =>
      new In0Out1FuncNode<number>(description, graph, 'float', () =>
        Math.random()
      )
  ),

  Equal: new NodeDescription(
    'math/equal/float',
    'Logic',
    '=',
    (description, graph) =>
      new In2Out1FuncNode<number, number, boolean>(
        description,
        graph,
        'float',
        'float',
        'boolean',
        (a, b) => a === b
      )
  ),
  GreaterThan: new NodeDescription(
    'math/greaterThan/float',
    'Logic',
    '>',
    (description, graph) =>
      new In2Out1FuncNode<number, number, boolean>(
        description,
        graph,
        'float',
        'float',
        'boolean',
        (a, b) => a > b
      )
  ),
  GreaterThanOrEqual: new NodeDescription(
    'math/greaterThanOrEqual/float',
    'Logic',
    '≥',
    (description, graph) =>
      new In2Out1FuncNode<number, number, boolean>(
        description,
        graph,
        'float',
        'float',
        'boolean',
        (a, b) => a >= b
      )
  ),
  LessThan: new NodeDescription(
    'math/lessThan/float',
    'Logic',
    '<',
    (description, graph) =>
      new In2Out1FuncNode<number, number, boolean>(
        description,
        graph,
        'float',
        'float',
        'boolean',
        (a, b) => a < b
      )
  ),
  LessThanOrEqual: new NodeDescription(
    'math/lessThanOrEqual/float',
    'Logic',
    '≤',
    (description, graph) =>
      new In2Out1FuncNode<number, number, boolean>(
        description,
        graph,
        'float',
        'float',
        'boolean',
        (a, b) => a <= b
      )
  ),

  IsNaN: new NodeDescription(
    'math/isNaN/float',
    'Logic',
    'isNaN',
    (description, graph) =>
      new In1Out1FuncNode<number, boolean>(
        description,
        graph,
        'float',
        'boolean',
        (a) => Number.isNaN(a)
      )
  ),
  IsInf: new NodeDescription(
    'math/isInf/float',
    'Logic',
    'isInf',
    (description, graph) =>
      new In1Out1FuncNode<number, boolean>(
        description,
        graph,
        'float',
        'boolean',
        (a) => !Number.isFinite(a) && !Number.isNaN(a)
      )
  )
};
