import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { NodeCategory } from './NodeCategory.js';
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

  constructor(
    public readonly category: NodeCategory,
    public readonly typeName: string,
    public readonly inputSockets: Socket[],
    public readonly outputSockets: Socket[],
    public readonly evalFunc: (context: NodeEvalContext) => void
  ) {
    // determine if this is an eval node
    let areAnySocketsFlowType = false;
    this.inputSockets.forEach((socket) => {
      areAnySocketsFlowType ||= socket.valueTypeName === 'flow';
    });
    this.outputSockets.forEach((socket) => {
      areAnySocketsFlowType ||= socket.valueTypeName === 'flow';
    });
    this.flow = areAnySocketsFlowType;
  }

  getInputSocket(socketName: string): Socket {
    const socket = findSocketByName(this.inputSockets, socketName);
    if (socket === undefined) {
      throw new Error(
        `no input sockets with name: ${socketName} on node ${this.typeName}`
      );
    }
    return socket;
  }

  getOutputSocket(socketName: string): Socket {
    const socket = findSocketByName(this.outputSockets, socketName);
    if (socket === undefined) {
      throw new Error(
        `no output socket with name: ${socketName} on node ${this.typeName}`
      );
    }
    return socket;
  }
}
