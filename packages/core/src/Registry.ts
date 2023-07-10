import { NodeDefinitionsMap } from './Nodes/Registry/NodeDefinitionsMap.js';
import { ValueTypeMap } from './Values/ValueTypeMap.js';

export interface IRegistry {
  readonly values: ValueTypeMap;
  readonly nodes: NodeDefinitionsMap;
}
