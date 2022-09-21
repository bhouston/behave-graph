import { Metadata } from '../Graphs/Metadata';
import Socket from '../Sockets/Socket';
import { NodeEvalFunction } from './NodeEvalFunction';

function findSocketByName(sockets: Socket[], name: string): Socket | undefined {
  return sockets.find((socket) => socket.name === name);
}

export default class Node {
  public readonly isEvalNode: boolean;
  public id: string = '';
  public label: string = '';
  public metadata: Metadata = {};

  constructor(
      public readonly category: string,
      public readonly typeName: string,
      public readonly inputSockets: Socket[],
      public readonly outputSockets: Socket[],
      public readonly evalFunc: NodeEvalFunction,
  ) {
    // determine if this is an eval node
    let areAnySocketsEvalType = false;
    this.inputSockets.forEach((socket) => {
      areAnySocketsEvalType ||= (socket.valueTypeName === 'flow');
    });
    this.outputSockets.forEach((socket) => {
      areAnySocketsEvalType ||= (socket.valueTypeName === 'flow');
    });
    this.isEvalNode = areAnySocketsEvalType;
  }

  getInputSocket(socketName: string): Socket {
    const socket = findSocketByName(this.inputSockets, socketName);
    if (socket === undefined) throw new Error(`no input sockets with name: ${socketName} on node ${this.typeName}`);
    return socket;
  }

  getOutputSocket(socketName: string): Socket {
    const socket = findSocketByName(this.outputSockets, socketName);
    if (socket === undefined) throw new Error(`no output socket with name: ${socketName} on node ${this.typeName}`);
    return socket;
  }
}
