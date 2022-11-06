"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VecElements = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class VecElements extends Node_js_1.Node {
    constructor(description, graph, valueTypeName, elementNames = ['x', 'y', 'z', 'w'], toArray) {
        super(description, graph, [new Socket_js_1.Socket(valueTypeName, 'value')], elementNames.map((elementName) => new Socket_js_1.Socket('float', elementName)), (context) => {
            const value = context.readInput('value');
            const elementValues = elementNames.map(() => 0);
            toArray(value, elementValues, 0);
            elementNames.forEach((elementName, index) => context.writeOutput(elementName, elementValues[index]));
        });
    }
}
exports.VecElements = VecElements;
