"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueTypeRegistry = void 0;
class ValueTypeRegistry {
    constructor() {
        this.valueTypeNameToValueType = {};
    }
    register(...valueTypes) {
        valueTypes.forEach((valueType) => {
            if (valueType.name in this.valueTypeNameToValueType) {
                throw new Error(`already registered value type ${valueType.name}`);
            }
            this.valueTypeNameToValueType[valueType.name] = valueType;
        });
    }
    get(valueTypeName) {
        if (!(valueTypeName in this.valueTypeNameToValueType)) {
            throw new Error(`can not find value type with name '${valueTypeName}`);
        }
        return this.valueTypeNameToValueType[valueTypeName];
    }
    getAllNames() {
        return Object.keys(this.valueTypeNameToValueType);
    }
}
exports.ValueTypeRegistry = ValueTypeRegistry;
