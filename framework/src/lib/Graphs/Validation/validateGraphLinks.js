"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGraphLinks = void 0;
function validateGraphLinks(graph) {
    const errorList = [];
    // for each node
    Object.values(graph.nodes).forEach((node) => {
        // for each input socket
        node.inputSockets.forEach((inputSocket) => {
            // ensure that connected output sockets are the same type
            inputSocket.links.forEach((link) => {
                // check if the node id is correct
                if (!(link.nodeId in graph.nodes)) {
                    errorList.push(`node ${node.description.typeName}.${inputSocket.name} has link using invalid nodeId: ${link.nodeId}`);
                    return;
                }
                // check if the socketName is correct
                const upstreamNode = graph.nodes[link.nodeId];
                const outputSocket = upstreamNode.outputSockets.find((socket) => socket.name === link.socketName);
                if (outputSocket === undefined) {
                    errorList.push(`node ${node.description.typeName}.${inputSocket.name} has link using a non-existent socket name: ` +
                        `${link.socketName}, it can not be found on upstream output node: ${upstreamNode.description.typeName}`);
                    return;
                }
                // check if the socket types align
                if (inputSocket.valueTypeName !== outputSocket.valueTypeName) {
                    errorList.push(`type mismatch between ${node.description.typeName}.${inputSocket.name} [${inputSocket.valueTypeName}] ` +
                        `and ${upstreamNode.description.typeName}.${outputSocket.name} [${outputSocket.valueTypeName}]`);
                }
            });
        });
    });
    return errorList;
}
exports.validateGraphLinks = validateGraphLinks;
