import { Graph } from '../Graphs/Graph';
import { Metadata } from '../Metadata';
import { Socket } from '../Sockets/Socket';
import { INode, NodeType } from './NodeInstance';
import { readInputFromSockets, writeOutputsToSocket } from './NodeSockets';
import { NodeDescription } from './Registry/NodeDescription';

export type NodeConfiguration = {
  [key: string]: any;
};

export class Node<TNodeType extends NodeType> implements INode {
  public id = '';
  public label = '';
  public metadata: Metadata = {};

  constructor(
    public readonly description: NodeDescription,
    public readonly graph: Graph,
    public readonly inputs: Socket[] = [],
    public readonly outputs: Socket[] = [],
    public readonly configuration: NodeConfiguration = {},
    public nodeType: TNodeType
  ) {}

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  readInput<T>(inputName: string): T {
    return readInputFromSockets(
      this.inputs,
      inputName,
      this.description.typeName
    );
  }

  writeOutput<T>(outputName: string, value: T) {
    writeOutputsToSocket(
      this.outputs,
      outputName,
      value,
      this.description.typeName
    );
  }

  get typeName() {
    return this.description.typeName;
  }
}
