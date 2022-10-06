import { EventEmitter } from '../../../Events/EventEmitter';

export interface ILifecycleEventEmitter {
  startEvent: EventEmitter<void>;
  endEvent: EventEmitter<void>;
  tickEvent: EventEmitter<void>;
}
