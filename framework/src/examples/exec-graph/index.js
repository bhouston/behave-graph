"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const commander_1 = require("commander");
const glob_1 = __importDefault(require("glob"));
const Logger_js_1 = require("../../lib/Diagnostics/Logger.js");
const GraphEvaluator_js_1 = require("../../lib/Graphs/Evaluation/GraphEvaluator.js");
const traceToLogger_js_1 = require("../../lib/Graphs/Evaluation/traceToLogger.js");
const readGraphFromJSON_js_1 = require("../../lib/Graphs/IO/readGraphFromJSON.js");
const writeGraphToJSON_js_1 = require("../../lib/Graphs/IO/writeGraphToJSON.js");
const validateGraph_js_1 = require("../../lib/Graphs/Validation/validateGraph.js");
const parseFloats_js_1 = require("../../lib/parseFloats.js");
const registerCoreProfile_js_1 = require("../../lib/Profiles/Core/registerCoreProfile.js");
const registerSceneProfile_js_1 = require("../../lib/Profiles/Scene/registerSceneProfile.js");
const Registry_js_1 = require("../../lib/Registry.js");
const validateRegistry_js_1 = require("../../lib/validateRegistry.js");
const DummyScene_js_1 = require("./DummyScene.js");
const index_js_1 = require("../../lib/index.js");
async function main() {
    //Logger.onVerbose.clear();
    commander_1.program
        .name('exec-graph')
        .argument('<filename>', 'path to the behavior-graph json to execute')
        .option('-t, --trace', `trace node execution`)
        .option('-p, --profile', `profile execution time`)
        .option('-d, --dryRun', `do not run graph`)
        .option('-u, --upgrade', `write json graph back to read location, upgrading format`)
        .option('-i, --iterations <iterations>', 'number of tick iterations', '5');
    commander_1.program.parse(process.argv);
    const programOptions = commander_1.program.opts();
    const registry = new Registry_js_1.Registry();
    const manualLifecycleEventEmitter = new index_js_1.ManualLifecycleEventEmitter();
    const logger = new index_js_1.DefaultLogger();
    (0, registerCoreProfile_js_1.registerCoreProfile)(registry, logger, manualLifecycleEventEmitter);
    (0, registerSceneProfile_js_1.registerSceneProfile)(registry, manualLifecycleEventEmitter, new DummyScene_js_1.DummyScene(registry));
    const jsonPattern = commander_1.program.args[0];
    (0, glob_1.default)(jsonPattern, {}, async (err, matches) => {
        for (let i = 0; i < matches.length; i++) {
            const graphJsonPath = matches[i];
            Logger_js_1.Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
            const textFile = await node_fs_1.promises.readFile(graphJsonPath);
            const graph = (0, readGraphFromJSON_js_1.readGraphFromJSON)(JSON.parse(textFile.toString('utf8')), registry);
            graph.name = graphJsonPath;
            const errorList = [];
            errorList.push(...(0, validateRegistry_js_1.validateRegistry)(registry), ...(0, validateGraph_js_1.validateGraph)(graph));
            if (errorList.length > 0) {
                Logger_js_1.Logger.error(`${errorList.length} errors found:`);
                errorList.forEach((errorText, errorIndex) => {
                    Logger_js_1.Logger.error(`${errorIndex}: ${errorText}`);
                });
                return;
            }
            if (programOptions.upgrade) {
                const newGraphJson = (0, writeGraphToJSON_js_1.writeGraphToJSON)(graph);
                await node_fs_1.promises.writeFile(graphJsonPath, JSON.stringify(newGraphJson, null, 2));
            }
            Logger_js_1.Logger.verbose('creating behavior graph');
            const graphEvaluator = new GraphEvaluator_js_1.GraphEvaluator(graph);
            if (programOptions.trace) {
                graphEvaluator.onNodeEvaluation.addListener(traceToLogger_js_1.traceToLogger);
            }
            if (programOptions.dryRun) {
                continue;
            }
            const startTime = Date.now();
            Logger_js_1.Logger.verbose('initialize graph');
            let numSteps = await graphEvaluator.executeAllSync();
            if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
                Logger_js_1.Logger.verbose('triggering start event');
                manualLifecycleEventEmitter.startEvent.emit();
                Logger_js_1.Logger.verbose('executing all (async)');
                numSteps += await graphEvaluator.executeAllAsync(5);
            }
            if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
                const iteations = (0, parseFloats_js_1.parseSafeFloat)(programOptions.iterations, 5);
                for (let tick = 0; tick < iteations; tick++) {
                    Logger_js_1.Logger.verbose(`triggering tick (${tick} of ${iteations})`);
                    manualLifecycleEventEmitter.tickEvent.emit();
                    Logger_js_1.Logger.verbose('executing all (async)');
                    // eslint-disable-next-line no-await-in-loop
                    numSteps += await graphEvaluator.executeAllAsync(5);
                }
            }
            if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
                Logger_js_1.Logger.verbose('triggering end event');
                manualLifecycleEventEmitter.endEvent.emit();
                Logger_js_1.Logger.verbose('executing all (async)');
                numSteps += await graphEvaluator.executeAllAsync(5);
            }
            if (programOptions.profile) {
                const deltaTime = Date.now() - startTime;
                Logger_js_1.Logger.info(`Profile Results: ${numSteps} nodes executed in ${deltaTime / 1000} seconds, at a rate of ${Math.round((numSteps * 1000) / deltaTime)} steps/second`);
            }
        }
    });
}
main();
