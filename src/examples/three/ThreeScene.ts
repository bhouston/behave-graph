import {
  Material,
  Object3D,
  Quaternion,
  Vector2,
  Vector3,
  Vector4
} from 'three';

import { Assert, EventEmitter, IScene, Vec2, Vec3, Vec4 } from '../../lib';
import { GLTFJson } from './GLTFJson';

function mapGlTFNodeIndicesToThreeObject3Ds(
  glTFJson: GLTFJson,
  glTFRoot: Object3D
): { [index: number]: Object3D } {
  const glTFNodeIndexToThreeNode: { [index: number]: Object3D } = {};

  const traverseChildren = (threeNode: Object3D, glTFNodeIndex: number) => {
    const glTFNode = glTFJson.nodes[glTFNodeIndex];
    if (glTFNode.children === undefined) return;
    for (let i = 0; i < glTFNode.children.length; i++) {
      const childGLTFNodeIndex = glTFNode.children[i];
      const childThreeNode = threeNode.children[i];
      glTFNodeIndexToThreeNode[childGLTFNodeIndex] = childThreeNode;
      traverseChildren(childThreeNode, childGLTFNodeIndex);

      Assert.mustBeTrue(
        glTFJson.nodes[childGLTFNodeIndex].name === childThreeNode.name
      );
    }
  };
  for (let i = 0; i < glTFJson.scenes[0].nodes.length; i++) {
    const glTFNodeIndex = glTFJson.scenes[0].nodes[i];
    const threeNode = glTFRoot.children[i];
    glTFNodeIndexToThreeNode[glTFNodeIndex] = threeNode;
    traverseChildren(threeNode, glTFNodeIndex);
  }
  return glTFNodeIndexToThreeNode;
}

const jsonPathRegEx =
  /^\/?(?<resource>[^/]+)\/(?<index>\d+)\/(?<property>[^/]+)$/;
function parseJsonPath(jsonPath: string) {
  const matches = jsonPathRegEx.exec(jsonPath);
  if (matches === null) throw new Error(`can not parse jsonPath: ${jsonPath}`);
  if (matches.groups === undefined)
    throw new Error(`can not parse jsonPath (no groups): ${jsonPath}`);
  return {
    resource: matches.groups.resource,
    index: Number.parseInt(matches.groups.index),
    property: matches.groups.property
  };
}

function toVec2(value: Vector2): Vec2 {
  return new Vec2(value.x, value.y);
}
function toVec3(value: Vector3): Vec3 {
  return new Vec3(value.x, value.y, value.z);
}
function toVec4(value: Vector4 | Quaternion): Vec4 {
  return new Vec4(value.x, value.y, value.z, value.w);
}

export class ThreeScene implements IScene {
  private glTFNodeIndexToThreeNode: { [index: number]: Object3D };
  private glTFMaterialIndexToThreeMaterial: {
    [index: number]: Material;
  } = {};

  public onSceneChanged = new EventEmitter<void>();

  constructor(public glTFRoot: Object3D, public glTFJson: GLTFJson) {
    this.glTFNodeIndexToThreeNode = mapGlTFNodeIndicesToThreeObject3Ds(
      glTFJson,
      glTFRoot
    );
  }

  getProperty(jsonPath: string, valueTypeName: string): any {
    const path = parseJsonPath(jsonPath);
    switch (path.resource) {
      case 'nodes': {
        const threeNode = this.glTFNodeIndexToThreeNode[path.index];
        switch (path.property) {
          case 'visible': {
            return threeNode.visible;
          }
          case 'translation': {
            return toVec3(threeNode.position);
          }
          case 'scale': {
            return toVec3(threeNode.scale);
          }
          case 'rotation': {
            return toVec4(threeNode.quaternion);
          }
          default:
            throw new Error(`unrecognized property: ${path.property}`);
        }
        break;
      }
      default:
        throw new Error(`unrecognized resource: ${path.resource}`);
    }
  }
  setProperty(jsonPath: string, valueTypeName: string, value: any): void {
    const path = parseJsonPath(jsonPath);
    switch (path.resource) {
      case 'nodes': {
        const threeNode = this.glTFNodeIndexToThreeNode[path.index];
        switch (path.property) {
          case 'visible': {
            threeNode.visible = value as boolean;
            break;
          }
          case 'translation': {
            const v = value as Vec3;
            threeNode.position.set(v.x, v.y, v.z);
            break;
          }
          case 'scale': {
            const v = value as Vec3;
            threeNode.scale.set(v.x, v.y, v.z);
            break;
          }
          case 'rotation': {
            const v = value as Vec4;
            threeNode.quaternion.set(v.x, v.y, v.z, v.w);
            break;
          }
          default:
            throw new Error(`unrecognized property: ${path.property}`);
        }
        break;
      }
      default:
        throw new Error(`unrecognized resource: ${path.resource}`);
    }
    this.onSceneChanged.emit();
  }
  addOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void {
    throw new Error('Method not implemented.');
  }
}
