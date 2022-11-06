import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../../Core/Abstractions/ILifecycleEventEmitter.js';
import { IScene } from '../Abstractions/IScene.js';
import { ISmartContractActions } from '../Abstractions/ISmartContractAction.js';

// very 3D specific.
export class OnSceneNodeClick extends Node {
  public static GetDescriptions(scene: IScene, smartContractAction?: ISmartContractActions) {
    return new NodeDescription(
      'scene/nodeClick',
      'Event',
      'On Node Click',
      (description, graph, nodeId) => new OnSceneNodeClick(description, graph, scene, smartContractAction, nodeId)
    );
  }

  constructor(
    description: NodeDescription,
    graph: Graph,
    scene: IScene,
    smartContractAction: ISmartContractActions | undefined,
    nodeId: string
  ) {
    super(
      description,
      graph,
      [
        new Socket('string', 'jsonPath'),
        new Socket('boolean', 'tokenGated'),
        new Socket('string', 'tokenGatedAddress'),
      ],
      [new Socket('flow', 'flow'), new Socket('flow', 'secondFlow'), new Socket('integer', 'count')],
      (context: NodeEvalContext) => {
        const jsonPath = context.readInput('jsonPath') as string;

        const forwardFlow = (count: number) => {
          context.commit('flow');
          context.commit('secondFlow');
          context.writeOutput('count', count);
        };

        let manualCount = 0;

        scene.addOnClickedListener(jsonPath, () => {
          if (!smartContractAction) {
            manualCount++;
            forwardFlow(manualCount);
          } else {
            smartContractAction.invoke(nodeId);
          }
        });

        if (smartContractAction) {
          smartContractAction.registerTriggerHandler(nodeId, (count) => {
            forwardFlow(count);
          });
        }
      }
    );

    this.async = true;
    this.evaluateOnStartup = true;
  }
}
