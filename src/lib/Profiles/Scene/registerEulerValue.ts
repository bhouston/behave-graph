import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { ValueType } from '../../Values/ValueType.js';
import { VecCreate } from './Logic/VecCreate.js';
import { VecElements } from './Logic/VecElements.js';
import {
  Vec3,
  vec3Add,
  vec3FromArray,
  Vec3JSON,
  vec3Mix,
  vec3Parse,
  vec3ToArray
} from './Values/Vec3.js';
import { eulerToQuat, Vec4 } from './Values/Vec4.js';

export function registerEulerValue(registry: Registry) {
  const { nodes, values } = registry;

  values.register(
    new ValueType(
      'euler',
      () => new Vec3(),
      (value: string | Vec3JSON) =>
        typeof value === 'string'
          ? vec3Parse(value)
          : new Vec3(value.x, value.y, value.z),
      (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
    )
  );

  // logic: euler

  nodes.register(
    'logic/create/euler',
    () =>
      new VecCreate<Vec3>(
        'logic/create/euler',
        'euler',
        ['x', 'y', 'z'],
        (elements: number[]) => vec3FromArray(elements)
      )
  );
  nodes.register(
    'logic/euler',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/euler', 'euler', 'euler', (a) => a)
  );
  nodes.register(
    'logic/elements/euler',
    () =>
      new VecElements<Vec3>(
        'logic/elements/euler',
        'euler',
        ['x', 'y', 'z'],
        vec3ToArray
      )
  );

  nodes.register(
    'logic/add/euler',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/add/euler',
        'euler',
        'euler',
        'euler',
        (a, b) => vec3Add(a, b)
      )
  );
  nodes.register(
    'logic/mix/euler',
    () =>
      new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
        'logic/mix/euler',
        'euler',
        'euler',
        'float',
        'euler',
        (a, b, c) => vec3Mix(a, b, c)
      )
  );
  nodes.register(
    'logic/toQuat/euler',
    () =>
      new In1Out1FuncNode<Vec3, Vec4>(
        'logic/toQuat/euler',
        'euler',
        'quat',
        (a) => eulerToQuat(a)
      )
  );
}
