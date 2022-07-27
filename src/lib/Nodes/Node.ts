import Socket from '../Sockets/Socket';
import { NodeEvalFunction } from './NodeEvalFunction';

function findSocketByName(sockets: Socket[], name: string): Socket | undefined {
  return sockets.find((socket) => socket.name === name);
}

export default class Node {
  constructor(
      public nodeName: string,
      public inputSockets: Socket[],
      public outputSockets: Socket[],
      public func: NodeEvalFunction,
  ) {
  }

  getInputSocket(socketName: string): Socket | undefined {
    return findSocketByName(this.inputSockets, socketName);
  }

  getOutputSocket(socketName: string): Socket | undefined {
    return findSocketByName(this.outputSockets, socketName);
  }
}
