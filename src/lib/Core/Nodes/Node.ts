import NodeSpec from './Spec/NodeSpec';
import InputSocket from '../Sockets/InputSocket';
import OutputSocket from '../Sockets/OutputSocket';

export default class Node {
  public outputSockets = new Map<string, OutputSocket>();

  constructor(
        public id: string,
        public nodeSpec: NodeSpec,
        public inputSockets: Map<string, InputSocket>,
  ) {
    // initialize node outputs based on the specification
    this.nodeSpec.outputSocketSpecs.forEach((outputSocketSpec) => {
      this.outputSockets.set(outputSocketSpec.name, new OutputSocket());
    });
  }
}
