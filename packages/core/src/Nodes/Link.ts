import { Socket } from '../Sockets/Socket.js';
import { INode } from './NodeInstance.js';

export class Link {
  public _targetNode: INode | undefined = undefined;
  public _targetSocket: Socket | undefined = undefined;

  constructor(public nodeId: string = '', public socketName: string = '') {}
}
