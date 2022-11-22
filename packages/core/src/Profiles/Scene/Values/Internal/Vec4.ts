import { parseSafeFloats } from '../../../../parseFloats';
import { Vec3 } from './Vec3';

export type Vec4JSON = { x: number; y: number; z: number; w: number };

export class Vec4 {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
    public w: number = 0
  ) {}
  clone(optionalResult = new Vec4()): Vec4 {
    return optionalResult.set(this.x, this.y, this.z, this.w);
  }
  set(x: number, y: number, z: number, w: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
}
export function vec4Equals(a: Vec4, b: Vec4): boolean {
  return a.x === b.x && a.y === b.y && a.z === b.z && a.w == b.w;
}
export function vec4Add(a: Vec4, b: Vec4, optionalResult = new Vec4()): Vec4 {
  return optionalResult.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}
export function vec4Subtract(
  a: Vec4,
  b: Vec4,
  optionalResult = new Vec4()
): Vec4 {
  return optionalResult.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}
export function vec4Scale(
  a: Vec4,
  b: number,
  optionalResult = new Vec4()
): Vec4 {
  return optionalResult.set(a.x * b, a.y * b, a.z * b, a.w * b);
}
export function vec4Negate(a: Vec4, optionalResult = new Vec4()): Vec4 {
  return optionalResult.set(-a.x, -a.y, -a.z, -a.w);
}
export function vec4Length(a: Vec4): number {
  return Math.sqrt(vec4Dot(a, a));
}
export function vec4Normalize(a: Vec4, optionalResult = new Vec4()): Vec4 {
  const invLength = 1 / vec4Length(a);
  return vec4Scale(a, invLength, optionalResult);
}
export function vec4Dot(a: Vec4, b: Vec4): number {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}
export function vec4Mix(
  a: Vec4,
  b: Vec4,
  t: number,
  optionalResult = new Vec4()
): Vec4 {
  const s = 1 - t;
  return optionalResult.set(
    a.x * s + b.x * t,
    a.y * s + b.y * t,
    a.z * s + b.z * t,
    a.w * s + b.w * t
  );
}
export function vec4FromArray(
  array: Float32Array | number[],
  offset = 0,
  optionalResult = new Vec4()
): Vec4 {
  return optionalResult.set(
    array[offset + 0],
    array[offset + 1],
    array[offset + 2],
    array[offset + 3]
  );
}
export function vec4ToArray(
  a: Vec4,
  array: Float32Array | number[],
  offset = 0
): void {
  array[offset + 0] = a.x;
  array[offset + 1] = a.y;
  array[offset + 2] = a.z;
  array[offset + 3] = a.w;
}
export function vec4ToString(a: Vec4): string {
  return `(${a.x}, ${a.y}, ${a.z}, ${a.w})`;
}
export function vec4Parse(text: string, optionalResult = new Vec4()): Vec4 {
  return vec4FromArray(parseSafeFloats(text), 0, optionalResult);
}
export function quatConjugate(a: Vec4, optionalResult = new Vec4()): Vec4 {
  return optionalResult.set(-a.x, -a.y, -a.z, a.w);
}
export function quatMultiply(
  a: Vec4,
  b: Vec4,
  optionalResult = new Vec4()
): Vec4 {
  // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

  const qax = a.x;
  const qay = a.y;
  const qaz = a.z;
  const qaw = a.w;
  const qbx = b.x;
  const qby = b.y;
  const qbz = b.z;
  const qbw = b.w;

  return optionalResult.set(
    qax * qbw + qaw * qbx + qay * qbz - qaz * qby,
    qay * qbw + qaw * qby + qaz * qbx - qax * qbz,
    qaz * qbw + qaw * qbz + qax * qby - qay * qbx,
    qaw * qbw - qax * qbx - qay * qby - qaz * qbz
  );
}

export function quatSlerp(
  a: Vec4,
  b: Vec4,
  t: number,
  optionalResult = new Vec4()
): Vec4 {
  if (t <= 0) return a.clone(optionalResult);
  if (t >= 1) return b.clone(optionalResult);

  // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

  let cosHalfTheta = vec4Dot(a, b);

  if (cosHalfTheta < 0) {
    vec4Negate(b, optionalResult);

    cosHalfTheta = -cosHalfTheta;
  } else {
    b.clone(optionalResult);
  }

  if (cosHalfTheta >= 1) {
    return optionalResult;
  }

  const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;

  if (sqrSinHalfTheta <= Number.EPSILON) {
    vec4Mix(a, optionalResult, t);
    vec4Normalize(optionalResult, optionalResult);

    return optionalResult;
  }

  const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
  const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
  const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
  const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

  optionalResult.w = a.w * ratioA + optionalResult.w * ratioB;
  optionalResult.x = a.x * ratioA + optionalResult.x * ratioB;
  optionalResult.y = a.y * ratioA + optionalResult.y * ratioB;
  optionalResult.z = a.z * ratioA + optionalResult.z * ratioB;

  return optionalResult;
}
export function eulerToQuat(
  euler: Vec3,
  optionalResult: Vec4 = new Vec4()
): Vec4 {
  // eslint-disable-next-line max-len
  // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

  const c1 = Math.cos(euler.x / 2);
  const c2 = Math.cos(euler.y / 2);
  const c3 = Math.cos(euler.z / 2);

  const s1 = Math.sin(euler.x / 2);
  const s2 = Math.sin(euler.y / 2);
  const s3 = Math.sin(euler.z / 2);

  // XYZ order only
  return optionalResult.set(
    s1 * c2 * c3 + c1 * s2 * s3,
    c1 * s2 * c3 - s1 * c2 * s3,
    c1 * c2 * s3 + s1 * s2 * c3,
    c1 * c2 * c3 - s1 * s2 * s3
  );
}

export function angleAxisToQuat(
  angle: number,
  axis: Vec3,
  optionalResult = new Vec4()
): Vec4 {
  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

  // assumes axis is normalized

  const halfAngle = angle / 2;
  const s = Math.sin(halfAngle);

  return optionalResult.set(
    axis.x * s,
    axis.y * s,
    axis.z * s,
    Math.cos(halfAngle)
  );
}
