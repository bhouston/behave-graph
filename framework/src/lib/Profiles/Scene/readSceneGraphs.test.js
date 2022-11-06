"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DummyScene_1 = require("../../../examples/exec-graph/DummyScene");
const flashSuzanneJson = __importStar(require("../../../graphs/scene/actions/FlashSuzanne.json"));
const hierarchyJson = __importStar(require("../../../graphs/scene/actions/Hierarchy.json"));
const spinningSuzanneJson = __importStar(require("../../../graphs/scene/actions/SpinningSuzanne.json"));
const colorJson = __importStar(require("../../../graphs/scene/logic/Color.json"));
const eulerJson = __importStar(require("../../../graphs/scene/logic/Euler.json"));
const quaternionJson = __importStar(require("../../../graphs/scene/logic/Quaternion.json"));
const vector2Json = __importStar(require("../../../graphs/scene/logic/Vector2.json"));
const vector3Json = __importStar(require("../../../graphs/scene/logic/Vector3.json"));
const vector4Json = __importStar(require("../../../graphs/scene/logic/Vector4.json"));
const Logger_js_1 = require("../../Diagnostics/Logger.js");
const readGraphFromJSON_js_1 = require("../../Graphs/IO/readGraphFromJSON.js");
const validateGraphAcyclic_js_1 = require("../../Graphs/Validation/validateGraphAcyclic.js");
const validateGraphLinks_js_1 = require("../../Graphs/Validation/validateGraphLinks.js");
const Registry_js_1 = require("../../Registry.js");
const DefaultLogger_1 = require("../Core/Abstractions/Drivers/DefaultLogger");
const ManualLifecycleEventEmitter_1 = require("../Core/Abstractions/Drivers/ManualLifecycleEventEmitter");
const registerCoreProfile_js_1 = require("../Core/registerCoreProfile.js");
const registerSceneProfile_js_1 = require("./registerSceneProfile.js");
const registry = new Registry_js_1.Registry();
const emitter = new ManualLifecycleEventEmitter_1.ManualLifecycleEventEmitter();
const logger = new DefaultLogger_1.DefaultLogger();
(0, registerCoreProfile_js_1.registerCoreProfile)(registry, logger, emitter);
(0, registerSceneProfile_js_1.registerSceneProfile)(registry, emitter, new DummyScene_1.DummyScene(registry));
Logger_js_1.Logger.onWarn.clear();
const exampleMap = {
    vector2Json,
    vector3Json,
    vector4Json,
    quaternionJson,
    colorJson,
    eulerJson,
    flashSuzanneJson,
    hierarchyJson,
    spinningSuzanneJson,
};
Object.keys(exampleMap).forEach((key) => {
    describe(`${key}`, () => {
        const exampleJson = exampleMap[key];
        let parsedGraphJson;
        test('parse json to graph', () => {
            expect(() => {
                parsedGraphJson = (0, readGraphFromJSON_js_1.readGraphFromJSON)(exampleJson, registry);
            }).not.toThrow();
            // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
            if (parsedGraphJson !== undefined) {
                expect((0, validateGraphLinks_js_1.validateGraphLinks)(parsedGraphJson)).toHaveLength(0);
                expect((0, validateGraphAcyclic_js_1.validateGraphAcyclic)(parsedGraphJson)).toHaveLength(0);
            }
            else {
                expect(parsedGraphJson).toBeDefined();
            }
        });
    });
});
