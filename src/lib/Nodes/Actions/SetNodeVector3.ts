import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class SetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        // TODO: Set the x,y,z on the specified property.
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.rotation.add(inputs['eulerDelta']);
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('action/setNodeRotation', () => new SetNodeVector3('action/setNodeRotation', 'rotation'));
GlobalNodeRegistry.add('action/setNodeTranslation', () => new SetNodeVector3('action/setNodeTranslation', 'translation'));
GlobalNodeRegistry.add('action/setNodeScale', () => new SetNodeVector3('action/setNodeScale', 'scale'));
