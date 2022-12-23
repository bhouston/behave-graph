import { Assert } from '../Diagnostics/Assert';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import { NodeCategory } from './Registry/NodeCategory';
import { NodeDescription } from './Registry/NodeDescription';

export class FunctionNode extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    public readonly exec: (node: Node) => void,
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
    category?: NodeCategory;
    aliases?: string[];
    in?: { [name: string]: string }[] | string[];
    out: { [name: string]: string }[] | string;
    exec: (...args: any[]) => any;
  }) {
    const alpha = 'abcdefghijklmnop';
    const inSocketKeys: string[] = [];
    const inSocketSpecs: { [name: string]: string } = {};

    const in2 = props.in ?? [];
    in2.forEach((inElement, index) => {
      if (typeof inElement === 'string') {
        inSocketSpecs[alpha[index]] = inElement;
        inSocketKeys.push(alpha[index]);
      } else {
        const inElementKeys = Object.keys(inElement);
        Assert.mustEqual(inElementKeys.length, 1);
        inSocketSpecs[inElementKeys[0]] = inElement[inElementKeys[0]];
        inSocketKeys.push(inElementKeys[0]);
      }
    });

    const outSocketSpecs: { [name: string]: string } = {};
    const outSocketKeys: string[] = [];

    const out2 =
      typeof props.out === 'string' ? [{ result: props.out }] : props.out;
    out2.forEach((outElement) => {
      const outElementKeys = Object.keys(outElement);
      Assert.mustEqual(outElementKeys.length, 1);
      outSocketSpecs[outElementKeys[0]] = outElement[outElementKeys[0]];
      outSocketKeys.push(outElementKeys[0]);
    });

    super(
      props.name,
      'Logic',
      props.label ?? props.name,
      (description, graph) => {
        return new FunctionNode(
          description,
          graph,
          inSocketKeys.map((inKey) => new Socket(inSocketSpecs[inKey], inKey)),
          outSocketKeys.map(
            (outKey) => new Socket(outSocketSpecs[outKey], outKey)
          ),
          (node) => {
            const args = inSocketKeys.map((inKey) => node.readInput(inKey));
            const results = props.exec(...args);
            if (outSocketKeys.length === 1 && outSocketKeys[0] === 'result') {
              node.writeOutput('result', results);
            } else {
              outSocketKeys.forEach((outKey) => {
                node.writeOutput(outKey, results[outKey]);
              });
            }
          }
        );
      },
      props.aliases
    );
  }
}
