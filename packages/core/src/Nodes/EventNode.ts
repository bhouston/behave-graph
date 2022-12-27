import { Assert } from '../Diagnostics/Assert';
import { Engine } from '../Execution/Engine';
import { IGraph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { NodeType } from './NodeInstance';
import { NodeDescription } from './Registry/NodeDescription';

// no flow inputs, always evaluated on startup
export class EventNode extends Node<NodeType.Event> {
  constructor(
    description: NodeDescription,
    graph: IGraph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    configuration: NodeConfiguration = {}
  ) {
    super(description, graph, inputs, outputs, configuration, NodeType.Event);
    // no input flow sockets allowed.
    Assert.mustBeTrue(
      !this.inputs.some((socket) => socket.valueTypeName === 'flow')
    );

    // must have at least one output flow socket
    Assert.mustBeTrue(
      this.outputs.some((socket) => socket.valueTypeName === 'flow')
    );
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  init(engine: Engine) {
    throw new Error('not implemented');
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  dispose(engine: Engine) {
    throw new Error('not implemented');
  }
}

export class EventNode2 extends EventNode {
  constructor(props: {
    description: NodeDescription;
    graph: IGraph;
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
