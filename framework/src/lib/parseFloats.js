"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSafeFloats = exports.parseSafeFloat = void 0;
const cSeparator = /[^\d+.-]+/;
function parseSafeFloat(text, fallback = 0) {
    try {
        return Number.parseFloat(text);
    }
    catch {
        return fallback;
    }
}
exports.parseSafeFloat = parseSafeFloat;
function parseSafeFloats(text, fallback = 0) {
    return text
        .split(cSeparator)
        .filter(Boolean)
        .map((value) => parseSafeFloat(value, fallback));
}
exports.parseSafeFloats = parseSafeFloats;
