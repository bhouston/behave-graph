import { Engine } from '../Graphs/Execution/Engine.js';
import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
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
    outputSockets: Socket[]
  ) {
    super(description, graph, inputSockets, outputSockets);
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  init(engine: Engine): DisposeCallback {
    throw new Error('not implemented');
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispose() {}
}
