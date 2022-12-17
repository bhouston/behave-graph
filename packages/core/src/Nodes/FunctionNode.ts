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

export class FunctionNodeDesc extends NodeDescription {
  constructor(props: {
    name: string;
    label?: string;
    aliases?: string[];
    in?: { [name: string]: string } | string[];
    out: { [name: string]: string } | string;
    exec: (...args: any[]) => any;
  }) {
    const inMap = props.in ?? {};
    const outMap = props.out;
    super(
      props.name,
      label:    props.label ?? props.name,
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
// only single return value/
export type SimpleFuncSpec = {
  name: string;
  aliases?: string[]; // for backwards compatibility
  keywords?: string[];
  description?: string;
  in: { [name: string]: ValueType };
  out: ValueType; // the value type of the output in this case, not a map.
  exec: (...args: any[]) => any;
};
