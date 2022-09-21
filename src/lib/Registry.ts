import InterfaceRegistry from './Graphs/Integration/InterfaceRegistry';
import NodeTypeRegistry from './Nodes/NodeTypeRegistry';
import ValueTypeRegistry from './Values/ValueTypeRegistry';

export default class Registry {
  public readonly interfaces = new InterfaceRegistry();
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
};
