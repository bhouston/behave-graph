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
        const scene =
          context.graph.registry.implementations.get<IScene>('IScene');
        const value = context.readInput<T>('value');
        scene.setProperty(context.readInput('jsonPath'), valueTypeName, value);
      }
    );
  }
}
