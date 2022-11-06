"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEvent = void 0;
const EventEmitter_js_1 = require("./EventEmitter.js");
class CustomEvent {
    constructor(id, name, parameters = []) {
        this.id = id;
        this.name = name;
        this.parameters = parameters;
        this.label = '';
        this.metadata = {};
        this.eventEmitter = new EventEmitter_js_1.EventEmitter();
    }
}
exports.CustomEvent = CustomEvent;
