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
import { registerVec2Value } from './registerVec2Value.js';
import { registerVec3Value } from './registerVec3Value.js';
import { registerVec4Value } from './registerVec4Value.js';

export function registerSceneProfile(registry: Registry) {
  const { values, nodes } = registry;

  // values

  registerVec2Value(registry);
  registerVec3Value(registry);
  registerVec4Value(registry);
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
