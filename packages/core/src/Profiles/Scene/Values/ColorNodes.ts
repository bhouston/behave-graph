import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode';
import { VecElements } from '../Logic/VecElements';
import {
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
  Vec3,
  vec3Add,
  vec3Equals,
  vec3Mix,
  vec3Negate,
  vec3Scale,
  vec3Subtract,
  vec3ToArray
} from './Internal/Vec3';

export const Constant = new NodeDescription(
  'math/color',
  'Logic',
  'Color',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['color'], 'color', (a: Vec3) => a)
);
export const Create = new NodeDescription(
  'math/toColor/rgb',
  'Logic',
  'RGB To Color',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['float', 'float', 'float'],
      'color',
      (r: number, g: number, b: number) => new Vec3(r, g, b),
      ['r', 'g', 'b']
    )
);

export const Elements = new NodeDescription(
  'math/toRgb/color',
  'Logic',
  'Color to RGB',
  (description, graph) =>
    new VecElements(description, graph, 'color', ['r', 'g', 'b'], vec3ToArray)
);

export const Add = new NodeDescription(
  'math/add/color',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['color', 'color'],
      'color',
      vec3Add
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/color',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['color', 'color'],
      'color',
      vec3Subtract
    )
);
export const Negate = new NodeDescription(
  'math/negate/color',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['color'], 'color', vec3Negate)
);

export const Scale = new NodeDescription(
  'math/scale/color',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['color', 'float'],
      'color',
      vec3Scale
    )
);

export const Mix = new NodeDescription(
  'math/mix/color',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['color', 'color', 'float'],
      'color',
      vec3Mix,
      ['a', 'b', 't']
    )
);

export const HslToColor = new NodeDescription(
  'math/ToColor/hsl',
  'Logic',
  'HSL to Color',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['vec3'], 'color', hslToRGB)
);
export const ColorToHsl = new NodeDescription(
  'math/toHsl/color',
  'Logic',
  'Color to HSL',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['color'], 'vec3', rgbToHSL)
);

export const HexToColor = new NodeDescription(
  'math/toColor/hex',
  'Logic',
  'HEX to Color',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['float'], 'color', hexToRGB)
);
export const ColorToHex = new NodeDescription(
  'math/toHex/color',
  'Logic',
  'Color to HEX',
  (description, graph) =>
    new In1Out1FuncNode(description, graph, ['color'], 'float', rgbToHex)
);

export const Equal = new NodeDescription(
  'math/equal/color',
  'Logic',
  '=',
  (description, graph) =>
    new In3Out1FuncNode(
      description,
      graph,
      ['color', 'color', 'float'],
      'boolean',
      vec3Equals,
      ['a', 'b', 'tolerance']
    )
);
