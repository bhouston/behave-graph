"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_js_1 = require("../../Diagnostics/Logger.js");
const registerCoreProfile_js_1 = require("../../Profiles/Core/registerCoreProfile.js");
const Registry_js_1 = require("../../Registry.js");
const readGraphFromJSON_js_1 = require("./readGraphFromJSON.js");
const registry = new Registry_js_1.Registry();
(0, registerCoreProfile_js_1.registerCoreProfile)(registry);
Logger_js_1.Logger.onWarn.clear();
describe('readGraphFromJSON', () => {
    it('throws if node ids are not unique', () => {
        const json = {
            variables: [],
            customEvents: [],
            nodes: [
                {
                    type: 'lifecycle/onStart',
                    id: '0'
                },
                {
                    type: 'debug/log',
                    id: '0'
                }
            ]
        };
        expect(() => (0, readGraphFromJSON_js_1.readGraphFromJSON)(json, registry)).toThrow();
    });
    it("throws if input keys don't match known sockets", () => {
        const json = {
            variables: [],
            customEvents: [],
            nodes: [
                {
                    type: 'debug/log',
                    id: '1',
                    parameters: {
                        wrong: { value: 'Hello World!' }
                    }
                }
            ]
        };
        expect(() => (0, readGraphFromJSON_js_1.readGraphFromJSON)(json, registry)).toThrow();
    });
    it('throws if input points to non-existent node', () => {
        const json = {
            variables: [],
            customEvents: [],
            nodes: [
                {
                    type: 'lifecycle/onStart',
                    id: '0'
                },
                {
                    type: 'debug/log',
                    id: '1',
                    parameters: {
                        text: { value: 'Hello World!' }
                    },
                    flows: {
                        flow: { nodeId: '2', socket: 'flow' }
                    }
                }
            ]
        };
        expect(() => (0, readGraphFromJSON_js_1.readGraphFromJSON)(json, registry)).toThrow();
    });
    it('throws if input points to non-existent socket', () => {
        const json = {
            variables: [],
            customEvents: [],
            nodes: [
                {
                    type: 'lifecycle/onStart',
                    id: '0'
                },
                {
                    type: 'debug/log',
                    id: '1',
                    parameters: {
                        text: { value: 'Hello World!' }
                    },
                    flows: {
                        flow: { nodeId: '0', socket: 'text' }
                    }
                }
            ]
        };
        expect(() => (0, readGraphFromJSON_js_1.readGraphFromJSON)(json, registry)).toThrow();
    });
});
