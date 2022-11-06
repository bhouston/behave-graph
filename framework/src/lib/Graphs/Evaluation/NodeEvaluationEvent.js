"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEvaluationEvent = void 0;
class NodeEvaluationEvent {
    constructor(node, nodeEvaluationType, async) {
        this.node = node;
        this.nodeEvaluationType = nodeEvaluationType;
        this.async = async;
    }
}
exports.NodeEvaluationEvent = NodeEvaluationEvent;
