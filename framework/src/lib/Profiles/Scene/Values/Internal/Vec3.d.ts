export declare type Vec3JSON = {
    x: number;
    y: number;
    z: number;
};
export declare type ColorJSON = {
    r: number;
    g: number;
    b: number;
};
export declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    clone(optionalResult?: Vec3): Vec3;
    set(x: number, y: number, z: number): this;
}
export declare function vec3Equals(a: Vec3, b: Vec3): boolean;
export declare function vec3Add(a: Vec3, b: Vec3, optionalResult?: Vec3): Vec3;
export declare function vec3Subtract(a: Vec3, b: Vec3, optionalResult?: Vec3): Vec3;
export declare function vec3Scale(a: Vec3, b: number, optionalResult?: Vec3): Vec3;
export declare function vec3Negate(a: Vec3, optionalResult?: Vec3): Vec3;
export declare function vec3Length(a: Vec3): number;
export declare function vec3Normalize(a: Vec3, optionalResult?: Vec3): Vec3;
export declare function vec3Dot(a: Vec3, b: Vec3): number;
export declare function vec3Cross(a: Vec3, b: Vec3, optionalResult?: Vec3): Vec3;
export declare function vec3Mix(a: Vec3, b: Vec3, t: number, optionalResult?: Vec3): Vec3;
export declare function vec3FromArray(array: Float32Array | number[], offset?: number, optionalResult?: Vec3): Vec3;
export declare function vec3ToArray(a: Vec3, array: Float32Array | number[], offset?: number): void;
export declare function vec3ToString(a: Vec3): string;
export declare function vec3Parse(text: string, optionalResult?: Vec3): Vec3;
export declare function hslToRGB(hsl: Vec3, optionalResult?: Vec3): Vec3;
export declare function rgbToHSL(rgb: Vec3, optionalResult?: Vec3): Vec3;
export declare function hexToRGB(hex: number, optionalResult?: Vec3): Vec3;
export declare function rgbToHex(rgb: Vec3): number;
//# sourceMappingURL=Vec3.d.ts.map