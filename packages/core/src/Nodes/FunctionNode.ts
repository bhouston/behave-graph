import { Assert } from '../Diagnostics/Assert';
import { Graph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { Node, NodeConfiguration } from './Node';
import {
  makeFunctionNodeDefinition,
  NodeCategory,
  SocketListDefinition,
  SocketsList
} from './NodeDefinition';
import { IFunctionNode, INode, NodeType } from './NodeInstance';
import { NodeDescription } from './Registry/NodeDescription';

export class FunctionNode
  extends Node<NodeType.Function>
  implements IFunctionNode
{
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputs: Socket[] = [],
    outputs: Socket[] = [],
    public readonly exec: (node: INode) => void,
    configuration: NodeConfiguration = {}
  ) {
    super(
      description,
      graph,
      inputs,
      outputs,
      configuration,
      NodeType.Function
    );

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

function makeSocketsList(
  sockets: (string | { [key: string]: string })[] | undefined,
  getKey: (index: number) => string
): SocketsList {
  if (!sockets || sockets.length === 0) return [];

  return sockets.map((x, i): SocketListDefinition => {
    if (typeof x === 'string') {
      return {
        key: getKey(i),
        valueType: x
      };
    }
    return {
      key: Object.keys(x)[0],
      valueType: x[Object.keys(x)[0]]
    };
  });
}

export function makeInNOutFunctionDesc({
  in: inputs,
  out,
  exec,
  category,
  ...rest
}: {
  name: string;
  label: string;
  aliases?: string[];
  in?: (string | { [key: string]: string })[];
  out: (string | { [key: string]: string })[] | string;
  category?: NodeCategory;
  exec: (...args: any[]) => any;
}) {
  const inputSockets = makeSocketsList(inputs, getAlphabeticalKey);
  const outputKeyFunc =
    typeof out === 'string' || out.length > 1
      ? () => 'result'
      : getAlphabeticalKey;
  const outputSockets = makeSocketsList([...out], outputKeyFunc);

  const definition = makeFunctionNodeDefinition({
    typeName: rest.name,
    label: rest.label,
    in: () => inputSockets,
    out: () => outputSockets,
    category,
    exec: ({ read, write }) => {
      const args = inputSockets.map(({ key }) => read(key));
      const results = exec(...args);
      if (outputSockets.length === 1 && outputSockets[0].key === 'result') {
        write('result', results);
      } else {
        outputSockets.forEach(({ key }) => {
          write(key, results[key]);
        });
      }
    }
  });

  return definition;
}
