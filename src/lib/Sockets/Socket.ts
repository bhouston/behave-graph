import NodeSocketRef from '../Nodes/NodeSocketRef';

export default class Socket {
  public readonly links: NodeSocketRef[] = [];

  constructor(
      public readonly name: string,
      public readonly valueTypeName: string,
      public value: any | undefined = undefined,
  ) {
  }
}
