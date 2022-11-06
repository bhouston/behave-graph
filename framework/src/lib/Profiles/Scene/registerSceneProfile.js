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
exports.registerSceneProfile = void 0;
/* eslint-disable max-len */
const getNodeDescriptions_js_1 = require("../../Nodes/getNodeDescriptions.js");
const registerSerializersForValueType_js_1 = require("../Core/registerSerializersForValueType.js");
const SetSceneProperty_js_1 = require("./Actions/SetSceneProperty.js");
const OnSceneNodeClick_js_1 = require("./Events/OnSceneNodeClick.js");
const GetSceneProperty_js_1 = require("./Queries/GetSceneProperty.js");
const ColorNodes = __importStar(require("./Values/ColorNodes.js"));
const ColorValue_js_1 = require("./Values/ColorValue.js");
const EulerNodes = __importStar(require("./Values/EulerNodes.js"));
const EulerValue_js_1 = require("./Values/EulerValue.js");
const QuatNodes = __importStar(require("./Values/QuatNodes.js"));
const QuatValue_js_1 = require("./Values/QuatValue.js");
const Vec2Nodes = __importStar(require("./Values/Vec2Nodes.js"));
const Vec2Value_js_1 = require("./Values/Vec2Value.js");
const Vec3Nodes = __importStar(require("./Values/Vec3Nodes.js"));
const Vec3Value_js_1 = require("./Values/Vec3Value.js");
const Vec4Nodes = __importStar(require("./Values/Vec4Nodes.js"));
const Vec4Value_js_1 = require("./Values/Vec4Value.js");
function registerSceneProfile(registry, emitter, scene) {
    const { values, nodes } = registry;
    // pull in value type nodes
    values.register(Vec2Value_js_1.Vec2Value);
    values.register(Vec3Value_js_1.Vec3Value);
    values.register(Vec4Value_js_1.Vec4Value);
    values.register(ColorValue_js_1.ColorValue);
    values.register(EulerValue_js_1.EulerValue);
    values.register(QuatValue_js_1.QuatValue);
    // pull in value type nodes
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(Vec2Nodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(Vec3Nodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(Vec4Nodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(ColorNodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(EulerNodes));
    nodes.register(...(0, getNodeDescriptions_js_1.getNodeDescriptions)(QuatNodes));
    // events
    nodes.register(OnSceneNodeClick_js_1.OnSceneNodeClick.GetDescriptions(scene));
    // actions
    const allValueTypeNames = values.getAllNames();
    nodes.register(...SetSceneProperty_js_1.SetSceneProperty.GetDescriptions(scene, ...allValueTypeNames));
    nodes.register(...GetSceneProperty_js_1.GetSceneProperty.GetDescriptions(scene, ...allValueTypeNames));
    const newValueTypeNames = ['vec2', 'vec3', 'vec4', 'quat', 'euler', 'color'];
    // variables
    newValueTypeNames.forEach((valueTypeName) => {
        (0, registerSerializersForValueType_js_1.registerSerializersForValueType)(registry, valueTypeName);
    });
    return registry;
}
exports.registerSceneProfile = registerSceneProfile;
