import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class GetSceneProperty extends FlowNode {
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
      (fiber) => {
        const sceneGraph =
          fiber.engine.graph.registry.abstractions.get<IScene>('IScene');
        this.writeOutput(
          'value',
          sceneGraph.getProperty(this.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
