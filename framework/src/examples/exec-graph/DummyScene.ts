import { EventEmitter } from '../../lib/Events/EventEmitter.js';
import { IScene, Properties } from '../../lib/Profiles/Scene/Abstractions/IScene.js';
import { Registry } from '../../lib/Registry.js';

export class DummyScene implements IScene {
  public onSceneChanged = new EventEmitter<void>();

  constructor(public registry: Registry) {}

  getProperties(): Properties {
    return {};
  }

  getProperty(jsonPath: string, valueTypeName: string): any {
    return this.registry.values.get(valueTypeName).creator();
  }
  setProperty(): void {
    this.onSceneChanged.emit();
  }
  addOnClickedListener(jsonPath: string, callback: (jsonPath: string) => void): void {
    throw new Error('Method not implemented.');
  }
}
