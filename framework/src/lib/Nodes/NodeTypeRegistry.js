"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeTypeRegistry = void 0;
class NodeTypeRegistry {
    constructor() {
        this.typeNameToNodeDescriptions = {};
    }
    clear() {
        Object.keys(this.typeNameToNodeDescriptions).forEach((nodeTypeName) => {
            delete this.typeNameToNodeDescriptions[nodeTypeName];
        });
    }
    register(...descriptions) {
        descriptions.forEach((description) => {
            if (description.typeName in this.typeNameToNodeDescriptions) {
                throw new Error(`already registered node type ${description.typeName} (string)`);
            }
            this.typeNameToNodeDescriptions[description.typeName] = description;
        });
    }
    contains(typeName) {
        return typeName in this.typeNameToNodeDescriptions;
    }
    get(typeName) {
        if (!(typeName in this.typeNameToNodeDescriptions)) {
            throw new Error(`no registered node with type name ${typeName}`);
        }
        return this.typeNameToNodeDescriptions[typeName];
    }
    getAllNames() {
        return Object.keys(this.typeNameToNodeDescriptions);
    }
    getAllDescriptions() {
        return Object.values(this.typeNameToNodeDescriptions);
    }
}
exports.NodeTypeRegistry = NodeTypeRegistry;
