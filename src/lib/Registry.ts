import { NodeTypeRegistry } from './Nodes/NodeTypeRegistry.js';
import { ImplementationRegistry } from './Providers/ImplementationRegistry.js';
import { ValueTypeRegistry } from './Values/ValueTypeRegistry.js';

export class Registry {
  public readonly implementations = new ImplementationRegistry();
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
}
