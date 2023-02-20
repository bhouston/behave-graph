import { NodeTypeRegistry } from './Nodes/Registry/NodeTypeRegistry';
import { ValueTypeRegistry } from './Values/ValueTypeRegistry';

export interface IRegistry {
  readonly values: ValueTypeRegistry;
  readonly nodes: NodeTypeRegistry;
}

export const createRegistry: () => IRegistry = () => ({
  values: new ValueTypeRegistry(),
  nodes: new NodeTypeRegistry()
});

// Deprecated: use createRegistry
export class Registry implements IRegistry {
  public readonly values: ValueTypeRegistry;
  public readonly nodes: NodeTypeRegistry;

  constructor() {
    this.values = new ValueTypeRegistry();
    this.nodes = new NodeTypeRegistry();
  }
}
