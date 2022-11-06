"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInf = exports.IsNaN = exports.LessThanOrEqual = exports.LessThan = exports.GreaterThanOrEqual = exports.GreaterThan = exports.Equal = exports.Random = exports.Trunc = exports.Round = exports.Ceil = exports.Floor = exports.Sign = exports.Abs = exports.Clamp = exports.Max = exports.Min = exports.ToFloat = exports.Mix = exports.Atan = exports.Tan = exports.Acos = exports.Cos = exports.Asin = exports.Sin = exports.PI = exports.Log10 = exports.Log2 = exports.Ln = exports.Exp = exports.E = exports.SquareRoot = exports.Power = exports.Modulus = exports.Divide = exports.Multiply = exports.Negate = exports.Subtract = exports.Add = exports.Constant = void 0;
const NodeDescription_js_1 = require("../../../Nodes/NodeDescription.js");
const In0Out1FuncNode_js_1 = require("../../../Nodes/Templates/In0Out1FuncNode.js");
const In1Out1FuncNode_js_1 = require("../../../Nodes/Templates/In1Out1FuncNode.js");
const In2Out1FuncNode_js_1 = require("../../../Nodes/Templates/In2Out1FuncNode.js");
const In3Out1FuncNode_js_1 = require("../../../Nodes/Templates/In3Out1FuncNode.js");
// Unreal Engine Blueprint Float nodes: https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Math/Float/
exports.Constant = new NodeDescription_js_1.NodeDescription('math/float', 'Logic', 'Constant', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', (a) => a));
exports.Add = new NodeDescription_js_1.NodeDescription('math/add/float', 'Logic', '+', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => a + b));
exports.Subtract = new NodeDescription_js_1.NodeDescription('math/subtract/float', 'Logic', '-', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => a - b));
exports.Negate = new NodeDescription_js_1.NodeDescription('math/negate/float', 'Logic', '-', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', (a) => -a));
exports.Multiply = new NodeDescription_js_1.NodeDescription('math/multiply/float', 'Logic', '×', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => {
    console.log({ a, b });
    a * b;
}));
exports.Divide = new NodeDescription_js_1.NodeDescription('math/divide/float', 'Logic', '÷', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => a / b));
exports.Modulus = new NodeDescription_js_1.NodeDescription('math/modulus/float', 'Logic', 'MOD', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => a % b));
exports.Power = new NodeDescription_js_1.NodeDescription('math/pow/float', 'Logic', 'POW', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', Math.pow));
exports.SquareRoot = new NodeDescription_js_1.NodeDescription('math/sqrt/float', 'Logic', 'SQRT', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.sqrt));
exports.E = new NodeDescription_js_1.NodeDescription('math/e/float', 'Logic', 'e', (description, graph) => new In0Out1FuncNode_js_1.In0Out1FuncNode(description, graph, 'float', () => Math.E));
exports.Exp = new NodeDescription_js_1.NodeDescription('math/exp/float', 'Logic', 'EXP', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.exp));
exports.Ln = new NodeDescription_js_1.NodeDescription('math/ln/float', 'Logic', 'LN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.log));
exports.Log2 = new NodeDescription_js_1.NodeDescription('math/log2/float', 'Logic', 'LOG2', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.log2));
exports.Log10 = new NodeDescription_js_1.NodeDescription('math/log10/float', 'Logic', 'LOG10', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.log10));
exports.PI = new NodeDescription_js_1.NodeDescription('math/pi/float', 'Logic', 'π', (description, graph) => new In0Out1FuncNode_js_1.In0Out1FuncNode(description, graph, 'float', () => Math.PI));
exports.Sin = new NodeDescription_js_1.NodeDescription('math/sin/float', 'Logic', 'SIN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.sin));
exports.Asin = new NodeDescription_js_1.NodeDescription('math/asin/float', 'Logic', 'ASIN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.asin));
exports.Cos = new NodeDescription_js_1.NodeDescription('math/cos/float', 'Logic', 'COS', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.cos));
exports.Acos = new NodeDescription_js_1.NodeDescription('math/acos/float', 'Logic', 'ACOS', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.acos));
exports.Tan = new NodeDescription_js_1.NodeDescription('math/tan/float', 'Logic', 'TAN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.tan));
exports.Atan = new NodeDescription_js_1.NodeDescription('math/atan/float', 'Logic', 'ATAN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.atan));
exports.Mix = new NodeDescription_js_1.NodeDescription('math/mix/float', 'Logic', 'MIX', (description, graph) => new In3Out1FuncNode_js_1.In3Out1FuncNode(description, graph, ['float', 'float', 'float'], 'float', (a, b, t) => {
    const s = 1 - t;
    return a * s + b * t;
}, ['a', 'b', 't']));
exports.ToFloat = new NodeDescription_js_1.NodeDescription('math/toFloat/float', 'Logic', 'To Float', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', (a) => Number(a)));
exports.Min = new NodeDescription_js_1.NodeDescription('math/min/float', 'Logic', 'MIN', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => Math.min(a, b) // TODO: can I jsut pass in Math.min?
));
exports.Max = new NodeDescription_js_1.NodeDescription('math/max/float', 'Logic', 'MAX', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'float', (a, b) => Math.max(a, b) // TODO: can I jsut pass in Math.max?
));
exports.Clamp = new NodeDescription_js_1.NodeDescription('math/clamp/float', 'Logic', 'CLAMP', (description, graph) => new In3Out1FuncNode_js_1.In3Out1FuncNode(description, graph, ['float', 'float', 'float'], 'float', (value, min, max) => (value < min ? min : value > max ? max : value), ['value', 'min', 'max']));
exports.Abs = new NodeDescription_js_1.NodeDescription('math/abs/float', 'Logic', 'ABS', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.abs));
exports.Sign = new NodeDescription_js_1.NodeDescription('math/sign/float', 'Logic', 'SIGN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.sign));
exports.Floor = new NodeDescription_js_1.NodeDescription('math/floor/float', 'Logic', 'FLOOR', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.floor));
exports.Ceil = new NodeDescription_js_1.NodeDescription('math/ceil/float', 'Logic', 'CEIL', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.ceil));
exports.Round = new NodeDescription_js_1.NodeDescription('math/round/float', 'Logic', 'ROUND', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.round));
exports.Trunc = new NodeDescription_js_1.NodeDescription('math/trunc/float', 'Logic', 'TRUNC', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'float', Math.trunc));
exports.Random = new NodeDescription_js_1.NodeDescription('math/random/float', 'Logic', 'RANDOM', (description, graph) => new In0Out1FuncNode_js_1.In0Out1FuncNode(description, graph, 'float', Math.random));
exports.Equal = new NodeDescription_js_1.NodeDescription('math/equal/float', 'Logic', '=', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'boolean', (a, b) => a === b));
exports.GreaterThan = new NodeDescription_js_1.NodeDescription('math/greaterThan/float', 'Logic', '>', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'boolean', (a, b) => a > b));
exports.GreaterThanOrEqual = new NodeDescription_js_1.NodeDescription('math/greaterThanOrEqual/float', 'Logic', '≥', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'boolean', (a, b) => a >= b));
exports.LessThan = new NodeDescription_js_1.NodeDescription('math/lessThan/float', 'Logic', '<', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'boolean', (a, b) => a < b));
exports.LessThanOrEqual = new NodeDescription_js_1.NodeDescription('math/lessThanOrEqual/float', 'Logic', '≤', (description, graph) => new In2Out1FuncNode_js_1.In2Out1FuncNode(description, graph, ['float', 'float'], 'boolean', (a, b) => a <= b));
exports.IsNaN = new NodeDescription_js_1.NodeDescription('math/isNaN/float', 'Logic', 'isNaN', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'boolean', Number.isNaN));
exports.IsInf = new NodeDescription_js_1.NodeDescription('math/isInf/float', 'Logic', 'isInf', (description, graph) => new In1Out1FuncNode_js_1.In1Out1FuncNode(description, graph, ['float'], 'boolean', (a) => !Number.isFinite(a) && !Number.isNaN(a)));
