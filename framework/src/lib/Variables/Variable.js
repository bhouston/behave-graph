"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
const EventEmitter_js_1 = require("../Events/EventEmitter.js");
class Variable {
    constructor(id, name, valueTypeName, initialValue // this is assumed to be properly deseriealized from a string.
    ) {
        this.id = id;
        this.name = name;
        this.valueTypeName = valueTypeName;
        this.initialValue = initialValue;
        this.label = '';
        this.metadata = {};
        this.version = 0; // this is updated on each change to the variable state.
        this.onChanged = new EventEmitter_js_1.EventEmitter();
        this.value = this.initialValue;
    }
    get() {
        return this.value;
    }
    set(newValue) {
        if (newValue !== this.value) {
            this.value = newValue;
            this.version++;
            this.onChanged.emit(this);
        }
    }
}
exports.Variable = Variable;
