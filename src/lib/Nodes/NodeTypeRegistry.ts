import Logger from '../Logger';
import { Factory } from '../Factory';
import generateUuid from '../generateUuid';
import Node from './Node';
import Assert from '../Assert';

export default class NodeTypeRegistry {
  private readonly nodeTypeNameToNodeFactory = new Map<string, Factory<Node>>();

  constructor() {
  }

  register(nodeTypeName: string, nodeTypeFactory: Factory<Node>) {
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
    Assert.mustBeTrue(node.typeName === nodeTypeName);
    return node;
  }

  getAllNames() {
    return Object.keys(this.nodeTypeNameToNodeFactory);
  }
}
