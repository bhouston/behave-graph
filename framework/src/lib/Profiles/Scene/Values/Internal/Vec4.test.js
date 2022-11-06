"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec4_js_1 = require("./Vec4.js");
describe('vec4 value type', () => {
    test('constructor', () => {
        const value = new Vec4_js_1.Vec4(1, 2, 3, 4);
        expect(value.x).toEqual(1);
        expect(value.y).toEqual(2);
        expect(value.z).toEqual(3);
        expect(value.w).toEqual(4);
    });
    test('add', () => {
        const value = (0, Vec4_js_1.vec4Add)(new Vec4_js_1.Vec4(1, 2, 3, 4), new Vec4_js_1.Vec4(3, 4, 5, 6));
        expect(value.x).toEqual(4);
        expect(value.y).toEqual(6);
        expect(value.z).toEqual(8);
        expect(value.w).toEqual(10);
    });
    test('subtract', () => {
        const value = (0, Vec4_js_1.vec4Subtract)(new Vec4_js_1.Vec4(1, 2, 3, 4), new Vec4_js_1.Vec4(3, 8, 13, 18));
        expect(value.x).toEqual(-2);
        expect(value.y).toEqual(-6);
        expect(value.z).toEqual(-10);
        expect(value.w).toEqual(-14);
    });
    test('scale', () => {
        const value = (0, Vec4_js_1.vec4Scale)(new Vec4_js_1.Vec4(1, 2, 3, 4), 2);
        expect(value.x).toEqual(2);
        expect(value.y).toEqual(4);
        expect(value.z).toEqual(6);
        expect(value.w).toEqual(8);
    });
    test('negate', () => {
        const value = (0, Vec4_js_1.vec4Negate)(new Vec4_js_1.Vec4(1, 2, 3, 4));
        expect(value.x).toEqual(-1);
        expect(value.y).toEqual(-2);
        expect(value.z).toEqual(-3);
        expect(value.w).toEqual(-4);
    });
    test('length', () => {
        const value = (0, Vec4_js_1.vec4Length)(new Vec4_js_1.Vec4(1, 2, 3, 4));
        expect(value).toEqual(Math.sqrt(1 + 2 * 2 + 3 * 3 + 4 * 4));
    });
    test('normalize', () => {
        const value = (0, Vec4_js_1.vec4Normalize)(new Vec4_js_1.Vec4(0, 0, 0, 2));
        expect(value.x).toEqual(0);
        expect(value.y).toEqual(0);
        expect(value.z).toEqual(0);
        expect(value.w).toEqual(1);
    });
    test('dot', () => {
        const value = (0, Vec4_js_1.vec4Dot)(new Vec4_js_1.Vec4(0, 2, 1, 3), new Vec4_js_1.Vec4(3, 4, 1, 1));
        expect(value).toEqual(12);
    });
    test('fromArray', () => {
        const value = (0, Vec4_js_1.vec4FromArray)([1, 2, 3, 4, 5], 1);
        expect(value.x).toEqual(2);
        expect(value.y).toEqual(3);
        expect(value.z).toEqual(4);
        expect(value.w).toEqual(5);
    });
    test('fromArray', () => {
        const array = [1, 2, 3];
        (0, Vec4_js_1.vec4ToArray)(new Vec4_js_1.Vec4(6, 7, 8, 9), array, 1);
        expect(array[1]).toEqual(6);
        expect(array[2]).toEqual(7);
        expect(array[3]).toEqual(8);
        expect(array[4]).toEqual(9);
    });
    test('toString/parser', () => {
        const v = new Vec4_js_1.Vec4(10, 5.5, -9, 99999);
        const text = (0, Vec4_js_1.vec4ToString)(v);
        const v2 = (0, Vec4_js_1.vec4Parse)(text);
        expect(v.x).toEqual(v2.x);
        expect(v.y).toEqual(v2.y);
        expect(v.z).toEqual(v2.z);
    });
});
