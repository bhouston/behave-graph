import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { toCamelCase } from '../../toCamelCase.js';

export function registerSerializersForValueType(
  registry: Registry,
  valueTypeName: string
) {
  registry.nodes.register(
    `logic/to${toCamelCase(valueTypeName)}/string`,
    () =>
      new In1Out1FuncNode<string, any>(
        `logic/to${toCamelCase(valueTypeName)}/string`,
        'string',
        valueTypeName,
        (a: string) => registry.values.get(valueTypeName).deserialize(a)
      )
  );
  registry.nodes.register(
    `logic/toString/${valueTypeName}`,
    () =>
      new In1Out1FuncNode<any, string>(
        `logic/toString/${valueTypeName}`,
        valueTypeName,
        'string',
        (a: any) => registry.values.get(valueTypeName).serialize(a)
      )
  );
}
