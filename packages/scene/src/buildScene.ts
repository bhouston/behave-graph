import { Choices, EventEmitter } from '@behave-graph/core';
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

import { IScene } from './Abstractions/IScene.js';
import { GLTFJson } from './GLTFJson.js';
import { Vec3 } from './Values/Internal/Vec3.js';
import { Vec4 } from './Values/Internal/Vec4.js';

enum Resource {
  nodes = 'nodes',
  materials = 'materials',
  animations = 'animations'
}

function toVec3(value: Vector3): Vec3 {
  return new Vec3(value.x, value.y, value.z);
}
function toVec4(value: Vector4 | Quaternion): Vec4 {
  return new Vec4(value.x, value.y, value.z, value.w);
}

export declare type ObjectMap = {
  nodes: {
    [name: string]: Object3D;
  };
  materials: {
    [name: string]: Material;
  };
};

const shortPathRegEx = /^\/?(?<resource>[^/]+)\/(?<index>\d+)$/;
const jsonPathRegEx =
  /^\/?(?<resource>[^/]+)\/(?<index>\d+)\/(?<property>[^/]+)$/;

export type Optional<T> = {
  [K in keyof T]: T[K] | undefined;
};

export type Path = {
  resource: Resource;
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
    resource: matches.groups.resource as Resource,
    index: +matches.groups.index,
    property: matches.groups.property
  };
}

export function applyPropertyToModel(
  { resource, index, property }: Path,
  gltf: GLTF & ObjectMap,
  value: any,
  properties: Properties,
  setActiveAnimations:
    | ((animation: string, active: boolean) => void)
    | undefined
) {
  const nodeName = getResourceName({ resource, index }, properties);
  if (!nodeName) throw new Error(`could not get node at index ${index}`);
  if (resource === Resource.nodes) {
    const node = gltf.nodes[nodeName] as unknown as Object3D | undefined;

    if (!node) {
      console.error(`no node at path ${nodeName}`);
      return;
    }

    applyNodeModifier(property, node, value);

    return;
  }
  if (resource === Resource.materials) {
    const node = gltf.materials[nodeName] as unknown as Material | undefined;

    if (!node) {
      console.error(`no node at path ${nodeName}`);
      return;
    }

    applyMaterialModifier(property, node, value);

    return;
  }

  if (resource === Resource.animations) {
    if (!setActiveAnimations) {
      console.error(
        'cannot apply animation property without setActiveAnimations'
      );
      return;
    }

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
  if (resource === Resource.nodes) {
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
      console.log(v.x);
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

export type ResourceOption = {
  name: string;
  index: number;
};

export type ResourceProperties = {
  options: ResourceOption[];
  properties: string[];
};

type Properties = {
  [key in Resource]?: ResourceProperties;
};

export type ParsableScene = GLTF &
  ObjectMap & {
    json?: GLTFJson;
  };

export const extractProperties = (gltf: ParsableScene): Properties => {
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

  properties.nodes = { options: nodeOptions, properties: nodeProperties };

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

function createPropertyChoice(
  resource: string,
  name: string,
  property: string,
  index: number
): { text: string; value: any } {
  return {
    text: `${resource}/${name}/${property}`,
    value: `${resource}/${index}/${property}`
  };
}

function generateChoicesForProperty(
  property: ResourceProperties | undefined,
  resource: Resource
) {
  if (!property) return [];
  const choices: { text: string; value: any }[] = [];

  property.options.forEach(({ index, name }) => {
    property.properties.forEach((property) => {
      choices.push(createPropertyChoice(resource, name, property, index));
    });
  });

  return choices;
}

export function generateSettableChoices(properties: Properties): Choices {
  const choices: { text: string; value: any }[] = [
    ...generateChoicesForProperty(properties.nodes, Resource.nodes),
    ...generateChoicesForProperty(properties.materials, Resource.materials),
    ...generateChoicesForProperty(properties.animations, Resource.animations)
  ];

  return choices;
}

export function generateRaycastableChoices(properties: Properties): Choices {
  const choices: { text: string; value: any }[] = [];

  properties.nodes?.options.forEach(({ index, name }) => {
    choices.push({
      text: `nodes/${name}`,
      value: `nodes/${index}`
    });
  });

  return choices;
}

export type OnClickCallback = (jsonPath: string) => void;

export type OnClickListener = {
  path: Path;
  elementName: string;
  callbacks: OnClickCallback[];
};

export type OnClickListeners = {
  [jsonPath: string]: OnClickListener;
};

export const buildScene = ({
  gltf,
  setOnClickListeners,
  setActiveAnimations
}: {
  gltf: GLTF & ObjectMap;
  setOnClickListeners:
    | ((cb: (existing: OnClickListeners) => OnClickListeners) => void)
    | undefined;
  setActiveAnimations:
    | ((animation: string, active: boolean) => void)
    | undefined;
}) => {
  const properties = extractProperties(gltf);

  const onSceneChanged = new EventEmitter<void>();

  const addOnClickedListener = (
    jsonPath: string,
    callback: (jsonPath: string) => void
  ) => {
    if (!setOnClickListeners) return;
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
    if (!setOnClickListeners) return;
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

    onSceneChanged.emit();
  };

  const settableChoices = generateSettableChoices(properties);
  const raycastableChoices = generateRaycastableChoices(properties);

  const addOnSceneChangedListener: IScene['addOnSceneChangedListener'] = (
    listener
  ) => {
    onSceneChanged.addListener(listener);
  };

  const removeOnSceneChangedListener: IScene['removeOnSceneChangedListener'] = (
    listener
  ) => {
    onSceneChanged.removeListener(listener);
  };

  const scene: IScene = {
    getProperty,
    setProperty,
    getProperties: () => settableChoices,
    getRaycastableProperties: () => raycastableChoices,
    addOnClickedListener,
    removeOnClickedListener,
    addOnSceneChangedListener,
    removeOnSceneChangedListener
  };

  return scene;
};
