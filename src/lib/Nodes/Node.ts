import Socket from '../Sockets/Socket';
import { NodeEvalFunction } from '../Specs/Nodes/NodeSpec';

function findSocketByName(sockets: Socket[], name: string): Socket | undefined {
  return sockets.find((socket) => socket.name === name);
}

export default class Node {
  constructor(
        public type: string,
        public name: string,
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
