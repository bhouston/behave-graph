"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectTrue = void 0;
const Assert_js_1 = require("../../../Diagnostics/Assert.js");
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class ExpectTrue extends Node_js_1.Node {
    constructor(description, graph) {
        super(description, graph, [
            new Socket_js_1.Socket('flow', 'flow'),
            new Socket_js_1.Socket('boolean', 'condition'),
            new Socket_js_1.Socket('string', 'description')
        ], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            Assert_js_1.Assert.mustBeTrue(context.readInput('condition'), context.readInput('description'));
        });
    }
}
exports.ExpectTrue = ExpectTrue;
ExpectTrue.Description = new NodeDescription_js_1.NodeDescription('debug/expectTrue', 'Action', 'Assert Expect True', (description, graph) => new ExpectTrue(description, graph));
