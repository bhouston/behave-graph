"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistry = void 0;
const validateNodeRegistry_js_1 = require("./Nodes/Validation/validateNodeRegistry.js");
const validateValueRegistry_js_1 = require("./Values/Validation/validateValueRegistry.js");
function validateRegistry(registry) {
    const errorList = [];
    errorList.push(...(0, validateValueRegistry_js_1.validateValueRegistry)(registry), ...(0, validateNodeRegistry_js_1.validateNodeRegistry)(registry));
    return errorList;
}
exports.validateRegistry = validateRegistry;
