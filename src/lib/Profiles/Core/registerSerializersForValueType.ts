/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeDescription } from '../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { toCamelCase } from '../../toCamelCase.js';

export function registerSerializersForValueType(
  registry: Registry,
  valueTypeName: string
) {
  const camelCaseValueTypeName = toCamelCase(valueTypeName);
  registry.nodes.register(
    new NodeDescription(
      `math/to${camelCaseValueTypeName}/string`,
      'Logic',
      `To ${camelCaseValueTypeName}`,
      (graph, nodeType) =>
        new In1Out1FuncNode<string, any>(
          graph,
          nodeType,
          ['string'],
          valueTypeName,
          (a: string) => registry.values.get(valueTypeName).deserialize(a)
        )
    ),
    new NodeDescription(
      `math/toString/${valueTypeName}`,
      'Logic',
      'To String',
      (graph, nodeType) =>
        new In1Out1FuncNode<any, string>(
          graph,
          nodeType,
          [valueTypeName],
          'string',
          (a: any) => registry.values.get(valueTypeName).serialize(a)
        )
    )
  );
}
