/* eslint-disable max-len */

import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { Registry } from '../../Registry.js';

export function registerIntegerValue(registry: Registry) {
  const { nodes, values } = registry;

  nodes.register(
    'logic/integer',
    () =>
      new In1Out1FuncNode<bigint, bigint>(
        'logic/integer',
        'integer',
        'integer',
        (a) => a
      )
  );

  nodes.register(
    'logic/add/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/add/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/subtract/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/subtract/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/multiply/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/multiply/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/divide/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/divide/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/negate/integer',
    () =>
      new In1Out1FuncNode<bigint, bigint>(
        'logic/negate/integer',
        'integer',
        'integer',
        (a) => -a
      )
  );
  nodes.register(
    'logic/modulus/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/modulus/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a % b
      )
  );
  nodes.register(
    'logic/toFloat/integer',
    () =>
      new In1Out1FuncNode<bigint, number>(
        'logic/toFloat/integer',
        'integer',
        'float',
        (a) => Number(a)
      )
  );

  // logic: ranges
  nodes.register(
    'logic/min/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/min/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? b : a)
      )
  );
  nodes.register(
    'logic/max/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/max/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? a : b)
      )
  );

  // logic: comparison

  nodes.register(
    'logic/equal/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/equal/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/greaterThan/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/greaterThan/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/greaterThaOrEqual/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/greaterThaOrEqual/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/lessThan/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/lessThan/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/lessThaOrEqual/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/lessThaOrEqual/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a <= b
      )
  );

  return registry;
}
