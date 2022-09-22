import AbstractionRegistry from './Abstractions/AbstractionRegistry';
import NodeTypeRegistry from './Nodes/NodeTypeRegistry';
import ValueTypeRegistry from './Values/ValueTypeRegistry';

export default class Registry {
  public readonly abstractions = new AbstractionRegistry();
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
};
