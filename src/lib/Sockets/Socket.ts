import NodeSocketRef from '../Nodes/NodeSocketRef';

export default class Socket {
  public links: NodeSocketRef[] = [];

  constructor(
      public name: string,
      public valueTypeName: string,
      public value: any | undefined,
  ) {
  }
}
