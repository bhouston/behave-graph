import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../../Core/Abstractions/ILifecycleEventEmitter.js';
import { IScene } from '../Abstractions/IScene.js';

// very 3D specific.
export class OnSceneNodeClick extends Node {
  public static GetDescriptions(scene: IScene) {
    return new NodeDescription(
      'scene/nodeClick',
      'Event',
      'On Node Click',
      (description, graph) => new OnSceneNodeClick(description, graph, scene)
    );
  }

  constructor(description: NodeDescription, graph: Graph, private readonly scene: IScene) {
    super(
      description,
      graph,
      [new Socket('string', 'jsonPath')],
      [new Socket('flow', 'flow'), new Socket('flow', 'secondFlow')],
      (context: NodeEvalContext) => {
        const jsonPath = context.readInput('jsonPath') as string;

        scene.addOnClickedListener(jsonPath, () => {
          context.commit('flow');
          context.commit('secondFlow');
        });
      }
    );

    this.async = true;
    this.evaluateOnStartup = true;
  }
}
