import { Graph } from '../../Graphs/Graph';
import { Node, NodeConfiguration } from './../Node';
import { NodeCategory } from './NodeCategory';

export type NodeFactory = (
  entry: NodeDescription,
  graph: Graph,
  config: NodeConfiguration
) => Node;

export type NodeConfigurationDescription = {
  [key: string]: {
    valueType: string;
    defaultValue?: any;
  };
};

export function getNodeDescriptions(importWildcard: any) {
  return Object.keys(importWildcard)
    .map((key) => (importWildcard as { [key: string]: any })[key])
    .filter((value) => value instanceof NodeDescription) as NodeDescription[];
}

export class NodeDescription {
  constructor(
    public readonly typeName: string,
    public readonly category: NodeCategory | string,
    public readonly label: string = '',
    public readonly factory: NodeFactory,
    public readonly otherTypeNames: string[] = [],
    public readonly helpDescription: string = '',
    public readonly configuration: NodeConfigurationDescription = {}
  ) {}
}

export class NodeDescription2 extends NodeDescription {
  constructor(
    public properties: {
      typeName: string;
      category: NodeCategory | string;
      label?: string;
      configuration?: NodeConfigurationDescription;
      factory: NodeFactory;
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
