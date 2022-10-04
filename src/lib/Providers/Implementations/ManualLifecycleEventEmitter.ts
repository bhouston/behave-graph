import { EventEmitter } from '../../Events/EventEmitter';
import { ILifecycleEventEmitter } from '../ILifecycleEventEmitter';

export class ManualLifecycleEventEmitter implements ILifecycleEventEmitter {
  public readonly startEvent = new EventEmitter<void>();
  public readonly endEvent = new EventEmitter<void>();
  public readonly tickEvent = new EventEmitter<void>();

  constructor() {}
}
