import { Socket } from '../Sockets/Socket';
import { Node } from './Node';

export class Link {
  public _targetNode: Node | undefined = undefined;
  public _targetSocket: Socket | undefined = undefined;

  constructor(public nodeId: string = '', public socketName: string = '') {}
}
