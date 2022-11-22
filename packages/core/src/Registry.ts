import { NodeTypeRegistry } from './Nodes/Registry/NodeTypeRegistry';
import { ValueTypeRegistry } from './Values/ValueTypeRegistry';

export class Registry {
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
}
