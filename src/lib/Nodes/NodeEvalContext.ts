import Graph from '../Graphs/Graph';
import Node from './Node';

// Purpose:
//  - Avoid nodes having to access globals to referene the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export default class NodeEvalContext {
  constructor(public graph: Graph, public node: Node) {
  }

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  getInputValue(inputName: string): any {
    const result = this.node.inputSockets.find((socket) => socket.name === inputName);
    if (result === undefined) {
      throw new Error(`can not find input socket with name ${inputName}`);
    }
    return result.value;
  }

  setOutputValue(outputName: string, value: any) {
    const result = this.node.outputSockets.find((socket) => socket.name === outputName);
    if (result === undefined) {
      throw new Error(`can not find output socket with name ${outputName}`);
    }
    result.value = value;
  }

  // eslint-disable-next-line class-methods-use-this
  log(text: string) {
    console.log(text);
  }
}
