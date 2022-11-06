"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGraph = void 0;
const validateGraphAcyclic_js_1 = require("./validateGraphAcyclic.js");
const validateGraphLinks_js_1 = require("./validateGraphLinks.js");
function validateGraph(graph) {
    const errorList = [];
    errorList.push(...(0, validateGraphAcyclic_js_1.validateGraphAcyclic)(graph), ...(0, validateGraphLinks_js_1.validateGraphLinks)(graph));
    return errorList;
}
exports.validateGraph = validateGraph;
