import { Assert } from '../Diagnostics/Assert';
import { Fiber } from '../Execution/Fiber';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { FlowNodeTriggeredFn } from './NodeDefinition';
import { NodeDescription } from './Registry/NodeDescription';

export class FlowNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    configuration: NodeConfiguration = {}
  ) {
    // determine if this is an eval node
    super(description, graph, inputs, outputs, configuration);

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
  private readonly triggeredInner: FlowNodeTriggeredFn;
  private state: any;
  constructor(props: {
    description: NodeDescription;
    graph: Graph;
    inputs?: Socket[];
    outputs?: Socket[];
    configuration?: NodeConfiguration;
    initialState: any;
    triggered: FlowNodeTriggeredFn;
  }) {
    super(
      props.description,
      props.graph,
      props.inputs,
      props.outputs,
      props.configuration
    );

    this.triggeredInner = props.triggered;
    this.state = props.initialState;
  }

  triggered(fiber: Fiber, triggeringSocketName: string): void {
    this.state = this.triggeredInner({
      commit: (outFlowname, fiberCompletedListener) =>
        fiber.commit(this, outFlowname, fiberCompletedListener),
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
      triggeringSocketName
    });
  }
}
