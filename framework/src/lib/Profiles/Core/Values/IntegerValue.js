"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegerValue = void 0;
const ValueType_js_1 = require("../../../Values/ValueType.js");
exports.IntegerValue = new ValueType_js_1.ValueType('integer', () => 0n, (value) => BigInt(value), (value) => Number.MIN_SAFE_INTEGER <= value && value <= Number.MAX_SAFE_INTEGER
    ? Number(value)
    : value.toString() // prefer string to ensure full range is covered
);
