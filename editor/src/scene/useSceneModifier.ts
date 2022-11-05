import { ObjectMap } from '@react-three/fiber';
import { IScene, Vec3, Vec4 } from '@behavior-graph/framework';
import { useCallback, useEffect, useState } from 'react';
import { Object3D, Quaternion, Vector3, Vector4 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

function toVec3(value: Vector3): Vec3 {
  return new Vec3(value.x, value.y, value.z);
}
function toVec4(value: Vector4 | Quaternion): Vec4 {
  return new Vec4(value.x, value.y, value.z, value.w);
}

const jsonPathRegEx = /^\/?(?<resource>[^/]+)\/(?<name>[^/]+)\/(?<property>[^/]+)$/;
export type Path = {
  resource: string;
  name: string;
  property: string;
};

function parseJsonPath(jsonPath: string) {
  const matches = jsonPathRegEx.exec(jsonPath);
  if (matches === null) throw new Error(`can not parse jsonPath: ${jsonPath}`);
  if (matches.groups === undefined) throw new Error(`can not parse jsonPath (no groups): ${jsonPath}`);
  return {
    resource: matches.groups.resource,
    name: matches.groups.name,
    property: matches.groups.property,
  };
}

function applyPropertyToModel({ resource, name, property }: Path, gltf: GLTF & ObjectMap, value: any) {
  if (resource === 'nodes') {
    const node = gltf.nodes[name];

    if (!node) {
      console.error(`no node at path ${name}`);
      return;
    }

    applyModifier(property, node, value);

    return;
  }

  console.error(`unknown resource type ${resource}`);
}

function getPropertyFromModel({ resource, name, property }: Path, gltf: GLTF & ObjectMap) {
  if (resource === 'nodes') {
    const node = gltf.nodes[name];

    if (!node) {
      console.error(`no node at path ${name}`);
      return;
    }

    getPropertyValue(property, node);

    return;
  }
}

function applyModifier(property: string, objectRef: Object3D, value: any) {
  switch (property) {
    case 'visible': {
      objectRef.visible = value as boolean;
      break;
    }
    case 'translation': {
      const v = value as Vec3;
      objectRef.position.set(v.x, v.y, v.z);
      break;
    }
    case 'scale': {
      const v = value as Vec3;
      objectRef.scale.set(v.x, v.y, v.z);
      break;
    }
    case 'rotation': {
      const v = value as Vec4;
      objectRef.quaternion.set(v.x, v.y, v.z, v.w);
      break;
    }
  }
}

function getPropertyValue(property: string, objectRef: Object3D) {
  switch (property) {
    case 'visible': {
      return objectRef.visible;
    }
    case 'translation': {
      return toVec3(objectRef.position);
    }
    case 'scale': {
      return toVec3(objectRef.scale);
    }
    case 'rotation': {
      return toVec4(objectRef.quaternion);
    }
    default:
      throw new Error(`unrecognized property: ${property}`);
  }
}

const buildSceneModifier = (gltf: GLTF & ObjectMap) => {
  const addOnClickedListener = (jsonPath: string, callback: (jsonPath: string) => void) => {};
  const getProperty = (jsonPath: string, valueTypeName: string) => {
    const path = parseJsonPath(jsonPath);

    return getPropertyFromModel(path, gltf);
  };

  const setProperty = (jsonPath: string, valueTypeName: string, value: any) => {
    const path = parseJsonPath(jsonPath);

    applyPropertyToModel(path, gltf, value);
  };

  const scene: IScene = {
    getProperty,
    setProperty,
    addOnClickedListener,
  };

  return scene;
};

const useSceneModifier = (gltf: GLTF & ObjectMap) => {
  const [scene, setScene] = useState<IScene>(() => buildSceneModifier(gltf));

  useEffect(() => {
    setScene(buildSceneModifier(gltf));
  }, []);

  return scene;
};

export default useSceneModifier;
