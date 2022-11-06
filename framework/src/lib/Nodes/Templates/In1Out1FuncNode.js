"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.In1Out1FuncNode = void 0;
const Socket_js_1 = require("../../Sockets/Socket.js");
const Node_js_1 = require("../Node.js");
class In1Out1FuncNode extends Node_js_1.Node {
    constructor(description, graph, inputValueTypes, outputValueType, unaryEvalFunc, inputNames = ['a']) {
        if (inputValueTypes.length !== 1) {
            throw new Error(`inputValueTypes must have a length of 1, it is instead ${inputValueTypes.length}`);
        }
        if (inputNames.length !== 1) {
            throw new Error(`inputNames must have a length of 1, it is instead ${inputNames.length}`);
        }
        super(description, graph, [new Socket_js_1.Socket(inputValueTypes[0], inputNames[0])], [new Socket_js_1.Socket(outputValueType, 'result')], (context) => {
            const result = this.unaryEvalFunc(context.readInput(inputNames[0]));
            console.log({
                input: context.readInput(inputNames[0]),
                result,
            });
            context.writeOutput('result', result);
        });
        this.unaryEvalFunc = unaryEvalFunc;
        this.inputNames = inputNames;
    }
}
exports.In1Out1FuncNode = In1Out1FuncNode;
