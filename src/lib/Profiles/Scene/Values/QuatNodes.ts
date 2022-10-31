import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { In4Out1FuncNode } from '../../../Nodes/Templates/In4Out1FuncNode.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  angleAxisToQuat,
  quatConjugate,
  quatMultiply,
  quatSlerp,
  Vec4,
  vec4Dot,
  vec4Equals,
  vec4Length,
  vec4Normalize,
  vec4Scale,
  vec4ToArray
} from './Internal/Vec4.js';

/*
- from Angle Axis
- from Euler
- to Angle Axis
- to Euler
- Conjugate
- Multiply
- Slerp
- Squad
- Scale
- 
*/

export const Constant = new NodeDescription(
  'math/quat',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'quat', (a: Vec4) => a)
);
export const Create = new NodeDescription(
  'math/create/quat',
  'Logic',
  'CREATE',
  (description, graph) =>
    new In4Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float', 'float'],
      'quat',
      (x: number, y: number, z: number, w: number) => new Vec4(x, y, z, w),
      ['x', 'y', 'z', 'w']
    )
);
export const Elements = new NodeDescription(
  'math/elements/quat',
  'Logic',
  'CREATE',
  (description, graph) =>
    new VecElements(
      description,
      graph,
      'quat',
      ['x', 'y', 'z', 'w'],
      vec4ToArray
    )
);

export const Negate = new NodeDescription(
  'math/conjugate/quat',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'quat', quatConjugate)
);

export const Multiply = new NodeDescription(
  'math/multiply/quat',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['quat', 'quat'],
      'quat',
      quatMultiply
    )
);
export const Scale = new NodeDescription(
  'math/scale/quat',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['quat', 'float'],
      'quat',
      vec4Scale
    )
);
export const Length = new NodeDescription(
  'math/length/quat',
  'Logic',
  'LENGTH',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'float', vec4Length)
);
export const Normalize = new NodeDescription(
  'math/normalize/quat',
  'Logic',
  'NORMALIZE',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'quat', vec4Normalize)
);
export const Dot = new NodeDescription(
  'math/dot/quat',
  'Logic',
  'DOT',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['quat', 'quat'], 'float', vec4Dot)
);

export const FromAngleAxis = new NodeDescription(
  'math/toQuat/angleAxis',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'vec3'],
      'quat',
      angleAxisToQuat
    )
);
export const Mix = new NodeDescription(
  'math/slerp/quat',
  'Logic',
  'SLERP',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['quat', 'quat', 'float'],
      'quat',
      quatSlerp,
      ['a', 'b', 't']
    )
);
export const Equal = new NodeDescription(
  'math/equal/quat',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['quat', 'quat'],
      'boolean',
      vec4Equals
    )
);
