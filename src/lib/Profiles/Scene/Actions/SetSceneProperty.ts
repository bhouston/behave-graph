import { Node } from '../../../Nodes/Node';
import { Socket } from '../../../Sockets/Socket';
import { IScene } from '../Providers/IScene';

export class SetSceneProperty<T> extends Node {
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
          context.graph.registry.implementations.get<IScene>('IScene');
        sceneGraph.setProperty(
          context.readInput('jsonPath'),
          valueTypeName,
          context.readInput('value')
        );
      }
    );
  }
}
