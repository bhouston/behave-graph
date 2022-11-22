import { Graph } from '../../Graphs/Graph';
import { Node } from './../Node';
import { NodeCategory } from './NodeCategory';

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
