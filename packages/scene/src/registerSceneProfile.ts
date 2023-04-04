/* eslint-disable max-len */
import {
  getNodeDescriptions,
  IRegistry,
  registerSerializersForValueType
} from '@behave-graph/core';

import { IScene } from './Abstractions/IScene';
import { SetSceneProperty } from './Nodes/Actions/SetSceneProperty';
import { OnSceneNodeClick } from './Nodes/Events/OnSceneNodeClick';
import * as ColorNodes from './Nodes/Logic/ColorNodes';
import * as EulerNodes from './Nodes/Logic/EulerNodes';
import * as Mat3Nodes from './Nodes/Logic/Mat3Nodes';
import * as Mat4Nodes from './Nodes/Logic/Mat4Nodes';
import * as QuatNodes from './Nodes/Logic/QuatNodes';
import * as Vec2Nodes from './Nodes/Logic/Vec2Nodes';
import * as Vec3Nodes from './Nodes/Logic/Vec3Nodes';
import * as Vec4Nodes from './Nodes/Logic/Vec4Nodes';
import { GetSceneProperty } from './Nodes/Queries/GetSceneProperty';
import { ColorValue } from './Values/ColorValue';
import { EulerValue } from './Values/EulerValue';
import { Mat3Value } from './Values/Mat3Value';
import { Mat4Value } from './Values/Mat4Value';
import { QuatValue } from './Values/QuatValue';
import { Vec2Value } from './Values/Vec2Value';
import { Vec3Value } from './Values/Vec3Value';
import { Vec4Value } from './Values/Vec4Value';

export function registerSceneDependency(
  dependencies: IRegistry['dependencies'],
  scene: IScene
) {
  dependencies.register('scene', scene);
}

export function registerSceneProfile(
  registry: Pick<IRegistry, 'values' | 'nodes'>
) {
  const { values, nodes } = registry;

  // pull in value type nodes
  values.register(Vec2Value);
  values.register(Vec3Value);
  values.register(Vec4Value);
  values.register(ColorValue);
  values.register(EulerValue);
  values.register(QuatValue);
  values.register(Mat3Value);
  values.register(Mat4Value);

  // pull in value type nodes
  nodes.register(...getNodeDescriptions(Vec2Nodes));
  nodes.register(...getNodeDescriptions(Vec3Nodes));
  nodes.register(...getNodeDescriptions(Vec4Nodes));
  nodes.register(...getNodeDescriptions(ColorNodes));
  nodes.register(...getNodeDescriptions(EulerNodes));
  nodes.register(...getNodeDescriptions(QuatNodes));
  nodes.register(...getNodeDescriptions(Mat3Nodes));
  nodes.register(...getNodeDescriptions(Mat4Nodes));

  // events

  nodes.register(OnSceneNodeClick);

  // actions
  const allValueTypeNames = values.getAllNames();
  nodes.register(...SetSceneProperty(allValueTypeNames));
  nodes.register(...GetSceneProperty(allValueTypeNames));

  const newValueTypeNames = [
    'vec2',
    'vec3',
    'vec4',
    'quat',
    'euler',
    'color',
    'mat3',
    'mat4'
  ];

  // variables

  newValueTypeNames.forEach((valueTypeName) => {
    registerSerializersForValueType(registry, valueTypeName);
  });

  return registry;
}
