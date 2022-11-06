"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeScene = void 0;
const Assert_js_1 = require("../../lib/Diagnostics/Assert.js");
const EventEmitter_js_1 = require("../../lib/Events/EventEmitter.js");
const Vec2_js_1 = require("../../lib/Profiles/Scene/Values/Internal/Vec2.js");
const Vec3_js_1 = require("../../lib/Profiles/Scene/Values/Internal/Vec3.js");
const Vec4_js_1 = require("../../lib/Profiles/Scene/Values/Internal/Vec4.js");
function mapGlTFNodeIndicesToThreeObject3Ds(glTFJson, glTFRoot) {
    const glTFNodeIndexToThreeNode = {};
    const traverseChildren = (threeNode, glTFNodeIndex) => {
        const glTFNode = glTFJson.nodes[glTFNodeIndex];
        if (glTFNode.children === undefined)
            return;
        for (let i = 0; i < glTFNode.children.length; i++) {
            const childGLTFNodeIndex = glTFNode.children[i];
            const childThreeNode = threeNode.children[i];
            glTFNodeIndexToThreeNode[childGLTFNodeIndex] = childThreeNode;
            traverseChildren(childThreeNode, childGLTFNodeIndex);
            Assert_js_1.Assert.mustBeTrue(glTFJson.nodes[childGLTFNodeIndex].name === childThreeNode.name);
        }
    };
    for (let i = 0; i < glTFJson.scenes[0].nodes.length; i++) {
        const glTFNodeIndex = glTFJson.scenes[0].nodes[i];
        const threeNode = glTFRoot.children[i];
        glTFNodeIndexToThreeNode[glTFNodeIndex] = threeNode;
        traverseChildren(threeNode, glTFNodeIndex);
    }
    return glTFNodeIndexToThreeNode;
}
const jsonPathRegEx = /^\/?(?<resource>[^/]+)\/(?<index>\d+)\/(?<property>[^/]+)$/;
function parseJsonPath(jsonPath) {
    const matches = jsonPathRegEx.exec(jsonPath);
    if (matches === null)
        throw new Error(`can not parse jsonPath: ${jsonPath}`);
    if (matches.groups === undefined)
        throw new Error(`can not parse jsonPath (no groups): ${jsonPath}`);
    return {
        resource: matches.groups.resource,
        index: Number.parseInt(matches.groups.index),
        property: matches.groups.property,
    };
}
function toVec2(value) {
    return new Vec2_js_1.Vec2(value.x, value.y);
}
function toVec3(value) {
    return new Vec3_js_1.Vec3(value.x, value.y, value.z);
}
function toVec4(value) {
    return new Vec4_js_1.Vec4(value.x, value.y, value.z, value.w);
}
class ThreeScene {
    constructor(glTFRoot, glTFJson) {
        this.glTFRoot = glTFRoot;
        this.glTFJson = glTFJson;
        this.glTFMaterialIndexToThreeMaterial = {};
        this.onSceneChanged = new EventEmitter_js_1.EventEmitter();
        this.glTFNodeIndexToThreeNode = mapGlTFNodeIndicesToThreeObject3Ds(glTFJson, glTFRoot);
    }
    getProperty(jsonPath, valueTypeName) {
        const path = parseJsonPath(jsonPath);
        switch (path.resource) {
            case 'nodes': {
                const threeNode = this.glTFNodeIndexToThreeNode[path.index];
                switch (path.property) {
                    case 'visible': {
                        return threeNode.visible;
                    }
                    case 'translation': {
                        return toVec3(threeNode.position);
                    }
                    case 'scale': {
                        return toVec3(threeNode.scale);
                    }
                    case 'rotation': {
                        return toVec4(threeNode.quaternion);
                    }
                    default:
                        throw new Error(`unrecognized property: ${path.property}`);
                }
                break;
            }
            default:
                throw new Error(`unrecognized resource: ${path.resource}`);
        }
    }
    setProperty(jsonPath, valueTypeName, value) {
        const path = parseJsonPath(jsonPath);
        switch (path.resource) {
            case 'nodes': {
                const threeNode = this.glTFNodeIndexToThreeNode[path.index];
                switch (path.property) {
                    case 'visible': {
                        threeNode.visible = value;
                        break;
                    }
                    case 'translation': {
                        const v = value;
                        threeNode.position.set(v.x, v.y, v.z);
                        break;
                    }
                    case 'scale': {
                        const v = value;
                        threeNode.scale.set(v.x, v.y, v.z);
                        break;
                    }
                    case 'rotation': {
                        const v = value;
                        threeNode.quaternion.set(v.x, v.y, v.z, v.w);
                        break;
                    }
                    default:
                        throw new Error(`unrecognized property: ${path.property}`);
                }
                break;
            }
            default:
                throw new Error(`unrecognized resource: ${path.resource}`);
        }
        this.onSceneChanged.emit();
    }
    addOnClickedListener(jsonPath, callback) {
        throw new Error('Method not implemented.');
    }
    getProperties() {
        const nodeProperties = ['visible', 'translation', 'scale', 'rotation'];
        const names = this.glTFJson.nodes.map(({ name }) => name);
        const properties = {
            nodes: {
                names,
                properties: nodeProperties,
            },
        };
        return properties;
    }
}
exports.ThreeScene = ThreeScene;
