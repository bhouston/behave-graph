"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDescription = void 0;
class NodeDescription {
    constructor(typeName, category, label, factory) {
        this.typeName = typeName;
        this.category = category;
        this.label = label;
        this.factory = factory;
    }
}
exports.NodeDescription = NodeDescription;
