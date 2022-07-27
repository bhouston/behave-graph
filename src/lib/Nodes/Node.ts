import Socket from '../Sockets/Socket';
import { NodeEvalFunction } from './NodeEvalFunction';

function findSocketByName(sockets: Socket[], name: string): Socket | undefined {
  return sockets.find((socket) => socket.name === name);
}
function getSocketByName(sockets: Socket[], name: string): Socket {
  const socket = findSocketByName(sockets, name);
  if (socket === undefined) throw new Error(`no sockets with name: ${name}`);
  return socket;
}

export default class Node {
  constructor(
      public nodeName: string,
      public inputSockets: Socket[],
      public outputSockets: Socket[],
      public func: NodeEvalFunction,
  ) {
  }

  getInputSocket(socketName: string): Socket {
    return getSocketByName(this.inputSockets, socketName);
  }

  getOutputSocket(socketName: string): Socket {
    return getSocketByName(this.outputSockets, socketName);
  }
}
