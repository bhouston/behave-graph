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
import { Vec2Create } from './Logic/Vec2Create.js';
import { Vec2Elements } from './Logic/Vec2Elements.js';
import { Vec3Create } from './Logic/Vec3Create.js';
import { Vec3Elements } from './Logic/Vec3Elements.js';
import { Vec4Create } from './Logic/Vec4Create.js';
import { Vec4Elements } from './Logic/Vec4Elements.js';
import { GetSceneProperty } from './Queries/GetSceneProperty.js';
import {
  Vec2,
  vec2Add,
  Vec2JSON,
  vec2Length,
  vec2Negate,
  vec2Normalize,
  vec2Parse,
  vec2Scale,
  vec2Subtract,
  vec2ToString
} from './Values/Vec2.js';
import {
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
  Vec3,
  vec3Add,
  vec3Cross,
  vec3Dot,
  Vec3JSON,
  vec3Length,
  vec3Negate,
  vec3Normalize,
  vec3Parse,
  vec3Scale,
  vec3Subtract,
  vec3ToString
} from './Values/Vec3.js';
import {
  angleAxisToQuat,
  eulerToQuat,
  quatConjugate,
  quatMultiply,
  quatSlerp,
  Vec4,
  vec4Dot,
  Vec4JSON,
  vec4Length,
  vec4Normalize,
  vec4Parse,
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

  // logic: vec2

  nodes.register('logic/create/vec2', () => new Vec2Create());
  nodes.register(
    'logic/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>('logic/vec2', 'vec2', 'vec2', (a) => a)
  );
  nodes.register('logic/elements/vec2', () => new Vec2Elements());

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

  nodes.register('logic/create/vec3', () => new Vec3Create());
  nodes.register(
    'logic/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/vec3', 'vec3', 'vec3', (a) => a)
  );
  nodes.register('logic/elements/vec3', () => new Vec3Elements());

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

  nodes.register('logic/create/vec4', () => new Vec4Create());
  nodes.register(
    'logic/vec4',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>('logic/vec4', 'vec4', 'vec4', (a) => a)
  );
  nodes.register('logic/elements/vec4', () => new Vec4Elements());

  nodes.register(
    'logic/eulerToQuat',
    () =>
      new In1Out1FuncNode<Vec3, Vec4>(
        'logic/eulerToQuat',
        'vec3',
        'vec4',
        (a) => eulerToQuat(a)
      )
  );
  nodes.register(
    'logic/angleAxisToQuat',
    () =>
      new In2Out1FuncNode<number, Vec3, Vec4>(
        'logic/angleAxisToQuat',
        'float',
        'vec3',
        'vec4',
        (a, b) => angleAxisToQuat(a, b)
      )
  );
  nodes.register(
    'logic/quatMultiply',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/quatMultiply',
        'vec4',
        'vec4',
        'vec4',
        (a, b) => quatMultiply(a, b)
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
    'logic/quatConjugate',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/quatConjugate',
        'vec4',
        'vec4',
        (a) => quatConjugate(a)
      )
  );
  nodes.register(
    'logic/quatSlerp',
    () =>
      new In3Out1FuncNode<Vec4, Vec4, number, Vec4>(
        'logic/quatSlerp',
        'vec4',
        'vec4',
        'float',
        'vec4',
        (a, b, c) => quatSlerp(a, b, c)
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

  // variables

  nodes.register(
    'variable/set/vec2',
    () => new SetVariable('variable/set/vec2', 'vec2')
  );
  nodes.register(
    'variable/get/vec2',
    () => new GetVariable('variable/get/vec2', 'vec2')
  );
  nodes.register(
    'variable/onChanged/vec2',
    () => new OnVariableChanged('variable/onChanged/vec2', 'vec2')
  );

  nodes.register(
    'variable/set/vec3',
    () => new SetVariable('variable/set/vec3', 'vec3')
  );
  nodes.register(
    'variable/get/vec3',
    () => new GetVariable('variable/get/vec3', 'vec3')
  );
  nodes.register(
    'variable/onChanged/vec3',
    () => new OnVariableChanged('variable/onChanged/vec3', 'vec3')
  );

  nodes.register(
    'variable/set/vec4',
    () => new SetVariable('variable/set/vec4', 'vec4')
  );
  nodes.register(
    'variable/get/vec4',
    () => new GetVariable('variable/get/vec4', 'vec4')
  );
  nodes.register(
    'variable/onChanged/vec4',
    () => new OnVariableChanged('variable/onChanged/vec4', 'vec4')
  );

  return registry;
}
