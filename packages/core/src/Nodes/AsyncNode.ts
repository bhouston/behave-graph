import { Assert } from '../Diagnostics/Assert';
import { Engine } from '../Execution/Engine';
import { IGraphApi } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { NodeCategory } from './NodeDefinition';
import { NodeType } from './NodeInstance';
import { NodeDescription } from './Registry/NodeDescription';

// async flow node with only a single flow input
export class AsyncNode extends Node<NodeType.Async> {
  constructor(
    description: NodeDescription,
    graph: IGraphApi,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    configuration: NodeConfiguration = {}
  ) {
    super({
      description: {
        ...description,
        category: description.category as NodeCategory
      },
      inputs,
      outputs,
      graph,
      nodeType: NodeType.Async,
      configuration
    });

    // must have at least one input flow socket
    Assert.mustBeTrue(
      this.inputs.some((socket) => socket.valueTypeName === 'flow')
    );

    // must have at least one output flow socket
    Assert.mustBeTrue(
      this.outputs.some((socket) => socket.valueTypeName === 'flow')
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

export class AsyncNode2 extends AsyncNode {
  constructor(props: {
    description: NodeDescription;
    graph: IGraphApi;
    inputs?: Socket[];
    outputs?: Socket[];
  }) {
    super(props.description, props.graph, props.inputs, props.outputs);
  }
}
