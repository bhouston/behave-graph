import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { In4Out1FuncNode } from '../../../Nodes/Templates/In4Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  mat3ToMat4,
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
  mat4Transpose
} from './Internal/Mat4';
import { Vec4 } from './Internal/Vec4';

export const Constant = new NodeDescription(
  'math/mat4',
  'Logic',
  'Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', (a: Mat4) => a)
);

export const Create = new NodeDescription(
  'math/toMat4/vec4',
  'Logic',
  'Vec4 to Mat4',
  (description, graph) =>
    new In4Out1FuncNode(
      description,
      graph,
      ['vec4', 'vec4', 'vec4', 'vec4'],
      'mat4',
      (v1: Vec4, v2: Vec4, v3: Vec4, v4: Vec4) =>
        new Mat4([
          v1.x,
          v1.y,
          v1.z,
          v1.w,
          v2.x,
          v2.y,
          v2.z,
          v2.w,
          v3.x,
          v3.y,
          v3.z,
          v3.w,
          v4.x,
          v4.y,
          v4.z,
          v4.w
        ]),
      ['x', 'y', 'z', 'w']
    )
);

export const Elements = new NodeDescription(
  'math/toVec4/mat4',
  'Logic',
  'Mat4 To Vec4',
  (description, graph) =>
    new VecElements(description, graph, 'mat4', ['x', 'y', 'z', 'w'], () => {
      throw new Error('not implemented');
    })
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
export const Determinant = new NodeDescription(
  'math/determinant/mat4',
  'Logic',
  'Determinant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'float', mat4Determinant)
);
export const Inverse = new NodeDescription(
  'math/inverse/mat4',
  'Logic',
  'Inverse',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', mat4Inverse)
);
export const Transpose = new NodeDescription(
  'math/transpose/mat4',
  'Logic',
  'Transpose',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', mat4Transpose)
);

export const Mat3ToMat4 = new NodeDescription(
  'math/toMat4/mat3',
  'Logic',
  'Mat3 To Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'mat4', mat3ToMat4)
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
    new In3Out1FuncNode(
      description,
      graph,
      ['mat4', 'mat4', 'float'],
      'boolean',
      mat4Equals,
      ['a', 'b', 'tolerance']
    )
);
