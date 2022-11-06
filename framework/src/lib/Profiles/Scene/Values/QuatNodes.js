"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equal = exports.Mix = exports.FromAngleAxis = exports.Dot = exports.Normalize = exports.Length = exports.Scale = exports.Multiply = exports.Negate = exports.Elements = exports.Create = exports.Constant = void 0;
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const In1Out1FuncNode_js_1 = require("../../../Nodes/Templates/In1Out1FuncNode.js");
const In2Out1FuncNode_js_1 = require("../../../Nodes/Templates/In2Out1FuncNode.js");
const In3Out1FuncNode_js_1 = require("../../../Nodes/Templates/In3Out1FuncNode.js");
const In4Out1FuncNode_js_1 = require("../../../Nodes/Templates/In4Out1FuncNode.js");
const VecElements_js_1 = require("../Logic/VecElements.js");
const Vec4_js_1 = require("./Internal/Vec4.js");
/*
- from Angle Axis
- from Euler
- to Angle Axis
- to Euler
- Conjugate
- Multiply
- Slerp
- Squad
- Scale
-
*/
exports.Constant = new NodeDescription_js_1.NodeDescription('math/quat', 'Logic', 'Constant', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['quat'], 'quat', (a) => a));
exports.Create = new NodeDescription_js_1.NodeDescription('math/create/quat', 'Logic', 'CREATE', (description, graph) => new In4Out1FuncNode_js_1.In4Out1FuncNode(description, graph, ['float', 'float', 'float', 'float'], 'quat', (x, y, z, w) => new Vec4_js_1.Vec4(x, y, z, w), ['x', 'y', 'z', 'w']));
exports.Elements = new NodeDescription_js_1.NodeDescription('math/elements/quat', 'Logic', 'CREATE', (description, graph) => new VecElements_js_1.VecElements(description, graph, 'quat', ['x', 'y', 'z', 'w'], Vec4_js_1.vec4ToArray));
exports.Negate = new NodeDescription_js_1.NodeDescription('math/conjugate/quat', 'Logic', '-', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['quat'], 'quat', Vec4_js_1.quatConjugate));
exports.Multiply = new NodeDescription_js_1.NodeDescription('math/multiply/quat', 'Logic', '×', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['quat', 'quat'], 'quat', Vec4_js_1.quatMultiply));
exports.Scale = new NodeDescription_js_1.NodeDescription('math/scale/quat', 'Logic', '×', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['quat', 'float'], 'quat', Vec4_js_1.vec4Scale));
exports.Length = new NodeDescription_js_1.NodeDescription('math/length/quat', 'Logic', 'LENGTH', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['quat'], 'float', Vec4_js_1.vec4Length));
exports.Normalize = new NodeDescription_js_1.NodeDescription('math/normalize/quat', 'Logic', 'NORMALIZE', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['quat'], 'quat', Vec4_js_1.vec4Normalize));
exports.Dot = new NodeDescription_js_1.NodeDescription('math/dot/quat', 'Logic', 'DOT', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['quat', 'quat'], 'float', Vec4_js_1.vec4Dot));
exports.FromAngleAxis = new NodeDescription_js_1.NodeDescription('math/toQuat/angleAxis', 'Logic', '×', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'vec3'], 'quat', Vec4_js_1.angleAxisToQuat));
exports.Mix = new NodeDescription_js_1.NodeDescription('math/slerp/quat', 'Logic', 'SLERP', (description, graph) => new In3Out1FuncNode_js_1.In3Out1FuncNode(description, graph, ['quat', 'quat', 'float'], 'quat', Vec4_js_1.quatSlerp, ['a', 'b', 't']));
exports.Equal = new NodeDescription_js_1.NodeDescription('math/equal/quat', 'Logic', '=', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['quat', 'quat'], 'boolean', Vec4_js_1.vec4Equals));
