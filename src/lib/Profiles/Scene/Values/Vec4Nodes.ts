import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { ValueType } from '../../../Values/ValueType.js';
import { VecCreate } from '../Logic/VecCreate.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  Vec4,
  vec4Add,
  vec4Dot,
  vec4FromArray,
  Vec4JSON,
  vec4Length,
  vec4Mix,
  vec4Negate,
  vec4Normalize,
  vec4Parse,
  vec4Scale,
  vec4Subtract,
  vec4ToArray
} from './Vec4.js';

export const Vec4Value = new ValueType(
  'vec4',
  () => new Vec4(),
  (value: string | Vec4JSON) =>
    typeof value === 'string'
      ? vec4Parse(value)
      : new Vec4(value.x, value.y, value.z, value.w),
  (value) => ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
);

export const Vec4Nodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
    'math/vec4',
    'Logic',
    'Constant',
    (description, graph) =>
      new In1Out1FuncNode<Vec4, Vec4>(
        description,
        graph,
        'vec4',
        'vec4',
        (a) => a
      )
  ),

  Create: new NodeDescription(
    'math/create/vec4',
    'Logic',
    'CREATE',
    (description, graph) =>
      new VecCreate<Vec4>(
        description,
        graph,
        'vec4',
        ['x', 'y', 'z', 'w'],
        (elements: number[]) => vec4FromArray(elements)
      )
  ),
  Elements: new NodeDescription(
    'math/elements/vec4',
    'Logic',
    'CREATE',
    (description, graph) =>
      new VecElements<Vec4>(
        description,
        graph,
        'vec4',
        ['x', 'y', 'z', 'w'],
        vec4ToArray
      )
  ),

  Add: new NodeDescription(
    'math/add/vec4',
    'Logic',
    '+',
    (description, graph) =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        description,
        graph,
        'vec4',
        'vec4',
        'vec4',
        (a, b) => vec4Add(a, b)
      )
  ),
  Subtract: new NodeDescription(
    'math/subtract/vec4',
    'Logic',
    '-',
    (description, graph) =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        description,
        graph,
        'vec4',
        'vec4',
        'vec4',
        (a, b) => vec4Subtract(a, b)
      )
  ),
  Negate: new NodeDescription(
    'math/negate/vec4',
    'Logic',
    '-',
    (description, graph) =>
      new In1Out1FuncNode<Vec4, Vec4>(description, graph, 'vec4', 'vec4', (a) =>
        vec4Negate(a)
      )
  ),

  Scale: new NodeDescription(
    'math/scale/vec4',
    'Logic',
    '×',
    (description, graph) =>
      new In2Out1FuncNode<Vec4, number, Vec4>(
        description,
        graph,
        'vec4',
        'float',
        'vec4',
        (a, b) => vec4Scale(a, b)
      )
  ),
  Length: new NodeDescription(
    'math/length/vec4',
    'Logic',
    'LENGTH',
    (description, graph) =>
      new In1Out1FuncNode<Vec4, number>(
        description,
        graph,
        'vec4',
        'float',
        (a) => vec4Length(a)
      )
  ),
  Normalize: new NodeDescription(
    'math/normalize/vec4',
    'Logic',
    'NORMALIZE',
    (description, graph) =>
      new In1Out1FuncNode<Vec4, Vec4>(description, graph, 'vec4', 'vec4', (a) =>
        vec4Normalize(a)
      )
  ),
  Dot: new NodeDescription(
    'math/dot/vec4',
    'Logic',
    'DOT',
    (description, graph) =>
      new In2Out1FuncNode<Vec4, Vec4, number>(
        description,
        graph,
        'vec4',
        'vec4',
        'float',
        (a, b) => vec4Dot(a, b)
      )
  ),

  Mix: new NodeDescription(
    'math/mix/vec4',
    'Logic',
    '÷',
    (description, graph) =>
      new In3Out1FuncNode<Vec4, Vec4, number, Vec4>(
        description,
        graph,
        'vec4',
        'vec4',
        'float',
        'vec4',
        (a, b, t) => vec4Mix(a, b, t),
        ['a', 'b', 't']
      )
  )
};
