import { registerSceneProfile, Registry, Vec3, Vec4 } from '@behave-graph/core';
import { ObjectMap } from '@react-three/fiber';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Event,
  Material,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  Vector3,
  Vector4
} from 'three';
import { GLTF } from 'three-stdlib';

import { ISceneWithQueries, Properties, ResourceTypes } from '../abstractions';
import { GLTFJson } from './GLTFJson';

function toVec3(value: Vector3): Vec3 {
  return new Vec3(value.x, value.y, value.z);
}
function toVec4(value: Vector4 | Quaternion): Vec4 {
  return new Vec4(value.x, value.y, value.z, value.w);
}

const shortPathRegEx = /^\/?(?<resource>[^/]+)\/(?<index>\d+)$/;
const jsonPathRegEx =
  /^\/?(?<resource>[^/]+)\/(?<index>\d+)\/(?<property>[^/]+)$/;

export type Optional<T> = {
  [K in keyof T]: T[K] | undefined;
};

export type Path = {
  resource: ResourceTypes;
  index: number;
  property: string;
};

export function toJsonPathString(
  { index, property, resource: resourceType }: Optional<Path>,
  short: boolean
) {
  if (short) {
    if (!resourceType || typeof index === undefined) return;
    return `${resourceType}/${index}`;
  } else {
    if (!resourceType || typeof index === undefined || !property) return;
    return `${resourceType}/${index}/${property}`;
  }
}

export function parseJsonPath(jsonPath: string, short = false): Path {
  // hack = for now we see if there are 2 segments to know if its short
  const regex = short ? shortPathRegEx : jsonPathRegEx;
  const matches = regex.exec(jsonPath);
  if (matches === null) throw new Error(`can not parse jsonPath: ${jsonPath}`);
  if (matches.groups === undefined)
    throw new Error(`can not parse jsonPath (no groups): ${jsonPath}`);
  return {
    resource: matches.groups.resource as ResourceTypes,
    index: +matches.groups.index,
    property: matches.groups.property
  };
}

function applyPropertyToModel(
  { resource, index, property }: Path,
  gltf: GLTF & ObjectMap,
  value: any,
  properties: Properties,
  setActiveAnimations: (animation: string, active: boolean) => void
) {
  const nodeName = getResourceName({ resource, index }, properties);
  if (!nodeName) throw new Error(`could not get node at index ${index}`);
  if (resource === 'nodes') {
    const node = gltf.nodes[nodeName] as unknown as Object3D | undefined;

    if (!node) {
      console.error(`no node at path ${nodeName}`);
      return;
    }

    applyNodeModifier(property, node, value);

    return;
  }
  if (resource === 'materials') {
    const node = gltf.materials[nodeName] as unknown as Material | undefined;

    if (!node) {
      console.error(`no node at path ${nodeName}`);
      return;
    }

    applyMaterialModifier(property, node, value);

    return;
  }

  if (resource === 'animations') {
    setActiveAnimations(nodeName, value as boolean);
    return;
  }

  console.error(`unknown resource type ${resource}`);
}

const getResourceName = (
  { resource, index }: Pick<Path, 'resource' | 'index'>,
  properties: Properties
) => {
  return properties[resource]?.options[index].name;
};

const getPropertyFromModel = (
  { resource, index, property }: Path,
  gltf: GLTF & ObjectMap,
  properties: Properties
) => {
  if (resource === 'nodes') {
    const nodeName = getResourceName({ resource, index }, properties);
    if (!nodeName) throw new Error(`could not get node at index ${index}`);
    const node = gltf.nodes[nodeName] as unknown as Object3D | undefined;

    if (!node) {
      console.error(`no node at path ${nodeName}`);
      return;
    }

    getPropertyValue(property, node);

    return;
  }
};

