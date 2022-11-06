"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorValue = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
const Vec3_js_1 = require("./Internal/Vec3.js");
exports.ColorValue = new ValueType_js_1.ValueType('color', () => new Vec3_js_1.Vec3(), (value) => typeof value === 'string'
    ? (0, Vec3_js_1.vec3Parse)(value)
    : new Vec3_js_1.Vec3(value.r, value.g, value.b), (value) => ({ r: value.x, g: value.y, b: value.z }));
