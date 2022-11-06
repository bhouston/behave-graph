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
const delayJson = __importStar(require("../../../graphs/core/async/Delay.json"));
const customEventJson = __importStar(require("../../../graphs/core/events/CustomEvents.json"));
const lifecycleJson = __importStar(require("../../../graphs/core/events/Lifecycle.json"));
const branchJson = __importStar(require("../../../graphs/core/flow/Branch.json"));
const flipFlopJson = __importStar(require("../../../graphs/core/flow/FlipFlop.json"));
const forLoopJson = __importStar(require("../../../graphs/core/flow/ForLoop.json"));
const performanceTestJson = __importStar(require("../../../graphs/core/flow/PerformanceTest.json"));
const sequenceJson = __importStar(require("../../../graphs/core/flow/Sequence.json"));
const helloWorldJson = __importStar(require("../../../graphs/core/HelloWorld.json"));
const polynomialJson = __importStar(require("../../../graphs/core/logic/Polynomial.json"));
const frameCounterJson = __importStar(require("../../../graphs/core/variables/FrameCounter.json"));
const initialValueJson = __importStar(require("../../../graphs/core/variables/InitialValue.json"));
const setGetJson = __importStar(require("../../../graphs/core/variables/SetGet.json"));
const Logger_js_1 = require("../../Diagnostics/Logger.js");
const readGraphFromJSON_js_1 = require("../../Graphs/IO/readGraphFromJSON.js");
const validateGraphAcyclic_js_1 = require("../../Graphs/Validation/validateGraphAcyclic.js");
const validateGraphLinks_js_1 = require("../../Graphs/Validation/validateGraphLinks.js");
const Registry_js_1 = require("../../Registry.js");
const registerCoreProfile_js_1 = require("./registerCoreProfile.js");
const registry = new Registry_js_1.Registry();
(0, registerCoreProfile_js_1.registerCoreProfile)(registry);
Logger_js_1.Logger.onWarn.clear();
const exampleMap = {
    branchJson,
    delayJson,
    flipFlopJson,
    forLoopJson,
    sequenceJson,
    helloWorldJson,
    setGetJson,
    polynomialJson,
    customEventJson,
    lifecycleJson,
    frameCounterJson,
    initialValueJson,
    performanceTestJson
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
