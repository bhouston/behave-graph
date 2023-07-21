/* eslint-disable max-len */
import {
  Dependencies,
  getCoreValuesMap,
  getNodeDescriptions,
  getStringConversionsForValueType,
  IRegistry,
  memo,
  NodeDefinition,
  ValueType,
  ValueTypeMap
} from '@behave-graph/core';

import { IScene } from './Abstractions/IScene.js';
import { sceneDependencyKey } from './dependencies.js';
import { SetSceneProperty } from './Nodes/Actions/SetSceneProperty.js';
import { OnSceneNodeClick } from './Nodes/Events/OnSceneNodeClick.js';
import * as ColorNodes from './Nodes/Logic/ColorNodes.js';
import * as EulerNodes from './Nodes/Logic/EulerNodes.js';
import * as Mat3Nodes from './Nodes/Logic/Mat3Nodes.js';
import * as Mat4Nodes from './Nodes/Logic/Mat4Nodes.js';
import * as QuatNodes from './Nodes/Logic/QuatNodes.js';
import * as Vec2Nodes from './Nodes/Logic/Vec2Nodes.js';
import * as Vec3Nodes from './Nodes/Logic/Vec3Nodes.js';
import * as Vec4Nodes from './Nodes/Logic/Vec4Nodes.js';
import { GetSceneProperty } from './Nodes/Queries/GetSceneProperty.js';
import { ColorValue } from './Values/ColorValue.js';
import { EulerValue } from './Values/EulerValue.js';
import { Mat3Value } from './Values/Mat3Value.js';
import { Mat4Value } from './Values/Mat4Value.js';
import { QuatValue } from './Values/QuatValue.js';
import { Vec2Value } from './Values/Vec2Value.js';
import { Vec3Value } from './Values/Vec3Value.js';
import { Vec4Value } from './Values/Vec4Value.js';

export const createSceneDependency = (scene: IScene): Dependencies => ({
  [sceneDependencyKey]: scene
});

export const getSceneValuesMap = memo<ValueTypeMap>(() => {
  const valueTypes = [
    Vec2Value,
    Vec3Value,
    Vec4Value,
    ColorValue,
    EulerValue,
    QuatValue,
    Mat3Value,
    Mat4Value
  ];
  return Object.fromEntries(
    valueTypes.map((valueType) => [valueType.name, valueType])
  );
});

export const getSceneStringConversions = (
  values: Record<string, ValueType>
): NodeDefinition[] =>
  Object.keys(getCoreValuesMap()).flatMap((valueTypeName) =>
    getStringConversionsForValueType({ values, valueTypeName })
  );

export const getSceneNodesMap = memo<Record<string, NodeDefinition>>(() => {
  const allValueTypeNames = Object.keys({
    ...getCoreValuesMap(),
    ...getSceneValuesMap()
  });
  const nodeDefinitions = [
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
    ...GetSceneProperty(allValueTypeNames),

    ...getSceneStringConversions(getSceneValuesMap())
  ];

  return Object.fromEntries(
    nodeDefinitions.map((nodeDefinition) => [
      nodeDefinition.typeName,
      nodeDefinition
    ])
  );
});

export const makeSceneDependencies = ({ scene }: { scene: IScene }) => ({
  [sceneDependencyKey]: scene
});

export const registerSceneProfile = (registry: IRegistry): IRegistry => {
  const values = {
    ...registry.values,
    ...getCoreValuesMap(),
    ...getSceneValuesMap()
  };
  return {
    values,
    nodes: { ...registry.nodes, ...getSceneNodesMap() },
    dependencies: {
      ...registry.dependencies
    }
  };
};
