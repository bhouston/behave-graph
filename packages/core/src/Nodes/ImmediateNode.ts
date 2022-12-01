import { Assert } from '../Diagnostics/Assert';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node } from './Node';
import { NodeDescription } from './Registry/NodeDescription';

export class ImmediateNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSockets: Socket[] = [],
    outputSockets: Socket[] = [],
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

export class ImmediateNode2 extends ImmediateNode {
  constructor(properties: {
    description: NodeDescription;
    graph: Graph;
    inputSockets?: Socket[];
    outputSockets?: Socket[];
    exec: () => void;
  }) {
    super(
      properties.description,
      properties.graph,
      properties.inputSockets,
      properties.outputSockets,
      properties.exec
    );
  }
}
