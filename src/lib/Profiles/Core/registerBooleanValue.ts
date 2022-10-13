/* eslint-disable max-len */

import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { Registry } from '../../Registry.js';

export function registerBooleanValue(registry: Registry) {
  const { nodes, values } = registry;

  // logic: constants

  nodes.register(
    'logic/boolean',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/boolean',
        'boolean',
        'boolean',
        (a) => a
      )
  );

  // logic: boolean logic

  nodes.register(
    'logic/not/boolean',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/not/boolean',
        'boolean',
        'boolean',
        (a) => !a
      )
  );

  nodes.register(
    'logic/or/boolean',
    () =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        'logic/or/boolean',
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a || b
      )
  );

  nodes.register(
    'logic/and/boolean',
    () =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        'logic/and/boolean',
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a && b
      )
  );

  return registry;
}
