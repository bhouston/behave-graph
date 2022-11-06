"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
// ASYNC - asynchronous evaluation
// also called "delay"
class Delay extends Node_js_1.Node {
    constructor(description, graph) {
        super(description, graph, [new Socket_js_1.Socket('flow', 'flow'), new Socket_js_1.Socket('float', 'duration')], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            console.log('DELAYED');
            let timeIsCancelled = false; // work around clearTimeout is not available on node.
            setTimeout(() => {
                if (timeIsCancelled) {
                    return;
                }
                context.commit('flow');
                context.finish();
            }, context.readInput('duration') * 1000);
            context.onAsyncCancelled.addListener(() => {
                timeIsCancelled = true;
            });
        });
        this.async = true;
    }
}
exports.Delay = Delay;
Delay.Description = new NodeDescription_js_1.NodeDescription('flow/delay', 'Flow', 'Delay', (description, graph) => new Delay(description, graph));
