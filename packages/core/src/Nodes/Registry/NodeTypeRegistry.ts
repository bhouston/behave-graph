import { IHasNodeFactory, INodeDefinition } from '../NodeDefinitions';

type NodeDefinition = IHasNodeFactory &
  Pick<INodeDefinition, 'typeName' | 'otherTypeNames'>;

export class NodeTypeRegistry {
  private readonly typeNameToNodeDescriptions: {
    [type: string]: NodeDefinition;
  } = {};

  clear() {
    for (const nodeTypeName in this.typeNameToNodeDescriptions) {
      delete this.typeNameToNodeDescriptions[nodeTypeName];
    }
  }
  register(...descriptions: Array<NodeDefinition>) {
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
  get(typeName: string): NodeDefinition {
    if (!(typeName in this.typeNameToNodeDescriptions)) {
      throw new Error(`no registered node with type name ${typeName}`);
    }
    return this.typeNameToNodeDescriptions[typeName];
  }

  getAllNames(): string[] {
    return Object.keys(this.typeNameToNodeDescriptions);
  }

  getAllDescriptions(): NodeDefinition[] {
    return Object.values(this.typeNameToNodeDescriptions);
  }
}
