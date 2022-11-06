"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const commander_1 = require("commander");
const csv_stringify_1 = require("csv-stringify");
const Logger_js_1 = require("../../lib/Diagnostics/Logger.js");
const writeNodeSpecsToJSON_js_1 = require("../../lib/Graphs/IO/writeNodeSpecsToJSON.js");
const validateNodeRegistry_js_1 = require("../../lib/Nodes/Validation/validateNodeRegistry.js");
const registerCoreProfile_js_1 = require("../../lib/Profiles/Core/registerCoreProfile.js");
const registerSceneProfile_js_1 = require("../../lib/Profiles/Scene/registerSceneProfile.js");
const Registry_js_1 = require("../../lib/Registry.js");
const DummyScene_js_1 = require("../exec-graph/DummyScene.js");
const index_js_1 = require("../../lib/index.js");
async function main() {
    // Logger.onVerbose.clear();
    commander_1.program
        .name('exec-graph')
        .argument('<filename>', 'path to the output node-spec json export')
        .option('-c, --csv', `output in CSV mode`);
    commander_1.program.parse(process.argv);
    const programOptions = commander_1.program.opts();
    const outputPath = commander_1.program.args[0];
    if (outputPath === undefined) {
        throw new Error('no path specified');
    }
    const registry = new Registry_js_1.Registry();
    const eventemitter = new index_js_1.ManualLifecycleEventEmitter();
    (0, registerCoreProfile_js_1.registerCoreProfile)(registry, new index_js_1.DefaultLogger(), eventemitter);
    (0, registerSceneProfile_js_1.registerSceneProfile)(registry, eventemitter, new DummyScene_js_1.DummyScene(registry));
    const errorList = [];
    errorList.push(...(0, validateNodeRegistry_js_1.validateNodeRegistry)(registry));
    if (errorList.length > 0) {
        Logger_js_1.Logger.error(`${errorList.length} errors found:`);
        errorList.forEach((errorText, errorIndex) => {
            Logger_js_1.Logger.error(`${errorIndex}: ${errorText}`);
        });
        return;
    }
    const nodeSpecJson = (0, writeNodeSpecsToJSON_js_1.writeNodeSpecsToJSON)(registry);
    nodeSpecJson.sort((a, b) => a.type.localeCompare(b.type));
    const jsonOutput = JSON.stringify(nodeSpecJson, null, ' ');
    if (programOptions.csv) {
        const csvRows = [];
        nodeSpecJson.forEach((nodeSpec) => {
            const csvRow = [];
            csvRow.push(nodeSpec.type, nodeSpec.category);
            for (let i = 0; i < 5; i++) {
                if (i < nodeSpec.inputs.length) {
                    csvRow.push(nodeSpec.inputs[i].name, nodeSpec.inputs[i].valueType, nodeSpec.inputs[i].defaultValue?.toString() || '');
                }
                else {
                    csvRow.push('', '', '');
                }
            }
            for (let i = 0; i < 5; i++) {
                if (i < nodeSpec.outputs.length) {
                    csvRow.push(nodeSpec.outputs[i].name, nodeSpec.outputs[i].valueType);
                }
                else {
                    csvRow.push('', '');
                }
            }
            csvRows.push(csvRow);
        });
        (0, csv_stringify_1.stringify)(csvRows, async (err, csvOutput) => {
            await node_fs_1.promises.writeFile(outputPath, csvOutput, {
                encoding: 'utf-8',
            });
        });
    }
    else {
        await node_fs_1.promises.writeFile(outputPath, jsonOutput, {
            encoding: 'utf-8',
        });
    }
}
main();
