export declare type GLTFAssetJson = {
    generator: string;
    version: string;
};
export declare type GLTFSceneJson = {
    name: string;
    nodes: number[];
};
export declare type GLTFNodeJson = {
    name?: string;
    mesh?: number;
    translation?: number[];
    children?: number[];
};
export declare type GLTFMaterialJson = {
    name?: string;
    doubleSided?: boolean;
};
export declare type GLTFMeshJson = {
    name?: string;
};
export declare type GLTFJson = {
    asset: GLTFAssetJson;
    scene: number;
    scenes: GLTFSceneJson[];
    nodes: GLTFNodeJson[];
    materials: GLTFMaterialJson[];
    meshes: GLTFMeshJson[];
};
//# sourceMappingURL=GLTFJson.d.ts.map