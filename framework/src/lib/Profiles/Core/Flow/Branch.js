"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class Branch extends Node_js_1.Node {
    constructor(description, graph) {
        super(description, graph, [new Socket_js_1.Socket('flow', 'flow'), new Socket_js_1.Socket('boolean', 'condition')], [new Socket_js_1.Socket('flow', 'true'), new Socket_js_1.Socket('flow', 'false')], (context) => {
            context.commit(context.readInput('condition') === true ? 'true' : 'false');
        });
    }
}
exports.Branch = Branch;
Branch.Description = new NodeDescription_js_1.NodeDescription('flow/branch', 'Flow', 'Branch', (description, graph) => new Branch(description, graph));
