import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry.js';
import { Registry } from './Registry.js';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry.js';

export function validateRegistry(registry: Registry): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateValueRegistry(registry),
    ...validateNodeRegistry(registry)
  );
  return errorList;
}
