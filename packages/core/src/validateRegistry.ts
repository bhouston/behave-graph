import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry.js';
import { IRegistry } from './Registry.js';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry.js';

export function validateRegistry({
  nodes,
  values,
  dependencies
}: IRegistry): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateValueRegistry(values),
    ...validateNodeRegistry({ nodes, values, dependencies })
  );
  return errorList;
}
