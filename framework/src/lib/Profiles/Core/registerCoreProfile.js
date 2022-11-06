"use strict";
/* eslint-disable max-len */
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
exports.registerCoreProfile = void 0;
const getNodeDescriptions_js_1 = require("../../Nodes/getNodeDescriptions.js");
const DefaultLogger_js_1 = require("./Abstractions/Drivers/DefaultLogger.js");
const ManualLifecycleEventEmitter_js_1 = require("./Abstractions/Drivers/ManualLifecycleEventEmitter.js");
const AssertExpectTrue_js_1 = require("./Debug/AssertExpectTrue.js");
const DebugLog_js_1 = require("./Debug/DebugLog.js");
const Branch_js_1 = require("./Flow/Branch.js");
const Delay_js_1 = require("./Flow/Delay.js");
const FlipFlop_js_1 = require("./Flow/FlipFlop.js");
const ForLoop_js_1 = require("./Flow/ForLoop.js");
const Sequence_js_1 = require("./Flow/Sequence.js");
const LifecycleOnEnd_js_1 = require("./Lifecycle/LifecycleOnEnd.js");
const LifecycleOnStart_js_1 = require("./Lifecycle/LifecycleOnStart.js");
const LifecycleOnTick_js_1 = require("./Lifecycle/LifecycleOnTick.js");
const registerSerializersForValueType_js_1 = require("./registerSerializersForValueType.js");
const BooleanNodes = __importStar(require("./Values/BooleanNodes.js"));
const BooleanValue_js_1 = require("./Values/BooleanValue.js");
const FloatNodes = __importStar(require("./Values/FloatNodes.js"));
const FloatValue_js_1 = require("./Values/FloatValue.js");
const IntegerNodes = __importStar(require("./Values/IntegerNodes.js"));
const IntegerValue_js_1 = require("./Values/IntegerValue.js");
const StringNodes = __importStar(require("./Values/StringNodes.js"));
const StringValue_js_1 = require("./Values/StringValue.js");
function registerCoreProfile(registry, ilogger = new DefaultLogger_js_1.DefaultLogger(), iLifeCycle = new ManualLifecycleEventEmitter_js_1.ManualLifecycleEventEmitter()) {
    const { nodes, values } = registry;
    // pull in value type nodes
    values.register(BooleanValue_js_1.BooleanValue);
    values.register(StringValue_js_1.StringValue);
    values.register(IntegerValue_js_1.IntegerValue);
    values.register(FloatValue_js_1.FloatValue);
    // pull in value type nodes
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(StringNodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(BooleanNodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(IntegerNodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(FloatNodes));
    // actions
    nodes.register(DebugLog_js_1.Log.Description(ilogger));
    nodes.register(AssertExpectTrue_js_1.ExpectTrue.Description);
    // events
    nodes.register(LifecycleOnStart_js_1.LifecycleOnStart.Description(iLifeCycle));
    nodes.register(LifecycleOnEnd_js_1.LifecycleOnEnd.Description(iLifeCycle));
    nodes.register(LifecycleOnTick_js_1.LifecycleOnTick.Description(iLifeCycle));
    // flow control
    nodes.register(Branch_js_1.Branch.Description);
    nodes.register(FlipFlop_js_1.FlipFlop.Description);
    nodes.register(ForLoop_js_1.ForLoop.Description);
    nodes.register(Sequence_js_1.Sequence.Description);
    nodes.register(Delay_js_1.Delay.Description);
    // string converters
    ['boolean', 'float', 'integer'].forEach((valueTypeName) => {
        (0, registerSerializersForValueType_js_1.registerSerializersForValueType)(registry, valueTypeName);
    });
    return registry;
}
exports.registerCoreProfile = registerCoreProfile;
