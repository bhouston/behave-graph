import { NodeDefinitionsMap, ValueTypeMap } from '@behave-graph/core';

import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry';

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
