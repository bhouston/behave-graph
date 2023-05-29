import { makeInNOutFunctionDesc } from '../../Nodes/FunctionNode';
import { IRegistry } from '../../Registry';
import { toCamelCase } from '../../toCamelCase';

export function registerSerializersForValueType(
  registry: Pick<IRegistry, 'nodes' | 'values'>,
  valueTypeName: string
) {
  const camelCaseValueTypeName = toCamelCase(valueTypeName);
  registry.nodes.register(
    makeInNOutFunctionDesc({
      name: `math/to${camelCaseValueTypeName}/string`,
      label: `To ${camelCaseValueTypeName}`,
      in: ['string'],
      out: valueTypeName,
      exec: (a: string) => registry.values.get(valueTypeName).deserialize(a)
    }),
    makeInNOutFunctionDesc({
      name: `math/toString/${valueTypeName}`,
      label: 'To String',
      in: [valueTypeName],
      out: 'string',
      exec: (a: any) => {
        const temp = registry.values.get(valueTypeName).serialize(a);
        switch (typeof temp) {
          case 'string':
            return temp;
          case 'number':
            return temp.toString();
          case 'boolean':
            return temp.toString();
          default:
            return JSON.stringify(temp);
        }
      }
    })
  );
}
