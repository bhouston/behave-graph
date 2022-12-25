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

const alpha = 'abcdefghijklmnop';
const getAlphabeticalKey = (index: number) => alpha[index];

/** Converts list of sockets specifying value type names to an ordeered list of sockets,
 */
const toOrderedSockets = (
  socketValueTypes: string[] | string | undefined = [],
  getKey: (index: number) => string
) => {
  // const alpha = 'abcdefghijklmnop';

  return [...socketValueTypes].map((socketElement, index) => {
    return new Socket(socketElement, getKey(index));
  });
};

export class FunctionDesc extends NodeDescription {
  constructor({
    in: inputValueTypes,
    out,
    name,
    label,
    aliases,
    exec
  }: {
    name: string;
    label?: string;
    category?: NodeCategory;
    aliases?: string[];
    in?: string[];
    out: string[] | string;
    exec: (...args: any[]) => any;
  }) {
    const inputSockets = toOrderedSockets(inputValueTypes, getAlphabeticalKey);

    // function to get output socket key - if there is only one output, then use 'result' as the key
    // otherwise use alphtabetical keys
    const outputKeyFunc =
      Array.isArray(out) && out.length > 1
        ? () => 'result'
        : getAlphabeticalKey;
    const outputSockets = toOrderedSockets(out, outputKeyFunc);

    super(
      name,
      'Logic',
      label ?? name,
      (description, graph) => {
        return new FunctionNode(
          description,
          graph,
          inputSockets,
          outputSockets,
          (node) => {
            const args = inputSockets.map(({ name }) => node.readInput(name));
            const results = exec(...args);
            if (
              outputSockets.length === 1 &&
              outputSockets[0].name === 'result'
            ) {
              node.writeOutput('result', results);
            } else {
              outputSockets.forEach(({ name }) => {
                node.writeOutput(name, results[name]);
              });
            }
          }
        );
      },
      aliases
    );
  }
}
