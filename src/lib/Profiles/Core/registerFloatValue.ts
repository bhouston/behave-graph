/* eslint-disable max-len */

import { In0Out1FuncNode } from '../../Nodes/Templates/In0Out1FuncNode.js';
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { Registry } from '../../Registry.js';

export function registerFloatValue(registry: Registry) {
  const { nodes, values } = registry;

  nodes.register(
    'logic/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/float',
        'float',
        'float',
        (a) => a
      )
  );

  nodes.register(
    'logic/add/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/add/float',
        'float',
        'float',
        'float',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/subtract/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/subtract/float',
        'float',
        'float',
        'float',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/multiply/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/multiply/float',
        'float',
        'float',
        'float',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/divide/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/divide/float',
        'float',
        'float',
        'float',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/pow/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/pow/float',
        'float',
        'float',
        'float',
        (a, b) => a ** b
      )
  );
  nodes.register(
    'logic/negate/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/negate/float',
        'float',
        'float',
        (a) => -a
      )
  );
  nodes.register(
    'logic/sqrt/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/sqrt/float',
        'float',
        'float',
        (a) => Math.sqrt(a)
      )
  );
  nodes.register(
    'logic/modulus/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/modulus/float',
        'float',
        'float',
        'float',
        (a, b) => a % b
      )
  );

  // logic: exponential

  nodes.register(
    'logic/E/float',
    () => new In0Out1FuncNode<number>('logic/E/float', 'float', () => Math.E)
  );
  nodes.register(
    'logic/exp/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/exp/float',
        'float',
        'float',
        (a) => Math.exp(a)
      )
  );
  nodes.register(
    'logic/log/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/log/float',
        'float',
        'float',
        (a) => Math.log(a)
      )
  );
  nodes.register(
    'logic/log2/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/log2/float',
        'float',
        'float',
        (a) => Math.log2(a)
      )
  );
  nodes.register(
    'logic/log10/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/log10/float',
        'float',
        'float',
        (a) => Math.log10(a)
      )
  );

  // logic: trigonometry

  nodes.register(
    'logic/PI/float',
    () => new In0Out1FuncNode<number>('logic/PI/float', 'float', () => Math.PI)
  );
  nodes.register(
    'logic/sin/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/sin/float',
        'float',
        'float',
        (a) => Math.sin(a)
      )
  );
  nodes.register(
    'logic/asin/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/asin/float',
        'float',
        'float',
        (a) => Math.asin(a)
      )
  );
  nodes.register(
    'logic/cos/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/cos/float',
        'float',
        'float',
        (a) => Math.cos(a)
      )
  );
  nodes.register(
    'logic/acos/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/acos/float',
        'float',
        'float',
        (a) => Math.acos(a)
      )
  );
  nodes.register(
    'logic/tan/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/tan/float',
        'float',
        'float',
        (a) => Math.tan(a)
      )
  );
  nodes.register(
    'logic/atan/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/atan/float',
        'float',
        'float',
        (a) => Math.atan(a)
      )
  );

  nodes.register(
    'logic/min/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/min/float',
        'float',
        'float',
        'float',
        (a, b) => Math.min(a, b)
      )
  );
  nodes.register(
    'logic/max/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/max/float',
        'float',
        'float',
        'float',
        (a, b) => Math.max(a, b)
      )
  );
  nodes.register(
    'logic/sign/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/sign/float',
        'float',
        'integer',
        (a) => BigInt(Math.sign(a))
      )
  );
  nodes.register(
    'logic/abs/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/abs/float',
        'float',
        'float',
        (a) => Math.abs(a)
      )
  );
  nodes.register(
    'logic/floor/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floor/float',
        'float',
        'integer',
        (a) => BigInt(Math.floor(a))
      )
  );
  nodes.register(
    'logic/ceil/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/ceil/float',
        'float',
        'integer',
        (a) => BigInt(Math.ceil(a))
      )
  );
  nodes.register(
    'logic/round/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/round/float',
        'float',
        'integer',
        (a) => BigInt(Math.round(a))
      )
  );
  nodes.register(
    'logic/trunc/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/trunc/float',
        'float',
        'integer',
        (a) => BigInt(Math.trunc(a))
      )
  );

  // logic: sampling

  nodes.register(
    'logic/sample/float',
    () =>
      new In0Out1FuncNode<number>('logic/sample/float', 'float', () =>
        Math.random()
      )
  );

  // logic: comparison

  nodes.register(
    'logic/equal/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/equal/float',
        'float',
        'float',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/greaterThan/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/greaterThan/float',
        'float',
        'float',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/greaterThaOrEqual/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/greaterThaOrEqual/float',
        'float',
        'float',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/lessThan/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/lessThan/float',
        'float',
        'float',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/lessThaOrEqual/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/lessThaOrEqual/float',
        'float',
        'float',
        'boolean',
        (a, b) => a <= b
      )
  );

  nodes.register(
    'logic/isNan/float',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/isNan/float',
        'float',
        'boolean',
        (a) => Number.isNaN(a)
      )
  );
  nodes.register(
    'logic/isInf/float',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/isInf/float',
        'float',
        'boolean',
        (a) => !Number.isFinite(a) && !Number.isNaN(a)
      )
  );

  return registry;
}
