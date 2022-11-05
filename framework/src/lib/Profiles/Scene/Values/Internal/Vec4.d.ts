import { Vec3 } from './Vec3.js';
export declare type Vec4JSON = {
    x: number;
    y: number;
    z: number;
    w: number;
};
export declare class Vec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    clone(optionalResult?: Vec4): Vec4;
    set(x: number, y: number, z: number, w: number): this;
}
export declare function vec4Equals(a: Vec4, b: Vec4): boolean;
export declare function vec4Add(a: Vec4, b: Vec4, optionalResult?: Vec4): Vec4;
export declare function vec4Subtract(a: Vec4, b: Vec4, optionalResult?: Vec4): Vec4;
export declare function vec4Scale(a: Vec4, b: number, optionalResult?: Vec4): Vec4;
export declare function vec4Negate(a: Vec4, optionalResult?: Vec4): Vec4;
export declare function vec4Length(a: Vec4): number;
export declare function vec4Normalize(a: Vec4, optionalResult?: Vec4): Vec4;
export declare function vec4Dot(a: Vec4, b: Vec4): number;
export declare function vec4Mix(a: Vec4, b: Vec4, t: number, optionalResult?: Vec4): Vec4;
export declare function vec4FromArray(array: Float32Array | number[], offset?: number, optionalResult?: Vec4): Vec4;
export declare function vec4ToArray(a: Vec4, array: Float32Array | number[], offset?: number): void;
export declare function vec4ToString(a: Vec4): string;
export declare function vec4Parse(text: string, optionalResult?: Vec4): Vec4;
export declare function quatConjugate(a: Vec4, optionalResult?: Vec4): Vec4;
export declare function quatMultiply(a: Vec4, b: Vec4, optionalResult?: Vec4): Vec4;
export declare function quatSlerp(a: Vec4, b: Vec4, t: number, optionalResult?: Vec4): Vec4;
export declare function eulerToQuat(euler: Vec3, optionalResult?: Vec4): Vec4;
export declare function angleAxisToQuat(angle: number, axis: Vec3, optionalResult?: Vec4): Vec4;
//# sourceMappingURL=Vec4.d.ts.map