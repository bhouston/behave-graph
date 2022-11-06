"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleOnEnd = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
class LifecycleOnEnd extends Node_js_1.Node {
    constructor(description, graph, iLifecycleEmitter) {
        super(description, graph, [], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            const onEndEvent = () => {
                context.commit('flow');
            };
            const lifecycleEvents = this.iLifecycleEmitter;
            lifecycleEvents.endEvent.addListener(onEndEvent);
            context.onAsyncCancelled.addListener(() => {
                lifecycleEvents.endEvent.removeListener(onEndEvent);
            });
        });
        this.iLifecycleEmitter = iLifecycleEmitter;
        this.async = true;
        this.evaluateOnStartup = true;
        this.interruptibleAsync = true;
    }
}
exports.LifecycleOnEnd = LifecycleOnEnd;
LifecycleOnEnd.Description = (emitter) => new NodeDescription_js_1.NodeDescription('lifecycle/onEnd', 'Event', 'On End', (description, graph) => new LifecycleOnEnd(description, graph, emitter));
