import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { FlowNode } from './FlowNode.js';
import { NodeEvalContext } from './NodeEvalContext.js';
import { NodeDescription } from './Registry/NodeDescription.js';

// async flow node with only a single flow input
export class AsyncNode extends FlowNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[],
    outputSockets: Socket[],
    exec: (context: NodeEvalContext) => void
  ) {
    super(description, graph, inputSockets, outputSockets, exec);
  }
}
