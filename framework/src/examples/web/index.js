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
const THREEIFY = __importStar(require("threeify"));
const Logger_js_1 = require("../../lib/Diagnostics/Logger.js");
const GraphEvaluator_js_1 = require("../../lib/Graphs/Evaluation/GraphEvaluator.js");
const readGraphFromJSON_js_1 = require("../../lib/Graphs/IO/readGraphFromJSON.js");
const DefaultLogger_js_1 = require("../../lib/Profiles/Core/Abstractions/Drivers/DefaultLogger.js");
const ManualLifecycleEventEmitter_js_1 = require("../../lib/Profiles/Core/Abstractions/Drivers/ManualLifecycleEventEmitter.js");
const registerCoreProfile_js_1 = require("../../lib/Profiles/Core/registerCoreProfile.js");
const Registry_js_1 = require("../../lib/Registry.js");
async function main() {
    Logger_js_1.Logger.onVerbose.clear();
    //const geometry = icosahedronGeometry(0.75, 5);
    console.log(THREEIFY);
    const registry = new Registry_js_1.Registry();
    const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter_js_1.ManualLifecycleEventEmitter();
    const logger = new DefaultLogger_js_1.DefaultLogger();
    (0, registerCoreProfile_js_1.registerCoreProfile)(registry, logger, manualLifecycleEventEmitter);
    const graphJsonPath = '/dist/graphs/core/HelloWorld.json';
    if (graphJsonPath === undefined) {
        throw new Error('no path specified');
    }
    Logger_js_1.Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
    const request = await fetch(graphJsonPath);
    console.log('request', request);
    const json = await request.json();
    console.log('json', json);
    const graph = (0, readGraphFromJSON_js_1.readGraphFromJSON)(json, registry);
    graph.name = graphJsonPath;
    // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
    Logger_js_1.Logger.info('creating behavior graph');
    const graphEvaluator = new GraphEvaluator_js_1.GraphEvaluator(graph);
    Logger_js_1.Logger.info('executing all (async)');
    await graphEvaluator.executeAllAsync();
}
main();
