import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import Node from '../../../Nodes/Node';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class GetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xRotation'), new NumberSocket('yRotation'), new NumberSocket('zRotation')],
      () => {
        const outputValues = new Map<string, any>();
        // TODO: Actually read property of the node
        outputValues.set('x', 0);
        outputValues.set('y', 0);
        outputValues.set('z', 0);
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('logic/getNodeRotation', () => new GetNodeVector3('logic/getNodeRotation', 'rotation'));
GlobalNodeRegistry.add('logic/getNodeTranslation', () => new GetNodeVector3('logic/getNodeTranslation', 'translation'));
GlobalNodeRegistry.add('logic/getNodeScale', () => new GetNodeVector3('logic/getNodeScale', 'scale'));
