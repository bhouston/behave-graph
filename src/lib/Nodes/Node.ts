import Socket from '../Sockets/Socket';
import { SocketValueType } from '../Sockets/SocketValueType';
import { NodeEvalFunction } from './NodeEvalFunction';

function findSocketByName(sockets: Socket[], name: string): Socket | undefined {
  return sockets.find((socket) => socket.name === name);
}

export default class Node {
  public readonly isEvalNode: boolean;

  constructor(
      public nodeName: string,
      public inputSockets: Socket[],
      public outputSockets: Socket[],
      public func: NodeEvalFunction,
  ) {
    // determine if this is an eval node
    let areAnySocketsEvalType = false;
    this.inputSockets.forEach((socket) => {
      areAnySocketsEvalType ||= (socket.valueType === SocketValueType.Flow);
    });
    this.outputSockets.forEach((socket) => {
      areAnySocketsEvalType ||= (socket.valueType === SocketValueType.Flow);
    });
    this.isEvalNode = areAnySocketsEvalType;
  }

  getInputSocket(socketName: string): Socket {
    const socket = findSocketByName(this.inputSockets, socketName);
    if (socket === undefined) throw new Error(`no input sockets with name: ${socketName} on node ${this.nodeName}`);
    return socket;
  }

  getOutputSocket(socketName: string): Socket {
    const socket = findSocketByName(this.outputSockets, socketName);
    if (socket === undefined) throw new Error(`no output socket with name: ${socketName} on node ${this.nodeName}`);
    return socket;
  }
}
