import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
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
import { eulerToQuat } from './Internal/Vec4.js';

export const Constant = new NodeDescription(
  'math/euler',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['euler'], 'euler', (a: Vec3) => a)
);
export const Create = new NodeDescription(
  'math/create/euler',
  'Logic',
  'CREATE',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float'],
      'euler',
      (x: number, y: number, z: number) => new Vec3(x, y, z),
      ['x', 'y', 'z']
    )
);

export const Elements = new NodeDescription(
  'math/elements/euler',
  'Logic',
  'CREATE',
  (description, graph) =>
    new VecElements(description, graph, 'euler', ['x', 'y', 'z'], vec3ToArray)
);

export const Add = new NodeDescription(
  'math/add/euler',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['euler', 'euler'],
      'euler',
      vec3Add
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/euler',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['euler', 'euler'],
      'euler',
      vec3Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/euler',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['euler'], 'euler', vec3Negate)
);

export const Scale = new NodeDescription(
  'math/scale/euler',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['euler', 'float'],
      'euler',
      vec3Scale
    )
);

export const Mix = new NodeDescription(
  'math/mix/euler',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['euler', 'euler', 'float'],
      'euler',
      vec3Mix,
      ['a', 'b', 't']
    )
);

export const toQuat = new NodeDescription(
  'math/toQuat/euler',
  'Logic',
  '÷',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['euler'], 'quat', eulerToQuat)
);

export const Equal = new NodeDescription(
  'math/equal/euler',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['euler', 'euler'],
      'boolean',
      vec3Equals
    )
);
