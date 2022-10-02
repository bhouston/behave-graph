import NodeSocketRef from '../Nodes/NodeSocketRef';

export default class Socket {
  public readonly links: NodeSocketRef[] = [];

  constructor(
    public readonly valueTypeName: string,
    public readonly name: string,
    public value: any | undefined = undefined
  ) {}
}
