"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = exports.registerVariablesAndCustomEvents = void 0;
const generateUuid_js_1 = require("../generateUuid.js");
const NodeTypeRegistry_js_1 = require("../Nodes/NodeTypeRegistry.js");
const OnCustomEvent_js_1 = require("../Profiles/Core/CustomEvents/OnCustomEvent.js");
const TriggerCustomEvent_js_1 = require("../Profiles/Core/CustomEvents/TriggerCustomEvent.js");
const VariableGet_js_1 = require("../Profiles/Core/Variables/VariableGet.js");
const VariableSet_js_1 = require("../Profiles/Core/Variables/VariableSet.js");
function registerVariablesAndCustomEvents({ variables, customEvents }, registry) {
    Object.keys(variables).forEach((variableId) => {
        registry.register(VariableGet_js_1.VariableGet.GetDescription(variables, variableId), VariableSet_js_1.VariableSet.GetDescription(variables, variableId));
    });
    // re-add custom event nodes
    Object.keys(customEvents).forEach((customEventId) => {
        registry.register(OnCustomEvent_js_1.OnCustomEvent.GetDescription(customEvents, customEventId), TriggerCustomEvent_js_1.TriggerCustomEvent.GetDescription(customEvents, customEventId));
    });
}
exports.registerVariablesAndCustomEvents = registerVariablesAndCustomEvents;
class Graph {
    constructor(registry, variables = {}, customEvents = {}) {
        this.registry = registry;
        this.variables = variables;
        this.customEvents = customEvents;
        this.name = '';
        // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
        this.nodes = {};
        // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
        // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
        this.metadata = {};
        this.version = 0;
        this.dynamicNodeRegistry = new NodeTypeRegistry_js_1.NodeTypeRegistry();
        registerVariablesAndCustomEvents({
            customEvents: this.customEvents,
            variables: this.variables,
        }, this.dynamicNodeRegistry);
    }
    updateDynamicNodeDescriptions() {
        // delete existing nodes
        this.dynamicNodeRegistry.clear();
        // re-add variable nodes
        registerVariablesAndCustomEvents({
            customEvents: this.customEvents,
            variables: this.variables,
        }, this.dynamicNodeRegistry);
    }
    createNode(nodeTypeName, nodeId = (0, generateUuid_js_1.generateUuid)()) {
        if (nodeId in this.nodes) {
            throw new Error(`can not create new node of type ${nodeTypeName} with id ${nodeId} as one with that id already exists.`);
        }
        let nodeDescription = undefined;
        if (this.registry.nodes.contains(nodeTypeName)) {
            nodeDescription = this.registry.nodes.get(nodeTypeName);
        }
        if (this.dynamicNodeRegistry.contains(nodeTypeName)) {
            nodeDescription = this.dynamicNodeRegistry.get(nodeTypeName);
        }
        if (nodeDescription === undefined) {
            throw new Error(`no registered node descriptions with the typeName ${nodeTypeName}`);
        }
        const node = nodeDescription.factory(nodeDescription, this);
        node.id = nodeId;
        this.nodes[nodeId] = node;
        return node;
    }
}
exports.Graph = Graph;
