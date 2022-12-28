import { IGraphApi } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { INode, NodeType } from './NodeInstance';
import { readInputFromSockets, writeOutputsToSocket } from './NodeSockets';
import { INodeDescription } from './Registry/NodeDescription';

export type NodeConfiguration = {
  [key: string]: any;
};

export abstract class Node<TNodeType extends NodeType> implements INode {
  public id = '';
  public readonly inputs: Socket[];
  public readonly outputs: Socket[];
  public readonly description: INodeDescription;
  // public typeName: string;
  public nodeType: TNodeType;
  public readonly otherTypeNames: string[] | undefined;
  public graph: IGraphApi;
  public label?: string;
  public metadata?: any;
  public readonly configuration: NodeConfiguration;

  constructor(node: Omit<INode, 'nodeType'> & { nodeType: TNodeType }) {
    this.inputs = node.inputs;
    this.outputs = node.outputs;
    this.description = node.description;
    this.nodeType = node.nodeType;
    this.graph = node.graph;
    this.configuration = node.configuration;
  }

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
}
