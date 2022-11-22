import { Vec2, Vec3, Vec4 } from '@behave-graph/core';
import { Euler, Quaternion, Vector2, Vector3, Vector4 } from 'three';

export function toVec2(value: Vector2): Vec2 {
  return new Vec2(value.x, value.y);
}

export function toVec3(value: Vector3 | Euler): Vec3 {
  return new Vec3(value.x, value.y, value.z);
}

export function toVec4(value: Vector4 | Quaternion): Vec4 {
  return new Vec4(value.x, value.y, value.z, value.w);
}
