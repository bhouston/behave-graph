import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { ValueType } from '../../Values/ValueType.js';
import { VecCreate } from './Logic/VecCreate.js';
import { VecElements } from './Logic/VecElements.js';
import {
  ColorJSON,
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
  Vec3,
  vec3Add,
  vec3FromArray,
  vec3Mix,
  vec3Parse,
  vec3Scale,
  vec3Subtract,
  vec3ToArray
} from './Values/Vec3.js';

export function registerColorValue(registry: Registry) {
  const { nodes, values } = registry;

  values.register(
    new ValueType(
      'color',
      () => new Vec3(),
      (value: string | ColorJSON) =>
        typeof value === 'string'
          ? vec3Parse(value)
          : new Vec3(value.r, value.g, value.b),
      (value) => ({ r: value.x, g: value.y, b: value.z } as ColorJSON)
    )
  );

  // color

  nodes.register(
    'logic/create/color',
    () =>
      new VecCreate<Vec3>(
        'logic/create/color',
        'color',
        ['r', 'g', 'b'],
        (elements: number[]) => vec3FromArray(elements)
      )
  );
  nodes.register(
    'logic/color',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/color', 'color', 'color', (a) => a)
  );
  nodes.register(
    'logic/elements/color',
    () =>
      new VecElements<Vec3>(
        'logic/elements/color',
        'color',
        ['r', 'g', 'b'],
        vec3ToArray
      )
  );

  nodes.register(
    'logic/add/color',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/add/color',
        'color',
        'color',
        'color',
        (a, b) => vec3Add(a, b)
      )
  );
  nodes.register(
    'logic/subtract/color',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/subtract/color',
        'color',
        'color',
        'color',
        (a, b) => vec3Subtract(a, b)
      )
  );
  nodes.register(
    'logic/scale/color',
    () =>
      new In2Out1FuncNode<Vec3, number, Vec3>(
        'logic/scale/color',
        'color',
        'float',
        'color',
        (a, b) => vec3Scale(a, b)
      )
  );

  nodes.register(
    'logic/mix/color',
    () =>
      new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
        'logic/mix/color',
        'color',
        'color',
        'float',
        'color',
        (a, b, c) => vec3Mix(a, b, c)
      )
  );
  nodes.register(
    'logic/hslToColor',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/hslToColor',
        'vec3',
        'color',
        (a) => hslToRGB(a)
      )
  );
  nodes.register(
    'logic/colorToHSL',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/colorToHSL',
        'color',
        'vec3',
        (a) => rgbToHSL(a)
      )
  );
  nodes.register(
    'logic/colorToHex',
    () =>
      new In1Out1FuncNode<Vec3, number>(
        'logic/colorToHex',
        'color',
        'float',
        (a) => rgbToHex(a)
      )
  );
  nodes.register(
    'logic/hexToColor',
    () =>
      new In1Out1FuncNode<number, Vec3>(
        'logic/hexToColor',
        'float',
        'color',
        (a) => hexToRGB(a)
      )
  );
}
