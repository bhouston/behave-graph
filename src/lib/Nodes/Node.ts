import { Graph } from '../Graphs/Graph.js';
import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeDescription } from './NodeDescription.js';

export class Node {
  public id = '';
  public label = '';
  public metadata: Metadata = {};
  public inputSockets: { [name: string]: Socket } = {};
  public outputSockets: { [name: string]: Socket } = {};

  constructor(
    public readonly description: NodeDescription,
    public readonly graph: Graph,
    public readonly inputSocketList: Socket[],
    public readonly outputSocketList: Socket[]
  ) {
    // fast lookup maps
    this.inputSocketList.forEach((socket) => {
      this.inputSockets[socket.name] = socket;
    });
    this.outputSocketList.forEach((socket) => {
      this.outputSockets[socket.name] = socket;
    });
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
