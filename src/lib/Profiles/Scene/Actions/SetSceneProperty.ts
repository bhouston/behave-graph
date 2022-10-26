import { Node } from '../../../Nodes/Node.js';
import { Socket } from '../../../Sockets/Socket.js';
import { IScene } from '../Abstractions/IScene.js';

export class SetSceneProperty extends Node {
  constructor(nodeName: string, public readonly valueTypeName: string) {
    super(
      'Action',
      nodeName,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'jsonPath'),
        new Socket(valueTypeName, 'value')
      ],
      [new Socket('flow', 'flow')],
      (context) => {
        const scene = context.graph.registry.abstractions.get('IScene');
        const value = context.readInput('value');
        scene.setProperty(context.readInput('jsonPath'), valueTypeName, value);
      }
    );
  }
}
