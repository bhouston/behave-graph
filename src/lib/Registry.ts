import NodeTypeRegistry from './Nodes/NodeTypeRegistry';
import ImplementationRegistry from './Providers/ImplementationRegistry';
import ValueTypeRegistry from './Values/ValueTypeRegistry';

export default class Registry {
  public readonly implementations = new ImplementationRegistry();
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
};
