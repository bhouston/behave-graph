import { parseSafeFloats, toSafeString } from '../../../../parseFloats';
import { EPSILON, equalsTolerance } from '../../../Core/Values/Internal/Common';
import { eulerToMat3, Mat3, quatToMat3 } from './Mat3';
import { Vec2 } from './Vec2';
import { Vec3, vec3Normalize } from './Vec3';
import { Vec4 } from './Vec4';

// uses OpenGL matrix layout where each column is specified subsequently in order from left to right.
// ( x, y, z, 1 ) x [ 0  4   8  12] = ( x', y', z', 1 )
//                  [ 1  5   9  13]
//                  [ 2  6  10  14]
//                  [ 3  7  11  15]
// where elements 3, 7, 11 would be translation in 3D, as they would multiplied
// by the last virtual element of the 3D vector.

const NUM_ROWS = 4;
const NUM_COLUMNS = 4;
const NUM_ELEMENTS = NUM_ROWS * NUM_COLUMNS;
export type Mat4JSON = number[];

export class Mat4 {
  constructor(
    public elements: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  ) {
    if (elements.length !== NUM_ELEMENTS) {
      throw new Error(
        `elements must have length ${NUM_ELEMENTS}, got ${elements.length}`
      );
    }
  }

  clone(result = new Mat4()): Mat4 {
    return result.set(this.elements);
  }
  set(elements: number[]): this {
    if (elements.length !== NUM_ELEMENTS) {
      throw new Error(
        `elements must have length ${NUM_ELEMENTS}, got ${elements.length}`
      );
    }
    for (let i = 0; i < NUM_ELEMENTS; i++) {
      this.elements[i] = elements[i];
    }
    return this;
  }
}

export function mat4SetColumn4(
  m: Mat4,
  columnIndex: bigint,
  column: Vec4,
  result = new Mat4()
): Mat4 {
  const re = result.set(m.elements).elements;
  const base = Number(columnIndex) * NUM_ROWS;
  re[base + 0] = column.x;
  re[base + 1] = column.y;
  re[base + 2] = column.z;
  re[base + 3] = column.w;
  return result;
}

export function mat4SetRow4(
  m: Mat4,
  rowIndex: bigint,
  row: Vec4,
  result = new Mat4()
): Mat4 {
  const re = result.set(m.elements).elements;
  const base = Number(rowIndex);
  re[base + NUM_COLUMNS * 0] = row.x;
  re[base + NUM_COLUMNS * 1] = row.y;
  re[base + NUM_COLUMNS * 2] = row.z;
  re[base + NUM_COLUMNS * 3] = row.w;
  return result;
}

export function column4ToMat4(
  a: Vec4,
  b: Vec4,
  c: Vec4,
  d: Vec4,
  result = new Mat4()
): Mat4 {
  const re = result.elements;
  const columns = [a, b, c, d];
  for (let c = 0; c < columns.length; c++) {
    const base = c * NUM_ROWS;
    const column = columns[c];
    re[base + 0] = column.x;
    re[base + 1] = column.y;
    re[base + 2] = column.z;
    re[base + 3] = column.w;
  }
  return result;
}

export function mat4Equals(
  a: Mat4,
  b: Mat4,
  tolerance: number = EPSILON
): boolean {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    if (!equalsTolerance(a.elements[i], b.elements[i], tolerance)) return false;
  }
  return true;
}

export function mat4Add(a: Mat4, b: Mat4, result: Mat4 = new Mat4()): Mat4 {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    result.elements[i] = a.elements[i] + b.elements[i];
  }
  return result;
}
export function mat4Subtract(
  a: Mat4,
  b: Mat4,
  result: Mat4 = new Mat4()
): Mat4 {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    result.elements[i] = a.elements[i] - b.elements[i];
  }
  return result;
}

export function mat4MultiplyByScalar(
  a: Mat4,
  b: number,
  result: Mat4 = new Mat4()
): Mat4 {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    result.elements[i] = a.elements[i] * b;
  }
  return result;
}

