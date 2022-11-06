"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateNodeRegistry_js_1 = require("../../Nodes/Validation/validateNodeRegistry.js");
const Registry_js_1 = require("../../Registry.js");
const validateValueRegistry_js_1 = require("../../Values/Validation/validateValueRegistry.js");
const registerCoreProfile_js_1 = require("./registerCoreProfile.js");
describe('core profile', () => {
    const registry = new Registry_js_1.Registry();
    (0, registerCoreProfile_js_1.registerCoreProfile)(registry);
    test('validate node registry', () => {
        expect((0, validateNodeRegistry_js_1.validateNodeRegistry)(registry)).toHaveLength(0);
    });
    test('validate value registry', () => {
        expect((0, validateValueRegistry_js_1.validateValueRegistry)(registry)).toHaveLength(0);
    });
    const valueTypeNameToExampleValues = {
        boolean: ['true', 'false', true, false],
        string: ['hello'],
        float: [0.9, -0.1, '-999.1', '9e9'],
        integer: [5, -5, '-999', '9223372036854775807'] // mac int64 value
    };
    Object.keys(valueTypeNameToExampleValues).forEach((valueTypeName) => {
        test(`${valueTypeName} serialization/deserialization`, () => {
            const valueType = registry.values.get(valueTypeName);
            const exampleValues = valueTypeNameToExampleValues[valueTypeName];
            exampleValues.forEach((exampleValue) => {
                const deserializedValue = valueType.deserialize(exampleValue);
                const serializedValue = valueType.serialize(deserializedValue);
                const redeserializedValue = valueType.deserialize(serializedValue);
                expect(deserializedValue).toBe(redeserializedValue);
                const reserializedValue = valueType.serialize(redeserializedValue);
                expect(serializedValue).toBe(reserializedValue);
            });
        });
    });
});
