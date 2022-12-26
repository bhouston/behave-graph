import { Assert } from '../Diagnostics/Assert';
import { Fiber } from '../Execution/Fiber';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { NodeType } from './NodeInstance';
import { NodeDescription } from './Registry/NodeDescription';

export class FlowNode extends Node<NodeType.Flow> {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    configuration: NodeConfiguration = {}
  ) {
    // determine if this is an eval node
    super(description, graph, inputs, outputs, configuration, NodeType.Flow);

    // must have at least one input flow socket
    Assert.mustBeTrue(
      this.inputs.some((socket) => socket.valueTypeName === 'flow')
    );
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  triggered(fiber: Fiber, triggeringSocketName: string) {
    throw new Error('not implemented');
  }
}

export class FlowNode2 extends FlowNode {
  constructor(props: {
    description: NodeDescription;
    graph: Graph;
    inputs?: Socket[];
    outputs?: Socket[];
    configuration?: NodeConfiguration;
  }) {
    super(
      props.description,
      props.graph,
      props.inputs,
      props.outputs,
      props.configuration
    );
  }
}
