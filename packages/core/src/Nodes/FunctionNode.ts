import { Assert } from '../Diagnostics/Assert';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { NodeDescription } from './Registry/NodeDescription';

export class FunctionNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    public readonly exec: () => void,
    configuration: NodeConfiguration = {}
  ) {
    super(description, graph, inputs, outputs, configuration);

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
  constructor(props: {
    description: NodeDescription;
    graph: Graph;
    inputs?: Socket[];
    outputs?: Socket[];
    exec: () => void;
  }) {
    super(
      props.description,
      props.graph,
      props.inputs,
      props.outputs,
      props.exec
    );
  }
}
