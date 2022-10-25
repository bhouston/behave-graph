/* eslint-disable max-len */
import { getNodeDescriptions } from '../../Nodes/getNodeDescriptions.js';
import { Registry } from '../../Registry.js';
import { registerSerializersForValueType } from '../Core/registerSerializersForValueType.js';
import { SetSceneProperty } from './Actions/SetSceneProperty.js';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick.js';
import { GetSceneProperty } from './Queries/GetSceneProperty.js';
import * as ColorNodes from './Values/ColorNodes.js';
import { ColorValue } from './Values/ColorValue.js';
import * as EulerNodes from './Values/EulerNodes.js';
import { EulerValue } from './Values/EulerValue.js';
import * as QuatNodes from './Values/QuatNodes.js';
import { QuatValue } from './Values/QuatValue.js';
import * as Vec2Nodes from './Values/Vec2Nodes.js';
import { Vec2Value } from './Values/Vec2Value.js';
import * as Vec3Nodes from './Values/Vec3Nodes.js';
import { Vec3Value } from './Values/Vec3Value.js';
import * as Vec4Nodes from './Values/Vec4Nodes.js';
import { Vec4Value } from './Values/Vec4Value.js';

export function registerSceneProfile(registry: Registry) {
  const { values, nodes } = registry;

  // pull in value type nodes
  values.register(Vec2Value);
  values.register(Vec3Value);
  values.register(Vec4Value);
  values.register(ColorValue);
  values.register(EulerValue);
  values.register(QuatValue);

  // pull in value type nodes
  nodes.register(...getNodeDescriptions(Vec2Nodes));
  nodes.register(...getNodeDescriptions(Vec3Nodes));
  nodes.register(...getNodeDescriptions(Vec4Nodes));
  nodes.register(...getNodeDescriptions(ColorNodes));
  nodes.register(...getNodeDescriptions(EulerNodes));
  nodes.register(...getNodeDescriptions(QuatNodes));

  // events

  nodes.register(OnSceneNodeClick.Description);

  // actions
  const allValueTypeNames = values.getAllNames();
  nodes.register(...SetSceneProperty.GetDescriptions(...allValueTypeNames));
  nodes.register(...GetSceneProperty.GetDescriptions(...allValueTypeNames));

  const newValueTypeNames = ['vec2', 'vec3', 'vec4', 'quat', 'euler', 'color'];

  // variables

  newValueTypeNames.forEach((valueTypeName) => {
    registerSerializersForValueType(registry, valueTypeName);
  });

  return registry;
}
