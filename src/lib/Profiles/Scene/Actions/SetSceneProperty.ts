import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { toCamelCase } from '../../../toCamelCase.js';
import { IScene } from '../Abstractions/IScene.js';

export class SetSceneProperty extends FlowNode {
  public static GetDescriptions(scene: IScene, ...valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/set/${valueTypeName}`,
          'Action',
          `Set Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) =>
            new SetSceneProperty(description, graph, valueTypeName, scene)
        )
    );
  }

  constructor(
    description: NodeDescription,
    graph: Graph,
    public readonly valueTypeName: string,
    private readonly scene: IScene
  ) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'jsonPath'),
        new Socket(valueTypeName, 'value')
      ],
      [new Socket('flow', 'flow')]
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    const scene = this.scene;
    const value = this.readInput('value');
    scene.setProperty(this.readInput('jsonPath'), this.valueTypeName, value);
    fiber.commit(this, 'flow');
  }
}
