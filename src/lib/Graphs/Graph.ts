import Node from '../Nodes/Node';
import NodeSocketRef from '../Nodes/NodeSocketRef';
import Socket from '../Sockets/Socket';

// Purpose:
//  - stores the node graph

export default class Graph {
  public name: string = '';
  public nodes: Node[] = [];
  public state = new Map<string, any>();

  getInputSocket(nodeSocketRef: NodeSocketRef): Socket {
    const node = this.nodes[nodeSocketRef.nodeIndex];
    const inputSocket = node.inputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
    if (inputSocket === undefined) throw new Error('all node socket refs must resolve');
    return inputSocket;
  }

  getOutputSocket(nodeSocketRef: NodeSocketRef): Socket {
    const node = this.nodes[nodeSocketRef.nodeIndex];
    const outputSocket = node.outputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
    if (outputSocket === undefined) throw new Error('all node socket refs must resolve');
    return outputSocket;
  }
}
