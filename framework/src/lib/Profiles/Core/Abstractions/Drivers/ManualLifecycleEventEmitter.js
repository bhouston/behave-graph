"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualLifecycleEventEmitter = void 0;
const EventEmitter_js_1 = require("../../../../Events/EventEmitter.js");
class ManualLifecycleEventEmitter {
    constructor() {
        this.startEvent = new EventEmitter_js_1.EventEmitter();
        this.endEvent = new EventEmitter_js_1.EventEmitter();
        this.tickEvent = new EventEmitter_js_1.EventEmitter();
    }
}
exports.ManualLifecycleEventEmitter = ManualLifecycleEventEmitter;
