import { Assert } from '../Diagnostics/Assert.js';
import { Fiber } from '../Execution/Fiber.js';
import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { Node } from './Node.js';
import { NodeDescription } from './Registry/NodeDescription.js';

export class FlowNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[],
    outputSockets: Socket[]
  ) {
    // determine if this is an eval node
    super(description, graph, inputSockets, outputSockets);

    // must have at least one input flow socket
    Assert.mustBeTrue(
      this.inputSockets.some((socket) => socket.valueTypeName === 'flow')
    );
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  triggered(fiber: Fiber, triggeringSocketName: string) {
    throw new Error('not implemented');
  }
}
