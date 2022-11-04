import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { AsyncNode } from './AsyncNode.js';
import { NodeEvalContext } from './NodeEvalContext.js';
import { NodeDescription } from './Registry/NodeDescription.js';

// async flow node with more than one flow input
export class RentrantNode extends AsyncNode {
  public cachedContext: NodeEvalContext | undefined = undefined;

  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[],
    outputSockets: Socket[],
    flowEvalFunc: (context: NodeEvalContext) => void
  ) {
    super(description, graph, inputSockets, outputSockets, flowEvalFunc);
  }
}
