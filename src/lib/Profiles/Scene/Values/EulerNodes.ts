import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  Vec3,
  vec3Add,
  vec3Equals,
  vec3Mix,
  vec3Negate,
  vec3Scale,
  vec3Subtract,
  vec3ToArray
} from './Internal/Vec3.js';
import { eulerToQuat, Vec4 } from './Internal/Vec4.js';

export const Constant = new NodeDescription(
  'math/euler',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(
      description,
      graph,
      'euler',
      'euler',
      (a) => a
    )
);
export const Create = new NodeDescription(
  'math/create/euler',
  'Logic',
  'CREATE',
  (description, graph) =>
    new In3Out1FuncNode<number, number, number, Vec3>(
      description,
      graph,
      'float',
      'float',
      'float',
      'euler',
      (x, y, z) => new Vec3(x, y, z)
    )
);

export const Elements = new NodeDescription(
  'math/elements/euler',
  'Logic',
  'CREATE',
  (description, graph) =>
    new VecElements<Vec3>(
      description,
      graph,
      'euler',
      ['x', 'y', 'z'],
      vec3ToArray
    )
);

export const Add = new NodeDescription(
  'math/add/euler',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, Vec3>(
      description,
      graph,
      'euler',
      'euler',
      'euler',
      (a, b) => vec3Add(a, b)
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/euler',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, Vec3>(
      description,
      graph,
      'euler',
      'euler',
      'euler',
      (a, b) => vec3Subtract(a, b)
    )
);
export const Negate = new NodeDescription(
  'math/negate/euler',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'euler', 'euler', (a) =>
      vec3Negate(a)
    )
);

export const Scale = new NodeDescription(
  'math/scale/euler',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, number, Vec3>(
      description,
      graph,
      'euler',
      'float',
      'euler',
      (a, b) => vec3Scale(a, b)
    )
);

export const Mix = new NodeDescription(
  'math/mix/euler',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
      description,
      graph,
      'euler',
      'euler',
      'float',
      'euler',
      (a, b, t) => vec3Mix(a, b, t),
      ['a', 'b', 't']
    )
);

export const toQuat = new NodeDescription(
  'math/toQuat/euler',
  'Logic',
  '÷',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec4>(description, graph, 'euler', 'quat', (a) =>
      eulerToQuat(a)
    )
);

export const Equal = new NodeDescription(
  'math/equal/euler',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, boolean>(
      description,
      graph,
      'euler',
      'euler',
      'boolean',
      (a, b) => vec3Equals(a, b)
    )
);
