import { Graph } from '../../Graphs/Graph.js';
import { Node } from './../Node.js';
import { NodeCategory } from './NodeCategory.js';

export type NodeFactory = (entry: NodeDescription, graph: Graph) => Node;

export function getNodeDescriptions(importWildcard: any) {
  return Object.keys(importWildcard)
    .map((key) => (importWildcard as { [key: string]: any })[key])
    .filter((value) => value instanceof NodeDescription) as NodeDescription[];
}

export class NodeDescription {
  constructor(
    public readonly typeName: string,
    public readonly category: NodeCategory,
    public readonly label: string,
    public readonly factory: NodeFactory
  ) {}
}
