import { Object3D } from 'three';
import { EventEmitter } from '../../lib/Events/EventEmitter.js';
import { IScene } from '../../lib/Profiles/Scene/Abstractions/IScene.js';
import { GLTFJson } from './GLTFJson.js';
export declare class ThreeScene implements IScene {
    glTFRoot: Object3D;
    readonly glTFJson: GLTFJson;
    private glTFNodeIndexToThreeNode;
    private glTFMaterialIndexToThreeMaterial;
    onSceneChanged: EventEmitter<void>;
    constructor(glTFRoot: Object3D, glTFJson: GLTFJson);
    getProperty(jsonPath: string, valueTypeName: string): any;
    setProperty(jsonPath: string, valueTypeName: string, value: any): void;
    addOnClickedListener(jsonPath: string, callback: (jsonPath: string) => void): void;
}
//# sourceMappingURL=ThreeScene.d.ts.map