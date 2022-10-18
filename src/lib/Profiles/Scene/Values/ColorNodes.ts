import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  Vec3,
  vec3Add,
  vec3Mix,
  vec3Negate,
  vec3Scale,
  vec3Subtract,
  vec3ToArray
} from './Internal/Vec3.js';

export const Constant = new NodeDescription(
  'math/color',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(
      description,
      graph,
      'color',
      'color',
      (a) => a
    )
);
export const Create = new NodeDescription(
  'math/create/color',
  'Logic',
  'CREATE',
  (description, graph) =>
    new In3Out1FuncNode<number, number, number, Vec3>(
      description,
      graph,
      'float',
      'float',
      'float',
      'color',
      (r, g, b) => new Vec3(r, g, b),
      ['r', 'g', 'b']
    )
);

export const Elements = new NodeDescription(
  'math/elements/color',
  'Logic',
  'CREATE',
  (description, graph) =>
    new VecElements<Vec3>(
      description,
      graph,
      'color',
      ['r', 'g', 'b'],
      vec3ToArray
    )
);

export const Add = new NodeDescription(
  'math/add/color',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, Vec3>(
      description,
      graph,
      'color',
      'color',
      'color',
      (a, b) => vec3Add(a, b)
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/color',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, Vec3>(
      description,
      graph,
      'color',
      'color',
      'color',
      (a, b) => vec3Subtract(a, b)
    )
);
export const Negate = new NodeDescription(
  'math/negate/color',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'color', 'color', (a) =>
      vec3Negate(a)
    )
);

export const Scale = new NodeDescription(
  'math/scale/color',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, number, Vec3>(
      description,
      graph,
      'color',
      'float',
      'color',
      (a, b) => vec3Scale(a, b)
    )
);

export const Mix = new NodeDescription(
  'math/mix/color',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
      description,
      graph,
      'color',
      'color',
      'float',
      'color',
      (a, b, t) => vec3Mix(a, b, t),
      ['a', 'b', 't']
    )
);
