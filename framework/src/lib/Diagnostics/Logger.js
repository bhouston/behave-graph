"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const EventEmitter_js_1 = require("../Events/EventEmitter.js");
class Logger {
    static verbose(text) {
        this.onVerbose.emit(text);
    }
    static info(text) {
        this.onInfo.emit(text);
    }
    static warn(text) {
        this.onWarn.emit(text);
    }
    static error(text) {
        this.onError.emit(text);
    }
}
exports.Logger = Logger;
Logger.onVerbose = new EventEmitter_js_1.EventEmitter();
Logger.onInfo = new EventEmitter_js_1.EventEmitter();
Logger.onWarn = new EventEmitter_js_1.EventEmitter();
Logger.onError = new EventEmitter_js_1.EventEmitter();
(() => {
    const prefix = () => {
        return new Date().toLocaleTimeString().padStart(11, '0');
    };
    Logger.onVerbose.addListener((text) => {
        console.log(prefix() + ` VERB:  ${text}`);
    });
    Logger.onInfo.addListener((text) => {
        console.log(prefix() + ` INFO:  ${text}`);
    });
    Logger.onWarn.addListener((text) => {
        console.warn(prefix() + ` WARN:  ${text}`);
    });
    Logger.onError.addListener((text) => {
        console.error(prefix() + ` ERR:  ${text}`);
    });
})();
