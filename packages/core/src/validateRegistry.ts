import { NodeDefinitionsMap } from './Nodes/Registry/NodeDefinitionsMap.js';
import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry.js';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry.js';
import { ValueTypeMap } from './Values/ValueTypeMap.js';

export function validateRegistry({
  nodes,
  values
}: {
  nodes: NodeDefinitionsMap;
  values: ValueTypeMap;
}): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateValueRegistry(values),
    ...validateNodeRegistry({ nodes, values })
  );
  return errorList;
}
