import { IHasNodeFactory, INodeDefinitionBase } from '../NodeDefinition';

export type NodeType = IHasNodeFactory &
  Pick<INodeDefinitionBase, 'typeName' | 'otherTypeNames'>;

export class NodeTypeRegistry {
  private readonly typeNameToNodeDescriptions: {
    [type: string]: NodeType;
  } = {};

  clear() {
    for (const nodeTypeName in this.typeNameToNodeDescriptions) {
      delete this.typeNameToNodeDescriptions[nodeTypeName];
    }
  }
  register(...descriptions: Array<NodeType>) {
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
  get(typeName: string): NodeType {
    if (!(typeName in this.typeNameToNodeDescriptions)) {
      throw new Error(`no registered node with type name ${typeName}`);
    }
    return this.typeNameToNodeDescriptions[typeName];
  }

  getAllNames(): string[] {
    return Object.keys(this.typeNameToNodeDescriptions);
  }

  getAllDescriptions(): NodeType[] {
    return Object.values(this.typeNameToNodeDescriptions);
  }
}
