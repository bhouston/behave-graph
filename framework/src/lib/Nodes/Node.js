"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
function findSocketByName(sockets, name) {
    return sockets.find((socket) => socket.name === name);
}
class Node {
    constructor(description, graph, inputSockets, outputSockets, evalFunc) {
        this.description = description;
        this.graph = graph;
        this.inputSockets = inputSockets;
        this.outputSockets = outputSockets;
        this.evalFunc = evalFunc;
        this.id = '';
        this.label = '';
        this.metadata = {};
        this.evaluateOnStartup = false;
        this.async = false;
        this.interruptibleAsync = false;
        // determine if this is an eval node
        let areAnySocketsFlowType = false;
        this.inputSockets.forEach((socket) => {
            areAnySocketsFlowType || (areAnySocketsFlowType = socket.valueTypeName === 'flow');
        });
        this.outputSockets.forEach((socket) => {
            areAnySocketsFlowType || (areAnySocketsFlowType = socket.valueTypeName === 'flow');
        });
        this.flow = areAnySocketsFlowType;
    }
    getInputSocket(socketName) {
        const socket = findSocketByName(this.inputSockets, socketName);
        if (socket === undefined) {
            throw new Error(`no input sockets with name: ${socketName} on node ${this.description.typeName}`);
        }
        return socket;
    }
    getOutputSocket(socketName) {
        const socket = findSocketByName(this.outputSockets, socketName);
        if (socket === undefined) {
            throw new Error(`no output socket with name: ${socketName} on node ${this.description.typeName}`);
        }
        return socket;
    }
}
exports.Node = Node;
