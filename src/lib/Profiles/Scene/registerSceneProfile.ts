/* eslint-disable max-len */
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { ValueType } from '../../Values/ValueType.js';
import { SetVariable } from '../Core/Actions/SetVariable.js';
import { OnVariableChanged } from '../Core/Events/OnVariableChanged.js';
import { GetVariable } from '../Core/Queries/GetVariable.js';
import { SetSceneProperty } from './Actions/SetSceneProperty.js';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick.js';
import { VecCreate } from './Logic/VecCreate.js';
import { VecElements } from './Logic/VecElements.js';
import { GetSceneProperty } from './Queries/GetSceneProperty.js';
import {
  Vec2,
  vec2Add,
  vec2FromArray,
  Vec2JSON,
  vec2Length,
  vec2Negate,
  vec2Normalize,
  vec2Parse,
  vec2Scale,
  vec2Subtract,
  vec2ToArray,
  vec2ToString
} from './Values/Vec2.js';
import {
  ColorJSON,
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
  Vec3,
  vec3Add,
  vec3Cross,
  vec3Dot,
  vec3FromArray,
  Vec3JSON,
  vec3Length,
  vec3Negate,
  vec3Normalize,
  vec3Parse,
  vec3Scale,
  vec3Subtract,
  vec3ToArray,
  vec3ToString
} from './Values/Vec3.js';
import {
  angleAxisToQuat,
  eulerToQuat,
  quatConjugate,
  quatMultiply,
  quatSlerp,
  Vec4,
  vec4Add,
  vec4Dot,
  vec4FromArray,
  Vec4JSON,
  vec4Length,
  vec4Normalize,
  vec4Parse,
  vec4Scale,
  vec4Subtract,
  vec4ToArray,
  vec4ToString
} from './Values/Vec4.js';

