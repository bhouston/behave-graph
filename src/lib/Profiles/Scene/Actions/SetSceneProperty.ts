import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class SetSceneProperty extends FlowNode {
  public static GetDescriptions(...valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/set/${valueTypeName}`,
          'Action',
          `Set Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) =>
            new SetSceneProperty(description, graph, valueTypeName)
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
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'jsonPath'),
        new Socket(valueTypeName, 'value')
      ],
      [new Socket('flow', 'flow')],
      (context) => {
        const scene = context.graph.registry.abstractions.get<IScene>('IScene');
        const value = this.readInput('value');
        scene.setProperty(this.readInput('jsonPath'), valueTypeName, value);
      }
    );
  }
}
