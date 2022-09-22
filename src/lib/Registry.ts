import ConnectorRegistry from './Connectors/ConnectorRegistry';
import NodeTypeRegistry from './Nodes/NodeTypeRegistry';
import ValueTypeRegistry from './Values/ValueTypeRegistry';

export default class Registry {
  public readonly connectors = new ConnectorRegistry();
  public readonly values = new ValueTypeRegistry();
  public readonly nodes = new NodeTypeRegistry();
};
