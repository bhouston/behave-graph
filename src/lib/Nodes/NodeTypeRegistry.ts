import { NodeDescription } from './NodeDescription.js';

export class NodeTypeRegistry {
  private readonly typeNameToNodeDescriptions: {
    [type: string]: NodeDescription;
  } = {};

  register(description: NodeDescription) {
    if (description.typeName in this.typeNameToNodeDescriptions) {
      throw new Error(
        `already registered node type ${description.typeName} (string)`
      );
    }
    this.typeNameToNodeDescriptions[description.typeName] = description;
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
