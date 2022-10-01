import { Metadata } from '../Metadata';
import EventEmitter from './EventEmitter';

export default class CustomEvent {
  public label = '';
  public metadata: Metadata = {};
  public readonly eventEmitter = new EventEmitter<void>();

  constructor(public readonly id: string, public readonly name: string) {
  }
}
