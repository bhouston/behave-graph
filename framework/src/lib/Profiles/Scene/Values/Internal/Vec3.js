"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHex = exports.hexToRGB = exports.rgbToHSL = exports.hslToRGB = exports.vec3Parse = exports.vec3ToString = exports.vec3ToArray = exports.vec3FromArray = exports.vec3Mix = exports.vec3Cross = exports.vec3Dot = exports.vec3Normalize = exports.vec3Length = exports.vec3Negate = exports.vec3Scale = exports.vec3Subtract = exports.vec3Add = exports.vec3Equals = exports.Vec3 = void 0;
const parseFloats_js_1 = require("../../../../parseFloats.js");
class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    clone(optionalResult = new Vec3()) {
        return optionalResult.set(this.x, this.y, this.z);
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
}
exports.Vec3 = Vec3;
function vec3Equals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}
exports.vec3Equals = vec3Equals;
function vec3Add(a, b, optionalResult = new Vec3()) {
    return optionalResult.set(a.x + b.x, a.y + b.y, a.z + b.z);
}
exports.vec3Add = vec3Add;
function vec3Subtract(a, b, optionalResult = new Vec3()) {
    return optionalResult.set(a.x - b.x, a.y - b.y, a.z - b.z);
}
exports.vec3Subtract = vec3Subtract;
function vec3Scale(a, b, optionalResult = new Vec3()) {
    return optionalResult.set(a.x * b, a.y * b, a.z * b);
}
exports.vec3Scale = vec3Scale;
function vec3Negate(a, optionalResult = new Vec3()) {
    return optionalResult.set(-a.x, -a.y, -a.z);
}
exports.vec3Negate = vec3Negate;
function vec3Length(a) {
    return Math.sqrt(vec3Dot(a, a));
}
exports.vec3Length = vec3Length;
function vec3Normalize(a, optionalResult = new Vec3()) {
    const invLength = 1 / vec3Length(a);
    return vec3Scale(a, invLength, optionalResult);
}
exports.vec3Normalize = vec3Normalize;
function vec3Dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
exports.vec3Dot = vec3Dot;
function vec3Cross(a, b, optionalResult = new Vec3()) {
    const ax = a.x;
    const ay = a.y;
    const az = a.z;
    const bx = b.x;
    const by = b.y;
    const bz = b.z;
    return optionalResult.set(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
}
exports.vec3Cross = vec3Cross;
function vec3Mix(a, b, t, optionalResult = new Vec3()) {
    const s = 1 - t;
    return optionalResult.set(a.x * s + b.x * t, a.y * s + b.y * t, a.z * s + b.z * t);
}
exports.vec3Mix = vec3Mix;
function vec3FromArray(array, offset = 0, optionalResult = new Vec3()) {
    return optionalResult.set(array[offset + 0], array[offset + 1], array[offset + 2]);
}
exports.vec3FromArray = vec3FromArray;
function vec3ToArray(a, array, offset = 0) {
    array[offset + 0] = a.x;
    array[offset + 1] = a.y;
    array[offset + 2] = a.z;
}
exports.vec3ToArray = vec3ToArray;
function vec3ToString(a) {
    return `(${a.x}, ${a.y}, ${a.z})`;
}
exports.vec3ToString = vec3ToString;
function vec3Parse(text, optionalResult = new Vec3()) {
    return vec3FromArray((0, parseFloats_js_1.parseSafeFloats)(text), 0, optionalResult);
}
exports.vec3Parse = vec3Parse;
function hslToRGB(hsl, optionalResult = new Vec3()) {
    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * 6 * (2 / 3 - t);
        }
        return p;
    }
    // h,s,l ranges are in 0.0 - 1.0
    const h = ((hsl.x % 1) + 1) % 1; // euclidean modulo
    const s = Math.min(Math.max(hsl.y, 0), 1);
    const l = Math.min(Math.max(hsl.z, 0), 1);
    if (s === 0) {
        return optionalResult.set(1, 1, 1);
    }
    const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
    const q = 2 * l - p;
    return optionalResult.set(hue2rgb(q, p, h + 1 / 3), hue2rgb(q, p, h), hue2rgb(q, p, h - 1 / 3));
}
exports.hslToRGB = hslToRGB;
function rgbToHSL(rgb, optionalResult = new Vec3()) {
    // h,s,l ranges are in 0.0 - 1.0
    const r = rgb.x, g = rgb.y, b = rgb.z;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue = 0;
    let saturation = 0;
    const lightness = (min + max) / 2;
    if (min === max) {
        hue = 0;
        saturation = 0;
    }
    else {
        const delta = max - min;
        saturation =
            lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
        switch (max) {
            case r:
                hue = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                hue = (b - r) / delta + 2;
                break;
            case b:
                hue = (r - g) / delta + 4;
                break;
        }
        hue /= 6;
    }
    return optionalResult.set(hue, saturation, lightness);
}
exports.rgbToHSL = rgbToHSL;
function hexToRGB(hex, optionalResult = new Vec3()) {
    hex = Math.floor(hex);
    return optionalResult.set(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);
}
exports.hexToRGB = hexToRGB;
function rgbToHex(rgb) {
    return ((rgb.x * 255) << 16) ^ ((rgb.y * 255) << 8) ^ ((rgb.z * 255) << 0);
}
exports.rgbToHex = rgbToHex;
