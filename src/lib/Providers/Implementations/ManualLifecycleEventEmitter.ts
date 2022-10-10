import { EventEmitter } from '../../Events/EventEmitter.js';
import { ILifecycleEventEmitter } from '../../Profiles/Core/Providers/ILifecycleEventEmitter.js';

export class ManualLifecycleEventEmitter implements ILifecycleEventEmitter {
  public readonly startEvent = new EventEmitter<void>();
  public readonly endEvent = new EventEmitter<void>();
  public readonly tickEvent = new EventEmitter<void>();
}
