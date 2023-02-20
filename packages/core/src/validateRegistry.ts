import { validateNodeRegistry } from './Nodes/Validation/validateNodeRegistry';
import { IRegistry } from './Registry';
import { validateValueRegistry } from './Values/Validation/validateValueRegistry';

export function validateRegistry(registry: IRegistry): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateValueRegistry(registry),
    ...validateNodeRegistry(registry)
  );
  return errorList;
}
