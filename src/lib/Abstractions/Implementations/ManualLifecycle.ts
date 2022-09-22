import EventEmitter from '../../DesignPatterns/EventEmitter';
import ILifecycleAbstraction from '../ILifecycleAbstraction';

export default class ManualLifecycle implements ILifecycleAbstraction {
  public readonly startEvent = new EventEmitter<void>();
  public readonly endEvent = new EventEmitter<void>();
  public readonly tickEvent = new EventEmitter<void>();

  constructor() {
  }
}
