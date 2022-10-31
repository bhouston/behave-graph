import { parseSafeFloats } from '../../../../parseFloats.js';

export type Vec2JSON = { x: number; y: number };

export class Vec2 {
  constructor(public x: number = 0, public y: number = 0) {}

  clone(optionalResult = new Vec2()): Vec2 {
    return optionalResult.set(this.x, this.y);
  }
  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }
}

export function vec2Equals(a: Vec2, b: Vec2): boolean {
  return a.x === b.x && a.y === b.y;
}
export function vec2Add(
  a: Vec2,
  b: Vec2,
  optionalResult: Vec2 = new Vec2()
): Vec2 {
  return optionalResult.set(a.x + b.x, a.y + b.y);
}
export function vec2Subtract(
  a: Vec2,
  b: Vec2,
  optionalResult: Vec2 = new Vec2()
): Vec2 {
  return optionalResult.set(a.x - b.x, a.y - b.y);
}
export function vec2Scale(
  a: Vec2,
  b: number,
  optionalResult: Vec2 = new Vec2()
): Vec2 {
  return optionalResult.set(a.x * b, a.y * b);
}
export function vec2Negate(a: Vec2, optionalResult: Vec2 = new Vec2()): Vec2 {
  return optionalResult.set(-a.x, -a.y);
}
export function vec2Length(a: Vec2): number {
  return Math.sqrt(vec2Dot(a, a));
}
export function vec2Normalize(
  a: Vec2,
  optionalResult: Vec2 = new Vec2()
): Vec2 {
  const invLength = 1 / vec2Length(a);
  return vec2Scale(a, invLength, optionalResult);
}
export function vec2Dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y;
}
export function vec2Mix(
  a: Vec2,
  b: Vec2,
  t: number,
  optionalResult = new Vec2()
): Vec2 {
  const s = 1 - t;
  return optionalResult.set(a.x * s + b.x * t, a.y * s + b.y * t);
}
export function vec2FromArray(
  array: Float32Array | number[],
  offset = 0,
  optionalResult: Vec2 = new Vec2()
): Vec2 {
  return optionalResult.set(array[offset + 0], array[offset + 1]);
}
export function vec2ToArray(
  a: Vec2,
  array: Float32Array | number[],
  offset = 0
): void {
  array[offset + 0] = a.x;
  array[offset + 1] = a.y;
}

export function vec2ToString(a: Vec2): string {
  return `(${a.x}, ${a.y})`;
}
export function vec2Parse(text: string, optionalResult = new Vec2()): Vec2 {
  return vec2FromArray(parseSafeFloats(text), 0, optionalResult);
}
