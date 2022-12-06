import { parseSafeFloats } from '../../../../parseFloats';
import { eulerToMat3, Mat3, quatToMat3 } from './Mat3';
import { Vec3 } from './Vec3';
import { Vec4 } from './Vec4';

const NUM_ELEMENTS = 16;
export type Mat4JSON = { elements: number[] };

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

export function mat4Equals(a: Mat4, b: Mat4): boolean {
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    if (a.elements[i] !== b.elements[i]) {
      return false;
    }
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

export function mat4Scale(a: Mat4, b: number, result: Mat4 = new Mat4()): Mat4 {
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
  return `(${a.elements.join(', ')})`;
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

export function translation3ToMat4(t: Vec3, result = new Mat4()): Mat4 {
  return result.set([1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1]);
}
