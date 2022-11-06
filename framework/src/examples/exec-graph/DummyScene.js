"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyScene = void 0;
const EventEmitter_js_1 = require("../../lib/Events/EventEmitter.js");
class DummyScene {
    constructor(registry) {
        this.registry = registry;
        this.onSceneChanged = new EventEmitter_js_1.EventEmitter();
    }
    getProperties() {
        return {};
    }
    getProperty(jsonPath, valueTypeName) {
        return this.registry.values.get(valueTypeName).creator();
    }
    setProperty() {
        this.onSceneChanged.emit();
    }
    addOnClickedListener(jsonPath, callback) {
        throw new Error('Method not implemented.');
    }
}
exports.DummyScene = DummyScene;
