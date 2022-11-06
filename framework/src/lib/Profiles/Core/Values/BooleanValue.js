"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanValue = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
exports.BooleanValue = new ValueType_js_1.ValueType('boolean', () => false, (value) => typeof value === 'string' ? value.toLowerCase() === 'true' : value, (value) => value);
