/* eslint-disable max-len */
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode';
import { Registry } from '../../Registry';
import { ValueType } from '../../Values/ValueType';
import { SetVariable } from '../Core/Actions/SetVariable';
import { OnVariableChanged } from '../Core/Events/OnVariableChanged';
import { GetVariable } from '../Core/Queries/GetVariable';
import { SetSceneNodeProperty } from './Actions/SetSceneNodeProperty';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick';
import { Vec2Create } from './Logic/Vec2Create';
import { Vec2Elements } from './Logic/Vec2Elements';
import { Vec3Create } from './Logic/Vec3Create';
import { Vec3Elements } from './Logic/Vec3Elements';
import { Vec4Create } from './Logic/Vec4Create';
import { Vec4Elements } from './Logic/Vec4Elements';
import { GetSceneNodeProperty } from './Queries/GetSceneNodeProperty';
import {
  Vec2,
  vec2Add,
  vec2Length,
  vec2Negate,
  vec2Normalize,
  vec2Parse,
  vec2Scale,
  vec2Subtract,
  vec2ToString
} from './Values/Vec2';
import {
  Vec3,
  vec3Add,
  vec3Cross,
  vec3Dot,
  vec3Length,
  vec3Negate,
  vec3Normalize,
  vec3Parse,
  vec3Scale,
  vec3Subtract,
  vec3ToString
} from './Values/Vec3';
import {
  quatConjugate,
  quatMultiply,
  quatSlerp,
  Vec4,
  vec4Dot,
  vec4Length,
  vec4Normalize,
  vec4Parse,
  vec4ToString
} from './Values/Vec4';

export function registerSceneGraphProfile(registry: Registry) {
  const { values, nodes } = registry;

  values.register(
    new ValueType(
      'vec2',
      () => new Vec2(),
      (text: string) => vec2Parse(text),
      (value) => vec2ToString(value)
    )
  );
  values.register(
    new ValueType(
      'vec3',
      () => new Vec3(),
      (text: string) => vec3Parse(text),
      (value) => vec3ToString(value)
    )
  );
  values.register(
    new ValueType(
      'vec4',
      () => new Vec4(),
      (text: string) => vec4Parse(text),
      (value) => vec4ToString(value)
    )
  );

  // events

  nodes.register('event/nodeClick', () => new OnSceneNodeClick());

  // actions

  nodes.register(
    'action/setSceneNodeBoolean',
    () =>
      new SetSceneNodeProperty<boolean>('action/setSceneNodeBoolean', 'boolean')
  );
  nodes.register(
    'action/setSceneNodeNumber',
    () =>
      new SetSceneNodeProperty<number>('action/setSceneNodeNumber', 'number')
  );
  nodes.register(
    'action/setSceneNodeVec2',
    () => new SetSceneNodeProperty<Vec2>('action/setSceneNodeVec2', 'vec2')
  );
  nodes.register(
    'action/setSceneNodeVec3',
    () => new SetSceneNodeProperty<Vec3>('action/setSceneNodeVec3', 'vec3')
  );
  nodes.register(
    'action/setSceneNodeVec4',
    () => new SetSceneNodeProperty<Vec4>('action/setSceneNodeVec4', 'vec4')
  );

  // queries

  nodes.register(
    'query/getSceneNodeBoolean',
    () => new GetSceneNodeProperty('query/getSceneNodeBoolean', 'boolean')
  );
  nodes.register(
    'query/getSceneNodeNumber',
    () => new GetSceneNodeProperty('query/getSceneNodeNumber', 'number')
  );
  nodes.register(
    'query/getSceneNodeVec2',
    () => new GetSceneNodeProperty('query/getSceneNodeVec2', 'vec2')
  );
  nodes.register(
    'query/getSceneNodeVec3',
    () => new GetSceneNodeProperty('query/getSceneNodeVec3', 'vec3')
  );
  nodes.register(
    'query/getSceneNodeVec4',
    () => new GetSceneNodeProperty('query/getSceneNodeVec4', 'vec4')
  );

  // logic: vec2

  nodes.register('logic/vec2Create', () => new Vec2Create());

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
        'number',
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
        'number',
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

  nodes.register('logic/vec3Create', () => new Vec3Create());

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
        'number',
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
        'number',
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
        'number',
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

  // logic: vec4

  nodes.register('logic/vec4Create', () => new Vec4Create());
  nodes.register('logic/vec4Elements', () => new Vec4Elements());

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
        'number',
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
        'number',
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
        'number',
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