function applyNodeModifier(property: string, objectRef: Object3D, value: any) {
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

function applyMaterialModifier(
  property: string,
  materialRef: Material,
  value: any
) {
  switch (property) {
    case 'color': {
      const basic = materialRef as MeshBasicMaterial;

      if (basic.color) {
        const v = value as Vec3;
        basic.color.setRGB(v.x, v.y, v.z);
        basic.needsUpdate = true;
      }
      break;
    }
  }
}

function getPropertyValue(property: string, objectRef: Object3D<Event>) {
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

const extractProperties = (gltf: GLTF): Properties => {
  const nodeProperties = [
    'visible',
    'translation',
    'scale',
    'rotation',
    'color'
  ];
  const animationProperties = ['playing'];
  const materialProperties = ['color'];

  const gltfJson = gltf.parser.json as GLTFJson;

  const nodeOptions = gltfJson.nodes?.map(({ name }, index) => ({
    name: name || index.toString(),
    index
  }));
  const materialOptions = gltfJson.materials?.map(({ name }, index) => ({
    name: name || index.toString(),
    index
  }));
  const animationOptions = gltf.animations?.map(({ name }, index) => ({
    name: name || index.toString(),
    index
  }));

  const properties: Properties = {};

  if (nodeOptions) {
    properties.nodes = { options: nodeOptions, properties: nodeProperties };
  }

  if (materialOptions) {
    properties.materials = {
      options: materialOptions,
      properties: materialProperties
    };
  }

  if (animationOptions) {
    properties.animations = {
      options: animationOptions,
      properties: animationProperties
    };
  }

  return properties;
};

export type OnClickCallback = (jsonPath: string) => void;

export type OnClickListener = {
  path: Path;
  elementName: string;
  callbacks: OnClickCallback[];
};

export type OnClickListeners = {
  [jsonPath: string]: OnClickListener;
};

const buildSceneModifier = (
  gltf: GLTF & ObjectMap,
  setOnClickListeners: Dispatch<SetStateAction<OnClickListeners>>,
  setActiveAnimations: (animation: string, active: boolean) => void
) => {
  const properties = extractProperties(gltf);

  const addOnClickedListener = (
    jsonPath: string,
    callback: (jsonPath: string) => void
  ) => {
    const path = parseJsonPath(jsonPath, true);

    setOnClickListeners((existing) => {
      const listenersForPath = existing[jsonPath] || {
        path,
        elementName: getResourceName(
          { resource: path.resource, index: path.index },
          properties
        ),
        callbacks: []
      };

      const updatedListeners: OnClickListener = {
        ...listenersForPath,
        callbacks: [...listenersForPath.callbacks, callback]
      };

      const result: OnClickListeners = {
        ...existing,
        [jsonPath]: updatedListeners
      };

      return result;
    });
  };

  const removeOnClickedListener = (
    jsonPath: string,
    callback: (jsonPath: string) => void
  ) => {
    setOnClickListeners((existing) => {
      const listenersForPath = existing[jsonPath];

      if (!listenersForPath) return existing;

      const updatedCallbacks = listenersForPath.callbacks.filter(
        (x) => x !== callback
      );

      if (updatedCallbacks.length > 0) {
        const updatedListeners = {
          ...listenersForPath,
          callback: updatedCallbacks
        };

        return {
          ...existing,
          [jsonPath]: updatedListeners
        };
      }

      const result = {
        ...existing
      };

      delete result[jsonPath];

      return result;
    });
  };

  const getProperty = (jsonPath: string, valueTypeName: string) => {
    const path = parseJsonPath(jsonPath);

    return getPropertyFromModel(path, gltf, properties);
  };

  const setProperty = (jsonPath: string, valueTypeName: string, value: any) => {
    const path = parseJsonPath(jsonPath);

    applyPropertyToModel(path, gltf, value, properties, setActiveAnimations);
  };

  const getProperties = () => properties;

  const scene: ISceneWithQueries = {
    getProperty,
    setProperty,
    getProperties,
    addOnClickedListener,
    removeOnClickedListener
  };

  return scene;
};

export type AnimationsState = { [key: string]: boolean };

const useSceneModifier = (gltf: (GLTF & ObjectMap) | undefined) => {
  const [scene, setScene] = useState<ISceneWithQueries>();

  const [activeAnimations, setActiveAnimations] = useState<AnimationsState>({});
  const [sceneOnClickListeners, setSceneOnClickListeners] =
    useState<OnClickListeners>({});

  useEffect(() => {
    // reset state on new active animations
    setActiveAnimations({});
  }, [gltf]);

  const setAnimationActive = useCallback(
    (animation: string, active: boolean) => {
      setActiveAnimations((existing) => {
        if (!!existing[animation] === active) return existing;

        return {
          ...existing,
          [animation]: active
        };
      });
    },
    []
  );

  useEffect(() => {
    if (!gltf) {
      setScene(undefined);
    } else {
      setScene(
        buildSceneModifier(gltf, setSceneOnClickListeners, setAnimationActive)
      );
    }
  }, [gltf, setSceneOnClickListeners, setAnimationActive]);

  const registerProfile = useCallback(
    (registry: Registry) => {
      if (!scene) return;
      registerSceneProfile(registry, scene);
    },
    [scene]
  );

  return {
    scene,
    animations: activeAnimations,
    sceneOnClickListeners,
    registerSceneProfile: registerProfile
  };
};

export default useSceneModifier;
