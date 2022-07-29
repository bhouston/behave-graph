import NodeSocketRef from '../Nodes/NodeSocketRef';
import { SocketValueType } from './SocketValueType';

export default class Socket {
  public links: NodeSocketRef[] = [];

  constructor(
      public name: string,
      public valueType: SocketValueType,
      public value: any | undefined,
  ) {
  }
}
