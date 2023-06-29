import { Metadata } from '../Metadata.js';
import { Socket } from '../Sockets/Socket.js';
import { EventEmitter } from './EventEmitter.js';

export class CustomEvent {
  public label = '';
  public metadata: Metadata = {};
  public readonly eventEmitter = new EventEmitter<{
    [parameterName: string]: any;
  }>();

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly parameters: Socket[] = []
  ) {}
}
