import { Node } from '../../../Nodes/Node';
import { Socket } from '../../../Sockets/Socket';
import { ISceneGraph } from '../Providers/ISceneGraph';

export class SetSceneNodeProperty<T> extends Node {
  constructor(nodeName: string, public readonly valueTypeName: string) {
    super(
      'Action',
      nodeName,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'jsonPath'),
        new Socket(valueTypeName, 'value')
      ],
      [new Socket('flow', 'flow')],
      (context) => {
        const sceneGraph =
          context.graph.registry.implementations.get<ISceneGraph>(
            'ISceneGraph'
          );
        sceneGraph.setProperty(
          context.readInput('jsonPath'),
          context.readInput('value')
        );
      }
    );
  }
}
