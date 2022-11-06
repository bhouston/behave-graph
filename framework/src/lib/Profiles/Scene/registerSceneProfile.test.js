"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DummyScene_js_1 = require("../../../examples/exec-graph/DummyScene.js");
const validateNodeRegistry_js_1 = require("../../Nodes/Validation/validateNodeRegistry.js");
const Registry_js_1 = require("../../Registry.js");
const validateValueRegistry_js_1 = require("../../Values/Validation/validateValueRegistry.js");
const DefaultLogger_js_1 = require("../Core/Abstractions/Drivers/DefaultLogger.js");
const ManualLifecycleEventEmitter_js_1 = require("../Core/Abstractions/Drivers/ManualLifecycleEventEmitter.js");
const registerCoreProfile_js_1 = require("../Core/registerCoreProfile.js");
const registerSceneProfile_js_1 = require("./registerSceneProfile.js");
describe('scene profile', () => {
    const registry = new Registry_js_1.Registry();
    const logger = new DefaultLogger_js_1.DefaultLogger();
    const emitter = new ManualLifecycleEventEmitter_js_1.ManualLifecycleEventEmitter();
    (0, registerCoreProfile_js_1.registerCoreProfile)(registry, logger, emitter);
    (0, registerSceneProfile_js_1.registerSceneProfile)(registry, emitter, new DummyScene_js_1.DummyScene(registry));
    test('validate node registry', () => {
        expect((0, validateNodeRegistry_js_1.validateNodeRegistry)(registry)).toHaveLength(0);
    });
    test('validate value registry', () => {
        expect((0, validateValueRegistry_js_1.validateValueRegistry)(registry)).toHaveLength(0);
    });
    const valueTypeNameToExampleValues = {
        vec2: ['(0,0)', '1,0', '(100,-60.0)', { x: 0, y: 0 }, { x: -60, y: 100 }],
        vec3: ['(0,0,0)', '1,0,0', '100,-60.0,40', { x: 0, y: 0, z: 1 }, { x: -60, y: 100, z: 0 }],
        vec4: ['(0,0,0,0)', '1,0,0,0', '(100,-60.0,40,-9e9)', { x: 0, y: 0, z: 1, w: 2 }, { x: -60, y: 100, z: 0, w: -10 }],
    };
    Object.keys(valueTypeNameToExampleValues).forEach((valueTypeName) => {
        test(`${valueTypeName} serialization/deserialization`, () => {
            const valueType = registry.values.get(valueTypeName);
            const exampleValues = valueTypeNameToExampleValues[valueTypeName];
            exampleValues.forEach((exampleValue) => {
                const deserializedValue = valueType.deserialize(exampleValue);
                const serializedValue = valueType.serialize(deserializedValue);
                const redeserializedValue = valueType.deserialize(serializedValue);
                const reserializedValue = valueType.serialize(redeserializedValue);
                expect(serializedValue).toStrictEqual(reserializedValue);
            });
        });
    });
});
