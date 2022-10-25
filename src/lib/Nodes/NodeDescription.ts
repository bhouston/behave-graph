import { Graph } from '../Graphs/Graph.js';
import { Node } from './Node.js';
import { NodeCategory } from './NodeCategory.js';

export type NodeFactory = (entry: NodeDescription, graph: Graph) => Node;

export class NodeDescription {
  constructor(
    public readonly typeName: string,
    public readonly category: NodeCategory,
    public readonly label: string,
    public readonly factory: NodeFactory
  ) {}
}