export function mat4Negate(a: Mat4, result: Mat4 = new Mat4()): Mat4 {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    result.elements[i] = -a.elements[i];
  }
  return result;
}

export function mat4Multiply(a: Mat4, b: Mat4, result = new Mat4()): Mat4 {
  const ae = a.elements;
  const be = b.elements;
  const te = result.elements;

  const a11 = ae[0],
    a12 = ae[4],
    a13 = ae[8],
    a14 = ae[12];
  const a21 = ae[1],
    a22 = ae[5],
    a23 = ae[9],
    a24 = ae[13];
  const a31 = ae[2],
    a32 = ae[6],
    a33 = ae[10],
    a34 = ae[14];
  const a41 = ae[3],
    a42 = ae[7],
    a43 = ae[11],
    a44 = ae[15];

  const b11 = be[0],
    b12 = be[4],
    b13 = be[8],
    b14 = be[12];
  const b21 = be[1],
    b22 = be[5],
    b23 = be[9],
    b24 = be[13];
  const b31 = be[2],
    b32 = be[6],
    b33 = be[10],
    b34 = be[14];
  const b41 = be[3],
    b42 = be[7],
    b43 = be[11],
    b44 = be[15];

  // TODO: Replace with set(...)
  te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
  te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
  te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
  te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

  te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
  te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
  te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
  te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

  te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
  te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
  te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
  te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

  te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
  te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
  te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
  te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

  return result;
}

export function mat4Determinant(m: Mat4): number {
  // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  const me = m.elements,
    n11 = me[0],
    n21 = me[1],
    n31 = me[2],
    n41 = me[3],
    n12 = me[4],
    n22 = me[5],
    n32 = me[6],
    n42 = me[7],
    n13 = me[8],
    n23 = me[9],
    n33 = me[10],
    n43 = me[11],
    n14 = me[12],
    n24 = me[13],
    n34 = me[14],
    n44 = me[15],
    t11 =
      n23 * n34 * n42 -
      n24 * n33 * n42 +
      n24 * n32 * n43 -
      n22 * n34 * n43 -
      n23 * n32 * n44 +
      n22 * n33 * n44,
    t12 =
      n14 * n33 * n42 -
      n13 * n34 * n42 -
      n14 * n32 * n43 +
      n12 * n34 * n43 +
      n13 * n32 * n44 -
      n12 * n33 * n44,
    t13 =
      n13 * n24 * n42 -
      n14 * n23 * n42 +
      n14 * n22 * n43 -
      n12 * n24 * n43 -
      n13 * n22 * n44 +
      n12 * n23 * n44,
    t14 =
      n14 * n23 * n32 -
      n13 * n24 * n32 -
      n14 * n22 * n33 +
      n12 * n24 * n33 +
      n13 * n22 * n34 -
      n12 * n23 * n34;

  return n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
}
export function mat4Adjoint(m: Mat4, result = new Mat4()): Mat4 {
  // from gl-matrix
  const a = m.elements;
  const out = result.elements;
  const a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  const a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  const a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  const a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  out[0] = a11 * b11 - a12 * b10 + a13 * b09;
  out[1] = a02 * b10 - a01 * b11 - a03 * b09;
  out[2] = a31 * b05 - a32 * b04 + a33 * b03;
  out[3] = a22 * b04 - a21 * b05 - a23 * b03;
  out[4] = a12 * b08 - a10 * b11 - a13 * b07;
  out[5] = a00 * b11 - a02 * b08 + a03 * b07;
  out[6] = a32 * b02 - a30 * b05 - a33 * b01;
  out[7] = a20 * b05 - a22 * b02 + a23 * b01;
  out[8] = a10 * b10 - a11 * b08 + a13 * b06;
  out[9] = a01 * b08 - a00 * b10 - a03 * b06;
  out[10] = a30 * b04 - a31 * b02 + a33 * b00;
  out[11] = a21 * b02 - a20 * b04 - a23 * b00;
  out[12] = a11 * b07 - a10 * b09 - a12 * b06;
  out[13] = a00 * b09 - a01 * b07 + a02 * b06;
  out[14] = a31 * b01 - a30 * b03 - a32 * b00;
  out[15] = a20 * b03 - a21 * b01 + a22 * b00;
  return result;
}

