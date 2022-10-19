import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { VecElements } from '../Logic/VecElements.js';
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
} from './Internal/Vec3.js';

export const Constant = new NodeDescription(
  'math/color',
  'Logic',
  'Constant',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(
      description,
      graph,
      'color',
      'color',
      (a) => a
    )
);
export const Create = new NodeDescription(
  'math/create/color',
  'Logic',
  'CREATE',
  (description, graph) =>
    new In3Out1FuncNode<number, number, number, Vec3>(
      description,
      graph,
      'float',
      'float',
      'float',
      'color',
      (r, g, b) => new Vec3(r, g, b),
      ['r', 'g', 'b']
    )
);

export const Elements = new NodeDescription(
  'math/elements/color',
  'Logic',
  'CREATE',
  (description, graph) =>
    new VecElements<Vec3>(
      description,
      graph,
      'color',
      ['r', 'g', 'b'],
      vec3ToArray
    )
);

export const Add = new NodeDescription(
  'math/add/color',
  'Logic',
  '+',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, Vec3>(
      description,
      graph,
      'color',
      'color',
      'color',
      (a, b) => vec3Add(a, b)
    )
);
export const Subtract = new NodeDescription(
  'math/subtract/color',
  'Logic',
  '-',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, Vec3>(
      description,
      graph,
      'color',
      'color',
      'color',
      (a, b) => vec3Subtract(a, b)
    )
);
export const Negate = new NodeDescription(
  'math/negate/color',
  'Logic',
  '-',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'color', 'color', (a) =>
      vec3Negate(a)
    )
);

export const Scale = new NodeDescription(
  'math/scale/color',
  'Logic',
  '×',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, number, Vec3>(
      description,
      graph,
      'color',
      'float',
      'color',
      (a, b) => vec3Scale(a, b)
    )
);

export const Mix = new NodeDescription(
  'math/mix/color',
  'Logic',
  '÷',
  (description, graph) =>
    new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
      description,
      graph,
      'color',
      'color',
      'float',
      'color',
      (a, b, t) => vec3Mix(a, b, t),
      ['a', 'b', 't']
    )
);

export const HslToColor = new NodeDescription(
  'logic/ToColor/hsl',
  'Logic',
  'HSL to COLOR',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'vec3', 'color', (a) =>
      hslToRGB(a)
    )
);
export const ColorToHsl = new NodeDescription(
  'logic/toHsl/color',
  'Logic',
  'COLOR to HSL',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, Vec3>(description, graph, 'color', 'vec3', (a) =>
      rgbToHSL(a)
    )
);

export const HexToColor = new NodeDescription(
  'logic/toColor/hex',
  'Logic',
  'HEX to COLOR',
  (description, graph) =>
    new In1Out1FuncNode<number, Vec3>(
      description,
      graph,
      'float',
      'color',
      (a) => hexToRGB(a)
    )
);
export const ColorToHex = new NodeDescription(
  'logic/toHex/color',
  'Logic',
  'COLOR to HEX',
  (description, graph) =>
    new In1Out1FuncNode<Vec3, number>(
      description,
      graph,
      'color',
      'float',
      (a) => rgbToHex(a)
    )
);

export const Equal = new NodeDescription(
  'math/equal/color',
  'Logic',
  '=',
  (description, graph) =>
    new In2Out1FuncNode<Vec3, Vec3, boolean>(
      description,
      graph,
      'color',
      'color',
      'boolean',
      (a, b) => vec3Equals(a, b)
    )
);
