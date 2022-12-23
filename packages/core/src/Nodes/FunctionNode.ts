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

export class FunctionDesc extends NodeDescription {
  constructor(props: {
    name: string;
    label?: string;
    aliases?: string[];
    in?: { [name: string]: string } | string[];
    out: { [name: string]: string } | string;
    exec: (...args: any[]) => any;
  }) {
    const alpha = 'abcdefghijklmnop';
    let inMap: { [name: string]: string } = {};
    if (Array.isArray(props.in)) {
      props.in.forEach((value, index) => {
        inMap[alpha[index]] = value;
      });
    } else if (props.in !== undefined) {
      inMap = props.in;
    }
    const outMap =
      typeof props.out === 'string' ? { result: props.out } : props.out;
    super(
      props.name,
      'Logic',
      props.label ?? props.name,
      (description, graph) => {
        return new FunctionNode(
          description,
          graph,
          Object.keys(inMap).map((inKey) => new Socket(inMap[inKey], inKey)),
          Object.keys(outMap).map(
            (outKey) => new Socket(outMap[outKey], outKey)
          ),
          props.exec
        );
      },
      props.aliases
    );
  }
}
