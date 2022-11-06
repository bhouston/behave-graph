"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValue = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
exports.StringValue = new ValueType_js_1.ValueType('string', () => '', (value) => value, (value) => value);
