import { DependenciesRegistry } from './Nodes/Registry/DependenciesRegistry.js';
import { NodeTypeRegistry } from './Nodes/Registry/NodeTypeRegistry.js';
import { ValueTypeRegistry } from './Values/ValueTypeRegistry.js';

export interface IRegistry {
  readonly values: ValueTypeRegistry;
  readonly nodes: NodeTypeRegistry;
  readonly dependencies: DependenciesRegistry;
}

export class Registry implements IRegistry {
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
  public readonly dependencies = new DependenciesRegistry();
}
