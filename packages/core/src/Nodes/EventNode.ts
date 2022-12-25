import { Assert } from '../Diagnostics/Assert';
import { Engine } from '../Execution/Engine';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { EventNodeDefinition, SocketsDefinition } from './NodeDefinition';
import { NodeDescription } from './Registry/NodeDescription';

// no flow inputs, always evaluated on startup
export class EventNode extends Node {
  constructor(
    description: NodeDescription,
    // graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    configuration: NodeConfiguration = {}
  ) {
    super(description, inputs, outputs, configuration);
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

type EventNode2Props = {
  description: NodeDescription;
  inputs?: Socket[];
  outputs?: Socket[];
  configuration?: NodeConfiguration;
} & Pick<
  EventNodeDefinition<SocketsDefinition, SocketsDefinition, any>,
  'init' | 'dispose' | 'initialState'
>;

export class EventNode2 extends EventNode {
  private initInner: EventNode2Props['init'];
  private disposeInner: EventNode2Props['dispose'];
  private state: EventNode2Props['initialState'];

  constructor(props: EventNode2Props) {
    super(props.description, props.inputs, props.outputs, props.configuration);

    this.initInner = props.init;
    this.disposeInner = props.dispose;
    this.state = props.initialState;
  }

  init(engine: Engine): any {
    this.state = this.initInner({
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
      commit: (outFlowname, fiberCompletedListener) =>
        engine.commitToNewFiber(this, outFlowname, fiberCompletedListener)
    });
  }

  dispose(): void {
    this.disposeInner({
      state: this.state
    });
  }
}
