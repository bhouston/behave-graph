/* eslint-disable max-len */
import { toNodeDescriptions } from '../../Nodes/toNodeDescriptions.js';
import { Registry } from '../../Registry.js';
import { registerSerializersForValueType } from '../Core/registerSerializersForValueType.js';
import { registryVariableForValueType } from '../Core/registerVariableForValueType.js';
import { SetSceneProperty } from './Actions/SetSceneProperty.js';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick.js';
import { GetSceneProperty } from './Queries/GetSceneProperty.js';
import { registerColorValue } from './registerColorValue.js';
import { registerEulerValue } from './registerEulerValue.js';
import { registerQuatValue } from './registerQuatValue.js';
import * as Vec2Nodes from './Values/Vec2Nodes.js';
import { Vec2Value } from './Values/Vec2Nodes.js';
import * as Vec3Nodes from './Values/Vec3Nodes.js';
import { Vec3Value } from './Values/Vec3Nodes.js';
import * as Vec4Nodes from './Values/Vec4Nodes.js';
import { Vec4Value } from './Values/Vec4Nodes.js';

export function registerSceneProfile(registry: Registry) {
  const { values, nodes } = registry;

  // pull in value type nodes
  values.register(Vec2Value);
  values.register(Vec3Value);
  values.register(Vec4Value);

  // pull in value type nodes
  nodes.register(...toNodeDescriptions(Vec2Nodes));
  nodes.register(...toNodeDescriptions(Vec3Nodes));
  nodes.register(...toNodeDescriptions(Vec4Nodes));

  // values

  registerQuatValue(registry);
  registerEulerValue(registry);
  registerColorValue(registry);

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
      registryVariableForValueType(nodes, valueTypeName);
    }
  );

  return registry;
}
