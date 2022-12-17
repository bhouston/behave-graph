/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeDescription } from '../../Nodes/Registry/NodeDescription';
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode';
import { Registry } from '../../Registry';
import { toCamelCase } from '../../toCamelCase';

export function registerSerializersForValueType(
  registry: Registry,
  valueTypeName: string
) {
  const camelCaseValueTypeName = toCamelCase(valueTypeName);
  registry.nodes.register(
    new NodeDescription(
      `math/to${camelCaseValueTypeName}/string`,
      label:    `To ${camelCaseValueTypeName}`,
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
      label:    'To String',
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
