/* eslint-disable max-len */
import { Quaternion, Vector2, Vector3 } from 'three';

import In1Out1FuncNode from '../../Nodes/Templates/In1Out1FuncNode';
import In2Out1FuncNode from '../../Nodes/Templates/In2Out1FuncNode';
import parseFloats from '../../parseFloats';
import Registry from '../../Registry';
import ValueType from '../../Values/ValueType';
import SetVariable from '../Core/Actions/SetVariable';
import OnVariableChanged from '../Core/Events/OnVariableChanged';
import GetVariable from '../Core/Queries/GetVariable';
import SetSceneNodeProperty from './Actions/SetSceneNodeProperty';
import OnSceneNodeClick from './Events/OnSceneNodeClick';
import GetElement from './Logic/GetElement';
import QuaternionCreate from './Logic/QuaternionCreate';
import QuaternionElements from './Logic/QuaternionElements';
import SetElement from './Logic/SetElement';
import Vector2Create from './Logic/Vector2Create';
import Vector2Elements from './Logic/Vector2Elements';
import Vector3Create from './Logic/Vector3Create';
import Vector3Elements from './Logic/Vector3Elements';
import GetSceneNodeProperty from './Queries/GetSceneNodeProperty';

export default function registerSceneGraphProfile(registry: Registry) {
  const { values, nodes } = registry;

  values.register(new ValueType('quaternion', () => new Quaternion(), (text: string) => new Quaternion().fromArray(parseFloats(text)), (value) => `(${value.x}, ${value.y}, ${value.z}, ${value.w})`));
  values.register(new ValueType('vector3', () => new Vector3(), (text: string) => new Vector3().fromArray(parseFloats(text)), (value) => `(${value.x}, ${value.y}, ${value.z})`));
  values.register(new ValueType('vector2', () => new Vector2(), (text: string) => new Vector2().fromArray(parseFloats(text)), (value) => `(${value.x}, ${value.y})`));

  // events

  nodes.register('event/nodeClick', () => new OnSceneNodeClick());

  // actions

  nodes.register('action/setSceneNodeVisible', () => new SetSceneNodeProperty<boolean>('action/setSceneNodeVisible', 'boolean', (node, value) => { node.visible = value; }));
  nodes.register('action/setSceneNodeTranslation', () => new SetSceneNodeProperty<Vector3>('action/setSceneNodeTranslation', 'vector3', (node, value) => { node.position.copy(value); }));
  nodes.register('action/setSceneNodeRotation', () => new SetSceneNodeProperty<Quaternion>('action/setSceneNodeRotation', 'quaternion', (node, value) => { node.quaternion.copy(value); }));
  nodes.register('action/setSceneNodeScale', () => new SetSceneNodeProperty<Vector3>('action/setSceneNodeScale', 'vector3', (node, value) => { node.scale.copy(value); }));

  // queries

  nodes.register('query/getSceneNodeVisible', () => new GetSceneNodeProperty('query/getSceneNodeVisible', 'boolean', (node) => node.visible));
  nodes.register('query/getSceneNodeTranslation', () => new GetSceneNodeProperty('query/getSceneNodeTranslation', 'vector3', (node) => node.position.clone()));
  nodes.register('query/getSceneNodeRotation', () => new GetSceneNodeProperty('query/getSceneNodeRotation', 'quaternion', (node) => node.quaternion.clone()));
  nodes.register('query/getSceneNodeScale', () => new GetSceneNodeProperty('query/getSceneNodeScale', 'vector3', (node) => node.scale.clone()));

  // logic: vector2

  nodes.register('logic/vector2Create', () => new Vector2Create());
  nodes.register('logic/vector2SetX', () => new SetElement<Vector2, number>('logic/vector2SetX', 'vector2', 'number', 'x', (a, b) => (a.clone().setX(b))));
  nodes.register('logic/vector2SetY', () => new SetElement<Vector2, number>('logic/vector2SetY', 'vector2', 'number', 'y', (a, b) => (a.clone().setY(b))));

  nodes.register('logic/vector2Elements', () => new Vector2Elements());
  nodes.register('logic/vector2GetX', () => new GetElement<Vector2, number>('logic/vector2GetX', 'vector2', 'number', 'x', (a) => (a.x)));
  nodes.register('logic/vector2GetY', () => new GetElement<Vector2, number>('logic/vector2GetY', 'vector2', 'number', 'y', (a) => (a.y)));

  nodes.register('logic/vector2Add', () => new In2Out1FuncNode<Vector2, Vector2, Vector2>('logic/vector2Add', 'vector2', 'vector2', 'vector2', (a, b) => (a.clone().add(b))));
  nodes.register('logic/vector2Subtract', () => new In2Out1FuncNode<Vector2, Vector2, Vector2>('logic/vector2Subtract', 'vector2', 'vector2', 'vector2', (a, b) => (a.clone().sub(b))));
  nodes.register('logic/vector2Scale', () => new In2Out1FuncNode<Vector2, number, Vector2>('logic/vector2Scale', 'vector2', 'number', 'vector2', (a, b) => (a.clone().multiplyScalar(b))));
  nodes.register('logic/vector2Negate', () => new In1Out1FuncNode<Vector2, Vector2>('logic/vector2Negate', 'vector2', 'vector2', (a) => (a.clone().negate())));
  nodes.register('logic/vector2Normalize', () => new In1Out1FuncNode<Vector2, Vector2>('logic/vector2Normalize', 'vector2', 'vector2', (a) => (a.clone().normalize())));
  nodes.register('logic/vector2Length', () => new In1Out1FuncNode<Vector2, number>('logic/vector2Length', 'vector2', 'number', (a) => (a.length())));

  // logic: vector3

  nodes.register('logic/vector3Create', () => new Vector3Create());
  nodes.register('logic/vector3SetX', () => new SetElement<Vector3, number>('logic/vector3SetX', 'vector3', 'number', 'x', (a, b) => (a.clone().setX(b))));
  nodes.register('logic/vector3SetY', () => new SetElement<Vector3, number>('logic/vector3SetY', 'vector3', 'number', 'y', (a, b) => (a.clone().setY(b))));
  nodes.register('logic/vector3SetZ', () => new SetElement<Vector3, number>('logic/vector3SetZ', 'vector3', 'number', 'z', (a, b) => (a.clone().setZ(b))));

  nodes.register('logic/vector3Elements', () => new Vector3Elements());
  nodes.register('logic/vector3GetX', () => new GetElement<Vector3, number>('logic/vector3GetX', 'vector3', 'number', 'x', (a) => (a.x)));
  nodes.register('logic/vector3GetY', () => new GetElement<Vector3, number>('logic/vector3GetY', 'vector3', 'number', 'y', (a) => (a.y)));
  nodes.register('logic/vector3GetZ', () => new GetElement<Vector3, number>('logic/vector3GetZ', 'vector3', 'number', 'z', (a) => (a.z)));

  nodes.register('logic/vector3Add', () => new In2Out1FuncNode<Vector3, Vector3, Vector3>('logic/vector3Add', 'vector3', 'vector3', 'vector3', (a, b) => (a.clone().add(b))));
  nodes.register('logic/vector3Subtract', () => new In2Out1FuncNode<Vector3, Vector3, Vector3>('logic/vector3Subtract', 'vector3', 'vector3', 'vector3', (a, b) => (a.clone().sub(b))));
  nodes.register('logic/vector3Scale', () => new In2Out1FuncNode<Vector3, number, Vector3>('logic/vector3Scale', 'vector3', 'number', 'vector3', (a, b) => (a.clone().multiplyScalar(b))));
  nodes.register('logic/vector3Cross', () => new In2Out1FuncNode<Vector3, Vector3, Vector3>('logic/vector3Cross', 'vector3', 'vector3', 'vector3', (a, b) => (a.clone().cross(b))));
  nodes.register('logic/vector3Dot', () => new In2Out1FuncNode<Vector3, Vector3, number>('logic/vector3Dot', 'vector3', 'vector3', 'number', (a, b) => (a.dot(b))));
  nodes.register('logic/vector3Negate', () => new In1Out1FuncNode<Vector3, Vector3>('logic/vector3Negate', 'vector3', 'vector3', (a) => (a.clone().negate())));
  nodes.register('logic/vector3Normalize', () => new In1Out1FuncNode<Vector3, Vector3>('logic/vector3Normalize', 'vector3', 'vector3', (a) => (a.clone().normalize())));
  nodes.register('logic/vector3Length', () => new In1Out1FuncNode<Vector3, number>('logic/vector3Length', 'vector3', 'number', (a) => (a.length())));

  // logic: quaternion

  nodes.register('logic/quaternionCreate', () => new QuaternionCreate());
  nodes.register('logic/quaternionSetX', () => new SetElement<Quaternion, number>('logic/quaternionSetX', 'quaternion', 'number', 'x', (a, b) => { const q = a.clone(); q.x = b; return q; }));
  nodes.register('logic/quaternionSetY', () => new SetElement<Quaternion, number>('logic/quaternionSetY', 'quaternion', 'number', 'y', (a, b) => { const q = a.clone(); q.y = b; return q; }));
  nodes.register('logic/quaternionSetZ', () => new SetElement<Quaternion, number>('logic/quaternionSetZ', 'quaternion', 'number', 'z', (a, b) => { const q = a.clone(); q.z = b; return q; }));
  nodes.register('logic/quaternionSetW', () => new SetElement<Quaternion, number>('logic/quaternionSetW', 'quaternion', 'number', 'w', (a, b) => { const q = a.clone(); q.w = b; return q; }));

  nodes.register('logic/quaternionElements', () => new QuaternionElements());
  nodes.register('logic/quaternionGetX', () => new GetElement<Quaternion, number>('logic/quaternionGetX', 'quaternion', 'number', 'x', (a) => (a.x)));
  nodes.register('logic/quaternionGetY', () => new GetElement<Quaternion, number>('logic/quaternionGetY', 'quaternion', 'number', 'y', (a) => (a.y)));
  nodes.register('logic/quaternionGetZ', () => new GetElement<Quaternion, number>('logic/quaternionGetZ', 'quaternion', 'number', 'z', (a) => (a.z)));
  nodes.register('logic/quaternionGetW', () => new GetElement<Quaternion, number>('logic/quaternionGetW', 'quaternion', 'number', 'w', (a) => (a.w)));

  nodes.register('logic/quaternionMultiply', () => new In2Out1FuncNode<Quaternion, Quaternion, Quaternion>('logic/quaternionMultiply', 'quaternion', 'quaternion', 'quaternion', (a, b) => (a.clone().multiply(b))));
  nodes.register('logic/quaternionDot', () => new In2Out1FuncNode<Quaternion, Quaternion, number>('logic/quaternionDot', 'quaternion', 'quaternion', 'number', (a, b) => (a.dot(b))));
  nodes.register('logic/quaternionConjugate', () => new In1Out1FuncNode<Quaternion, Quaternion>('logic/quaternionConjugate', 'quaternion', 'quaternion', (a) => (a.clone().conjugate())));
  nodes.register('logic/quaternionNormalize', () => new In1Out1FuncNode<Quaternion, Quaternion>('logic/quaternionNormalize', 'quaternion', 'quaternion', (a) => (a.clone().normalize())));
  nodes.register('logic/quaternionLength', () => new In1Out1FuncNode<Quaternion, number>('logic/quaternionLength', 'quaternion', 'number', (a) => (a.length())));

  // variables

  nodes.register('variable/setVector3', () => new SetVariable('variable/setVector3', 'vector3'));
  nodes.register('variable/getVector3', () => new GetVariable('variable/getVector3', 'vector3'));
  nodes.register('variable/onVector3Changed', () => new OnVariableChanged('variable/onVector3Changed', 'vector3'));

  nodes.register('variable/setVector2', () => new SetVariable('variable/setVector2', 'vector2'));
  nodes.register('variable/getVector2', () => new GetVariable('variable/getVector2', 'vector2'));
  nodes.register('variable/onVector2Changed', () => new OnVariableChanged('variable/onVector2Changed', 'vector2'));

  nodes.register('variable/setQuaternion', () => new SetVariable('variable/setQuaternion', 'quaternion'));
  nodes.register('variable/getQuaternion', () => new GetVariable('variable/getQuaternion', 'quaternion'));
  nodes.register('variable/onQuaternionChanged', () => new OnVariableChanged('variable/onQuaternionChanged', 'quaternion'));

  return registry;
}
