import NodeTypeRegistry from '../Nodes/NodeTypeRegistry';
import ValueTypeRegistry from '../Values/ValueTypeRegistry';

export default class GraphRegistry {
  public values = new ValueTypeRegistry();
  public nodes = new NodeTypeRegistry();
};

