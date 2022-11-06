"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLogger = void 0;
/* eslint-disable class-methods-use-this */
const Logger_js_1 = require("../../../../Diagnostics/Logger.js");
class DefaultLogger {
    verbose(text) {
        Logger_js_1.Logger.verbose(text);
    }
    info(text) {
        Logger_js_1.Logger.info(text);
    }
    warn(text) {
        Logger_js_1.Logger.warn(text);
    }
    error(text) {
        Logger_js_1.Logger.error(text);
    }
}
exports.DefaultLogger = DefaultLogger;
