import { Graph } from '../Graphs/Graph.js';
import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeDescription } from './NodeDescription.js';
import { NodeEvalContext } from './NodeEvalContext.js';

function findSocketByName(sockets: Socket[], name: string): Socket | undefined {
  return sockets.find((socket) => socket.name === name);
}

export class Node {
  public id = '';
  public label = '';
  public metadata: Metadata = {};
  public readonly flow: boolean;
  public evaluateOnStartup = false;
  public async = false;
  public interruptibleAsync = false;
  public cachedContext: NodeEvalContext | undefined = undefined;
  private inputNameToSocket: { [name: string]: Socket } = {};
  private outputNameToSocket: { [name: string]: Socket } = {};

  constructor(
    public readonly description: NodeDescription,
    public readonly graph: Graph,
    public readonly inputSockets: Socket[],
    public readonly outputSockets: Socket[],
    public readonly evalFunc: (context: NodeEvalContext) => void
  ) {
    // determine if this is an eval node
    let areAnySocketsFlowType = false;
    this.inputSockets.forEach((socket) => {
      areAnySocketsFlowType ||= socket.valueTypeName === 'flow';
      this.inputNameToSocket[socket.name] = socket;
    });
    this.outputSockets.forEach((socket) => {
      areAnySocketsFlowType ||= socket.valueTypeName === 'flow';
      this.outputNameToSocket[socket.name] = socket;
    });
    this.flow = areAnySocketsFlowType;
  }

  getInputSocket(inputName: string): Socket {
    const socket = this.inputNameToSocket[inputName];
    if (socket === undefined) {
      throw new Error(
        `no input sockets with name: ${inputName} on node ${this.description.typeName}`
      );
    }
    return socket;
  }

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  readInput<T>(inputName: string): T {
    const inputSocket = this.inputNameToSocket[inputName];
    if (inputSocket === undefined) {
      throw new Error(
        `can not find input socket with name ${inputName} on node of type ${this.description.typeName}`
      );
    }
    return inputSocket.value as T;
  }

  getOutputSocket(outputName: string): Socket {
    const socket = this.outputNameToSocket[outputName];
    if (socket === undefined) {
      throw new Error(
        `no output socket with name: ${outputName} on node ${this.description.typeName}`
      );
    }
    return socket;
  }

  writeOutput<T>(outputName: string, value: T) {
    const outputSocket = this.outputNameToSocket[outputName];
    if (outputSocket === undefined) {
      throw new Error(
        `can not find output socket with name ${outputName} on node of type ${this.description.typeName}`
      );
    }
    if (outputSocket.valueTypeName === 'flow') {
      throw new Error(
        `can not set the value of Flow output socket ${outputName}, use commit() instead`
      );
    }
    outputSocket.value = value;
  }
}
