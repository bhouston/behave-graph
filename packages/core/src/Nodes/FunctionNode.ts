import { Assert } from '../Diagnostics/Assert';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node } from './Node';
import { NodeDescription } from './Registry/NodeDescription';

export class FunctionNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    public readonly exec: () => void
  ) {
    super(description, graph, inputs, outputs);

    // must have no input flow sockets
    Assert.mustBeTrue(
      !this.inputs.some((socket) => socket.valueTypeName === 'flow')
    );

    // must have no output flow sockets
    Assert.mustBeTrue(
      !this.outputs.some((socket) => socket.valueTypeName === 'flow')
    );
  }
}

export class FunctionNode2 extends FunctionNode {
  constructor(properties: {
    description: NodeDescription;
    graph: Graph;
    inputs?: Socket[];
    outputs?: Socket[];
    exec: () => void;
  }) {
    super(
      properties.description,
      properties.graph,
      properties.inputs,
      properties.outputs,
      properties.exec
    );
  }
}
