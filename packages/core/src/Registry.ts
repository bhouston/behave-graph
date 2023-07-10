import { NodeDefinitionsMap } from './Nodes/Registry/NodeDefinitionsMap.js';
import { ValueTypeMap } from './Values/ValueTypeMap.js';

export interface IRegistry {
  readonly values: ValueTypeMap;
  readonly nodes: NodeDefinitionsMap;
}

export interface IQueryableRegistry<T> {
  get: (id: string) => T | undefined;
  getAll: () => T[];
  getAllNames: () => string[];
  contains: (id: string) => boolean;
}
