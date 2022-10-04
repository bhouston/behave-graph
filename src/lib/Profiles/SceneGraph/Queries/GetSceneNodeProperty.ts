import { Object3D } from 'three';

import { Node } from '../../../Nodes/Node';
import { IThree } from '../../../Providers/ISceneGraph';
import { Socket } from '../../../Sockets/Socket';

export class GetSceneNodeProperty<T> extends Node {
  constructor(
    nodeName: string,
    public readonly valueTypeName: string,
    getter: (node: Object3D) => T
  ) {
    super(
      'Query',
      nodeName,
      [new Socket('flow', 'flow'), new Socket('id', 'nodeId')],
      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const three =
          context.graph.registry.implementations.get<IThree>('IThree');
        const object3D = three.getObject3D(context.readInput('modeId'));
        context.writeOutput('value', getter(object3D));
      }
    );
  }
}
