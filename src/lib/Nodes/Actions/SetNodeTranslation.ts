import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class SetNodeTranslation extends Node {
  constructor() {
    super(
      'action/setNodeTranslation',
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('xTranslation'),
        new NumberSocket('yTranslation'),
        new NumberSocket('zTranslation'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.translation.add(inputs['offset']);
        // return { eval: true };
      },
    );
  }
}

GlobalNodeRegistry.add('action/setNodeTranslation', () => new SetNodeTranslation());
