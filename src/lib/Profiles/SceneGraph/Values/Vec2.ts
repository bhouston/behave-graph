export class Vec2 {
  constructor(public x: number = 0, public y: number = 0) {}
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }
}

export function vec2Equals(a: Vec2, b: Vec2): boolean {
  return a.x === b.x && a.y === b.y;
}
export function vec2Add(a: Vec2, b: Vec2): Vec2 {
  return new Vec2(a.x + b.x, a.y + b.y);
}
export function vec2Subtract(a: Vec2, b: Vec2): Vec2 {
  return new Vec2(a.x - b.x, a.y - b.y);
}
export function vec2Scale(a: Vec2, b: number): Vec2 {
  return new Vec2(a.x * b, a.y * b);
}
export function vec2Negate(a: Vec2): Vec2 {
  return new Vec2(-a.x, -a.y);
}
export function vec2Length(a: Vec2): number {
  return Math.sqrt(vec2Dot(a, a));
}
export function vec2Normalize(a: Vec2): Vec2 {
  const invLength = 1 / vec2Length(a);
  return vec2Scale(a, invLength);
}
export function vec2Dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y;
}
export function vec2FromArray(
  array: Float32Array | number[],
  offset = 0
): Vec2 {
  return new Vec2(array[offset + 0], array[offset + 1]);
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
