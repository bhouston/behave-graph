"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.In4Out1FuncNode = void 0;
const Socket_js_1 = require("../../Sockets/Socket.js");
const Node_js_1 = require("../Node.js");
class In4Out1FuncNode extends Node_js_1.Node {
    constructor(description, graph, inputValueTypes, outputValueType, binaryEvalFunc, inputNames = ['a', 'b', 'c', 'd']) {
        if (inputValueTypes.length !== 4) {
            throw new Error(`inputValueTypes must have a length of 4, it is instead ${inputValueTypes.length}`);
        }
        if (inputNames.length !== 4) {
            throw new Error(`inputNames must have a length of 4, it is instead ${inputNames.length}`);
        }
        super(description, graph, [
            new Socket_js_1.Socket(inputValueTypes[0], inputNames[0]),
            new Socket_js_1.Socket(inputValueTypes[1], inputNames[1]),
            new Socket_js_1.Socket(inputValueTypes[2], inputNames[2]),
            new Socket_js_1.Socket(inputValueTypes[3], inputNames[3])
        ], [new Socket_js_1.Socket(outputValueType, 'result')], (context) => {
            context.writeOutput('result', this.binaryEvalFunc(context.readInput(inputNames[0]), context.readInput(inputNames[1]), context.readInput(inputNames[2]), context.readInput(inputNames[3])));
        });
        this.binaryEvalFunc = binaryEvalFunc;
        this.inputNames = inputNames;
    }
}
exports.In4Out1FuncNode = In4Out1FuncNode;
