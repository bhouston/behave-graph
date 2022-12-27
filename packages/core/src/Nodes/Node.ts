import { IGraph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { INode, NodeType } from './NodeInstance';
import { readInputFromSockets, writeOutputsToSocket } from './NodeSockets';

export type NodeConfiguration = {
  [key: string]: any;
};

export abstract class Node<TNodeType extends NodeType> implements INode {
  public id = '';
  public readonly inputs: Socket[];
  public readonly outputs: Socket[];
  public typeName: string;
  public nodeType: TNodeType;
  public readonly otherTypeNames: string[] | undefined;
  public graph: IGraph;
  public configuration: NodeConfiguration;

  constructor(node: Omit<INode, 'nodeType'> & { nodeType: TNodeType }) {
    this.inputs = node.inputs;
    this.outputs = node.outputs;
    this.typeName = node.typeName;
    this.nodeType = node.nodeType;
    this.graph = node.graph;
    this.configuration = node.configuration;
    this.otherTypeNames = node.otherTypeNames;
  }

  readInput<T>(inputName: string): T {
    return readInputFromSockets(this.inputs, inputName, this.typeName);
  }

  writeOutput<T>(outputName: string, value: T) {
    writeOutputsToSocket(this.outputs, outputName, value, this.typeName);
  }
}
