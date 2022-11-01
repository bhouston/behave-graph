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
  public inputSockets: { [name: string]: Socket } = {};
  public outputSockets: { [name: string]: Socket } = {};

  constructor(
    public readonly description: NodeDescription,
    public readonly graph: Graph,
    public readonly inputSocketList: Socket[],
    public readonly outputSocketList: Socket[],
    public readonly evalFunc: (context: NodeEvalContext) => void
  ) {
    // determine if this is an eval node
    let areAnySocketsFlowType = false;
    this.inputSocketList.forEach((socket) => {
      areAnySocketsFlowType ||= socket.valueTypeName === 'flow';
      this.inputSockets[socket.name] = socket;
    });
    this.outputSocketList.forEach((socket) => {
      areAnySocketsFlowType ||= socket.valueTypeName === 'flow';
      this.outputSockets[socket.name] = socket;
    });
    this.flow = areAnySocketsFlowType;
  }

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  readInput<T>(inputName: string): T {
    const inputSocket = this.inputSockets[inputName];
    if (inputSocket === undefined) {
      throw new Error(
        `can not find input socket with name ${inputName} on node of type ${this.description.typeName}`
      );
    }
    return inputSocket.value as T;
  }

  writeOutput<T>(outputName: string, value: T) {
    const outputSocket = this.outputSockets[outputName];
    if (outputSocket.valueTypeName === 'flow') {
      throw new Error(
        `can not set the value of Flow output socket ${outputName}, use commit() instead`
      );
    }
    outputSocket.value = value;
  }
}
