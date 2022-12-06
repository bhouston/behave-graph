/* eslint-disable max-len */
import { getNodeDescriptions } from '../../Nodes/Registry/NodeDescription';
import { Registry } from '../../Registry';
import { registerSerializersForValueType } from '../Core/registerSerializersForValueType';
import { DummyScene } from './Abstractions/Drivers/DummyScene';
import { IScene } from './Abstractions/IScene';
import { SetSceneProperty } from './Actions/SetSceneProperty';
import { OnSceneNodeClick } from './Events/OnSceneNodeClick';
import { GetSceneProperty } from './Queries/GetSceneProperty';
import * as ColorNodes from './Values/ColorNodes';
import { ColorValue } from './Values/ColorValue';
import * as EulerNodes from './Values/EulerNodes';
import { EulerValue } from './Values/EulerValue';
import * as Mat3Nodes from './Values/Mat3Nodes';
import { Mat3Value } from './Values/Mat3Value';
import * as Mat4Nodes from './Values/Mat4Nodes';
import { Mat4Value } from './Values/Mat4Value';
import * as QuatNodes from './Values/QuatNodes';
import { QuatValue } from './Values/QuatValue';
import * as Vec2Nodes from './Values/Vec2Nodes';
import { Vec2Value } from './Values/Vec2Value';
import * as Vec3Nodes from './Values/Vec3Nodes';
import { Vec3Value } from './Values/Vec3Value';
import * as Vec4Nodes from './Values/Vec4Nodes';
import { Vec4Value } from './Values/Vec4Value';

export function registerSceneProfile(
  registry: Registry,
  scene: IScene = new DummyScene()
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

  nodes.register(OnSceneNodeClick.Description);

  // actions
  const allValueTypeNames = values.getAllNames();
  nodes.register(
    ...SetSceneProperty.GetDescriptions(scene, ...allValueTypeNames)
  );
  nodes.register(
    ...GetSceneProperty.GetDescriptions(scene, ...allValueTypeNames)
  );

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
