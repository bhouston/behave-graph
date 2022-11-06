"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    clear() {
        this.listeners.splice(0, this.listeners.length);
    }
    emit(event) {
        if (this.listeners.length === 0)
            return;
        // copy array before emitting event to ensure even if listener array is modified, everyone listening initially gets the event.
        // inspired by mrdoob's EventDispatcher
        this.listeners.slice(0).forEach((listener) => {
            listener(event);
        });
    }
    get listenerCount() {
        return this.listeners.length;
    }
}
exports.EventEmitter = EventEmitter;
