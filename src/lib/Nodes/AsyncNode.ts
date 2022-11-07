import { Engine } from '../Graphs/Execution/Engine.js';
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
    outputSockets: Socket[]
  ) {
    super(description, graph, inputSockets, outputSockets);
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {
    throw new Error('not implemented');
  }

  dispose() {
    throw new Error('not implemented');
  }
}
