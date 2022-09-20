import Node from '../Nodes/Node';
import NodeSocketRef from '../Nodes/NodeSocketRef';
import Socket from '../Sockets/Socket';
import Variable from '../Variables/Variable';
import { Metadata } from './Metadata';

// Purpose:
//  - stores the node graph

export default class Graph {
  public name: string = '';
  public nodes: { [id:string]: Node} = {};
  public variables: { [id:string]: Variable } = {};
  public metadata: Metadata = {};

  constructor() {
  }

  getInputSocket(nodeSocketRef: NodeSocketRef): Socket {
    const node = this.nodes[nodeSocketRef.nodeId];
    const inputSocket = node.inputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
    if (inputSocket === undefined) throw new Error('all node socket refs must resolve');
    return inputSocket;
  }

  getOutputSocket(nodeSocketRef: NodeSocketRef): Socket {
    const node = this.nodes[nodeSocketRef.nodeId];
    const outputSocket = node.outputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
    if (outputSocket === undefined) throw new Error('all node socket refs must resolve');
    return outputSocket;
  }
}
