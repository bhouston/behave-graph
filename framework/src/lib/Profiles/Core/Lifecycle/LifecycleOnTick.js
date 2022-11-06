"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleOnTick = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
class LifecycleOnTick extends Node_js_1.Node {
    constructor(description, graph, iLifecycleEmitter) {
        super(description, graph, [], [new Socket_js_1.Socket('flow', 'flow'), new Socket_js_1.Socket('float', 'deltaSeconds'), new Socket_js_1.Socket('float', 'time')], (context) => {
            let lastTickTime = Date.now();
            const onTickEvent = () => {
                const currentTime = Date.now();
                const deltaSeconds = (currentTime - lastTickTime) * 0.001;
                context.writeOutput('deltaSeconds', deltaSeconds);
                context.writeOutput('time', Date.now());
                context.commit('flow');
                lastTickTime = currentTime;
            };
            const lifecycleEvents = this.iLifecycleEmitter;
            lifecycleEvents.tickEvent.addListener(onTickEvent);
            context.onAsyncCancelled.addListener(() => {
                lifecycleEvents.tickEvent.removeListener(onTickEvent);
            });
        });
        this.iLifecycleEmitter = iLifecycleEmitter;
        this.async = true;
        this.evaluateOnStartup = true;
        this.interruptibleAsync = true;
    }
}
exports.LifecycleOnTick = LifecycleOnTick;
LifecycleOnTick.Description = (emitter) => new NodeDescription_js_1.NodeDescription('lifecycle/onTick', 'Event', 'On Tick', (description, graph) => new LifecycleOnTick(description, graph, emitter));
