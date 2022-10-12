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
  vec3Cross,
  vec3Dot,
  vec3FromArray,
  Vec3JSON,
  vec3Length,
  vec3Mix,
  vec3Negate,
  vec3Normalize,
  vec3Parse,
  vec3Scale,
  vec3Subtract,
  vec3ToArray,
  vec3ToString
} from './Values/Vec3.js';

export function registerVec3Value(registry: Registry) {
  const { nodes, values } = registry;

  values.register(
    new ValueType(
      'vec3',
      () => new Vec3(),
      (value: string | Vec3JSON) =>
        typeof value === 'string'
          ? vec3Parse(value)
          : new Vec3(value.x, value.y, value.z),
      (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
    )
  );

  // logic: vec3

  nodes.register(
    'logic/create/vec3',
    () =>
      new VecCreate<Vec3>(
        'logic/create/vec3',
        'vec3',
        ['x', 'y', 'z'],
        (elements: number[]) => vec3FromArray(elements)
      )
  );
  nodes.register(
    'logic/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>('logic/vec3', 'vec3', 'vec3', (a) => a)
  );
  nodes.register(
    'logic/elements/vec3',
    () =>
      new VecElements<Vec3>(
        'logic/elements/vec3',
        'vec3',
        ['x', 'y', 'z'],
        vec3ToArray
      )
  );

  nodes.register(
    'logic/add/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/add/vec3',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Add(a, b)
      )
  );
  nodes.register(
    'logic/subtract/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/subtract/vec3',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Subtract(a, b)
      )
  );
  nodes.register(
    'logic/scale/vec3',
    () =>
      new In2Out1FuncNode<Vec3, number, Vec3>(
        'logic/scale/vec3',
        'vec3',
        'float',
        'vec3',
        (a, b) => vec3Scale(a, b)
      )
  );
  nodes.register(
    'logic/cross/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, Vec3>(
        'logic/cross/vec3',
        'vec3',
        'vec3',
        'vec3',
        (a, b) => vec3Cross(a, b)
      )
  );
  nodes.register(
    'logic/dot/vec3',
    () =>
      new In2Out1FuncNode<Vec3, Vec3, number>(
        'logic/dot/vec3',
        'vec3',
        'vec3',
        'float',
        (a, b) => vec3Dot(a, b)
      )
  );
  nodes.register(
    'logic/negate/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/negate/vec3',
        'vec3',
        'vec3',
        (a) => vec3Negate(a)
      )
  );
  nodes.register(
    'logic/mix/vec3',
    () =>
      new In3Out1FuncNode<Vec3, Vec3, number, Vec3>(
        'logic/mix/vec3',
        'vec3',
        'vec3',
        'float',
        'vec3',
        (a, b, c) => vec3Mix(a, b, c)
      )
  );
  nodes.register(
    'logic/normalize/vec3',
    () =>
      new In1Out1FuncNode<Vec3, Vec3>(
        'logic/normalize/vec3',
        'vec3',
        'vec3',
        (a) => vec3Normalize(a)
      )
  );
  nodes.register(
    'logic/length/vec3',
    () =>
      new In1Out1FuncNode<Vec3, number>(
        'logic/length/vec3',
        'vec3',
        'float',
        (a) => vec3Length(a)
      )
  );
  nodes.register(
    'logic/toString/vec3',
    () =>
      new In1Out1FuncNode<Vec3, string>(
        'logic/toString/vec3',
        'vec3',
        'string',
        (a) => vec3ToString(a)
      )
  );
}
