"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableGet = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class VariableGet extends Node_js_1.Node {
    constructor(description, graph, variable) {
        super(description, graph, [], [new Socket_js_1.Socket(variable.valueTypeName, 'value', undefined, variable.name)], // output socket label uses variable name like UE4, but name is value to avoid breaking graph when variable is renamed
        (context) => {
            context.writeOutput('value', variable.get());
        });
        this.variable = variable;
    }
    static GetDescription(variables, variableId) {
        const variable = variables[variableId];
        return new NodeDescription_js_1.NodeDescription(`variable/get/${variable.id}`, 'Query', '', // these nodes have no name in Unreal Engine Blueprints
        (description, graph) => new VariableGet(description, graph, variable));
    }
}
exports.VariableGet = VariableGet;
