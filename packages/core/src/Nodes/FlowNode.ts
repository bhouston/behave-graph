import { Assert } from '../Diagnostics/Assert';
import { Fiber } from '../Execution/Fiber';
import { IGraph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { NodeCategory } from './NodeDefinition';
import { IFlowNode, NodeType } from './NodeInstance';
import { NodeDescription } from './Registry/NodeDescription';

export class FlowNode extends Node<NodeType.Flow> implements IFlowNode {
  constructor(
    description: NodeDescription,
    graph: IGraph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    configuration: NodeConfiguration = {}
  ) {
    // determine if this is an eval node
    super({
      description: {
        ...description,
        category: description.category as NodeCategory
      },
      inputs,
      outputs,
      graph,
      configuration,
      nodeType: NodeType.Flow
    });

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
