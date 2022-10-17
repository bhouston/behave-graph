/* eslint-disable max-len */
import { Registry } from '../../Registry.js';
import { registerSerializersForValueType } from '../Core/registerSerializersForValueType.js';
import { registryVariableForValueType } from '../Core/registerVariableForValueType.js';
import { SetSceneProperty } from './Actions/SetSceneProperty.js';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick.js';
import { GetSceneProperty } from './Queries/GetSceneProperty.js';
import { registerColorValue } from './registerColorValue.js';
import { registerEulerValue } from './registerEulerValue.js';
import { registerQuatValue } from './registerQuatValue.js';
import { Vec2Nodes, Vec2Value } from './Values/Vec2Nodes.js';
import { Vec3Nodes, Vec3Value } from './Values/Vec3Nodes.js';
import { Vec4Nodes, Vec4Value } from './Values/Vec4Nodes.js';

export function registerSceneProfile(registry: Registry) {
  const { values, nodes } = registry;

  // pull in value type nodes
  values.register(Vec2Value);
  Object.values(Vec2Nodes).forEach((description) => {
    return nodes.register(description);
  });

  values.register(Vec3Value);
  Object.values(Vec3Nodes).forEach((description) => {
    return nodes.register(description);
  });

  values.register(Vec4Value);
  Object.values(Vec4Nodes).forEach((description) => {
    return nodes.register(description);
  });

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
