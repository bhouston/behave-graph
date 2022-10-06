export class Vec3 {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}
}

export function vec3Equals(a: Vec3, b: Vec3): boolean {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}
export function vec3Add(a: Vec3, b: Vec3): Vec3 {
  return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}
export function vec3Subtract(a: Vec3, b: Vec3): Vec3 {
  return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}
export function vec3Scale(a: Vec3, b: number): Vec3 {
  return new Vec3(a.x * b, a.y * b, a.z * b);
}
export function vec3Negate(a: Vec3): Vec3 {
  return new Vec3(-a.x, -a.y, -a.z);
}
export function vec3Length(a: Vec3): number {
  return Math.sqrt(vec3Dot(a, a));
}
export function vec3Normalize(a: Vec3): Vec3 {
  const invLength = 1 / vec3Length(a);
  return vec3Scale(a, invLength);
}
export function vec3Dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
export function vec3Cross(a: Vec3, b: Vec3): Vec3 {
  const ax = a.x;
  const ay = a.y;
  const az = a.z;
  const bx = b.x;
  const by = b.y;
  const bz = b.z;

  return new Vec3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
}
export function vec3FromArray(
  array: Float32Array | number[],
  offset = 0
): Vec3 {
  return new Vec3(array[offset + 0], array[offset + 1], array[offset + 2]);
}
export function vec3ToArray(
  a: Vec3,
  array: Float32Array | number[],
  offset = 0
): void {
  array[offset + 0] = a.x;
  array[offset + 1] = a.y;
  array[offset + 2] = a.z;
}
export function vec3ToString(a: Vec3): string {
  return `(${a.x}, ${a.y}, ${a.z})`;
}
