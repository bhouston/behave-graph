import { EventEmitter } from '../../lib/Events/EventEmitter.js';
import { IScene } from '../../lib/Profiles/Scene/Abstractions/IScene.js';
import { Registry } from '../../lib/Registry.js';
export declare class DummyScene implements IScene {
    registry: Registry;
    onSceneChanged: EventEmitter<void>;
    constructor(registry: Registry);
    getProperty(jsonPath: string, valueTypeName: string): any;
    setProperty(): void;
    addOnClickedListener(jsonPath: string, callback: (jsonPath: string) => void): void;
}
//# sourceMappingURL=DummyScene.d.ts.map