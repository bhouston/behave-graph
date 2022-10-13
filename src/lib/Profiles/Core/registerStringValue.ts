/* eslint-disable max-len */

import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { Registry } from '../../Registry.js';

export function registerStringValue(registry: Registry) {
  const { nodes, values } = registry;

  nodes.register(
    'logic/string',
    () =>
      new In1Out1FuncNode<string, string>(
        'logic/string',
        'string',
        'string',
        (a) => a
      )
  );

  // logic: string utilities

  nodes.register(
    'logic/concat/string',
    () =>
      new In2Out1FuncNode<string, string, string>(
        'logic/concat/string',
        'string',
        'string',
        'string',
        (a, b) => a.concat(b)
      )
  );
  nodes.register(
    'logic/includes/string',
    () =>
      new In2Out1FuncNode<string, string, boolean>(
        'logic/includes/string',
        'string',
        'string',
        'boolean',
        (a, b) => a.includes(b)
      )
  );

  // string - number conversion

  nodes.register(
    'logic/length/string',
    () =>
      new In1Out1FuncNode<string, number>(
        'logic/length/string',
        'string',
        'float',
        (a) => a.length
      )
  );

  return registry;
}
