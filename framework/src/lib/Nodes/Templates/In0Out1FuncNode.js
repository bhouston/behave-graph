"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.In0Out1FuncNode = void 0;
const Socket_js_1 = require("../../Sockets/Socket.js");
const Node_js_1 = require("../Node.js");
class In0Out1FuncNode extends Node_js_1.Node {
    constructor(description, graph, outputValueType, nullaryEvalFunc) {
        super(description, graph, [], [new Socket_js_1.Socket(outputValueType, 'result')], (context) => {
            context.writeOutput('result', this.nullaryEvalFunc());
        });
        this.nullaryEvalFunc = nullaryEvalFunc;
    }
}
exports.In0Out1FuncNode = In0Out1FuncNode;
