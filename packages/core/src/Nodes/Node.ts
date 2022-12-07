import { Graph } from '../Graphs/Graph';
import { Metadata } from '../Metadata';
import { Socket } from '../Sockets/Socket';
import { NodeDescription } from './Registry/NodeDescription';

export class Node {
  public id = '';
  public label = '';
  public metadata: Metadata = {};

  constructor(
    public readonly description: NodeDescription,
    public readonly graph: Graph,
    public readonly inputs: Socket[] = [],
    public readonly outputs: Socket[] = []
  ) {}

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  read<T>(inputName: string): T {
    const inputSocket = this.inputs.find((socket) => socket.name === inputName);
    if (inputSocket === undefined) {
      throw new Error(
        `can not find input socket with name ${inputName} on node of type ${this.description.typeName}`
      );
    }
    return inputSocket.value as T;
  }

  write<T>(outputName: string, value: T) {
    const outputSocket = this.outputs.find(
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
