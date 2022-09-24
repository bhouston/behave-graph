import Socket from '../../Sockets/Socket';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export default class In0Out1FuncNode<Out1> extends Node {
  constructor(nodeName: string, outputValueType: string, public nullaryEvalFunc: () => Out1) {
    super(
      'Logic',
      nodeName,
      [],
      [new Socket('result', outputValueType)],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.nullaryEvalFunc());
      },
    );
  }
}
