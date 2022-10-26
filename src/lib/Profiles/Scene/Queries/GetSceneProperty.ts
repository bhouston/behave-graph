import { Node } from '../../../Nodes/Node.js';
import { Socket } from '../../../Sockets/Socket.js';
import { IScene } from '../Abstractions/IScene.js';

export class GetSceneProperty extends Node {
  constructor(nodeName: string, public readonly valueTypeName: string) {
    super(
      'Query',
      nodeName,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const sceneGraph =
          context.graph.registry.abstractions.get('IScene');
        context.writeOutput(
          'value',
          sceneGraph.getProperty(context.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
