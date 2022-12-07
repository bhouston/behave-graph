import { Graph } from '../../../Graphs/Graph';
import { ImmediateNode } from '../../../Nodes/ImmediateNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { toCamelCase } from '../../../toCamelCase';
import { IScene } from '../Abstractions/IScene';

export class GetSceneProperty extends ImmediateNode {
  public static GetDescriptions(scene: IScene, ...valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/get/${valueTypeName}`,
          'Query',
          `Get Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) =>
            new GetSceneProperty(description, graph, valueTypeName, scene)
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
      [new Socket('string', 'jsonPath')],
      [new Socket(valueTypeName, 'value')],
      () => {
        this.write(
          'value',
          this.scene.getProperty(this.read('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
