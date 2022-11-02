import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { Node } from './Node.js';
import { NodeDescription } from './NodeDescription.js';

export class ImmediateNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSocketList: Socket[],
    outputSocketList: Socket[],
    public readonly evalFunc: () => void
  ) {
    super(description, graph, inputSocketList, outputSocketList);
  }
}
