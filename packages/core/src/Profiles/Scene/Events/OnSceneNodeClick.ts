import { Assert } from '../../../Diagnostics/Assert.js';
import { Engine } from '../../../Execution/Engine.js';
import { Graph } from '../../../Graphs/Graph.js';
import { EventNode } from '../../../Nodes/EventNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { IScene } from '../Abstractions/IScene.js';

// very 3D specific.
export class OnSceneNodeClick extends EventNode {
  public static Description = (scene: IScene) =>
    new NodeDescription(
      'scene/nodeClick',
      'Event',
      'On Node Click',
      (description, graph) => new OnSceneNodeClick(description, graph, scene)
    );

  constructor(
    description: NodeDescription,
    graph: Graph,
    private readonly scene: IScene
  ) {
    super(
      description,
      graph,
      [new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket('flow', 'secondFlow')]
    );
  }

  private jsonPath: string | undefined;

  private sendNodeClickedData = (engine: Engine) => {
    engine.commitToNewFiber(this, 'flow');
    engine.commitToNewFiber(this, 'secondFlow');
  };

  private handleNodeClick: (() => void) | undefined = undefined;

  init(engine: Engine) {
    const jsonPath = this.readInput('jsonPath') as string;
    if (!jsonPath) return;
    Assert.mustBeTrue(this.handleNodeClick === undefined);

    this.jsonPath = jsonPath;

    this.handleNodeClick = () => {
      this.sendNodeClickedData(engine);
    };

    const scene = this.scene;
    scene.addOnClickedListener(jsonPath, this.handleNodeClick);
  }

  dispose() {
    Assert.mustBeTrue(this.handleNodeClick !== undefined);
    Assert.mustBeTrue(this.jsonPath !== undefined);

    if (!this.jsonPath || !this.handleNodeClick) return;
    this.scene.removeOnClickedListener(this.jsonPath, this.handleNodeClick);
  }
}
