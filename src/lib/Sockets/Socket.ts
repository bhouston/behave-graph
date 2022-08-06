import NodeSocketRef from '../Nodes/NodeSocketRef';

export default class Socket {
  public links: NodeSocketRef[] = [];

  constructor(
      public name: string,
      public valueTypeName: 'flow' | 'string' | 'number' | 'boolean',
      public value: any | undefined,
  ) {
  }
}