export function mat4Transpose(m: Mat4, result = new Mat4()): Mat4 {
  const re = m.clone(result).elements;
  let tmp;

  // TODO: replace this with just reading from me and setting re, no need for a temporary
  tmp = re[1];
  re[1] = re[4];
  re[4] = tmp;
  tmp = re[2];
  re[2] = re[8];
  re[8] = tmp;
  tmp = re[6];
  re[6] = re[9];
  re[9] = tmp;

  tmp = re[3];
  re[3] = re[12];
  re[12] = tmp;
  tmp = re[7];
  re[7] = re[13];
  re[13] = tmp;
  tmp = re[11];
  re[11] = re[14];
  re[14] = tmp;

  return result;
}

export function mat4Inverse(m: Mat4, result = new Mat4()): Mat4 {
  // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  const me = m.elements,
    n11 = me[0],
    n21 = me[1],
    n31 = me[2],
    n41 = me[3],
    n12 = me[4],
    n22 = me[5],
    n32 = me[6],
    n42 = me[7],
    n13 = me[8],
    n23 = me[9],
    n33 = me[10],
    n43 = me[11],
    n14 = me[12],
    n24 = me[13],
    n34 = me[14],
    n44 = me[15],
    t11 =
      n23 * n34 * n42 -
      n24 * n33 * n42 +
      n24 * n32 * n43 -
      n22 * n34 * n43 -
      n23 * n32 * n44 +
      n22 * n33 * n44,
    t12 =
      n14 * n33 * n42 -
      n13 * n34 * n42 -
      n14 * n32 * n43 +
      n12 * n34 * n43 +
      n13 * n32 * n44 -
      n12 * n33 * n44,
    t13 =
      n13 * n24 * n42 -
      n14 * n23 * n42 +
      n14 * n22 * n43 -
      n12 * n24 * n43 -
      n13 * n22 * n44 +
      n12 * n23 * n44,
    t14 =
      n14 * n23 * n32 -
      n13 * n24 * n32 -
      n14 * n22 * n33 +
      n12 * n24 * n33 +
      n13 * n22 * n34 -
      n12 * n23 * n34;

  const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

  if (det === 0) {
    throw new Error('can not invert degenerate matrix');
  }

  const detInv = 1 / det;

  // TODO: replace with a set
  const re = result.elements;
  re[0] = t11 * detInv;
  re[1] =
    (n24 * n33 * n41 -
      n23 * n34 * n41 -
      n24 * n31 * n43 +
      n21 * n34 * n43 +
      n23 * n31 * n44 -
      n21 * n33 * n44) *
    detInv;
  re[2] =
    (n22 * n34 * n41 -
      n24 * n32 * n41 +
      n24 * n31 * n42 -
      n21 * n34 * n42 -
      n22 * n31 * n44 +
      n21 * n32 * n44) *
    detInv;
  re[3] =
    (n23 * n32 * n41 -
      n22 * n33 * n41 -
      n23 * n31 * n42 +
      n21 * n33 * n42 +
      n22 * n31 * n43 -
      n21 * n32 * n43) *
    detInv;

  re[4] = t12 * detInv;
  re[5] =
    (n13 * n34 * n41 -
      n14 * n33 * n41 +
      n14 * n31 * n43 -
      n11 * n34 * n43 -
      n13 * n31 * n44 +
      n11 * n33 * n44) *
    detInv;
  re[6] =
    (n14 * n32 * n41 -
      n12 * n34 * n41 -
      n14 * n31 * n42 +
      n11 * n34 * n42 +
      n12 * n31 * n44 -
      n11 * n32 * n44) *
    detInv;
  re[7] =
    (n12 * n33 * n41 -
      n13 * n32 * n41 +
      n13 * n31 * n42 -
      n11 * n33 * n42 -
      n12 * n31 * n43 +
      n11 * n32 * n43) *
    detInv;

  re[8] = t13 * detInv;
  re[9] =
    (n14 * n23 * n41 -
      n13 * n24 * n41 -
      n14 * n21 * n43 +
      n11 * n24 * n43 +
      n13 * n21 * n44 -
      n11 * n23 * n44) *
    detInv;
  re[10] =
    (n12 * n24 * n41 -
      n14 * n22 * n41 +
      n14 * n21 * n42 -
      n11 * n24 * n42 -
      n12 * n21 * n44 +
      n11 * n22 * n44) *
    detInv;
  re[11] =
    (n13 * n22 * n41 -
      n12 * n23 * n41 -
      n13 * n21 * n42 +
      n11 * n23 * n42 +
      n12 * n21 * n43 -
      n11 * n22 * n43) *
    detInv;

  re[12] = t14 * detInv;
  re[13] =
    (n13 * n24 * n31 -
      n14 * n23 * n31 +
      n14 * n21 * n33 -
      n11 * n24 * n33 -
      n13 * n21 * n34 +
      n11 * n23 * n34) *
    detInv;
  re[14] =
    (n14 * n22 * n31 -
      n12 * n24 * n31 -
      n14 * n21 * n32 +
      n11 * n24 * n32 +
      n12 * n21 * n34 -
      n11 * n22 * n34) *
    detInv;
  re[15] =
    (n12 * n23 * n31 -
      n13 * n22 * n31 +
      n13 * n21 * n32 -
      n11 * n23 * n32 -
      n12 * n21 * n33 +
      n11 * n22 * n33) *
    detInv;

  return result;
}

