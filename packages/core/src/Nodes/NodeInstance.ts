import { Engine } from '../Execution/Engine.js';
import { Fiber } from '../Execution/Fiber.js';
import { IGraphApi } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeConfiguration } from './Node.js';
import { readInputFromSockets, writeOutputsToSocket } from './NodeSockets.js';
import { INodeDescription } from './Registry/NodeDescription.js';

export enum NodeType {
  Event = 'Event',
  Flow = 'Flow',
  Async = 'Async',
  Function = 'Function'
}

export interface INode {
  readonly inputs: Socket[];
  readonly outputs: Socket[];
  readonly graph: IGraphApi;
  description: INodeDescription;
  configuration: NodeConfiguration;
  nodeType: NodeType;
  label?: string;
  metadata?: any;
}

export interface IFunctionNode extends INode {
  nodeType: NodeType.Function;
  exec: (node: INode) => void;
}

export interface IEventNode extends INode {
  nodeType: NodeType.Event;
  init: (engine: Engine) => void;
  dispose: (engine: Engine) => void;
}

export interface IFlowNode extends INode {
  nodeType: NodeType.Flow;
  triggered: (fiber: Fiber, triggeringSocketName: string) => void;
}

export interface IAsyncNode extends INode {
  nodeType: NodeType.Async;
  triggered: (
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) => void;
  dispose: () => void;
}

export const isFlowNode = (node: INode): node is IFlowNode =>
  node.nodeType === NodeType.Flow;

export const isEventNode = (node: INode): node is IEventNode =>
  node.nodeType === NodeType.Event;

export const isAsyncNode = (node: INode): node is IAsyncNode =>
  node.nodeType === NodeType.Async;

export const isFunctionNode = (node: INode): node is IFunctionNode =>
  node.nodeType === NodeType.Function;

export const makeNodeInstance = (node: INode) => {
  const readInput = <T>(inputName: string): T => {
    return readInputFromSockets(
      node.inputs,
      inputName,
      node.description.typeName
    );
  };

  const writeOutput = <T>(outputName: string, value: T) => {
    writeOutputsToSocket(
      node.outputs,
      outputName,
      value,
      node.description.typeName
    );
  };

  return {
    ...node,
    readInput,
    writeOutput
  };
};
