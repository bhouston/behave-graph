/* eslint-disable max-len */
import {
  Dependencies,
  getNodeDescriptions,
  getStringConversionsForValueType,
  NodeDefinition,
  ValueType
} from '@oveddan-behave-graph/core';

import { IScene } from './Abstractions/IScene';
import { sceneDepdendencyKey } from './dependencies';
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

export const createSceneDependency = (scene: IScene): Dependencies => ({
  [sceneDepdendencyKey]: scene
});

export const getSceneValueTypes = (): ValueType<any, any>[] => [
  Vec2Value,
  Vec3Value,
  Vec4Value,
  ColorValue,
  EulerValue,
  QuatValue,
  Mat3Value,
  Mat4Value
];

export const getSceneNodeDefinitions = (
  values: Record<string, ValueType>
): NodeDefinition[] => {
  const allValueTypeNames = Object.keys(values);
  return [
    // pull in value type nodes

    ...getNodeDescriptions(Vec2Nodes),
    ...getNodeDescriptions(Vec3Nodes),
    ...getNodeDescriptions(Vec4Nodes),
    ...getNodeDescriptions(ColorNodes),
    ...getNodeDescriptions(EulerNodes),
    ...getNodeDescriptions(QuatNodes),
    ...getNodeDescriptions(Mat3Nodes),
    ...getNodeDescriptions(Mat4Nodes),
    // events
    OnSceneNodeClick,
    // actions
    ...SetSceneProperty(allValueTypeNames),
    ...GetSceneProperty(allValueTypeNames)
  ];
};

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

export const makeSceneDependencies = ({ scene }: { scene: IScene }) => ({
  [sceneDepdendencyKey]: scene
});

export const getStringConversions = (
  values: Record<string, ValueType>
): NodeDefinition[] =>
  newValueTypeNames.flatMap((valueTypeName) =>
    getStringConversionsForValueType({ values, valueTypeName })
  );
