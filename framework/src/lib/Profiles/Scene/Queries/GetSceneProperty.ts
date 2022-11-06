import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class GetSceneProperty extends Node {
  public static GetDescriptions(scene: IScene, ...valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/get/${valueTypeName}`,
          'Query',
          `Get Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) => new GetSceneProperty(description, graph, valueTypeName, scene)
        )
    );
  }

  constructor(description: NodeDescription, graph: Graph, valueTypeName: string, private readonly scene: IScene) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket(valueTypeName, 'value')],
      (context) => {
        const sceneGraph = this.scene;
        context.writeOutput('value', sceneGraph.getProperty(context.readInput('jsonPath'), valueTypeName));
      }
    );
  }
}
