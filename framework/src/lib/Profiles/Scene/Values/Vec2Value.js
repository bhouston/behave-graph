"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec2Value = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
const Vec2_js_1 = require("./Internal/Vec2.js");
exports.Vec2Value = new ValueType_js_1.ValueType('vec2', () => new Vec2_js_1.Vec2(), (value) => typeof value === 'string' ? (0, Vec2_js_1.vec2Parse)(value) : new Vec2_js_1.Vec2(value.x, value.y), (value) => ({ x: value.x, y: value.y }));
