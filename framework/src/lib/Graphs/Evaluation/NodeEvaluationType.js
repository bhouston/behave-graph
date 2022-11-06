"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEvaluationType = void 0;
var NodeEvaluationType;
(function (NodeEvaluationType) {
    NodeEvaluationType[NodeEvaluationType["None"] = 0] = "None";
    NodeEvaluationType[NodeEvaluationType["Immediate"] = 1] = "Immediate";
    NodeEvaluationType[NodeEvaluationType["Flow"] = 2] = "Flow";
    NodeEvaluationType[NodeEvaluationType["FlowAsync"] = 3] = "FlowAsync";
})(NodeEvaluationType = exports.NodeEvaluationType || (exports.NodeEvaluationType = {}));
