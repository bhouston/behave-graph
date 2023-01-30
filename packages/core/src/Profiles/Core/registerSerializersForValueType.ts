import { makeFunctionDesc } from '../../Nodes/FunctionNode';
import { IRegistry } from '../../Registry';
import { toCamelCase } from '../../toCamelCase';

export function registerSerializersForValueType(
  registry: Pick<IRegistry, 'nodes' | 'values'>,
  valueTypeName: string
) {
  const camelCaseValueTypeName = toCamelCase(valueTypeName);
  registry.nodes.register(
    makeFunctionDesc({
      name: `math/to${camelCaseValueTypeName}/string`,
      label: `To ${camelCaseValueTypeName}`,
      in: ['string'],
      out: valueTypeName,
      exec: (a: string) => registry.values.get(valueTypeName).deserialize(a)
    }),
    makeFunctionDesc({
      name: `math/toString/${valueTypeName}`,
      label: 'To String',
      in: [valueTypeName],
      out: 'string',
      exec: (a: any) => registry.values.get(valueTypeName).serialize(a)
    })
  );
}
