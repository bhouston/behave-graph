import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { Node } from './Node.js';
import { NodeDescription } from './Registry/NodeDescription.js';

export class ImmediateNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[],
    outputSockets: Socket[],
    public readonly exec: () => void
  ) {
    super(description, graph, inputSockets, outputSockets);
  }
}
