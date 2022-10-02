import Graph from '../Graph';

export default function validateLinks(graph: Graph): string[] {
  const errorList: string[] = [];
  // for each node
  Object.values(graph.nodes).forEach((node) => {
    // for each input socket
    node.inputSockets.forEach((inputSocket) => {
      // ensure that connected output sockets are the same type
      inputSocket.links.forEach((nodeSocketRef) => {
        // check if the node id is correct
        const upstreamNode = graph.nodes[nodeSocketRef.nodeId];
        if (upstreamNode === undefined) {
          errorList.push(
            `node ${node.typeName}.${inputSocket.name} has link using invalid nodeid: ${nodeSocketRef.nodeId}`
          );
          return;
        }

        // check if the socketName is correct
        const outputSocket = upstreamNode.outputSockets.find(
          (socket) => socket.name === nodeSocketRef.socketName
        );
        if (outputSocket === undefined) {
          errorList.push(
            `node ${node.typeName}.${inputSocket.name} has link using a non-existant socket name: ` +
              `${nodeSocketRef.socketName}, it can not be found on upstream output node: ${upstreamNode.typeName}`
          );
          return;
        }

        // check if the socket types align
        if (inputSocket.valueTypeName !== outputSocket.valueTypeName) {
          errorList.push(
            `type mismatch between ${node.typeName}.${inputSocket.name} [${inputSocket.valueTypeName}] ` +
              `and ${upstreamNode.typeName}.${outputSocket.name} [${outputSocket.valueTypeName}]`
          );
        }
      });
    });
  });
  return errorList;
}
