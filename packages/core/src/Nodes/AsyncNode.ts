import { Assert } from '../Diagnostics/Assert';
import { Engine } from '../Execution/Engine';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node } from './Node';
import { NodeDescription } from './Registry/NodeDescription';

// async flow node with only a single flow input
export class AsyncNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[],
    outputSockets: Socket[]
  ) {
    super(description, graph, inputSockets, outputSockets);
    // must have at least one input flow socket
    Assert.mustBeTrue(
      this.inputSockets.some((socket) => socket.valueTypeName === 'flow')
    );

    // must have at least one output flow socket
    Assert.mustBeTrue(
      this.outputSockets.some((socket) => socket.valueTypeName === 'flow')
    );
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
