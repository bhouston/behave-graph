import Node from './Node';

type NodeFactory = () => Node;
export default class NodeRegistry {
  public nameToFactory = new Map<string, NodeFactory>();

  constructor() {
  }

  add(name: string, nodeFactory: NodeFactory) {
    if (this.nameToFactory.get(name) !== undefined) {
      throw new Error(`already registered name ${name}`);
    }
    this.nameToFactory.set(name, nodeFactory);
    return this;
  }

  create(name: string): Node {
    const factory = this.nameToFactory.get(name);
    if (factory === undefined) {
      throw new Error(`no registered node with name ${name}`);
    }
    return factory();
  }
}
