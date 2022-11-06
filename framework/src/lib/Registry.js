"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
const NodeTypeRegistry_js_1 = require("./Nodes/NodeTypeRegistry.js");
const ValueTypeRegistry_js_1 = require("./Values/ValueTypeRegistry.js");
class Registry {
    constructor() {
        this.values = new ValueTypeRegistry_js_1.ValueTypeRegistry();
        this.nodes = new NodeTypeRegistry_js_1.NodeTypeRegistry();
    }
}
exports.Registry = Registry;
