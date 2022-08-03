import Node from '../Nodes/Node';
import { NodeFactory } from '../Nodes/NodeFactory';

export default class GraphTypeRegistry {
  public nodeTypeNameToNodeFactory = new Map<string, NodeFactory>();

  constructor() {
  }

  registerNodeType(nodeTypeName: string, nodeTypeFactory: NodeFactory) {
    if (this.nodeTypeNameToNodeFactory.get(nodeTypeName) !== undefined) {
      throw new Error(`already registered node type ${nodeTypeName}`);
    }
    this.nodeTypeNameToNodeFactory.set(nodeTypeName, nodeTypeFactory);
  }

  createNode(nodeTypeName: string): Node {
    const factory = this.nodeTypeNameToNodeFactory.get(nodeTypeName);
    if (factory === undefined) {
      throw new Error(`no registered node with type name ${nodeTypeName}`);
    }
    return factory();
  }
}
