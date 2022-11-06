"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
class Socket {
    constructor(valueTypeName, name, value = undefined, label = undefined) {
        this.valueTypeName = valueTypeName;
        this.name = name;
        this.value = value;
        this.label = label;
        this.links = [];
    }
}
exports.Socket = Socket;
