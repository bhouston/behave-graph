import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { ValueType } from '../../Values/ValueType.js';
import { VecCreate } from './Logic/VecCreate.js';
import { VecElements } from './Logic/VecElements.js';
import { Vec3 } from './Values/Vec3.js';
import {
  angleAxisToQuat,
  quatConjugate,
  quatMultiply,
  quatSlerp,
  Vec4,
  vec4Dot,
  vec4FromArray,
  Vec4JSON,
  vec4Length,
  vec4Normalize,
  vec4Parse,
  vec4ToArray
} from './Values/Vec4.js';

export function registerQuatValue(registry: Registry) {
  const { nodes, values } = registry;

  values.register(
    new ValueType(
      'quat',
      () => new Vec4(),
      (value: string | Vec4JSON) =>
        typeof value === 'string'
          ? vec4Parse(value)
          : new Vec4(value.x, value.y, value.z, value.w),
      (value) =>
        ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
    )
  );

  // logic: quat

  nodes.register(
    'logic/create/quat',
    () =>
      new VecCreate<Vec4>(
        'logic/create/quat',
        'quat',
        ['x', 'y', 'z', 'w'],
        (elements: number[]) => vec4FromArray(elements)
      )
  );
  nodes.register(
    'logic/quat',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>('logic/quat', 'quat', 'quat', (a) => a)
  );
  nodes.register(
    'logic/elements/quat',
    () =>
      new VecElements<Vec4>(
        'logic/elements/quat',
        'quat',
        ['x', 'y', 'z', 'w'],
        vec4ToArray
      )
  );

  nodes.register(
    'logic/angleAxis/quat',
    () =>
      new In2Out1FuncNode<number, Vec3, Vec4>(
        'logic/angleAxis/quat',
        'float',
        'vec3',
        'quat',
        (a, b) => angleAxisToQuat(a, b)
      )
  );
  nodes.register(
    'logic/multiply/quat',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/multiply/quat',
        'quat',
        'quat',
        'quat',
        (a, b) => quatMultiply(a, b)
      )
  );
  nodes.register(
    'logic/dot/quat',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, number>(
        'logic/dot/quat',
        'quat',
        'quat',
        'float',
        (a, b) => vec4Dot(a, b)
      )
  );
  nodes.register(
    'logic/conjugate/quat',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/conjugate/quat',
        'quat',
        'quat',
        (a) => quatConjugate(a)
      )
  );
  nodes.register(
    'logic/slerp/quat',
    () =>
      new In3Out1FuncNode<Vec4, Vec4, number, Vec4>(
        'logic/slerp/quat',
        'quat',
        'quat',
        'float',
        'quat',
        (a, b, c) => quatSlerp(a, b, c)
      )
  );
  nodes.register(
    'logic/normalize/quat',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/normalize/quat',
        'quat',
        'quat',
        (a) => vec4Normalize(a)
      )
  );
  nodes.register(
    'logic/length/quat',
    () =>
      new In1Out1FuncNode<Vec4, number>(
        'logic/length/quat',
        'quat',
        'float',
        (a) => vec4Length(a)
      )
  );
}
