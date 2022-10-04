export class Vec4 {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
    public w: number = 0
  ) {}
}
export function vec4Equals(a: Vec4, b: Vec4): boolean {
  return a.x === b.x && a.y === b.y && a.z === b.z && a.w == b.w;
}
export function vec4Add(a: Vec4, b: Vec4): Vec4 {
  return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}
export function vec4Subtract(a: Vec4, b: Vec4): Vec4 {
  return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}
export function vec4Scale(a: Vec4, b: number): Vec4 {
  return new Vec4(a.x * b, a.y * b, a.z * b, a.w * b);
}
export function vec4Negate(a: Vec4): Vec4 {
  return new Vec4(-a.x, -a.y, -a.z, -a.w);
}
export function vec4Length(a: Vec4): number {
  return Math.sqrt(vec4Dot(a, a));
}
export function vec4Normalize(a: Vec4): Vec4 {
  const invLength = 1.0 / vec4Length(a);
  return vec4Scale(a, invLength);
}
export function vec4Dot(a: Vec4, b: Vec4): number {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}
export function vec4FromArray(array: Float32Array, offset = 0): Vec4 {
  return new Vec4(
    array[offset + 0],
    array[offset + 1],
    array[offset + 2],
    array[offset + 3]
  );
}
export function vec4ToArray(a: Vec4, array: Float32Array, offset = 0): void {
  array[offset + 0] = a.x;
  array[offset + 1] = a.y;
  array[offset + 2] = a.z;
  array[offset + 3] = a.w;
}
export function vec4ToString(a: Vec4): string {
  return `(${a.x}, ${a.y}, ${a.z}, ${a.w})`;
}
export function quatConjugate(a: Vec4): Vec4 {
  return new Vec4(-a.x, -a.y, -a.z, a.w);
}
export function quatMultiply(a: Vec4, b: Vec4): Vec4 {
  // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

  const qax = a.x;
  const qay = a.y;
  const qaz = a.z;
  const qaw = a.w;
  const qbx = b.x;
  const qby = b.y;
  const qbz = b.z;
  const qbw = b.w;

  return new Vec4(
    qax * qbw + qaw * qbx + qay * qbz - qaz * qby,
    qay * qbw + qaw * qby + qaz * qbx - qax * qbz,
    qaz * qbw + qaw * qbz + qax * qby - qay * qbx,
    qaw * qbw - qax * qbx - qay * qby - qaz * qbz
  );
}
/*
 quatSlerp(qb: Quaternion, t: number): this {
    if (t === 0) {
      return this;
    }
    if (t === 1) {
      return this.copy(qb);
    }

    const { x } = this;
    const { y } = this;
    const { z } = this;
    const { w } = this;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
    // TODO, allocate x, y, z, w and only set this.* at the end.

    let cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

    if (cosHalfTheta < 0) {
      this.w = -qb.w;
      this.x = -qb.x;
      this.y = -qb.y;
      this.z = -qb.z;

      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }

    if (cosHalfTheta >= 1.0) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;

      return this;
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      this.w = s * w + t * this.w;
      this.x = s * x + t * this.x;
      this.y = s * y + t * this.y;
      this.z = s * z + t * this.z;

      this.normalize();

      return this;
    }

    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this.w = w * ratioA + this.w * ratioB;
    this.x = x * ratioA + this.x * ratioB;
    this.y = y * ratioA + this.y * ratioB;
    this.z = z * ratioA + this.z * ratioB;

    return this;
  }*/
