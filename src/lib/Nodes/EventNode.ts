import { Fiber } from '../Graphs/Execution/Fiber.js';
import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { CancelCallback, FinishedCallback } from './AsyncNode.js';
import { Node } from './Node.js';
import { NodeDescription } from './Registry/NodeDescription.js';

// no flow inputs, always evaluated on startup
export class EventNode extends Node {
  public readonly evaluateOnStartup = true;
  public readonly interruptibleAsync = true;

  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[],
    outputSockets: Socket[],
    public readonly exec: (
      context: Fiber,
      finished: FinishedCallback
    ) => CancelCallback
  ) {
    super(description, graph, inputSockets, outputSockets);
  }
}
