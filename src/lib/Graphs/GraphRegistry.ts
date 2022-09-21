import NodeTypeRegistry from '../Nodes/NodeTypeRegistry';
import ValueTypeRegistry from '../Values/ValueTypeRegistry';

export default class GraphRegistry {
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
};
