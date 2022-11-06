"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlipFlop = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class FlipFlop extends Node_js_1.Node {
    constructor(description, graph) {
        super(description, graph, [new Socket_js_1.Socket('flow', 'flow')], [new Socket_js_1.Socket('flow', 'on'), new Socket_js_1.Socket('flow', 'off'), new Socket_js_1.Socket('boolean', 'isOn')], (context) => {
            console.log('got flip flop in');
            context.writeOutput('isOn', this.isOn);
            context.commit(this.isOn ? 'on' : 'off');
            this.isOn = !this.isOn;
        });
        this.isOn = true;
    }
}
exports.FlipFlop = FlipFlop;
FlipFlop.Description = new NodeDescription_js_1.NodeDescription('flow/flipFlop', 'Flow', 'Flip Flop', (description, graph) => new FlipFlop(description, graph));
