"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSceneProperty = void 0;
const Node_js_1 = require("../../../Nodes/Node.js");
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const Socket_js_1 = require("../../../Sockets/Socket.js");
const toCamelCase_js_1 = require("../../../toCamelCase.js");
class SetSceneProperty extends Node_js_1.Node {
    constructor(description, graph, valueTypeName, scene) {
        super(description, graph, [new Socket_js_1.Socket('flow', 'flow'), new Socket_js_1.Socket('string', 'jsonPath'), new Socket_js_1.Socket(valueTypeName, 'value')], [new Socket_js_1.Socket('flow', 'flow')], (context) => {
            const scene = this.scene;
            const value = context.readInput('value');
            scene.setProperty(context.readInput('jsonPath'), valueTypeName, value);
        });
        this.scene = scene;
    }
    static GetDescriptions(scene, ...valueTypeNames) {
        return valueTypeNames.map((valueTypeName) => new NodeDescription_js_1.NodeDescription(`scene/set/${valueTypeName}`, 'Action', `Set Scene ${(0, toCamelCase_js_1.toCamelCase)(valueTypeName)}`, (description, graph) => new SetSceneProperty(description, graph, valueTypeName, scene)));
    }
}
exports.SetSceneProperty = SetSceneProperty;
