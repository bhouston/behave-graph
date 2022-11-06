"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableSet = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class VariableSet extends Node_js_1.Node {
    constructor(description, graph, variable) {
        super(description, graph, [
            new Socket_js_1.Socket('flow', 'flow'),
            new Socket_js_1.Socket(variable.valueTypeName, 'value', undefined, variable.name), // variable name is a label so variable can be renamed without breaking graph.
        ], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            variable.set(context.readInput('value'));
        });
        this.variable = variable;
    }
    static GetDescription(variables, variableId) {
        const variable = variables[variableId];
        return new NodeDescription_js_1.NodeDescription(`variable/set/${variable.id}`, 'Action', `Set`, (description, graph) => new VariableSet(description, graph, variable));
    }
}
exports.VariableSet = VariableSet;
