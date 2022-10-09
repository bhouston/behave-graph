import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry';
import { Registry } from './Registry';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry';

export function validateRegistry(registry: Registry): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateValueRegistry(registry),
    ...validateNodeRegistry(registry)
  );
  return errorList;
}
