export type GLTFAssetJson = {
  generator: string;
  version: string;
};

export type GLTFSceneJson = {
  name: string;
  nodes: number[];
};

export type GLTFNodeJson = {
  name?: string;
  mesh?: number;
  translation?: number[];
  children?: number[];
};

export type GLTFMaterialJson = {
  name?: string;
  doubleSided?: boolean;
};

export type GLTFMeshJson = {
  name?: string;
};

export type GLTFJson = {
  asset: GLTFAssetJson;
  scene: number;
  scenes: GLTFSceneJson[];
  nodes: GLTFNodeJson[];
  materials: GLTFMaterialJson[];
  meshes: GLTFMeshJson[];
};
