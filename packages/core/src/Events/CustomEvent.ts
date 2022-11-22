import { Metadata } from '../Metadata';
import { Socket } from '../Sockets/Socket';
import { EventEmitter } from './EventEmitter';

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
