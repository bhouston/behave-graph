"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForLoop = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class ForLoop extends Node_js_1.Node {
    constructor(description, graph) {
        super(description, graph, [
            new Socket_js_1.Socket('flow', 'flow'),
            new Socket_js_1.Socket('integer', 'startIndex'),
            new Socket_js_1.Socket('integer', 'endIndex')
        ], [
            new Socket_js_1.Socket('flow', 'loopBody'),
            new Socket_js_1.Socket('integer', 'index'),
            new Socket_js_1.Socket('flow', 'completed')
        ], (context) => {
            // these outputs are fired sequentially in an async fashion but without delays.
            // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
            const startIndex = context.readInput('startIndex');
            const endIndex = context.readInput('endIndex');
            const loopBodyIteration = function loopBodyIteration(i) {
                if (i < endIndex) {
                    context.writeOutput('index', i);
                    context.commit('loopBody', () => {
                        loopBodyIteration(i + 1n);
                    });
                }
                else {
                    context.commit('completed');
                }
            };
            loopBodyIteration(startIndex);
        });
    }
}
exports.ForLoop = ForLoop;
ForLoop.Description = new NodeDescription_js_1.NodeDescription('flow/forLoop', 'Flow', 'For Loop', (description, graph) => new ForLoop(description, graph));