export function mat4Mix(
  a: Mat4,
  b: Mat4,
  t: number,
  result = new Mat4()
): Mat4 {
  const s = 1 - t;
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    result.elements[i] = a.elements[i] * s + b.elements[i] * t;
  }
  return result;
}

export function mat4FromArray(
  array: Float32Array | number[],
  offset = 0,
  result: Mat4 = new Mat4()
): Mat4 {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    result.elements[i] = array[offset + i];
  }
  return result;
}

export function mat4ToArray(
  a: Mat4,
  array: Float32Array | number[],
  offset = 0
): void {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    array[offset + i] = a.elements[i];
  }
}

export function mat4ToString(a: Mat4): string {
  return toSafeString(a.elements);
}

export function mat4Parse(text: string, result = new Mat4()): Mat4 {
  return mat4FromArray(parseSafeFloats(text), 0, result);
}

export function mat3ToMat4(a: Mat3, result = new Mat4()): Mat4 {
  const ae = a.elements;
  return result.set([
    ae[0],
    ae[1],
    ae[2],
    0,
    ae[3],
    ae[4],
    ae[5],
    0,
    ae[6],
    ae[7],
    ae[8],
    0,
    0,
    0,
    0,
    1
  ]);
}

export function eulerToMat4(e: Vec3, result = new Mat4()): Mat4 {
  return mat3ToMat4(eulerToMat3(e), result);
}

export function quatToMat4(q: Vec4, result = new Mat4()): Mat4 {
  return mat3ToMat4(quatToMat3(q), result);
}

export function scale3ToMat4(s: Vec3, result = new Mat4()): Mat4 {
  return result.set([s.x, 0, 0, 0, 0, s.y, 0, 0, 0, 0, s.z, 0, 0, 0, 0, 1]);
}
// from gl-matrix
export function mat4ToScale3(m: Mat4, result = new Vec3()): Vec3 {
  const mat = m.elements;
  const m11 = mat[0];
  const m12 = mat[1];
  const m13 = mat[2];
  const m21 = mat[4];
  const m22 = mat[5];
  const m23 = mat[6];
  const m31 = mat[8];
  const m32 = mat[9];
  const m33 = mat[10];

  return result.set(
    Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
    Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
    Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33)
  );
}

