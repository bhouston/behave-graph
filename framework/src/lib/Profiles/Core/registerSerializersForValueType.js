"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSerializersForValueType = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const NodeDescription_js_1 = require("../../Nodes/NodeDescription.js");
const In1Out1FuncNode_js_1 = require("../../Nodes/Templates/In1Out1FuncNode.js");
const toCamelCase_js_1 = require("../../toCamelCase.js");
function registerSerializersForValueType(registry, valueTypeName) {
    const camelCaseValueTypeName = (0, toCamelCase_js_1.toCamelCase)(valueTypeName);
    registry.nodes.register(new NodeDescription_js_1.NodeDescription(`math/to${camelCaseValueTypeName}/string`, 'Logic', `To ${camelCaseValueTypeName}`, (graph, nodeType) => new In1Out1FuncNode_js_1.In1Out1FuncNode(graph, nodeType, ['string'], valueTypeName, (a) => registry.values.get(valueTypeName).deserialize(a))), new NodeDescription_js_1.NodeDescription(`math/toString/${valueTypeName}`, 'Logic', 'To String', (graph, nodeType) => new In1Out1FuncNode_js_1.In1Out1FuncNode(graph, nodeType, [valueTypeName], 'string', (a) => registry.values.get(valueTypeName).serialize(a))));
}
exports.registerSerializersForValueType = registerSerializersForValueType;
