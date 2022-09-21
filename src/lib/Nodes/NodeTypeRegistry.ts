import Debug from '../Debug';
import generateUuid from '../generateUuid';
import Node from './Node';
import { NodeFactory } from './NodeFactory';

export default class NodeTypeRegistry {
  public readonly nodeTypeNameToNodeFactory = new Map<string, NodeFactory>();

  constructor() {
  }

  register(nodeTypeName: string, nodeTypeFactory: NodeFactory) {
    if (this.nodeTypeNameToNodeFactory.get(nodeTypeName) !== undefined) {
      throw new Error(`already registered node type ${nodeTypeName}`);
    }
    this.nodeTypeNameToNodeFactory.set(nodeTypeName, nodeTypeFactory);
  }

  create(nodeTypeName: string, nodeId = generateUuid()): Node {
    const factory = this.nodeTypeNameToNodeFactory.get(nodeTypeName);
    if (factory === undefined) {
      throw new Error(`no registered node with type name ${nodeTypeName}`);
    }
    const node = factory();
    node.id = nodeId;
    Debug.asset(node.typeName === nodeTypeName);
    return node;
  }
}
