import createTypedSocket from '../../Sockets/Typed/TypedSocketFactory';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export default class In1Out1FuncNode<In1, Out1> extends Node {
  constructor(nodeName: string, inputValueType: string, outputValueType: string, public unaryEvalFunc: (a: In1) => Out1) {
    super(
      'Logic',
      nodeName,
      [
        createTypedSocket(inputValueType, 'a'),
      ],
      [
        createTypedSocket(outputValueType, 'result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.unaryEvalFunc(context.readInput('a')));
      },
    );
  }
}
