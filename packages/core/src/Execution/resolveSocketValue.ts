import { Assert } from '../Diagnostics/Assert';
import { Graph } from '../Graphs/Graph';
import { ImmediateNode } from '../Nodes/ImmediateNode';
//import { ImmediateNode } from '../Nodes/ImmediateNode';
import { Socket } from '../Sockets/Socket';

export function resolveSocketValue(graph: Graph, inputSocket: Socket) {
  // if it has no links, leave value on input socket alone.
  if (inputSocket.links.length === 0) {
    return;
  }

  const upstreamLink = inputSocket.links[0];
  // caching the target node + socket here increases engine performance by 8% on average.  This is a hotspot.
  if (
    upstreamLink._targetNode === undefined ||
    upstreamLink._targetSocket === undefined
  ) {
    Assert.mustBeTrue(inputSocket.links.length === 1);

    // if upstream node is an eval, we just return its last value.
    upstreamLink._targetNode = graph.nodes[upstreamLink.nodeId];
    // what is inputSocket connected to?
    upstreamLink._targetSocket = upstreamLink._targetNode.outputSockets.find(
      (socket) => socket.name === upstreamLink.socketName
    );
    if (upstreamLink._targetSocket === undefined) {
      throw new Error(
        `can not find socket with the name ${upstreamLink.socketName}`
      );
    }
  }

  const upstreamNode = upstreamLink._targetNode;
  const upstreamOutputSocket = upstreamLink._targetSocket;

  // if upstream is a flow/event/async node, do not evaluate it rather just use its existing output socket values
  if (!(upstreamNode instanceof ImmediateNode)) {
    inputSocket.value = upstreamOutputSocket.value;
    return;
  }

  if (upstreamNode instanceof ImmediateNode) {
    // resolve all inputs for the upstream node (this is where the recursion happens)
    // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
    for (const upstreamInputSocket of upstreamNode.inputSockets) {
      resolveSocketValue(graph, upstreamInputSocket);
    }

    upstreamNode.exec();

    // get the output value we wanted.
    inputSocket.value = upstreamOutputSocket.value;
    return;
  }
}
