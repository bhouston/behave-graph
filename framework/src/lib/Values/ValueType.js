"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueType = void 0;
class ValueType {
    constructor(name, creator, deserialize, serialize) {
        this.name = name;
        this.creator = creator;
        this.deserialize = deserialize;
        this.serialize = serialize;
    }
}
exports.ValueType = ValueType;
