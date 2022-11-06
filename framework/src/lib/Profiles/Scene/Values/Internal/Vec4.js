"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angleAxisToQuat = exports.eulerToQuat = exports.quatSlerp = exports.quatMultiply = exports.quatConjugate = exports.vec4Parse = exports.vec4ToString = exports.vec4ToArray = exports.vec4FromArray = exports.vec4Mix = exports.vec4Dot = exports.vec4Normalize = exports.vec4Length = exports.vec4Negate = exports.vec4Scale = exports.vec4Subtract = exports.vec4Add = exports.vec4Equals = exports.Vec4 = void 0;
const parseFloats_js_1 = require("../../../../parseFloats.js");
class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    clone(optionalResult = new Vec4()) {
        return optionalResult.set(this.x, this.y, this.z, this.w);
    }
    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
}
exports.Vec4 = Vec4;
function vec4Equals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w == b.w;
}
exports.vec4Equals = vec4Equals;
function vec4Add(a, b, optionalResult = new Vec4()) {
    return optionalResult.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}
exports.vec4Add = vec4Add;
function vec4Subtract(a, b, optionalResult = new Vec4()) {
    return optionalResult.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}
exports.vec4Subtract = vec4Subtract;
function vec4Scale(a, b, optionalResult = new Vec4()) {
    return optionalResult.set(a.x * b, a.y * b, a.z * b, a.w * b);
}
exports.vec4Scale = vec4Scale;
function vec4Negate(a, optionalResult = new Vec4()) {
    return optionalResult.set(-a.x, -a.y, -a.z, -a.w);
}
exports.vec4Negate = vec4Negate;
function vec4Length(a) {
    return Math.sqrt(vec4Dot(a, a));
}
exports.vec4Length = vec4Length;
function vec4Normalize(a, optionalResult = new Vec4()) {
    const invLength = 1 / vec4Length(a);
    return vec4Scale(a, invLength, optionalResult);
}
exports.vec4Normalize = vec4Normalize;
function vec4Dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}
exports.vec4Dot = vec4Dot;
function vec4Mix(a, b, t, optionalResult = new Vec4()) {
    const s = 1 - t;
    return optionalResult.set(a.x * s + b.x * t, a.y * s + b.y * t, a.z * s + b.z * t, a.w * s + b.w * t);
}
exports.vec4Mix = vec4Mix;
function vec4FromArray(array, offset = 0, optionalResult = new Vec4()) {
    return optionalResult.set(array[offset + 0], array[offset + 1], array[offset + 2], array[offset + 3]);
}
exports.vec4FromArray = vec4FromArray;
function vec4ToArray(a, array, offset = 0) {
    array[offset + 0] = a.x;
    array[offset + 1] = a.y;
    array[offset + 2] = a.z;
    array[offset + 3] = a.w;
}
exports.vec4ToArray = vec4ToArray;
function vec4ToString(a) {
    return `(${a.x}, ${a.y}, ${a.z}, ${a.w})`;
}
exports.vec4ToString = vec4ToString;
function vec4Parse(text, optionalResult = new Vec4()) {
    return vec4FromArray((0, parseFloats_js_1.parseSafeFloats)(text), 0, optionalResult);
}
exports.vec4Parse = vec4Parse;
function quatConjugate(a, optionalResult = new Vec4()) {
    return optionalResult.set(-a.x, -a.y, -a.z, a.w);
}
exports.quatConjugate = quatConjugate;
function quatMultiply(a, b, optionalResult = new Vec4()) {
    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
    const qax = a.x;
    const qay = a.y;
    const qaz = a.z;
    const qaw = a.w;
    const qbx = b.x;
    const qby = b.y;
    const qbz = b.z;
    const qbw = b.w;
    return optionalResult.set(qax * qbw + qaw * qbx + qay * qbz - qaz * qby, qay * qbw + qaw * qby + qaz * qbx - qax * qbz, qaz * qbw + qaw * qbz + qax * qby - qay * qbx, qaw * qbw - qax * qbx - qay * qby - qaz * qbz);
}
exports.quatMultiply = quatMultiply;
function quatSlerp(a, b, t, optionalResult = new Vec4()) {
    if (t <= 0)
        return a.clone(optionalResult);
    if (t >= 1)
        return b.clone(optionalResult);
    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
    let cosHalfTheta = vec4Dot(a, b);
    if (cosHalfTheta < 0) {
        vec4Negate(b, optionalResult);
        cosHalfTheta = -cosHalfTheta;
    }
    else {
        b.clone(optionalResult);
    }
    if (cosHalfTheta >= 1) {
        return optionalResult;
    }
    const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
    if (sqrSinHalfTheta <= Number.EPSILON) {
        vec4Mix(a, optionalResult, t);
        vec4Normalize(optionalResult, optionalResult);
        return optionalResult;
    }
    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    optionalResult.w = a.w * ratioA + optionalResult.w * ratioB;
    optionalResult.x = a.x * ratioA + optionalResult.x * ratioB;
    optionalResult.y = a.y * ratioA + optionalResult.y * ratioB;
    optionalResult.z = a.z * ratioA + optionalResult.z * ratioB;
    return optionalResult;
}
exports.quatSlerp = quatSlerp;
function eulerToQuat(euler, optionalResult = new Vec4()) {
    // eslint-disable-next-line max-len
    // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
    const c1 = Math.cos(euler.x / 2);
    const c2 = Math.cos(euler.y / 2);
    const c3 = Math.cos(euler.z / 2);
    const s1 = Math.sin(euler.x / 2);
    const s2 = Math.sin(euler.y / 2);
    const s3 = Math.sin(euler.z / 2);
    // XYZ order only
    return optionalResult.set(s1 * c2 * c3 + c1 * s2 * s3, c1 * s2 * c3 - s1 * c2 * s3, c1 * c2 * s3 + s1 * s2 * c3, c1 * c2 * c3 - s1 * s2 * s3);
}
exports.eulerToQuat = eulerToQuat;
function angleAxisToQuat(angle, axis, optionalResult = new Vec4()) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    // assumes axis is normalized
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);
    return optionalResult.set(axis.x * s, axis.y * s, axis.z * s, Math.cos(halfAngle));
}
exports.angleAxisToQuat = angleAxisToQuat;
