import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  Vec2,
  vec2Add,
  vec2Dot,
  vec2Equals,
  vec2Length,
  vec2Mix,
  vec2Negate,
  vec2Normalize,
  vec2Scale,
  vec2Subtract,
  vec2ToArray
} from './Internal/Vec2';

export const Constant = new NodeDescription(
  'math/vec2',
  'Logic',
  'Vec2',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'vec2', (a: Vec2) => a)
);

export const Create = new NodeDescription(
  'math/toVec2/float',
  'Logic',
  'Float to Vec2',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['float', 'float'],
      'vec2',
      (x: number, y: number) => new Vec2(x, y),
      ['x', 'y']
    )
);
export const Elements = new NodeDescription(
  'math/toFloat/vec2',
  'Logic',
  'Vec2 To Float',
  (description, graph) =>
    new VecElements(description, graph, 'vec2', ['x', 'y', 'z'], vec2ToArray)
);

export const Add = new NodeDescription(
  'math/add/vec2',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec2', 'vec2'], 'vec2', vec2Add)
);
export const Subtract = new NodeDescription(
  'math/subtract/vec2',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec2', 'vec2'],
      'vec2',
      vec2Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/vec2',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'vec2', vec2Negate)
);

export const Scale = new NodeDescription(
  'math/scale/vec2',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec2', 'float'],
      'vec2',
      vec2Scale
    )
);
export const Length = new NodeDescription(
  'math/length/vec2',
  'Logic',
  'Length',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'float', vec2Length)
);
export const Normalize = new NodeDescription(
  'math/normalize/vec2',
  'Logic',
  'Normalize',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'vec2', vec2Normalize)
);
export const Dot = new NodeDescription(
  'math/dot/vec2',
  'Logic',
  'Dot Product',
  (description, graph) =>
    new In2Out1FuncNode(description, graph, ['vec2', 'vec2'], 'float', vec2Dot)
);

export const Mix = new NodeDescription(
  'math/mix/vec2',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['vec2', 'vec2', 'float'],
      'vec2',
      vec2Mix,
      ['a', 'b', 't']
    )
);

export const Equal = new NodeDescription(
  'math/equal/vec2',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['vec2', 'vec2'],
      'boolean',
      vec2Equals
    )
);
