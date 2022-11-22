import { NodeDescription } from './NodeDescription';

export class NodeTypeRegistry {
  private readonly typeNameToNodeDescriptions: {
    [type: string]: NodeDescription;
  } = {};

  clear() {
    for (const nodeTypeName in this.typeNameToNodeDescriptions) {
      delete this.typeNameToNodeDescriptions[nodeTypeName];
    }
  }
  register(...descriptions: Array<NodeDescription>) {
    descriptions.forEach((description) => {
      if (description.typeName in this.typeNameToNodeDescriptions) {
        throw new Error(
          `already registered node type ${description.typeName} (string)`
        );
      }
      this.typeNameToNodeDescriptions[description.typeName] = description;
    });
  }

  contains(typeName: string): boolean {
    return typeName in this.typeNameToNodeDescriptions;
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

  getAllDescriptions(): NodeDescription[] {
    return Object.values(this.typeNameToNodeDescriptions);
  }
}
