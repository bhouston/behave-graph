import { Node } from '../../../Nodes/Node';
import { Socket } from '../../../Sockets/Socket';
import { ISceneGraph } from '../Providers/ISceneGraph';

export class GetSceneNodeProperty<T> extends Node {
  constructor(nodeName: string, public readonly valueTypeName: string) {
    super(
      'Query',
      nodeName,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath')],

      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const sceneGraph =
          context.graph.registry.implementations.get<ISceneGraph>(
            'ISceneGraph'
          );
        context.writeOutput(
          'value',
          sceneGraph.getProperty(context.readInput('jsonPath'))
        );
      }
    );
  }
}
