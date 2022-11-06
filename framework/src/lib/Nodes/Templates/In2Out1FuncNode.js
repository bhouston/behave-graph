"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.In2Out1FuncNode = void 0;
const Socket_js_1 = require("../../Sockets/Socket.js");
const Node_js_1 = require("../Node.js");
class In2Out1FuncNode extends Node_js_1.Node {
    constructor(description, graph, inputValueTypes, outputValueType, binaryEvalFunc, inputNames = ['a', 'b']) {
        if (inputValueTypes.length !== 2) {
            throw new Error(`inputValueTypes must have a length of 2, it is instead ${inputValueTypes.length}`);
        }
        if (inputNames.length !== 2) {
            throw new Error(`inputNames must have a length of 2, it is instead ${inputNames.length}`);
        }
        super(description, graph, [
            new Socket_js_1.Socket(inputValueTypes[0], inputNames[0]),
            new Socket_js_1.Socket(inputValueTypes[1], inputNames[1])
        ], [new Socket_js_1.Socket(outputValueType, 'result')], (context) => {
            context.writeOutput('result', this.binaryEvalFunc(context.readInput(inputNames[0]), context.readInput(inputNames[1])));
        });
        this.binaryEvalFunc = binaryEvalFunc;
        this.inputNames = inputNames;
    }
}
exports.In2Out1FuncNode = In2Out1FuncNode;
