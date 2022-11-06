"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGraphToJSON = void 0;
function writeGraphToJSON(graph) {
    const graphJson = {};
    if (Object.keys(graph.metadata).length > 0) {
        graphJson.metadata = graph.metadata;
    }
    // save custom events
    Object.values(graph.customEvents).forEach((customEvent) => {
        const customEventJson = {
            name: customEvent.name,
            id: customEvent.id
        };
        if (customEvent.label.length > 0) {
            customEventJson.label = customEvent.label;
        }
        if (customEvent.parameters.length > 0) {
            const parametersJson = [];
            customEvent.parameters.forEach((parameter) => {
                parametersJson.push({
                    name: parameter.name,
                    valueTypeName: parameter.valueTypeName,
                    defaultValue: parameter.value
                });
            });
            customEventJson.parameters = parametersJson;
        }
        if (Object.keys(customEvent.metadata).length > 0) {
            customEventJson.metadata = customEvent.metadata;
        }
        if (graphJson.customEvents === undefined) {
            graphJson.customEvents = [];
        }
        graphJson.customEvents.push(customEventJson);
    });
    // save variables
    Object.values(graph.variables).forEach((variable) => {
        const variableJson = {
            valueTypeName: variable.valueTypeName,
            name: variable.name,
            id: variable.id,
            initialValue: graph.registry.values
                .get(variable.valueTypeName)
                .serialize(variable.initialValue)
        };
        if (variable.label.length > 0) {
            variableJson.label = variable.label;
        }
        if (Object.keys(variable.metadata).length > 0) {
            variableJson.metadata = variable.metadata;
        }
        if (graphJson.variables === undefined) {
            graphJson.variables = [];
        }
        graphJson.variables.push(variableJson);
    });
    // save nodes
    Object.values(graph.nodes).forEach((node) => {
        const nodeJson = {
            type: node.description.typeName,
            id: node.id
        };
        if (node.label.length > 0) {
            nodeJson.label = node.label;
        }
        if (Object.keys(node.metadata).length > 0) {
            nodeJson.metadata = node.metadata;
        }
        const parametersJson = {};
        node.inputSockets.forEach((inputSocket) => {
            if (inputSocket.valueTypeName === 'flow')
                return;
            let parameterJson = undefined;
            if (inputSocket.links.length === 0) {
                parameterJson = {
                    value: graph.registry.values
                        .get(inputSocket.valueTypeName)
                        .serialize(inputSocket.value)
                };
            }
            else if (inputSocket.links.length === 1) {
                const link = inputSocket.links[0];
                parameterJson = {
                    link: {
                        nodeId: link.nodeId,
                        socket: link.socketName
                    }
                };
            }
            else {
                throw new Error(`should not get here, inputSocket.links.length = ${inputSocket.links.length} > 1`);
            }
            parametersJson[inputSocket.name] = parameterJson;
        });
        if (Object.keys(parametersJson).length > 0) {
            nodeJson.parameters = parametersJson;
        }
        const flowsJson = {};
        node.outputSockets.forEach((outputSocket) => {
            if (outputSocket.valueTypeName !== 'flow')
                return;
            if (outputSocket.links.length === 0)
                return;
            const linkJson = {
                nodeId: outputSocket.links[0].nodeId,
                socket: outputSocket.links[0].socketName
            };
            flowsJson[outputSocket.name] = linkJson;
        });
        if (Object.keys(flowsJson).length > 0) {
            nodeJson.flows = flowsJson;
        }
        if (graphJson.nodes === undefined) {
            graphJson.nodes = [];
        }
        graphJson.nodes.push(nodeJson);
    });
    return graphJson;
}
exports.writeGraphToJSON = writeGraphToJSON;