export function translation3ToMat4(t: Vec3, result = new Mat4()): Mat4 {
  return result.set([1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1]);
}
export function mat4ToTranslation3(m: Mat4, result = new Vec3()): Vec3 {
  const me = m.elements;
  return result.set(me[3], me[7], me[11]);
}
export function mat4Translate(m: Mat4, t: Vec3, result = new Mat4()): Mat4 {
  return mat4Multiply(m, translation3ToMat4(t), result);
}
export function mat4Scale(m: Mat4, s: Vec3, result = new Mat4()): Mat4 {
  return mat4Multiply(m, scale3ToMat4(s), result);
}
export function mat4RotateByQuat(m: Mat4, q: Vec4, result = new Mat4()): Mat4 {
  return mat4Multiply(m, quatToMat4(q), result);
}
export function mat4RotateByEuler(m: Mat4, e: Vec3, result = new Mat4()): Mat4 {
  return mat4Multiply(m, eulerToMat4(e), result);
}

export function mat4TransformPoint3(
  m: Mat4,
  v: Vec4,
  result = new Vec3()
): Vec3 {
  const x = v.x,
    y = v.y,
    z = v.z;
  const e = m.elements;

  const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

  result.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
  result.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
  result.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

  return result;
}

export function mat4TransformNormal3(
  v: Vec3,
  m: Mat4,
  result = new Vec3()
): Vec3 {
  const x = v.x,
    y = v.y,
    z = v.z;
  const e = m.elements;

  result.x = e[0] * x + e[4] * y + e[8] * z;
  result.y = e[1] * x + e[5] * y + e[9] * z;
  result.z = e[2] * x + e[6] * y + e[10] * z;

  return vec3Normalize(result, result);
}

export function mat4Perspective(
  left: number,
  right: number,
  top: number,
  bottom: number,
  near: number,
  far: number,
  result = new Mat4()
): Mat4 {
  const x = (2 * near) / (right - left);
  const y = (2 * near) / (top - bottom);

  const a = (right + left) / (right - left);
  const b = (top + bottom) / (top - bottom);
  const c = -(far + near) / (far - near);
  const d = (-2 * far * near) / (far - near);

  return result.set([x, 0, a, 0, 0, y, b, 0, 0, 0, c, d, 0, 0, -1, 0]);
}

export function mat4PerspectiveFov(
  verticalFov: number,
  near: number,
  far: number,
  zoom: number,
  aspectRatio: number,
  result = new Mat4()
): Mat4 {
  const height = (2 * near * Math.tan((verticalFov * Math.PI) / 180)) / zoom;
  const width = height * aspectRatio;

  // NOTE: OpenGL screen coordinates are -bottomt to +top, -left to +right.

  const right = width * 0.5;
  const left = right - width;

  const top = height * 0.5;
  const bottom = top - height;

  return mat4Perspective(left, right, top, bottom, near, far, result);
}

// TODO: Replace with a Box3?
export function mat4Orthogonal(
  left: number,
  right: number,
  top: number,
  bottom: number,
  near: number,
  far: number,
  result = new Mat4()
): Mat4 {
  const w = 1 / (right - left);
  const h = 1 / (top - bottom);
  const p = 1 / (far - near);

  const x = (right + left) * w;
  const y = (top + bottom) * h;
  const z = (far + near) * p;

  return result.set([
    2 * w,
    0,
    0,
    -x,
    0,
    2 * h,
    0,
    -y,
    0,
    0,
    -2 * p,
    -z,
    0,
    0,
    0,
    1
  ]);
}

export function mat4OrthogonalSimple(
  height: number,
  center: Vec2,
  near: number,
  far: number,
  zoom: number,
  aspectRatio = 1,
  result = new Mat4()
): Mat4 {
  height /= zoom;
  const width = height * aspectRatio;

  const left = -width * 0.5 + center.x;
  const right = left + width;

  const top = -height * 0.5 + center.y;
  const bottom = top + height;

  return mat4Orthogonal(left, right, top, bottom, near, far, result);
}
