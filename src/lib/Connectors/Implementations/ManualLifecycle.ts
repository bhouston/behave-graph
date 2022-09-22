import EventEmitter from '../../EventEmitter';
import ILifecycleConnector from '../ILifecycleConnector';

export default class ManualLifecycle implements ILifecycleConnector {
  public readonly startEvent = new EventEmitter<void>();
  public readonly endEvent = new EventEmitter<void>();
  public readonly tickEvent = new EventEmitter<void>();

  constructor() {
  }
}
