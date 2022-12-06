import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  eulerToMat3,
  Mat3,
  mat3Add,
  mat3Determinant,
  mat3Equals,
  mat3Inverse,
  mat3Mix,
  mat3Multiply,
  mat3MultiplyByScalar,
  mat3Negate,
  mat3Subtract,
  mat3ToScale2,
  mat3ToTranslation2,
  mat3Transpose,
  mat4ToMat3,
  scale2ToMat3,
  translation2ToMat3
} from './Internal/Mat3';
import { Vec3 } from './Internal/Vec3';

export const Constant = new NodeDescription(
  'math/mat3',
  'Logic',
  'Mat3',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'mat3', (a: Mat3) => a)
);

export const Create = new NodeDescription(
  'math/toMat3/vec3',
  'Logic',
  'Vec3 to Mat3',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['vec3', 'vec3', 'vec3'],
      'mat3',
      (v1: Vec3, v2: Vec3, v3: Vec3) =>
        new Mat3([v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z]),
      ['x', 'y', 'z']
    )
);

export const Elements = new NodeDescription(
  'math/toVec3/mat3',
  'Logic',
  'Mat3 To Vec3',
  (description, graph) =>
    new VecElements(description, graph, 'mat3', ['x', 'y', 'z'], () => {
      throw new Error('not implemented');
    })
);

export const Add = new NodeDescription(
  'math/add/mat3',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['mat3', 'mat3'], 'mat3', mat3Add)
);
export const Subtract = new NodeDescription(
  'math/subtract/mat3',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat3', 'mat3'],
      'mat3',
      mat3Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/mat3',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'mat3', mat3Negate)
);
export const Scale = new NodeDescription(
  'math/scale/mat3',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat3', 'float'],
      'mat3',
      mat3MultiplyByScalar
    )
);
export const Determinant = new NodeDescription(
  'math/determinant/mat3',
  'Logic',
  'Determinant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'float', mat3Determinant)
);
export const Inverse = new NodeDescription(
  'math/inverse/mat3',
  'Logic',
  'Inverse',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'mat3', mat3Inverse)
);
export const Mat4ToMat3 = new NodeDescription(
  'math/toMat3/mat4',
  'Logic',
  'Mat4 To Mat3',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat3', mat4ToMat3)
);
export const Transpose = new NodeDescription(
  'math/transpose/mat3',
  'Logic',
  'Transpose',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'mat3', mat3Transpose)
);
export const Multiply = new NodeDescription(
  'math/multiply/mat3',
  'Logic',
  'Cross',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat3', 'mat3'],
      'mat3',
      mat3Multiply
    )
);
export const Mix = new NodeDescription(
  'math/mix/mat3',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['mat3', 'mat3', 'float'],
      'mat3',
      mat3Mix,
      ['a', 'b', 't']
    )
);

export const Equal = new NodeDescription(
  'math/equal/mat3',
  'Logic',
  '=',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['mat3', 'mat3', 'float'],
      'boolean',
      mat3Equals,
      ['a', 'b', 'tolerance']
    )
);

export const EulerToMat3 = new NodeDescription(
  'math/toMat3/euler',
  'Logic',
  'To Mat3',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['euler'], 'mat3', eulerToMat3)
);

export const QuatToMat3 = new NodeDescription(
  'math/toMat3/quat',
  'Logic',
  'To Mat3',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'mat3', eulerToMat3)
);

export const Scale2ToMat3 = new NodeDescription(
  'math/toMat3/scale2',
  'Logic',
  'Scale2 To Mat3',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'mat3', scale2ToMat3)
);
export const Mat3ToScale2 = new NodeDescription(
  'math/toScale2/mat3',
  'Logic',
  'Mat3 to Scale2',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat3'], 'vec2', mat3ToScale2)
);

export const Translation2ToMat3 = new NodeDescription(
  'math/toMat3/translation2',
  'Logic',
  'Translation2 To Mat3',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['vec2'],
      'mat3',
      translation2ToMat3
    )
);
export const Mat3ToTranslation3 = new NodeDescription(
  'math/toTranslation2/mat3',
  'Logic',
  'Mat3 to Translation2',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['mat3'],
      'vec2',
      mat3ToTranslation2
    )
);
