import { IGraph } from '../../Graphs/Graph.js';
import {
  IHasNodeFactory,
  INodeDefinition,
  NodeFactory
} from '../NodeDefinitions.js';
import { INode } from '../NodeInstance.js';
import { NodeConfiguration } from './../Node.js';
import { NodeCategory } from './NodeCategory.js';

export type NodeConfigurationDescription = {
  [key: string]: {
    valueType: string;
    defaultValue?: any;
  };
};

export function getNodeDescriptions(importWildcard: {
  [key: string]: INodeDefinition;
}): INodeDefinition[] {
  return Object.values(importWildcard) as INodeDefinition[];
}

export interface INodeDescription {
  readonly typeName: string;
  readonly category: NodeCategory | string;
  readonly label: string;
  readonly otherTypeNames: string[];
  readonly helpDescription: string;
  readonly configuration: NodeConfigurationDescription;
}

export type NodeFactoryWithDescription = (
  entry: NodeDescription,
  graph: IGraph,
  config: NodeConfiguration
) => INode;

export class NodeDescription implements INodeDescription, IHasNodeFactory {
  nodeFactory: NodeFactory;

  constructor(
    public readonly typeName: string,
    public readonly category: NodeCategory | string,
    public readonly label: string = '',
    factory: NodeFactoryWithDescription,
    public readonly otherTypeNames: string[] = [],
    public readonly helpDescription: string = '',

    public readonly configuration: NodeConfigurationDescription = {}
  ) {
    this.nodeFactory = (graph, config) => factory(this, graph, config);
  }
}

export class NodeDescription2 extends NodeDescription {
  constructor(
    public properties: {
      typeName: string;
      category: NodeCategory | string;
      label?: string;
      configuration?: NodeConfigurationDescription;
      factory: NodeFactoryWithDescription;
      otherTypeNames?: string[];
      helpDescription?: string;
    }
  ) {
    super(
      properties.typeName,
      properties.category,
      properties.label,
      properties.factory,
      properties.otherTypeNames,
      properties.helpDescription,
      properties.configuration
    );
  }
}
