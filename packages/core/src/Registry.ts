import { NodeDefinitionsMap } from '../dist/behave-graph-core.cjs';
import { ValueTypeMap } from './Values/ValueTypeRegistry';

export interface IRegistry {
  readonly values: ValueTypeMap;
  readonly nodes: NodeDefinitionsMap;
}
