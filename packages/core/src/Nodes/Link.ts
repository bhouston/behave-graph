import { Socket } from '../Sockets/Socket';
import { INode } from './NodeInstance';

export class Link {
  public _targetNode: INode | undefined = undefined;
  public _targetSocket: Socket | undefined = undefined;

  constructor(public nodeId: string = '', public socketName: string = '') {}
}
