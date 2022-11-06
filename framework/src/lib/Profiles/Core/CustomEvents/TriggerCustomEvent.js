"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerCustomEvent = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class TriggerCustomEvent extends Node_js_1.Node {
    constructor(description, graph, customEvent) {
        super(description, graph, [
            new Socket_js_1.Socket('flow', 'flow'),
            ...customEvent.parameters.map((parameter) => new Socket_js_1.Socket(parameter.valueTypeName, parameter.name, parameter.value, parameter.label)),
        ], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            const parameters = {};
            customEvent.parameters.forEach((parameterSocket) => {
                parameters[parameterSocket.name] = context.readInput(parameterSocket.name);
            });
            customEvent.eventEmitter.emit(parameters);
        });
        this.customEvent = customEvent;
    }
    static GetDescription(customEvents, customEventId) {
        const customEvent = customEvents[customEventId];
        return new NodeDescription_js_1.NodeDescription(`customEvent/trigger/${customEvent.id}`, 'Action', `Trigger ${customEvent.name}`, (description, graph) => new TriggerCustomEvent(description, graph, customEvent));
    }
}
exports.TriggerCustomEvent = TriggerCustomEvent;
