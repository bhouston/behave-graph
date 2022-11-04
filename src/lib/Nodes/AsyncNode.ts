import { Fiber } from '../Graphs/Execution/Fiber.js';
import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { Node } from './Node.js';
import { NodeDescription } from './Registry/NodeDescription.js';

export type FinishedCallback = () => void;
export type CancelCallback = () => void;

// async flow node with only a single flow input
export class AsyncNode extends Node {
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
