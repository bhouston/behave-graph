"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatValue = void 0;
const parseFloats_js_1 = require("../../../parseFloats.js");
const ValueType_js_1 = require("../../../Values/ValueType.js");
exports.FloatValue = new ValueType_js_1.ValueType('float', () => 0, (value) => typeof value === 'string' ? (0, parseFloats_js_1.parseSafeFloat)(value, 0) : value, (value) => value);
