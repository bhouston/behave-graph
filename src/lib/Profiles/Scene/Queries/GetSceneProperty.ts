import { Node } from '../../../Nodes/Node.js';
import { Socket } from '../../../Sockets/Socket.js';
import { IScene } from '../Providers/IScene.js';

export class GetSceneProperty<T> extends Node {
  constructor(nodeName: string, public readonly valueTypeName: string) {
    super(
      'Query',
      nodeName,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const sceneGraph =
          context.graph.registry.implementations.get<IScene>('IScene');
        context.writeOutput<T>(
          'value',
          sceneGraph.getProperty(context.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
