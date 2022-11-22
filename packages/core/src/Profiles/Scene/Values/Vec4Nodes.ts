import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { In4Out1FuncNode } from '../../../Nodes/Templates/In4Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  Vec4,
  vec4Add,
  vec4Dot,
  vec4Equals,
  vec4Length,
  vec4Mix,
  vec4Negate,
  vec4Normalize,
  vec4Scale,
  vec4Subtract,
  vec4ToArray
} from './Internal/Vec4';

export const Constant = new NodeDescription(
  'math/vec4',
  'Logic',
  'Vec4',
  (description, graph) =>
    new In1Out1FuncNode<Vec4, Vec4>(
      description,
      graph,
      ['vec4'],
      'vec4',
      (a) => a
    )
);
export const Create = new NodeDescription(
  'math/toVec4/float',
  'Logic',
  'Float to Vec4',
  (description, graph) =>
    new In4Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float', 'float'],
      'vec4',
      (x: number, y: number, z: number, w: number) => new Vec4(x, y, z, w),
      ['x', 'y', 'z', 'w']
    )
);
export const Elements = new NodeDescription(
  'math/toFloat/vec4',
  'Logic',
  'Vec4 to Float',
  (description, graph) =>
    new VecElements(
      description,
      graph,
      'vec4',
      ['x', 'y', 'z', 'w'],
      vec4ToArray
    )
);
export const Add = new NodeDescription(
  'math/add/vec4',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec4', 'vec4'], 'vec4', vec4Add)
);
export const Subtract = new NodeDescription(
  'math/subtract/vec4',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec4', 'vec4'],
      'vec4',
      vec4Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/vec4',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec4'], 'vec4', vec4Negate)
);
export const Scale = new NodeDescription(
  'math/scale/vec4',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec4', 'float'],
      'vec4',
      vec4Scale
    )
);
export const Length = new NodeDescription(
  'math/length/vec4',
  'Logic',
  'Length',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec4'], 'float', vec4Length)
);
export const Normalize = new NodeDescription(
  'math/normalize/vec4',
  'Logic',
  'Normalize',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec4'], 'vec4', vec4Normalize)
);
export const Dot = new NodeDescription(
  'math/dot/vec4',
  'Logic',
  'Dot Product',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec4', 'vec4'], 'float', vec4Dot)
);
export const Mix = new NodeDescription(
  'math/mix/vec4',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['vec4', 'vec4', 'float'],
      'vec4',
      vec4Mix,
      ['a', 'b', 't']
    )
);

export const Equal = new NodeDescription(
  'math/equal/vec4',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec4', 'vec4'],
      'boolean',
      vec4Equals
    )
);
