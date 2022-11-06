"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/
class Sequence extends Node_js_1.Node {
    constructor(description, graph) {
        super(description, graph, [new Socket_js_1.Socket('flow', 'flow')], [
            new Socket_js_1.Socket('flow', '1'),
            new Socket_js_1.Socket('flow', '2'),
            new Socket_js_1.Socket('flow', '3')
        ], (context) => {
            // these outputs are fired sequentially in an async fashion but without delays.
            // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
            const sequenceIteration = function sequenceIteration(i) {
                if (i < context.node.outputSockets.length) {
                    const outputSocket = context.node.outputSockets[i];
                    context.commit(outputSocket.name, () => {
                        sequenceIteration(i + 1);
                    });
                }
            };
            sequenceIteration(0);
        });
    }
}
exports.Sequence = Sequence;
Sequence.Description = new NodeDescription_js_1.NodeDescription('flow/sequence', 'Flow', 'Sequence', (description, graph) => new Sequence(description, graph));
