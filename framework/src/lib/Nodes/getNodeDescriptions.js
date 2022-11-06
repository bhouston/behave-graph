"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeDescriptions = void 0;
const NodeDescription_js_1 = require("./NodeDescription.js");
function getNodeDescriptions(importWildcard) {
    return Object.keys(importWildcard)
        .map((key) => importWildcard[key])
        .filter((value) => value instanceof NodeDescription_js_1.NodeDescription);
}
exports.getNodeDescriptions = getNodeDescriptions;
