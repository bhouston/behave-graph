import SocketSpec from '../Sockets/SocketSpec';
import NodeEvalContext from '../../Nodes/NodeEvalContext';

export type NodeEvalFunction = (context: NodeEvalContext, inputValues: Map<string, any>) => Map<string, any>;

// structure for defining BehaviorNodes

export default class NodeSpec {
  public inputSocketSpecs = new Map<string, SocketSpec>();

  public outputSocketSpecs = new Map<string, SocketSpec>();

  constructor(
    public type: string,
    public name: string,
    public inputSocketSpecArray: Array<SocketSpec>,
    public outputSocketSpecArray: Array<SocketSpec>,
    public func: NodeEvalFunction,
  ) {
    // convert from arrays to maps.
    inputSocketSpecArray.forEach((socketSpec) => this.inputSocketSpecs.set(socketSpec.name, socketSpec));
    outputSocketSpecArray.forEach((socketSpec) => this.outputSocketSpecs.set(socketSpec.name, socketSpec));
  }
}
