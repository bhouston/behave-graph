import { Graph } from '../Graphs/Graph.js';
import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeDescription } from './Registry/NodeDescription.js';

export class Node {
  public id = '';
  public label = '';
  public metadata: Metadata = {};

  constructor(
    public readonly description: NodeDescription,
    public readonly graph: Graph,
    public readonly inputSockets: Socket[] = [],
    public readonly outputSockets: Socket[] = []
  ) {}

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  readInput<T>(inputName: string): T {
    const inputSocket = this.inputSockets.find(
      (socket) => socket.name === inputName
    );
    if (inputSocket === undefined) {
      throw new Error(
        `can not find input socket with name ${inputName} on node of type ${this.description.typeName}`
      );
    }
    return inputSocket.value as T;
  }

  writeOutput<T>(outputName: string, value: T) {
    const outputSocket = this.outputSockets.find(
      (socket) => socket.name === outputName
    );
    if (outputSocket === undefined) {
      throw new Error(
        `can not find output socket with name ${outputSocket} on node of type ${this.description.typeName}`
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
