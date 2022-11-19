import { Assert } from '../Diagnostics/Assert.js';
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

    // must have no input flow sockets
    Assert.mustBeTrue(
      !this.inputSockets.some((socket) => socket.valueTypeName === 'flow')
    );

    // must have no output flow sockets
    Assert.mustBeTrue(
      !this.outputSockets.some((socket) => socket.valueTypeName === 'flow')
    );
  }
}
