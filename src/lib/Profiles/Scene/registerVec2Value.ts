import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../Nodes/Templates/In3Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { ValueType } from '../../Values/ValueType.js';
import { VecCreate } from './Logic/VecCreate.js';
import { VecElements } from './Logic/VecElements.js';
import {
  Vec2,
  vec2Add,
  vec2Dot,
  vec2FromArray,
  Vec2JSON,
  vec2Length,
  vec2Mix,
  vec2Negate,
  vec2Normalize,
  vec2Parse,
  vec2Scale,
  vec2Subtract,
  vec2ToArray,
  vec2ToString
} from './Values/Vec2.js';

export function registerVec2Value(registry: Registry) {
  const { nodes, values } = registry;
  values.register(
    new ValueType(
      'vec2',
      () => new Vec2(),
      (value: string | Vec2JSON) =>
        typeof value === 'string'
          ? vec2Parse(value)
          : new Vec2(value.x, value.y),
      (value) => ({ x: value.x, y: value.y } as Vec2JSON)
    )
  );

  // logic: vec2

  nodes.register(
    'logic/create/vec2',
    () =>
      new VecCreate<Vec2>(
        'logic/create/vec2',
        'vec2',
        ['x', 'y'],
        (elements: number[]) => vec2FromArray(elements)
      )
  );
  nodes.register(
    'logic/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>('logic/vec2', 'vec2', 'vec2', (a) => a)
  );
  nodes.register(
    'logic/elements/vec2',
    () =>
      new VecElements<Vec2>(
        'logic/elements/vec2',
        'vec2',
        ['x', 'y'],
        vec2ToArray
      )
  );

  nodes.register(
    'logic/add/vec2',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        'logic/add/vec2',
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Add(a, b)
      )
  );
  nodes.register(
    'logic/subtract/vec2',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        'logic/subtract/vec2',
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Subtract(a, b)
      )
  );
  nodes.register(
    'logic/scale/vec2',
    () =>
      new In2Out1FuncNode<Vec2, number, Vec2>(
        'logic/scale/vec2',
        'vec2',
        'float',
        'vec2',
        (a, b) => vec2Scale(a, b)
      )
  );
  nodes.register(
    'logic/dot/vec2',
    () =>
      new In2Out1FuncNode<Vec2, Vec2, number>(
        'logic/scale/vec2',
        'vec2',
        'vec2',
        'float',
        (a, b) => vec2Dot(a, b)
      )
  );
  nodes.register(
    'logic/negate/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>(
        'logic/negate/vec2',
        'vec2',
        'vec2',
        (a) => vec2Negate(a)
      )
  );

  nodes.register(
    'logic/mix/vec2',
    () =>
      new In3Out1FuncNode<Vec2, Vec2, number, Vec2>(
        'logic/mix/vec2',
        'vec2',
        'vec2',
        'float',
        'vec2',
        (a, b, c) => vec2Mix(a, b, c)
      )
  );
  nodes.register(
    'logic/normalize/vec2',
    () =>
      new In1Out1FuncNode<Vec2, Vec2>(
        'logic/normalize/vec2',
        'vec2',
        'vec2',
        (a) => vec2Normalize(a)
      )
  );
  nodes.register(
    'logic/length/vec2',
    () =>
      new In1Out1FuncNode<Vec2, number>(
        'logic/length/vec2',
        'vec2',
        'float',
        (a) => vec2Length(a)
      )
  );
  nodes.register(
    'logic/toString/vec2',
    () =>
      new In1Out1FuncNode<Vec2, string>(
        'logic/toString/vec2',
        'vec2',
        'string',
        (a) => vec2ToString(a)
      )
  );
}
