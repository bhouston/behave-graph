import { CustomEvent } from '../Events/CustomEvent';
import { generateUuid } from '../generateUuid';
import { Metadata } from '../Metadata';
import { Node, NodeConfiguration } from '../Nodes/Node';
import { Registry } from '../Registry';
import { Variable } from '../Variables/Variable';
import { createNodeUsingRegistryDefinition } from './NodeFactory';
// Purpose:
//  - stores the node graph

export class Graph {
  public name = '';
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly nodes: { [id: string]: Node } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly variables: { [id: string]: Variable } = {};
  // TODO: think about whether I can replace this with an immutable strategy?  Rather than having this mutable?
  public readonly customEvents: { [id: string]: CustomEvent } = {};
  public metadata: Metadata = {};
  public version = 0;

  constructor(public readonly registry: Registry) {}

  createNode(
    nodeTypeName: string,
    nodeId: string = generateUuid(),
    nodeConfiguration: NodeConfiguration = {}
  ): Node {
    if (nodeId in this.nodes) {
      throw new Error(
        `can not create new node of type ${nodeTypeName} with id ${nodeId} as one with that id already exists.`
      );
    }

    const node = createNodeUsingRegistryDefinition(
      nodeTypeName,
      nodeId,
      nodeConfiguration,
      this.registry
    );

    this.nodes[nodeId] = node;
    node.inputs.forEach((socket) => {
      if (socket.valueTypeName !== 'flow' && socket.value === undefined) {
        socket.value = this.registry.values.get(socket.valueTypeName).creator();
      }
    });

    return node;
  }
}
