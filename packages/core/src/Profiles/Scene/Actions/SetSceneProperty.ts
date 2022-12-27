import { Fiber } from '../../../Execution/Fiber';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { toCamelCase } from '../../../toCamelCase';
import { IScene } from '../Abstractions/IScene';

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
    graph: IGraph,
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
