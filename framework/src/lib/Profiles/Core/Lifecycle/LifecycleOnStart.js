"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleOnStart = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
class LifecycleOnStart extends Node_js_1.Node {
    constructor(description, graph, iLifecycleEmitter) {
        super(description, graph, [], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            const onStartEvent = () => {
                context.commit('flow');
            };
            const lifecycleEvents = this.iLifecycleEmitter;
            lifecycleEvents.startEvent.addListener(onStartEvent);
            context.onAsyncCancelled.addListener(() => {
                lifecycleEvents.startEvent.removeListener(onStartEvent);
            });
        });
        this.iLifecycleEmitter = iLifecycleEmitter;
        this.async = true;
        this.evaluateOnStartup = true;
        this.interruptibleAsync = true;
    }
}
exports.LifecycleOnStart = LifecycleOnStart;
LifecycleOnStart.Description = (emitter) => new NodeDescription_js_1.NodeDescription('lifecycle/onStart', 'Event', 'On Start', (description, graph) => new LifecycleOnStart(description, graph, emitter));
