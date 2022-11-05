export declare type Vec2JSON = {
    x: number;
    y: number;
};
export declare class Vec2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    clone(optionalResult?: Vec2): Vec2;
    set(x: number, y: number): this;
}
export declare function vec2Equals(a: Vec2, b: Vec2): boolean;
export declare function vec2Add(a: Vec2, b: Vec2, optionalResult?: Vec2): Vec2;
export declare function vec2Subtract(a: Vec2, b: Vec2, optionalResult?: Vec2): Vec2;
export declare function vec2Scale(a: Vec2, b: number, optionalResult?: Vec2): Vec2;
export declare function vec2Negate(a: Vec2, optionalResult?: Vec2): Vec2;
export declare function vec2Length(a: Vec2): number;
export declare function vec2Normalize(a: Vec2, optionalResult?: Vec2): Vec2;
export declare function vec2Dot(a: Vec2, b: Vec2): number;
export declare function vec2Mix(a: Vec2, b: Vec2, t: number, optionalResult?: Vec2): Vec2;
export declare function vec2FromArray(array: Float32Array | number[], offset?: number, optionalResult?: Vec2): Vec2;
export declare function vec2ToArray(a: Vec2, array: Float32Array | number[], offset?: number): void;
export declare function vec2ToString(a: Vec2): string;
export declare function vec2Parse(text: string, optionalResult?: Vec2): Vec2;
//# sourceMappingURL=Vec2.d.ts.map