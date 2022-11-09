import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { VecElements } from '../Logic/VecElements.js';
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
} from './Internal/Vec2.js';

export const Constant = new NodeDescription(
  'math/vec2',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'vec2', (a: Vec2) => a)
);

export const Create = new NodeDescription(
  'math/create/vec2',
  'Logic',
  'CREATE',
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
  'math/elements/vec2',
  'Logic',
  'CREATE',
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
  'LENGTH',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'float', vec2Length)
);
export const Normalize = new NodeDescription(
  'math/normalize/vec2',
  'Logic',
  'NORMALIZE',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec2'], 'vec2', vec2Normalize)
);
export const Dot = new NodeDescription(
  'math/dot/vec2',
  'Logic',
  'DOT',
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
