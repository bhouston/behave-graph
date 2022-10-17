import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { toCamelCase } from '../../toCamelCase.js';

export function registerSerializersForValueType(
  registry: Registry,
  valueTypeName: string
) {
  registry.nodes.register(
    `logic/to${toCamelCase(valueTypeName)}/string`,
    (graph, nodeType) =>
      new In1Out1FuncNode<string, any>(
        graph,
        nodeType,
        'string',
        valueTypeName,
        (a: string) => registry.values.get(valueTypeName).deserialize(a)
      )
  );
  registry.nodes.register(
    `logic/toString/${valueTypeName}`,
    (graph, nodeType) =>
      new In1Out1FuncNode<any, string>(
        graph,
        nodeType,
        valueTypeName,
        'string',
        (a: any) => registry.values.get(valueTypeName).serialize(a)
      )
  );
}
