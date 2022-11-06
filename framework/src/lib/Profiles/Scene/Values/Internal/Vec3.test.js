"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec3_js_1 = require("./Vec3.js");
describe('vec3 value type', () => {
    test('constructor', () => {
        const value = new Vec3_js_1.Vec3(1, 2, 3);
        expect(value.x).toEqual(1);
        expect(value.y).toEqual(2);
        expect(value.z).toEqual(3);
    });
    test('add', () => {
        const value = (0, Vec3_js_1.vec3Add)(new Vec3_js_1.Vec3(1, 2, 3), new Vec3_js_1.Vec3(3, 4, 5));
        expect(value.x).toEqual(4);
        expect(value.y).toEqual(6);
        expect(value.z).toEqual(8);
    });
    test('subtract', () => {
        const value = (0, Vec3_js_1.vec3Subtract)(new Vec3_js_1.Vec3(1, 2, 3), new Vec3_js_1.Vec3(3, 8, 13));
        expect(value.x).toEqual(-2);
        expect(value.y).toEqual(-6);
        expect(value.z).toEqual(-10);
    });
    test('scale', () => {
        const value = (0, Vec3_js_1.vec3Scale)(new Vec3_js_1.Vec3(1, 2, 3), 2);
        expect(value.x).toEqual(2);
        expect(value.y).toEqual(4);
        expect(value.z).toEqual(6);
    });
    test('negate', () => {
        const value = (0, Vec3_js_1.vec3Negate)(new Vec3_js_1.Vec3(1, 2, 3));
        expect(value.x).toEqual(-1);
        expect(value.y).toEqual(-2);
        expect(value.z).toEqual(-3);
    });
    test('length', () => {
        const value = (0, Vec3_js_1.vec3Length)(new Vec3_js_1.Vec3(1, 2, 3));
        expect(value).toEqual(Math.sqrt(1 + 2 * 2 + 3 * 3));
    });
    test('normalize', () => {
        const value = (0, Vec3_js_1.vec3Normalize)(new Vec3_js_1.Vec3(0, 0, 2));
        expect(value.x).toEqual(0);
        expect(value.y).toEqual(0);
        expect(value.z).toEqual(1);
    });
    test('dot', () => {
        const value = (0, Vec3_js_1.vec3Dot)(new Vec3_js_1.Vec3(0, 2, 1), new Vec3_js_1.Vec3(3, 4, 1));
        expect(value).toEqual(9);
    });
    test('fromArray', () => {
        const value = (0, Vec3_js_1.vec3FromArray)([1, 2, 3, 4], 1);
        expect(value.x).toEqual(2);
        expect(value.y).toEqual(3);
        expect(value.z).toEqual(4);
    });
    test('fromArray', () => {
        const array = [1, 2, 3];
        (0, Vec3_js_1.vec3ToArray)(new Vec3_js_1.Vec3(6, 7, 8), array, 1);
        expect(array[1]).toEqual(6);
        expect(array[2]).toEqual(7);
        expect(array[3]).toEqual(8);
    });
    test('toString/parser', () => {
        const v = new Vec3_js_1.Vec3(10, 5.5, -9);
        const text = (0, Vec3_js_1.vec3ToString)(v);
        const v2 = (0, Vec3_js_1.vec3Parse)(text);
        expect(v.x).toEqual(v2.x);
        expect(v.y).toEqual(v2.y);
        expect(v.z).toEqual(v2.z);
    });
});
