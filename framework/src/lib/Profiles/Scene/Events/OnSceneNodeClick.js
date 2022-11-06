"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnSceneNodeClick = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
// very 3D specific.
class OnSceneNodeClick extends Node_js_1.Node {
    constructor(description, graph, scene) {
        super(description, graph, [new Socket_js_1.Socket('string', 'jsonPath')], [new Socket_js_1.Socket('flow', 'flow'), new Socket_js_1.Socket('flow', 'secondFlow')], (context) => {
            const jsonPath = context.readInput('jsonPath');
            scene.addOnClickedListener(jsonPath, () => {
                context.commit('flow');
                context.commit('secondFlow');
            });
        });
        this.scene = scene;
        this.async = true;
        this.evaluateOnStartup = true;
    }
    static GetDescriptions(scene) {
        return new NodeDescription_js_1.NodeDescription('scene/nodeClick', 'Event', 'On Node Click', (description, graph) => new OnSceneNodeClick(description, graph, scene));
    }
}
exports.OnSceneNodeClick = OnSceneNodeClick;
