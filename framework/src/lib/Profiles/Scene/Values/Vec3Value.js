"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec3Value = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
const Vec3_js_1 = require("./Internal/Vec3.js");
exports.Vec3Value = new ValueType_js_1.ValueType('vec3', () => new Vec3_js_1.Vec3(), (value) => typeof value === 'string'
    ? (0, Vec3_js_1.vec3Parse)(value)
    : new Vec3_js_1.Vec3(value.x, value.y, value.z), (value) => ({ x: value.x, y: value.y, z: value.z }));
