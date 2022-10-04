import { NodeTypeRegistry } from './Nodes/NodeTypeRegistry';
import { ImplementationRegistry } from './Providers/ImplementationRegistry';
import { ValueTypeRegistry } from './Values/ValueTypeRegistry';

export class Registry {
  public readonly implementations = new ImplementationRegistry();
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
}
