"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuatValue = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
const Vec4_js_1 = require("./Internal/Vec4.js");
exports.QuatValue = new ValueType_js_1.ValueType('quat', () => new Vec4_js_1.Vec4(), (value) => typeof value === 'string'
    ? (0, Vec4_js_1.vec4Parse)(value)
    : new Vec4_js_1.Vec4(value.x, value.y, value.z, value.w), (value) => ({ x: value.x, y: value.y, z: value.z, w: value.w }));
