/* eslint-disable max-len */
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode';
import { Registry } from '../../Registry';
import { ValueType } from '../../Values/ValueType';
import { SetVariable } from '../Core/Actions/SetVariable';
import { OnVariableChanged } from '../Core/Events/OnVariableChanged';
import { GetVariable } from '../Core/Queries/GetVariable';
import { SetSceneProperty } from './Actions/SetSceneProperty';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick';
import { Vec2Create } from './Logic/Vec2Create';
import { Vec2Elements } from './Logic/Vec2Elements';
import { Vec3Create } from './Logic/Vec3Create';
import { Vec3Elements } from './Logic/Vec3Elements';
import { Vec4Create } from './Logic/Vec4Create';
import { Vec4Elements } from './Logic/Vec4Elements';
import { GetSceneProperty } from './Queries/GetSceneProperty';
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
} from './Values/Vec2';
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
} from './Values/Vec3';
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
} from './Values/Vec4';

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
    'action/setSceneBoolean',
    () => new SetSceneProperty<boolean>('action/setSceneBoolean', 'boolean')
  );
  nodes.register(
    'action/setSceneFloat',
    () => new SetSceneProperty<number>('action/setSceneFloat', 'float')
  );
  nodes.register(
    'action/setSceneInteger',
    () => new SetSceneProperty<bigint>('action/setSceneInteger', 'integer')
  );
  nodes.register(
    'action/setSceneVec2',
    () => new SetSceneProperty<Vec2>('action/setSceneVec2', 'vec2')
  );
  nodes.register(
    'action/setSceneVec3',
    () => new SetSceneProperty<Vec3>('action/setSceneVec3', 'vec3')
  );
  nodes.register(
    'action/setSceneVec4',
    () => new SetSceneProperty<Vec4>('action/setSceneVec4', 'vec4')
  );

  // queries

  nodes.register(
    'query/getSceneBoolean',
    () => new GetSceneProperty<boolean>('query/getSceneBoolean', 'boolean')
  );
  nodes.register(
    'query/getSceneFloat',
    () => new GetSceneProperty<number>('query/getSceneFloat', 'float')
  );
  nodes.register(
    'query/getSceneInteger',
    () => new GetSceneProperty<bigint>('query/getSceneInteger', 'integer')
  );
  nodes.register(
    'query/getSceneVec2',
    () => new GetSceneProperty<Vec2>('query/getSceneVec2', 'vec2')
  );
  nodes.register(
    'query/getSceneVec3',
    () => new GetSceneProperty<Vec3>('query/getSceneVec3', 'vec3')
  );
  nodes.register(
    'query/getSceneVec4',
    () => new GetSceneProperty<Vec4>('query/getSceneVec4', 'vec4')
  );

  // logic: vec2

  nodes.register('logic/vec2', () => new Vec2Create());

  nodes.register('logic/vec2Elements', () => new Vec2Elements());

  nodes.register(
    'logic/vec2Add',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        'logic/vec2Add',
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Add(a, b)
      )
  );
  nodes.register(
    'logic/vec2Subtract',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        'logic/vec2Subtract',
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Subtract(a, b)
      )
  );
  nodes.register(
    'logic/vec2Scale',
    () =>
      new In2Out1FuncNode<Vec2, number, Vec2>(
        'logic/vec2Scale',
        'vec2',
        'float',
        'vec2',
        (a, b) => vec2Scale(a, b)
      )
  );
  nodes.register(
    'logic/vec2Negate',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>('logic/vec2Negate', 'vec2', 'vec2', (a) =>
        vec2Negate(a)
      )
  );
  nodes.register(
    'logic/vec2Normalize',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>(
        'logic/vec2Normalize',
        'vec2',
        'vec2',
        (a) => vec2Normalize(a)
      )
  );
  nodes.register(
    'logic/vec2Length',
    () =>
      new In1Out1FuncNode<Vec2, number>(
        'logic/vec2Length',
        'vec2',
        'float',
        (a) => vec2Length(a)
      )
  );
  nodes.register(
    'logic/vec2ToString',
    () =>
      new In1Out1FuncNode<Vec2, string>(
        'logic/vec2ToString',
        'vec2',
        'string',
        (a) => vec2ToString(a)
      )
  );

  // logic: vec3

  nodes.register('logic/vec3', () => new Vec3Create());

  nodes.register('logic/vec3Elements', () => new Vec3Elements());

  nodes.register(
    'logic/vec3Add',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/vec3Add',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Add(a, b)
      )
  );
  nodes.register(
    'logic/vec3Subtract',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/vec3Subtract',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Subtract(a, b)
      )
  );
  nodes.register(
    'logic/vec3Scale',
    () =>
      new In2Out1FuncNode<Vec3, number, Vec3>(
        'logic/vec3Scale',
        'vec3',
        'float',
        'vec3',
        (a, b) => vec3Scale(a, b)
      )
  );
  nodes.register(
    'logic/vec3Cross',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/vec3Cross',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Cross(a, b)
      )
  );
  nodes.register(
    'logic/vec3Dot',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, number>(
        'logic/vec3Dot',
        'vec3',
        'vec3',
        'float',
        (a, b) => vec3Dot(a, b)
      )
  );
  nodes.register(
    'logic/vec3Negate',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/vec3Negate', 'vec3', 'vec3', (a) =>
        vec3Negate(a)
      )
  );
  nodes.register(
    'logic/vec3Normalize',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/vec3Normalize',
        'vec3',
        'vec3',
        (a) => vec3Normalize(a)
      )
  );
  nodes.register(
    'logic/vec3Length',
    () =>
      new In1Out1FuncNode<Vec3, number>(
        'logic/vec3Length',
        'vec3',
        'float',
        (a) => vec3Length(a)
      )
  );
  nodes.register(
    'logic/vec3ToString',
    () =>
      new In1Out1FuncNode<Vec3, string>(
        'logic/vec3ToString',
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

  nodes.register('logic/vec4', () => new Vec4Create());
  nodes.register('logic/vec4Elements', () => new Vec4Elements());

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
    'logic/vec4Dot',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, number>(
        'logic/vec4Dot',
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
    'logic/vec4Normalize',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/vec4Normalize',
        'vec4',
        'vec4',
        (a) => vec4Normalize(a)
      )
  );
  nodes.register(
    'logic/vec4Length',
    () =>
      new In1Out1FuncNode<Vec4, number>(
        'logic/vec4Length',
        'vec4',
        'float',
        (a) => vec4Length(a)
      )
  );
  nodes.register(
    'logic/vec4ToString',
    () =>
      new In1Out1FuncNode<Vec4, string>(
        'logic/vec4ToString',
        'vec4',
        'string',
        (a) => vec4ToString(a)
      )
  );

  // variables

  nodes.register(
    'variable/setVec2',
    () => new SetVariable('variable/setVec2', 'vec2')
  );
  nodes.register(
    'variable/getVec2',
    () => new GetVariable('variable/getVec2', 'vec2')
  );
  nodes.register(
    'variable/onVec2Changed',
    () => new OnVariableChanged('variable/onVec2Changed', 'vec2')
  );

  nodes.register(
    'variable/setVec3',
    () => new SetVariable('variable/setVec3', 'vec3')
  );
  nodes.register(
    'variable/getVec3',
    () => new GetVariable('variable/getVec3', 'vec3')
  );
  nodes.register(
    'variable/onVec3Changed',
    () => new OnVariableChanged('variable/onVec3Changed', 'vec3')
  );

  nodes.register(
    'variable/setVec4',
    () => new SetVariable('variable/setVec4', 'vec4')
  );
  nodes.register(
    'variable/getVec4',
    () => new GetVariable('variable/getVec4', 'vec4')
  );
  nodes.register(
    'variable/onVec4Changed',
    () => new OnVariableChanged('variable/onVec4Changed', 'vec4')
  );

  return registry;
}
