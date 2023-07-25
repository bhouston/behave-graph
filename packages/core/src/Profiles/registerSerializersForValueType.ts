import { makeInNOutFunctionDesc } from '../Nodes/FunctionNode.js';
import { toCamelCase } from '../toCamelCase.js';
import { ValueTypeMap } from '../Values/ValueTypeMap.js';

export function getStringConversionsForValueType({
  values,
  valueTypeName
}: {
  values: ValueTypeMap;
  valueTypeName: string;
}) {
  const camelCaseValueTypeName = toCamelCase(valueTypeName);
  return [
    makeInNOutFunctionDesc({
      name: `math/to${camelCaseValueTypeName}/string`,
      label: `To ${camelCaseValueTypeName}`,
      in: ['string'],
      out: valueTypeName,
      exec: (a: string) => values[valueTypeName]?.deserialize(a)
    }),
    makeInNOutFunctionDesc({
      name: `math/toString/${valueTypeName}`,
      label: 'To String',
      in: [valueTypeName],
      out: 'string',
      exec: (a: any) => `${values[valueTypeName]?.serialize(a)}`
    })
  ];
}
