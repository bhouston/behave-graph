"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assert = void 0;
class Assert {
    static mustBeTrue(condition, msg = '') {
        if (!condition) {
            throw new Error(`failed assertion: ${msg}`);
        }
    }
}
exports.Assert = Assert;
