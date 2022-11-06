import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class SetSceneProperty extends Node {
  public static GetDescriptions(scene: IScene, ...valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/set/${valueTypeName}`,
          'Action',
          `Set Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) => new SetSceneProperty(description, graph, valueTypeName, scene)
        )
    );
  }

  constructor(description: NodeDescription, graph: Graph, valueTypeName: string, private readonly scene: IScene) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'jsonPath'), new Socket(valueTypeName, 'value')],
      [new Socket('flow', 'flow')],
      (context) => {
        const scene = this.scene;
        const value = context.readInput('value');
        scene.setProperty(context.readInput('jsonPath'), valueTypeName, value);
      }
    );
  }
}
