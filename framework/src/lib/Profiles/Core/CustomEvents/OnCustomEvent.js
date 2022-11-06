"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnCustomEvent = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
class OnCustomEvent extends Node_js_1.Node {
    constructor(description, graph, customEvent) {
        super(description, graph, [], [
            new Socket_js_1.Socket('flow', 'flow'),
            ...customEvent.parameters.map((parameter) => new Socket_js_1.Socket(parameter.valueTypeName, parameter.name, parameter.value, parameter.label)),
        ], (context) => {
            customEvent.eventEmitter.addListener((parameters) => {
                customEvent.parameters.forEach((parameterSocket) => {
                    if (!(parameterSocket.name in parameters)) {
                        throw new Error(`parameters of custom event do not align with parameters of custom event node, missing ${parameterSocket.name}`);
                    }
                    context.writeOutput(parameterSocket.name, parameters[parameterSocket.name]);
                });
                context.commit('flow');
            });
        });
        this.customEvent = customEvent;
        // TODO replace with analysis of category, if Event, then evaluate on startup, it is async and interruptable.
        this.evaluateOnStartup = true;
        this.async = true;
        this.interruptibleAsync = true;
    }
    static GetDescription(customEvents, customEventId) {
        const customEvent = customEvents[customEventId];
        return new NodeDescription_js_1.NodeDescription(`customEvent/onTriggered/${customEvent.id}`, 'Event', `On ${customEvent.name}`, (description, graph) => new OnCustomEvent(description, graph, customEvent));
    }
}
exports.OnCustomEvent = OnCustomEvent;
