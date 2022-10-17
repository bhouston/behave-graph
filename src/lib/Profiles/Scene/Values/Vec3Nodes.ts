import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { ValueType } from '../../../Values/ValueType.js';
import { VecCreate } from '../Logic/VecCreate.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  Vec3,
  vec3Add,
  vec3Cross,
  vec3Dot,
  vec3FromArray,
  Vec3JSON,
  vec3Length,
  vec3Mix,
  vec3Negate,
  vec3Normalize,
  vec3Parse,
  vec3Scale,
  vec3Subtract,
  vec3ToArray
} from './Vec3.js';

export const Vec3Value = new ValueType(
  'vec3',
  () => new Vec3(),
  (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value.x, value.y, value.z),
  (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
);

export const Vec3Nodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
    'math/vec3',
    'Logic',
    'Constant',
    (description, graph) =>
      new In1Out1FuncNode<Vec3, Vec3>(
        description,
        graph,
        'vec3',
        'vec3',
        (a) => a
      )
  ),

  Create: new NodeDescription(
    'math/create/vec3',
    'Logic',
    'CREATE',
    (description, graph) =>
      new VecCreate<Vec3>(
        description,
        graph,
        'vec3',
        ['x', 'y', 'z'],
        (elements: number[]) => vec3FromArray(elements)
      )
  ),
  Elements: new NodeDescription(
    'math/elements/vec3',
    'Logic',
    'CREATE',
    (description, graph) =>
      new VecElements<Vec3>(
        description,
        graph,
        'vec3',
        ['x', 'y', 'z'],
        vec3ToArray
      )
  ),

  Add: new NodeDescription(
    'math/add/vec3',
    'Logic',
    '+',
    (description, graph) =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        description,
        graph,
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Add(a, b)
      )
  ),
  Subtract: new NodeDescription(
    'math/subtract/vec3',
    'Logic',
    '-',
    (description, graph) =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        description,
        graph,
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Subtract(a, b)
      )
  ),
  Negate: new NodeDescription(
    'math/negate/vec3',
    'Logic',
    '-',
    (description, graph) =>
      new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'vec3', 'vec3', (a) =>
        vec3Negate(a)
      )
  ),

  Scale: new NodeDescription(
    'math/scale/vec3',
    'Logic',
    '×',
    (description, graph) =>
      new In2Out1FuncNode<Vec3, number, Vec3>(
        description,
        graph,
        'vec3',
        'float',
        'vec3',
        (a, b) => vec3Scale(a, b)
      )
  ),
  Length: new NodeDescription(
    'math/length/vec3',
    'Logic',
    'LENGTH',
    (description, graph) =>
      new In1Out1FuncNode<Vec3, number>(
        description,
        graph,
        'vec3',
        'float',
        (a) => vec3Length(a)
      )
  ),
  Normalize: new NodeDescription(
    'math/normalize/vec3',
    'Logic',
    'NORMALIZE',
    (description, graph) =>
      new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'vec3', 'vec3', (a) =>
        vec3Normalize(a)
      )
  ),
  Cross: new NodeDescription(
    'math/cross/vec3',
    'Logic',
    'CROSS',
    (description, graph) =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        description,
        graph,
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Cross(a, b)
      )
  ),
  Dot: new NodeDescription(
    'math/dot/vec3',
    'Logic',
    'DOT',
    (description, graph) =>
      new In2Out1FuncNode<Vec3, Vec3, number>(
        description,
        graph,
        'vec3',
        'vec3',
        'float',
        (a, b) => vec3Dot(a, b)
      )
  ),

  Mix: new NodeDescription(
    'math/mix/vec3',
    'Logic',
    '÷',
    (description, graph) =>
      new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
        description,
        graph,
        'vec3',
        'vec3',
        'float',
        'vec3',
        (a, b, t) => vec3Mix(a, b, t),
        ['a', 'b', 't']
      )
  )
};
