import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  Vec3,
  vec3Add,
  vec3Cross,
  vec3Dot,
  vec3Equals,
  vec3Length,
  vec3Mix,
  vec3Negate,
  vec3Normalize,
  vec3Scale,
  vec3Subtract,
  vec3ToArray
} from './Internal/Vec3.js';

export const Constant = new NodeDescription(
  'math/vec3',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec3'], 'vec3', (a: Vec3) => a)
);

export const Create = new NodeDescription(
  'math/create/vec3',
  'Logic',
  'CREATE',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float'],
      'vec3',
      (x: number, y: number, z: number) => new Vec3(x, y, z),
      ['x', 'y', 'z']
    )
);

export const Elements = new NodeDescription(
  'math/elements/vec3',
  'Logic',
  'CREATE',
  (description, graph) =>
    new VecElements(description, graph, 'vec3', ['x', 'y', 'z'], vec3ToArray)
);

export const Add = new NodeDescription(
  'math/add/vec3',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec3', 'vec3'], 'vec3', vec3Add)
);
export const Subtract = new NodeDescription(
  'math/subtract/vec3',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec3', 'vec3'],
      'vec3',
      vec3Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/vec3',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec3'], 'vec3', vec3Negate)
);
export const Scale = new NodeDescription(
  'math/scale/vec3',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec3', 'float'],
      'vec3',
      vec3Scale
    )
);
export const Length = new NodeDescription(
  'math/length/vec3',
  'Logic',
  'LENGTH',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec3'], 'float', vec3Length)
);
export const Normalize = new NodeDescription(
  'math/normalize/vec3',
  'Logic',
  'NORMALIZE',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec3'], 'vec3', vec3Normalize)
);
export const Cross = new NodeDescription(
  'math/cross/vec3',
  'Logic',
  'CROSS',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec3', 'vec3'], 'vec3', vec3Cross)
);
export const Dot = new NodeDescription(
  'math/dot/vec3',
  'Logic',
  'DOT',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec3', 'vec3'], 'float', vec3Dot)
);
export const Mix = new NodeDescription(
  'math/mix/vec3',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['vec3', 'vec3', 'float'],
      'vec3',
      vec3Mix,
      ['a', 'b', 't']
    )
);

export const Equal = new NodeDescription(
  'math/equal/vec3',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec3', 'vec3'],
      'boolean',
      vec3Equals
    )
);
