import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class GetSceneProperty extends Node {
  public static GetDescriptions(...valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/get/${valueTypeName}`,
          'Query',
          `Get Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) =>
            new GetSceneProperty(description, graph, valueTypeName)
        )
    );
  }

  constructor(
    description: NodeDescription,
    graph: Graph,
    valueTypeName: string
  ) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const sceneGraph =
          context.graph.registry.abstractions.get<IScene>('IScene');
        this.writeOutput(
          'value',
          sceneGraph.getProperty(this.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
