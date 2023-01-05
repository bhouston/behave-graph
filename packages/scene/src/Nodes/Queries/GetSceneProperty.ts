import {
  FunctionNode,
  IGraphApi,
  NodeDescription,
  Socket,
  toCamelCase
} from '@behave-graph/core';

import { IScene } from '../../Abstractions/IScene';

export class GetSceneProperty extends FunctionNode {
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
    graph: IGraphApi,
    public readonly valueTypeName: string,
    private readonly scene: IScene
  ) {
    super(
      description,
      graph,
      [new Socket('string', 'jsonPath')],
      [new Socket(valueTypeName, 'value')],
      () => {
        this.writeOutput(
          'value',
          this.scene.getProperty(this.readInput('jsonPath'), valueTypeName)
        );
      }
    );
  }
}
