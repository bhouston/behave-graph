import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { In4Out1FuncNode } from '../../../Nodes/Templates/In4Out1FuncNode';
import { In5Out1FuncNode } from '../../../Nodes/Templates/In5Out1FuncNode';
import { In6Out1FuncNode } from '../../../Nodes/Templates/In6Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  column4ToMat4,
  eulerToMat4,
  mat3ToMat4,
  Mat4,
  mat4Add,
  mat4Adjoint,
  mat4Determinant,
  mat4Equals,
  mat4Inverse,
  mat4LookAt,
  mat4Mix,
  mat4Multiply,
  mat4MultiplyByScalar,
  mat4Negate,
  mat4Orthogonal,
  mat4OrthogonalSimple,
  mat4Perspective,
  mat4PerspectiveFov,
  mat4RotateByEuler,
  mat4RotateByQuat,
  mat4Scale,
  mat4SetColumn4,
  mat4SetRow4,
  mat4Subtract,
  mat4TransformNormal3,
  mat4TransformPoint3,
  mat4Translate,
  mat4Transpose,
  quatToMat4,
  scale3ToMat4,
  translation3ToMat4
} from './Internal/Mat4';

export const Constant = new NodeDescription(
  'math/mat4',
  'Logic',
  'Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', (a: Mat4) => a)
);

export const Column4ToMat4 = new NodeDescription(
  'math/toMat4/column4',
  'Logic',
  'Columns to Mat4',
  (description, graph) =>
    new In4Out1FuncNode(
      description,
      graph,
      ['vec4', 'vec4', 'vec4', 'vec4'],
      'mat4',
      column4ToMat4
    )
);

export const SetColumn = new NodeDescription(
  'math/setColumn/mat4',
  'Logic',
  'Set Column',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['mat4', 'integer', 'vec4'],
      'mat4',
      mat4SetColumn4
    )
);

export const SetRow = new NodeDescription(
  'math/setRow/mat4',
  'Logic',
  'Set Row',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['mat4', 'integer', 'vec4'],
      'mat4',
      mat4SetRow4
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
export const MultiplyByScalar = new NodeDescription(
  'math/multiplyByScalar/mat4',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'float'],
      'mat4',
      mat4MultiplyByScalar
    )
);
export const Determinant = new NodeDescription(
  'math/determinant/mat4',
  'Logic',
  'Determinant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'float', mat4Determinant)
);

export const Adjoint = new NodeDescription(
  'math/adjoint/mat4',
  'Logic',
  'Adjoint',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['mat4'], 'mat4', mat4Adjoint)
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

export const Scale3ToMat4 = new NodeDescription(
  'math/toMat4/scale3',
  'Logic',
  'Scale3 To Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec3'], 'mat4', scale3ToMat4)
);
export const Translate3ToMat4 = new NodeDescription(
  'math/toMat4/translate3',
  'Logic',
  'Translate3 To Mat4',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['vec3'],
      'mat4',
      translation3ToMat4
    )
);
export const QuatToMat4 = new NodeDescription(
  'math/toMat4/quat',
  'Logic',
  'Quat To Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['quat'], 'mat4', quatToMat4)
);
export const EulerToMat4 = new NodeDescription(
  'math/toMat4/euler',
  'Logic',
  'Euler To Mat4',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['euler'], 'mat4', eulerToMat4)
);

export const Translate = new NodeDescription(
  'math/translate/mat4',
  'Logic',
  'Translate',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'vec3'],
      'mat4',
      mat4Translate
    )
);
export const Scale = new NodeDescription(
  'math/scale/mat4',
  'Logic',
  'Scale',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['mat4', 'vec3'], 'mat4', mat4Scale)
);
export const RotateByQuat = new NodeDescription(
  'math/rotateByQuat/mat4',
  'Logic',
  'Rotate',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'quat'],
      'mat4',
      mat4RotateByQuat
    )
);
export const RotateByEuler = new NodeDescription(
  'math/rotateByEuler/mat4',
  'Logic',
  'Rotate',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'euler'],
      'mat4',
      mat4RotateByEuler
    )
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

export const TransformPoint3 = new NodeDescription(
  'math/transformPoint3/mat4',
  'Logic',
  'Transform Point3',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'vec3'],
      'vec3',
      mat4TransformPoint3
    )
);

export const TransformNormal3 = new NodeDescription(
  'math/transformNormal3/mat4',
  'Logic',
  'Transform Normal',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['mat4', 'vec3'],
      'vec3',
      mat4TransformNormal3
    )
);

export const Perspective = new NodeDescription(
  'math/perspective/mat4',
  'Logic',
  'Perspective',
  (description, graph) =>
    new In6Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float', 'float', 'float', 'float'],
      'mat4',
      mat4Perspective,
      ['left', 'right', 'top', 'bottom', 'near', 'far']
    )
);

export const PerspectiveFov = new NodeDescription(
  'math/perspectiveFov/mat4',
  'Logic',
  'Perspective FOV',
  (description, graph) =>
    new In5Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float', 'float', 'float'],
      'mat4',
      mat4PerspectiveFov,
      ['verticalFov', 'near', 'far', 'zoom', 'aspectRatio']
    )
);

export const Orthographic = new NodeDescription(
  'math/orthographic/mat4',
  'Logic',
  'Orthographic',
  (description, graph) =>
    new In6Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float', 'float', 'float', 'float'],
      'mat4',
      mat4Orthogonal,
      ['left', 'right', 'top', 'bottom', 'near', 'far']
    )
);

export const OrthographicSimple = new NodeDescription(
  'math/orthographicSimple/mat4',
  'Logic',
  'Orthographic Simple',
  (description, graph) =>
    new In6Out1FuncNode(
      description,
      graph,
      ['float', 'vec2', 'float', 'float', 'float', 'float'],
      'mat4',
      mat4OrthogonalSimple,
      ['height', 'center', 'near', 'far', 'zoom', 'aspectRatio']
    )
);

export const LookAt = new NodeDescription(
  'math/lookAt/mat4',
  'Logic',
  'Look At',
  (description, graph) =>
    new In6Out1FuncNode(
      description,
      graph,
      ['vec3', 'vec3', 'vec3'],
      'mat4',
      mat4LookAt,
      ['eye', 'target', 'up']
    )
);
