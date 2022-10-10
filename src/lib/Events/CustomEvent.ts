import { Metadata } from '../Metadata.js';
import { EventEmitter } from './EventEmitter.js';

export class CustomEvent {
  public label = '';
  public metadata: Metadata = {};
  public readonly eventEmitter = new EventEmitter<void>();

  constructor(public readonly id: string, public readonly name: string) {}
}
