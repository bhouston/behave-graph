import { Assert } from '../Diagnostics/Assert.js';
import { generateUuid } from '../generateUuid.js';
import { Node } from './Node.js';

export class NodeTypeRegistry {
  private readonly nodeTypeNameToNodeFactory: { [key: string]: () => Node } =
    {};

  register(nodeTypeName: string, nodeTypeFactory: () => Node) {
    if (nodeTypeName in this.nodeTypeNameToNodeFactory) {
      throw new Error(`already registered node type ${nodeTypeName}`);
    }
    this.nodeTypeNameToNodeFactory[nodeTypeName] = nodeTypeFactory;
  }

  create(nodeTypeName: string, nodeId = generateUuid()): Node {
    if (!(nodeTypeName in this.nodeTypeNameToNodeFactory)) {
      throw new Error(`no registered node with type name ${nodeTypeName}`);
    }
    const factory = this.nodeTypeNameToNodeFactory[nodeTypeName];
    const node = factory();
    node.id = nodeId;
    Assert.mustBeTrue(
      node.typeName === nodeTypeName,
      `node.typeName: ${node.typeName} must align with registered typeName: ${nodeTypeName}`
    );
    return node;
  }

  getAllNames(): string[] {
    return Object.keys(this.nodeTypeNameToNodeFactory);
  }
}
