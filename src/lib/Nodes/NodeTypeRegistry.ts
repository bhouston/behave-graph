import { NodeDescription } from './NodeDescription.js';

export class NodeTypeRegistry {
  private readonly typeNameToNodeDescriptions: {
    [type: string]: NodeDescription;
  } = {};

  register(nodeDescription: NodeDescription) {
    if (nodeDescription.typeName in this.typeNameToNodeDescriptions) {
      throw new Error(
        `already registered node type ${nodeDescription.typeName} (string)`
      );
    }
    this.typeNameToNodeDescriptions[nodeDescription.typeName] = nodeDescription;
  }

  get(typeName: string): NodeDescription {
    if (!(typeName in this.typeNameToNodeDescriptions)) {
      throw new Error(`no registered node with type name ${typeName}`);
    }
    return this.typeNameToNodeDescriptions[typeName];
  }

  getAllNames(): string[] {
    return Object.keys(this.typeNameToNodeDescriptions);
  }
}
