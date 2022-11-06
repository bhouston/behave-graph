"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNodeSpecsToJSON = void 0;
const Graph_js_1 = require("../Graph.js");
function writeNodeSpecsToJSON(registry) {
    const nodeSpecsJSON = [];
    const graph = new Graph_js_1.Graph(registry);
    registry.nodes.getAllNames().forEach((nodeTypeName) => {
        const node = graph.createNode(nodeTypeName);
        const nodeSpecJSON = {
            type: nodeTypeName,
            category: node.description.category,
            inputs: [],
            outputs: []
        };
        node.inputSockets.forEach((inputSocket) => {
            const valueType = inputSocket.valueTypeName === 'flow'
                ? undefined
                : registry.values.get(inputSocket.valueTypeName);
            let defaultValue = inputSocket.value;
            if (defaultValue === undefined && valueType !== undefined) {
                defaultValue = valueType.serialize(valueType.creator());
            }
            const socketSpecJSON = {
                name: inputSocket.name,
                valueType: inputSocket.valueTypeName,
                defaultValue
            };
            nodeSpecJSON.inputs.push(socketSpecJSON);
        });
        node.outputSockets.forEach((outputSocket) => {
            const socketSpecJSON = {
                name: outputSocket.name,
                valueType: outputSocket.valueTypeName
            };
            nodeSpecJSON.outputs.push(socketSpecJSON);
        });
        nodeSpecsJSON.push(nodeSpecJSON);
    });
    return nodeSpecsJSON;
}
exports.writeNodeSpecsToJSON = writeNodeSpecsToJSON;
