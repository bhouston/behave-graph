import { NodeDefinitionsMap } from './Nodes/Registry/NodeTypeRegistry';
import { ValueTypeMap } from './Values/ValueTypeRegistry';

export interface IRegistry {
  readonly values: ValueTypeMap;
  readonly nodes: NodeDefinitionsMap;
}
