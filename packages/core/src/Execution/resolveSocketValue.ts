import { Assert } from '../Diagnostics/Assert';
import { isFunctionNode } from '../Nodes/NodeInstance';
import { Socket } from '../Sockets/Socket';
import { Engine } from './Engine';

export function resolveSocketValue(
  engine: Engine,
  inputSocket: Socket
): number {
  // if it has no links, leave value on input socket alone.
  if (inputSocket.links.length === 0) {
    return 0;
  }

  const graph = engine.graph;

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
    upstreamLink._targetSocket = upstreamLink._targetNode.outputs.find(
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
  if (!isFunctionNode(upstreamNode)) {
    inputSocket.value = upstreamOutputSocket.value;
    return 0;
  }

  let executionSteps = 0;

  if (isFunctionNode(upstreamNode)) {
    // resolve all inputs for the upstream node (this is where the recursion happens)
    // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
    for (const upstreamInputSocket of upstreamNode.inputs) {
      executionSteps += resolveSocketValue(engine, upstreamInputSocket);
    }

    engine.onNodeExecutionStart.emit(upstreamNode);
    upstreamNode.exec(upstreamNode);
    executionSteps++;
    engine.onNodeExecutionEnd.emit(upstreamNode);

    // get the output value we wanted.
    inputSocket.value = upstreamOutputSocket.value;
    return executionSteps;
  }

  return 0;
}