export function registerSceneProfile(registry: Registry) {
  const { values, nodes } = registry;

  values.register(
    new ValueType(
      'vec2',
      () => new Vec2(),
      (value: string | Vec2JSON) =>
        typeof value === 'string'
          ? vec2Parse(value)
          : new Vec2(value.x, value.y),
      (value) => ({ x: value.x, y: value.y } as Vec2JSON)
    )
  );
  values.register(
    new ValueType(
      'vec3',
      () => new Vec3(),
      (value: string | Vec3JSON) =>
        typeof value === 'string'
          ? vec3Parse(value)
          : new Vec3(value.x, value.y, value.z),
      (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
    )
  );
  values.register(
    new ValueType(
      'vec4',
      () => new Vec4(),
      (value: string | Vec4JSON) =>
        typeof value === 'string'
          ? vec4Parse(value)
          : new Vec4(value.x, value.y, value.z, value.w),
      (value) =>
        ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
    )
  );
  values.register(
    new ValueType(
      'quat',
      () => new Vec4(),
      (value: string | Vec4JSON) =>
        typeof value === 'string'
          ? vec4Parse(value)
          : new Vec4(value.x, value.y, value.z, value.w),
      (value) =>
        ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
    )
  );
  values.register(
    new ValueType(
      'euler',
      () => new Vec3(),
      (value: string | Vec3JSON) =>
        typeof value === 'string'
          ? vec3Parse(value)
          : new Vec3(value.x, value.y, value.z),
      (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
    )
  );
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

  // events

  nodes.register('event/nodeClick', () => new OnSceneNodeClick());

  // actions

  nodes.register(
    'scene/set/boolean',
    () => new SetSceneProperty<boolean>('scene/set/boolean', 'boolean')
  );
  nodes.register(
    'scene/set/float',
    () => new SetSceneProperty<number>('scene/set/float', 'float')
  );
  nodes.register(
    'scene/set/integer',
    () => new SetSceneProperty<bigint>('scene/set/integer', 'integer')
  );
  nodes.register(
    'scene/set/vec2',
    () => new SetSceneProperty<Vec2>('scene/set/vec2', 'vec2')
  );
  nodes.register(
    'scene/set/vec3',
    () => new SetSceneProperty<Vec3>('scene/set/vec3', 'vec3')
  );
  nodes.register(
    'scene/set/vec4',
    () => new SetSceneProperty<Vec4>('scene/set/vec4', 'vec4')
  );
  nodes.register(
    'scene/set/quat',
    () => new SetSceneProperty<Vec4>('scene/set/quat', 'quat')
  );
  // queries

  nodes.register(
    'scene/get/boolean',
    () => new GetSceneProperty<boolean>('scene/get/boolean', 'boolean')
  );
  nodes.register(
    'scene/get/float',
    () => new GetSceneProperty<number>('scene/get/float', 'float')
  );
  nodes.register(
    'scene/get/integer',
    () => new GetSceneProperty<bigint>('scene/get/integer', 'integer')
  );
  nodes.register(
    'scene/get/vec2',
    () => new GetSceneProperty<Vec2>('scene/get/vec2', 'vec2')
  );
  nodes.register(
    'scene/get/vec3',
    () => new GetSceneProperty<Vec3>('scene/get/vec3', 'vec3')
  );
  nodes.register(
    'scene/get/vec4',
    () => new GetSceneProperty<Vec4>('scene/get/vec4', 'vec4')
  );
  nodes.register(
    'scene/get/quat',
    () => new GetSceneProperty<Vec4>('scene/get/quat', 'quat')
  );

  // logic: vec2

  nodes.register(
    'logic/create/vec2',
    () =>
      new VecCreate<Vec2>(
        'logic/create/vec2',
        'vec2',
        ['x', 'y'],
        (elements: number[]) => vec2FromArray(elements)
      )
  );
  nodes.register(
    'logic/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>('logic/vec2', 'vec2', 'vec2', (a) => a)
  );
  nodes.register(
    'logic/elements/vec2',
    () =>
      new VecElements<Vec2>(
        'logic/elements/vec2',
        'vec2',
        ['x', 'y'],
        vec2ToArray
      )
  );

  nodes.register(
    'logic/add/vec2',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        'logic/add/vec2',
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Add(a, b)
      )
  );
  nodes.register(
    'logic/subtract/vec2',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        'logic/subtract/vec2',
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Subtract(a, b)
      )
  );
  nodes.register(
    'logic/scale/vec2',
    () =>
      new In2Out1FuncNode<Vec2, number, Vec2>(
        'logic/scale/vec2',
        'vec2',
        'float',
        'vec2',
        (a, b) => vec2Scale(a, b)
      )
  );
  nodes.register(
    'logic/negate/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>(
        'logic/negate/vec2',
        'vec2',
        'vec2',
        (a) => vec2Negate(a)
      )
  );
  nodes.register(
    'logic/normalize/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>(
        'logic/normalize/vec2',
        'vec2',
        'vec2',
        (a) => vec2Normalize(a)
      )
  );
  nodes.register(
    'logic/length/vec2',
    () =>
      new In1Out1FuncNode<Vec2, number>(
        'logic/length/vec2',
        'vec2',
        'float',
        (a) => vec2Length(a)
      )
  );
  nodes.register(
    'logic/toString/vec2',
    () =>
      new In1Out1FuncNode<Vec2, string>(
        'logic/toString/vec2',
        'vec2',
        'string',
        (a) => vec2ToString(a)
      )
  );

  // logic: vec3

  nodes.register(
    'logic/create/vec3',
    () =>
      new VecCreate<Vec3>(
        'logic/create/vec3',
        'vec3',
        ['x', 'y', 'z'],
        (elements: number[]) => vec3FromArray(elements)
      )
  );
  nodes.register(
    'logic/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/vec3', 'vec3', 'vec3', (a) => a)
  );
  nodes.register(
    'logic/elements/vec3',
    () =>
      new VecElements<Vec3>(
        'logic/elements/vec3',
        'vec3',
        ['x', 'y', 'z'],
        vec3ToArray
      )
  );

  nodes.register(
    'logic/add/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/add/vec3',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Add(a, b)
      )
  );
  nodes.register(
    'logic/subtract/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/subtract/vec3',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Subtract(a, b)
      )
  );
  nodes.register(
    'logic/scale/vec3',
    () =>
      new In2Out1FuncNode<Vec3, number, Vec3>(
        'logic/scale/vec3',
        'vec3',
        'float',
        'vec3',
        (a, b) => vec3Scale(a, b)
      )
  );
  nodes.register(
    'logic/cross/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/cross/vec3',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Cross(a, b)
      )
  );
  nodes.register(
    'logic/dot/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, number>(
        'logic/dot/vec3',
        'vec3',
        'vec3',
        'float',
        (a, b) => vec3Dot(a, b)
      )
  );
  nodes.register(
    'logic/negate/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/negate/vec3',
        'vec3',
        'vec3',
        (a) => vec3Negate(a)
      )
  );
  nodes.register(
    'logic/normalize/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/normalize/vec3',
        'vec3',
        'vec3',
        (a) => vec3Normalize(a)
      )
  );
  nodes.register(
    'logic/length/vec3',
    () =>
      new In1Out1FuncNode<Vec3, number>(
        'logic/length/vec3',
        'vec3',
        'float',
        (a) => vec3Length(a)
      )
  );
  nodes.register(
    'logic/toString/vec3',
    () =>
      new In1Out1FuncNode<Vec3, string>(
        'logic/toString/vec3',
        'vec3',
        'string',
        (a) => vec3ToString(a)
      )
  );
  nodes.register(
    'logic/hslToRGB',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/hslToRGB', 'vec3', 'vec3', (a) =>
        hslToRGB(a)
      )
  );
  nodes.register(
    'logic/rgbToHSL',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/rgbToHSL', 'vec3', 'vec3', (a) =>
        rgbToHSL(a)
      )
  );
  nodes.register(
    'logic/rgbToHex',
    () =>
      new In1Out1FuncNode<Vec3, number>(
        'logic/rgbToHex',
        'vec3',
        'float',
        (a) => rgbToHex(a)
      )
  );
  nodes.register(
    'logic/hexToRGB',
    () =>
      new In1Out1FuncNode<number, Vec3>(
        'logic/hexToRGB',
        'float',
        'vec3',
        (a) => hexToRGB(a)
      )
  );

  // logic: vec4

  nodes.register(
    'logic/create/vec4',
    () =>
      new VecCreate<Vec4>(
        'logic/create/vec4',
        'vec4',
        ['x', 'y', 'z', 'w'],
        (elements: number[]) => vec4FromArray(elements)
      )
  );
  nodes.register(
    'logic/vec4',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>('logic/vec4', 'vec4', 'vec4', (a) => a)
  );
  nodes.register(
    'logic/elements/vec4',
    () =>
      new VecElements<Vec4>(
        'logic/elements/vec4',
        'vec4',
        ['x', 'y', 'z', 'w'],
        vec4ToArray
      )
  );

  nodes.register(
    'logic/scale/vec4',
    () =>
      new In2Out1FuncNode<Vec4, number, Vec4>(
        'logic/scale/vec4',
        'vec4',
        'float',
        'vec4',
        (a, b) => vec4Scale(a, b)
      )
  );

  nodes.register(
    'logic/subtract/vec4',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/subtract/vec4',
        'vec4',
        'vec4',
        'vec4',
        (a, b) => vec4Subtract(a, b)
      )
  );

  nodes.register(
    'logic/add/vec4',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/add/vec4',
        'vec4',
        'vec4',
        'vec4',
        (a, b) => vec4Add(a, b)
      )
  );
  nodes.register(
    'logic/dot/vec4',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, number>(
        'logic/dot/vec4',
        'vec4',
        'vec4',
        'float',
        (a, b) => vec4Dot(a, b)
      )
  );
  nodes.register(
    'logic/normalize/vec4',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/normalize/vec4',
        'vec4',
        'vec4',
        (a) => vec4Normalize(a)
      )
  );
  nodes.register(
    'logic/length/vec4',
    () =>
      new In1Out1FuncNode<Vec4, number>(
        'logic/length/vec4',
        'vec4',
        'float',
        (a) => vec4Length(a)
      )
  );
  nodes.register(
    'logic/toString/vec4',
    () =>
      new In1Out1FuncNode<Vec4, string>(
        'logic/toString/vec4',
        'vec4',
        'string',
        (a) => vec4ToString(a)
      )
  );

  // logic: euler

  nodes.register(
    'logic/create/euler',
    () =>
      new VecCreate<Vec3>(
        'logic/create/euler',
        'euler',
        ['x', 'y', 'z'],
        (elements: number[]) => vec3FromArray(elements)
      )
  );
  nodes.register(
    'logic/euler',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/euler', 'euler', 'euler', (a) => a)
  );
  nodes.register(
    'logic/elements/euler',
    () =>
      new VecElements<Vec3>(
        'logic/elements/euler',
        'euler',
        ['x', 'y', 'z'],
        vec3ToArray
      )
  );

  nodes.register(
    'logic/add/euler',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/add/euler',
        'euler',
        'euler',
        'euler',
        (a, b) => vec3Add(a, b)
      )
  );
  nodes.register(
    'logic/toString/euler',
    () =>
      new In1Out1FuncNode<Vec3, string>(
        'logic/toString/euler',
        'euler',
        'string',
        (a) => vec3ToString(a)
      )
  );
  nodes.register(
    'logic/toQuat/euler',
    () =>
      new In1Out1FuncNode<Vec3, Vec4>(
        'logic/toQuat/euler',
        'euler',
        'quat',
        (a) => eulerToQuat(a)
      )
  );

  // logic: quat

  nodes.register(
    'logic/create/quat',
    () =>
      new VecCreate<Vec4>(
        'logic/create/quat',
        'quat',
        ['x', 'y', 'z', 'w'],
        (elements: number[]) => vec4FromArray(elements)
      )
  );
  nodes.register(
    'logic/quat',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>('logic/quat', 'quat', 'quat', (a) => a)
  );
  nodes.register(
    'logic/elements/quat',
    () =>
      new VecElements<Vec4>(
        'logic/elements/quat',
        'quat',
        ['x', 'y', 'z', 'w'],
        vec4ToArray
      )
  );

  nodes.register(
    'logic/angleAxis/quat',
    () =>
      new In2Out1FuncNode<number, Vec3, Vec4>(
        'logic/angleAxis/quat',
        'float',
        'vec3',
        'quat',
        (a, b) => angleAxisToQuat(a, b)
      )
  );
  nodes.register(
    'logic/multiply/quat',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/multiply/quat',
        'quat',
        'quat',
        'quat',
        (a, b) => quatMultiply(a, b)
      )
  );
  nodes.register(
    'logic/dot/quat',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, number>(
        'logic/dot/quat',
        'quat',
        'quat',
        'float',
        (a, b) => vec4Dot(a, b)
      )
  );
  nodes.register(
    'logic/conjugate/quat',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/conjugate/quat',
        'quat',
        'quat',
        (a) => quatConjugate(a)
      )
  );
  nodes.register(
    'logic/slerp/quat',
    () =>
      new In3Out1FuncNode<Vec4, Vec4, number, Vec4>(
        'logic/slerp/quat',
        'quat',
        'quat',
        'float',
        'quat',
        (a, b, c) => quatSlerp(a, b, c)
      )
  );
  nodes.register(
    'logic/normalize/quat',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/normalize/quat',
        'quat',
        'quat',
        (a) => vec4Normalize(a)
      )
  );
  nodes.register(
    'logic/length/quat',
    () =>
      new In1Out1FuncNode<Vec4, number>(
        'logic/length/quat',
        'quat',
        'float',
        (a) => vec4Length(a)
      )
  );
  nodes.register(
    'logic/toString/quat',
    () =>
      new In1Out1FuncNode<Vec4, string>(
        'logic/toString/quat',
        'quat',
        'string',
        (a) => vec4ToString(a)
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
    'logic/toString/color',
    () =>
      new In1Out1FuncNode<Vec3, string>(
        'logic/toString/color',
        'color',
        'string',
        (a) => vec3ToString(a)
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

  ['vec2', 'vec3', 'vec4', 'quat', 'euler', 'color'].forEach(
    // variables
    (valueTypeName) => {
      nodes.register(
        `variable/set/${valueTypeName}`,
        () => new SetVariable(`variable/set/${valueTypeName}`, valueTypeName)
      );
      nodes.register(
        `variable/get/${valueTypeName}`,
        () => new GetVariable(`variable/get/${valueTypeName}`, valueTypeName)
      );
      nodes.register(
        `variable/onChanged/${valueTypeName}`,
        () =>
          new OnVariableChanged(
            `variable/onChanged/${valueTypeName}`,
            valueTypeName
          )
      );
    }
  );

  return registry;
}
