import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { In4Out1FuncNode } from '../../../Nodes/Templates/In4Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
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
} from './Internal/Vec4';

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
  'Quaternion',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'quat', (a: Vec4) => a)
);
export const Create = new NodeDescription(
  'math/toQuat/float',
  'Logic',
  'Float to Quat',
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
  'math/toFloat/quat',
  'Logic',
  'Quat to Float',
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
  'Conjugate',
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
  'Length',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'float', vec4Length)
);
export const Normalize = new NodeDescription(
  'math/normalize/quat',
  'Logic',
  'Normalize',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'quat', vec4Normalize)
);
export const Dot = new NodeDescription(
  'math/dot/quat',
  'Logic',
  'Dot Product',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['quat', 'quat'], 'float', vec4Dot)
);

export const FromAngleAxis = new NodeDescription(
  'math/toQuat/angleAxis',
  'Logic',
  'Angle Axis to Quat',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'vec3'],
      'quat',
      angleAxisToQuat
    )
);
export const Slerp = new NodeDescription(
  'math/slerp/quat',
  'Logic',
  'Slerp',
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
