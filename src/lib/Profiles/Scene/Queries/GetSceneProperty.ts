import { Graph } from '../../../Graphs/Graph.js';
import { ImmediateNode } from '../../../Nodes/ImmediateNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class GetSceneProperty extends ImmediateNode {
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
    public readonly valueTypeName: string
  ) {
    super(
      description,
      graph,
      [new Socket('string', 'jsonPath')],
      [new Socket(valueTypeName, 'value')],
      () => {
        const sceneGraph =
          this.graph.registry.abstractions.get<IScene>('IScene');
        this.writeOutput(
          'value',
          sceneGraph.getProperty(this.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
