import { extractPostfixFromNodeType } from '../../../extractIdFromNodeType.js';
import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { IScene } from '../Abstractions/IScene.js';

export class GetSceneProperty extends Node {
  constructor(description: NodeDescription, graph: Graph) {
    const valueTypeName = extractPostfixFromNodeType(description.typeName);
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const sceneGraph =
          context.graph.registry.abstractions.get<IScene>('IScene');
        context.writeOutput(
          'value',
          sceneGraph.getProperty(context.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
