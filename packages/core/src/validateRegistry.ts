import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry.js';
import { IRegistry } from './Registry.js';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry.js';

export function validateRegistry(registry: IRegistry): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateValueRegistry(registry.values),
    ...validateNodeRegistry(registry)
  );
  return errorList;
}
