"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = void 0;
function toCamelCase(text) {
    if (text.length > 0) {
        return text.at(0)?.toLocaleUpperCase() + text.slice(1);
    }
    return text;
}
exports.toCamelCase = toCamelCase;
