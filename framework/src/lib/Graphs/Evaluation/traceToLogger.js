"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceToLogger = void 0;
const Logger_js_1 = require("../../Diagnostics/Logger.js");
const NodeEvaluationType_js_1 = require("./NodeEvaluationType.js");
function traceToLogger(event) {
    const prefix = `<< ${event.node.description.typeName}:${event.node.id} >> `;
    if (event.nodeEvaluationType === NodeEvaluationType_js_1.NodeEvaluationType.None) {
        Logger_js_1.Logger.info(prefix + ` Eval Done`);
    }
    else {
        Logger_js_1.Logger.info(prefix +
            ` Eval Start (mode: ${NodeEvaluationType_js_1.NodeEvaluationType[event.nodeEvaluationType]}, async: ${event.async})`);
    }
}
exports.traceToLogger = traceToLogger;
