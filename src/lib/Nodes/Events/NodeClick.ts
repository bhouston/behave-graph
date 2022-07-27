import Node from '../../../Nodes/Node';
import NumberSocket from './Sockets/Spec/NumberSocket';
import EvalSocket from './Sockets/Spec/EvalSocket';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class NodeClick extends Node {
  constructor() {
    super(
      'event/nodeClick',
      [],
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
      ],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        outputValues.set('nodeIndex', -1); // TODO: Replace with real value.
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('event/nodeClick', () => new NodeClick());
