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

  nodes.register('event/nodeClick', () => new OnSceneNodeClick());

  // actions
  [
    'boolean',
    'float',
    'integer',
    'vec2',
    'vec3',
    'vec4',
    'quat',
    'euler',
    'color'
  ].forEach((valueTypeName) => {
    nodes.register(
      `scene/set/${valueTypeName}`,
      () => new SetSceneProperty(`scene/set/${valueTypeName}`, valueTypeName)
    );
    nodes.register(
      `scene/get/${valueTypeName}`,
      () => new GetSceneProperty(`scene/get/${valueTypeName}`, valueTypeName)
    );
  });

  ['vec2', 'vec3', 'vec4', 'quat', 'euler', 'color'].forEach(
    (valueTypeName) => {
      registerSerializersForValueType(registry, valueTypeName);
    }
  );

  // variables

  ['vec2', 'vec3', 'vec4', 'quat', 'euler', 'color'].forEach(
    (valueTypeName) => {
      registerSerializersForValueType(nodes, valueTypeName);
    }
  );

  return registry;
}
