import { extractPostfixFromNodeType } from '../../../extractIdFromNodeType.js';
import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { IScene } from '../Abstractions/IScene.js';

export class SetSceneProperty extends Node {
  constructor(nodeDescription: NodeDescription, graph: Graph) {
    const valueTypeName = extractPostfixFromNodeType(nodeDescription.typeName);
    super(
      nodeDescription,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'jsonPath'),
        new Socket(valueTypeName, 'value')
      ],
      [new Socket('flow', 'flow')],
      (context) => {
        const scene = context.graph.registry.abstractions.get<IScene>('IScene');
        const value = context.readInput('value');
        scene.setProperty(context.readInput('jsonPath'), valueTypeName, value);
      }
    );
  }
}
