import createTypedSocket from '../../Sockets/Typed/TypedSocketFactory';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export default class In0Out1FuncNode<Out1> extends Node {
  constructor(nodeName: string, outputValueType: string, public nullaryEvalFunc: () => Out1) {
    super(
      'Logic',
      nodeName,
      [],
      [createTypedSocket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.nullaryEvalFunc());
      },
    );
  }
}
