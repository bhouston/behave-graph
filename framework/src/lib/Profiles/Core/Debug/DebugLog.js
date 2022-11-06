"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class Log extends Node_js_1.Node {
    constructor(description, graph, logger) {
        super(description, graph, [new Socket_js_1.Socket('flow', 'flow'), new Socket_js_1.Socket('string', 'text')], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            this.logger.info(context.readInput('text'));
        });
        this.logger = logger;
    }
}
exports.Log = Log;
Log.Description = (logger) => new NodeDescription_js_1.NodeDescription('debug/log', 'Action', 'Debug Log', (description, graph) => new Log(description, graph, logger));
