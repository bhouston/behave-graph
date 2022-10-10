import { Assert } from '../Diagnostics/Assert.js';
import { generateUuid } from '../generateUuid.js';
import { Node } from './Node.js';

export class NodeTypeRegistry {
  private readonly nodeTypeNameToNodeFactory: { [key: string]: () => Node } =
    {};

  register(nodeTypeName: string, nodeTypeFactory: () => Node) {
    if (this.nodeTypeNameToNodeFactory[nodeTypeName] !== undefined) {
      throw new Error(`already registered node type ${nodeTypeName}`);
    }
    this.nodeTypeNameToNodeFactory[nodeTypeName] = nodeTypeFactory;
  }

  create(nodeTypeName: string, nodeId = generateUuid()): Node {
    const factory = this.nodeTypeNameToNodeFactory[nodeTypeName];
    if (factory === undefined) {
      throw new Error(`no registered node with type name ${nodeTypeName}`);
    }
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
