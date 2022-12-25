import { INodeDefinitionBase } from '../NodeDefinition';

export class NodeTypeRegistry {
  private readonly typeNameToNodeDescriptions: {
    [type: string]: INodeDefinitionBase;
  } = {};

  clear() {
    for (const nodeTypeName in this.typeNameToNodeDescriptions) {
      delete this.typeNameToNodeDescriptions[nodeTypeName];
    }
  }
  register(...descriptions: Array<INodeDefinitionBase>) {
    descriptions.forEach((description) => {
      const allTypeNames = (description.otherTypeNames || []).concat([
        description.typeName
      ]);

      allTypeNames.forEach((typeName) => {
        if (typeName in this.typeNameToNodeDescriptions) {
          throw new Error(`already registered node type ${typeName} (string)`);
        }
        this.typeNameToNodeDescriptions[typeName] = description;
      });
    });
  }

  contains(typeName: string): boolean {
    return typeName in this.typeNameToNodeDescriptions;
  }
  get(typeName: string): INodeDefinitionBase {
    if (!(typeName in this.typeNameToNodeDescriptions)) {
      throw new Error(`no registered node with type name ${typeName}`);
    }
    return this.typeNameToNodeDescriptions[typeName];
  }

  getAllNames(): string[] {
    return Object.keys(this.typeNameToNodeDescriptions);
  }

  getAllDescriptions(): INodeDefinitionBase[] {
    return Object.values(this.typeNameToNodeDescriptions);
  }
}
