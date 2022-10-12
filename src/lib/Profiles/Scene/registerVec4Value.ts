import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { ValueType } from '../../Values/ValueType.js';
import { VecCreate } from './Logic/VecCreate.js';
import { VecElements } from './Logic/VecElements.js';
import {
  Vec4,
  vec4Add,
  vec4Dot,
  vec4FromArray,
  Vec4JSON,
  vec4Length,
  vec4Mix,
  vec4Normalize,
  vec4Parse,
  vec4Scale,
  vec4Subtract,
  vec4ToArray,
  vec4ToString
} from './Values/Vec4.js';

export function registerVec4Value(registry: Registry) {
  const { nodes, values } = registry;

  values.register(
    new ValueType(
      'vec4',
      () => new Vec4(),
      (value: string | Vec4JSON) =>
        typeof value === 'string'
          ? vec4Parse(value)
          : new Vec4(value.x, value.y, value.z, value.w),
      (value) =>
        ({ x: value.x, y: value.y, z: value.z, w: value.w } as Vec4JSON)
    )
  );

  // logic: vec4

  nodes.register(
    'logic/create/vec4',
    () =>
      new VecCreate<Vec4>(
        'logic/create/vec4',
        'vec4',
        ['x', 'y', 'z', 'w'],
        (elements: number[]) => vec4FromArray(elements)
      )
  );
  nodes.register(
    'logic/vec4',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>('logic/vec4', 'vec4', 'vec4', (a) => a)
  );
  nodes.register(
    'logic/elements/vec4',
    () =>
      new VecElements<Vec4>(
        'logic/elements/vec4',
        'vec4',
        ['x', 'y', 'z', 'w'],
        vec4ToArray
      )
  );

  nodes.register(
    'logic/scale/vec4',
    () =>
      new In2Out1FuncNode<Vec4, number, Vec4>(
        'logic/scale/vec4',
        'vec4',
        'float',
        'vec4',
        (a, b) => vec4Scale(a, b)
      )
  );

  nodes.register(
    'logic/subtract/vec4',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/subtract/vec4',
        'vec4',
        'vec4',
        'vec4',
        (a, b) => vec4Subtract(a, b)
      )
  );

  nodes.register(
    'logic/add/vec4',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, Vec4>(
        'logic/add/vec4',
        'vec4',
        'vec4',
        'vec4',
        (a, b) => vec4Add(a, b)
      )
  );
  nodes.register(
    'logic/mix/vec4',
    () =>
      new In3Out1FuncNode<Vec4, Vec4, number, Vec4>(
        'logic/mix/vec4',
        'vec4',
        'vec4',
        'float',
        'vec4',
        (a, b, c) => vec4Mix(a, b, c)
      )
  );
  nodes.register(
    'logic/dot/vec4',
    () =>
      new In2Out1FuncNode<Vec4, Vec4, number>(
        'logic/dot/vec4',
        'vec4',
        'vec4',
        'float',
        (a, b) => vec4Dot(a, b)
      )
  );
  nodes.register(
    'logic/normalize/vec4',
    () =>
      new In1Out1FuncNode<Vec4, Vec4>(
        'logic/normalize/vec4',
        'vec4',
        'vec4',
        (a) => vec4Normalize(a)
      )
  );
  nodes.register(
    'logic/length/vec4',
    () =>
      new In1Out1FuncNode<Vec4, number>(
        'logic/length/vec4',
        'vec4',
        'float',
        (a) => vec4Length(a)
      )
  );
  nodes.register(
    'logic/toString/vec4',
    () =>
      new In1Out1FuncNode<Vec4, string>(
        'logic/toString/vec4',
        'vec4',
        'string',
        (a) => vec4ToString(a)
      )
  );
}
