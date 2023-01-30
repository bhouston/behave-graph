import { makeFunctionDesc } from '../../../Nodes/FunctionNode';
import {
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
  Vec3,
  vec3Add,
  vec3Equals,
  vec3Mix,
  vec3MultiplyByScalar,
  vec3Negate,
  vec3Subtract
} from './Internal/Vec3';

export const Constant = makeFunctionDesc({
  name: 'math/color',
  label: 'Color',
  in: ['color'],
  out: 'color',
  exec: (a: Vec3) => a
});

export const Create = makeFunctionDesc({
  name: 'math/toColor/rgb',
  label: 'RGB To Color',
  in: [{ r: 'float' }, { g: 'float' }, { b: 'float' }],
  out: 'color',
  exec: (r: number, g: number, b: number) => new Vec3(r, g, b)
});

export const Elements = makeFunctionDesc({
  name: 'math/toRgb/color',
  label: 'Color to RGB',
  in: ['color'],
  out: [{ r: 'float' }, { g: 'float' }, { b: 'float' }],
  exec: (a: Vec3) => {
    return { r: a.x, g: a.y, b: a.z };
  }
});

export const Add = makeFunctionDesc({
  name: 'math/add/color',
  label: '+',
  in: ['color', 'color'],
  out: 'color',
  exec: vec3Add
});

export const Subtract = makeFunctionDesc({
  name: 'math/subtract/color',
  label: '-',
  in: ['color', 'color'],
  out: 'color',
  exec: vec3Subtract
});

export const Negate = makeFunctionDesc({
  name: 'math/negate/color',
  label: '-',
  in: ['color'],
  out: 'color',
  exec: vec3Negate
});

export const Scale = makeFunctionDesc({
  name: 'math/scale/color',
  label: '×',
  in: ['color', 'float'],
  out: 'color',
  exec: vec3MultiplyByScalar
});

export const Mix = makeFunctionDesc({
  name: 'math/mix/color',
  label: '÷',
  in: [{ a: 'color' }, { b: 'color' }, { t: 'float' }],
  out: 'color',
  exec: vec3Mix
});

export const HslToColor = makeFunctionDesc({
  name: 'math/ToColor/hsl',
  label: 'HSL to Color',
  in: ['vec3'],
  out: 'color',
  exec: hslToRGB
});

export const ColorToHsl = makeFunctionDesc({
  name: 'math/toHsl/color',
  label: 'Color to HSL',
  in: ['color'],
  out: 'vec3',
  exec: rgbToHSL
});

export const HexToColor = makeFunctionDesc({
  name: 'math/toColor/hex',
  label: 'HEX to Color',
  in: ['float'],
  out: 'color',
  exec: hexToRGB
});

export const ColorToHex = makeFunctionDesc({
  name: 'math/toHex/color',
  label: 'Color to HEX',
  in: ['color'],
  out: 'float',
  exec: rgbToHex
});

export const Equal = makeFunctionDesc({
  name: 'math/equal/color',
  label: '=',
  in: [{ a: 'color' }, { b: 'color' }, { tolerance: 'float' }],
  out: 'boolean',
  exec: vec3Equals
});
