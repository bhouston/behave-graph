"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2Parse = exports.vec2ToString = exports.vec2ToArray = exports.vec2FromArray = exports.vec2Mix = exports.vec2Dot = exports.vec2Normalize = exports.vec2Length = exports.vec2Negate = exports.vec2Scale = exports.vec2Subtract = exports.vec2Add = exports.vec2Equals = exports.Vec2 = void 0;
const parseFloats_js_1 = require("../../../../parseFloats.js");
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone(optionalResult = new Vec2()) {
        return optionalResult.set(this.x, this.y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}
exports.Vec2 = Vec2;
function vec2Equals(a, b) {
    return a.x === b.x && a.y === b.y;
}
exports.vec2Equals = vec2Equals;
function vec2Add(a, b, optionalResult = new Vec2()) {
    return optionalResult.set(a.x + b.x, a.y + b.y);
}
exports.vec2Add = vec2Add;
function vec2Subtract(a, b, optionalResult = new Vec2()) {
    return optionalResult.set(a.x - b.x, a.y - b.y);
}
exports.vec2Subtract = vec2Subtract;
function vec2Scale(a, b, optionalResult = new Vec2()) {
    return optionalResult.set(a.x * b, a.y * b);
}
exports.vec2Scale = vec2Scale;
function vec2Negate(a, optionalResult = new Vec2()) {
    return optionalResult.set(-a.x, -a.y);
}
exports.vec2Negate = vec2Negate;
function vec2Length(a) {
    return Math.sqrt(vec2Dot(a, a));
}
exports.vec2Length = vec2Length;
function vec2Normalize(a, optionalResult = new Vec2()) {
    const invLength = 1 / vec2Length(a);
    return vec2Scale(a, invLength, optionalResult);
}
exports.vec2Normalize = vec2Normalize;
function vec2Dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
exports.vec2Dot = vec2Dot;
function vec2Mix(a, b, t, optionalResult = new Vec2()) {
    const s = 1 - t;
    return optionalResult.set(a.x * s + b.x * t, a.y * s + b.y * t);
}
exports.vec2Mix = vec2Mix;
function vec2FromArray(array, offset = 0, optionalResult = new Vec2()) {
    return optionalResult.set(array[offset + 0], array[offset + 1]);
}
exports.vec2FromArray = vec2FromArray;
function vec2ToArray(a, array, offset = 0) {
    array[offset + 0] = a.x;
    array[offset + 1] = a.y;
}
exports.vec2ToArray = vec2ToArray;
function vec2ToString(a) {
    return `(${a.x}, ${a.y})`;
}
exports.vec2ToString = vec2ToString;
function vec2Parse(text, optionalResult = new Vec2()) {
    return vec2FromArray((0, parseFloats_js_1.parseSafeFloats)(text), 0, optionalResult);
}
exports.vec2Parse = vec2Parse;
