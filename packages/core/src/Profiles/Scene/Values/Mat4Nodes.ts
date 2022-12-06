import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  Mat4,
  mat4Add,
  mat4Determinant,
  mat4Equals,
  mat4Inverse,
  mat4Mix,
  mat4Multiply,
  mat4Negate,
  mat4Scale,
  mat4Subtract,
  mat4ToArray
} from './Internal/Mat4';
import { Vec3 } from './Internal/Vec3';

export const Constant = new NodeDescription(
  'math/mat4',
  'Logic',
  'Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', (a: Mat4) => a)
);

export const Create = new NodeDescription(
  'math/toMat4/vec3',
  'Logic',
  'Float to Mat4',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['vec3', 'vec3', 'vec3'],
      'mat4',
      (v1: Vec3, v2: Vec3, v3: Vec3) =>
        new Mat4([v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z]),
      ['x', 'y', 'z']
    )
);

export const Elements = new NodeDescription(
  'math/toVec3/mat4',
  'Logic',
  'Mat4 To Vec3',
  (description, graph) =>
    new VecElements(description, graph, 'mat4', ['x', 'y', 'z'], mat4ToArray)
);

export const Add = new NodeDescription(
  'math/add/mat4',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['mat4', 'mat4'], 'mat4', mat4Add)
);
export const Subtract = new NodeDescription(
  'math/subtract/mat4',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'mat4'],
      'mat4',
      mat4Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/mat4',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', mat4Negate)
);
export const Scale = new NodeDescription(
  'math/scale/mat4',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'float'],
      'mat4',
      mat4Scale
    )
);
export const Length = new NodeDescription(
  'math/determinant/mat4',
  'Logic',
  'Length',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'float', mat4Determinant)
);
export const Normalize = new NodeDescription(
  'math/inverse/mat4',
  'Logic',
  'Normalize',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', mat4Inverse)
);
export const Multiply = new NodeDescription(
  'math/multiply/mat4',
  'Logic',
  'Cross',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'mat4'],
      'mat4',
      mat4Multiply
    )
);
export const Mix = new NodeDescription(
  'math/mix/mat4',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['mat4', 'mat4', 'float'],
      'mat4',
      mat4Mix,
      ['a', 'b', 't']
    )
);

export const Equal = new NodeDescription(
  'math/equal/mat4',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'mat4'],
      'boolean',
      mat4Equals
    )
);
